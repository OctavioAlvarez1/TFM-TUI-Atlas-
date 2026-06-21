"""
AEMET Open Data extractor.
Fetches monthly historical climate data (2023-2024) per province station,
averages by calendar month to produce a climate baseline.

Endpoint used: /valores/climatologicos/mensualesanuales/datos/anioini/{y0}/aniofin/{y1}/estacion/{id}/
(The normales30anios endpoint is no longer available — all IDs return 404.)

Free API key: https://opendata.aemet.es/centrodedescargas/inicio
Set: AEMET_API_KEY=<your_key> in etl/.env  (or as env var)
"""

import os
import time
import requests
import pandas as pd
from config import AEMET_BASE, AEMET_API_KEY, AEMET_PROVINCE_STATIONS, RAW_DIR

SLEEP         = 4.0   # conservative: ~15 req/min to avoid 429
RETRY_WAIT    = 35    # seconds to wait after a 429 before one retry
YEAR_FROM     = 2022
YEAR_TO       = 2024


def _get_with_redirect(url: str, api_key: str) -> list | None:
    """
    AEMET uses a two-step redirect:
    1. GET url → {"datos": "<url2>", "estado": 200}
    2. GET url2 → actual payload (list of dicts)
    Retries once after 35 s if the first step returns 429.
    """
    for attempt in range(2):
        try:
            r1 = requests.get(url, params={"api_key": api_key}, timeout=20)
            if r1.status_code == 429:
                if attempt == 0:
                    print(f"    [WAIT] AEMET rate limit — sleeping {RETRY_WAIT}s...")
                    time.sleep(RETRY_WAIT)
                    continue
                return None
            if r1.status_code != 200:
                return None
            meta = r1.json()
            if meta.get("estado") != 200:
                return None
            datos_url = meta.get("datos")
            if not datos_url:
                return None
            time.sleep(0.5)
            r2 = requests.get(datos_url, params={"api_key": api_key}, timeout=20)
            if r2.status_code != 200:
                return None
            return r2.json()
        except requests.exceptions.RequestException as e:
            print(f"    [WARN] AEMET request: {e}")
            return None
    return None


def _parse_float(val) -> float | None:
    if val is None:
        return None
    try:
        return float(str(val).replace(",", "."))
    except ValueError:
        return None


def fetch_climate_normals() -> pd.DataFrame:
    """
    Fetches monthly historical data (YEAR_FROM–YEAR_TO) per destination station
    and averages by calendar month to produce a per-destination climate baseline.

    Returns DataFrame: (destination, month, avg_temp_c, climate_comfort)
    """
    if not AEMET_API_KEY:
        print("    [SKIP] AEMET_API_KEY not set — skipping climate data")
        print("           Get a free key at: https://opendata.aemet.es/centrodedescargas/inicio")
        print("           Then add AEMET_API_KEY=<key> to etl/.env")
        return pd.DataFrame()

    print(f"    Fetching AEMET monthly climate ({YEAR_FROM}-{YEAR_TO}, {len(AEMET_PROVINCE_STATIONS)} stations)...")

    rows = []
    ok_count = 0

    for dest, station_id in AEMET_PROVINCE_STATIONS.items():
        url = (
            f"{AEMET_BASE}/valores/climatologicos/mensualesanuales/datos"
            f"/anioini/{YEAR_FROM}/aniofin/{YEAR_TO}/estacion/{station_id}/"
        )
        data = _get_with_redirect(url, AEMET_API_KEY)

        if not data:
            print(f"    [WARN] AEMET: no data for {dest} (station {station_id})")
            time.sleep(SLEEP)
            continue

        # aggregate by calendar month (average across years)
        month_temps: dict[int, list[float]] = {}
        for record in data:
            fecha = record.get("fecha", "")
            if not fecha:
                continue
            try:
                month = int(fecha.split("-")[1])  # "2023-10" → 10
            except (IndexError, ValueError):
                continue
            temp = _parse_float(record.get("tm_mes"))
            if temp is not None:
                month_temps.setdefault(month, []).append(temp)

        if not month_temps:
            print(f"    [WARN] AEMET: no tm_mes values for {dest}")
            time.sleep(SLEEP)
            continue

        for month in sorted(month_temps):
            avg_temp = round(sum(month_temps[month]) / len(month_temps[month]), 1)
            rows.append({"destination": dest, "month": month, "avg_temp_c": avg_temp})

        ok_count += 1
        time.sleep(SLEEP)

    df = pd.DataFrame(rows)
    if df.empty:
        print("    [WARN] AEMET: no climate data extracted — check station IDs")
        return df

    # climate comfort: bell curve peaking at 22°C (optimal tourism temperature)
    df["climate_comfort"] = (
        (100 - (df["avg_temp_c"] - 22).abs() * 3.5).clip(0, 100)
    ).round(1)

    out = f"{RAW_DIR}/aemet_climate.csv"
    df.to_csv(out, index=False, encoding="utf-8")
    print(f"    [OK] AEMET: {len(df)} rows ({ok_count}/{len(AEMET_PROVINCE_STATIONS)} destinations) -> {out}")
    return df


def extract_aemet() -> dict:
    print("\n  [AEMET Climate Data]")
    return {"aemet_climate": fetch_climate_normals()}


if __name__ == "__main__":
    from dotenv import load_dotenv
    load_dotenv()
    extract_aemet()
