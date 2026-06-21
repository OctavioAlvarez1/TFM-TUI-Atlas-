"""
INE Open Data extractor.
- EOH  (49371): Viajeros hoteleros por provincia/CCAA → hotel demand index
- FRONTUR (23988): Turistas internacionales por CCAA → real visitor counts
- EGATUR (35104): Gasto turístico nacional → seasonal spending pattern baseline

No API key required.
"""

import time
import requests
import pandas as pd
import numpy as np
from datetime import datetime
from config import (
    INE_BASE, INE_EOH_TABLE, INE_FRONTUR_TABLE, INE_EGATUR_TABLE,
    INE_MONTHS, PROVINCE_TO_DESTINATIONS, CCAA_TO_DESTINATIONS,
    DESTINATIONS, RAW_DIR,
)

SLEEP = 2


# ── Helpers ───────────────────────────────────────────────────────────────────

def _fetch_table(table_id: str, months: int = INE_MONTHS) -> list:
    url = f"{INE_BASE}/{table_id}?nult={months}"
    try:
        resp = requests.get(url, timeout=40, headers={"Accept": "application/json"})
        resp.raise_for_status()
        data = resp.json()
        print(f"    ✓ INE Table {table_id}: {len(data)} series")
        return data
    except requests.exceptions.RequestException as e:
        print(f"    ⚠ INE Table {table_id}: {e}")
        return []


def _parse_fecha_ms(fecha_ms) -> tuple[int, int] | None:
    """Parse INE Fecha field (Unix ms timestamp) → (year, month)."""
    try:
        dt = datetime.fromtimestamp(int(fecha_ms) / 1000)
        return dt.year, dt.month
    except Exception:
        return None


def _series_to_monthly(series_data: list) -> dict[tuple, float]:
    """Convert INE Data array → {(year, month): value}."""
    out = {}
    for entry in series_data:
        if entry.get("Secreto"):
            continue
        val = entry.get("Valor")
        if val is None:
            continue
        ym = _parse_fecha_ms(entry.get("Fecha"))
        if ym:
            out[ym] = float(val)
    return out


def _series_to_annual(series_data: list) -> dict[int, float]:
    """Convert annual INE Data → {year: value}. Uses Fecha timestamp year."""
    out = {}
    for entry in series_data:
        if entry.get("Secreto"):
            continue
        val = entry.get("Valor")
        if val is None:
            continue
        ym = _parse_fecha_ms(entry.get("Fecha"))
        if ym:
            out[ym[0]] = float(val)  # year only
    return out


def _match_ccaa(series_name: str) -> list[str]:
    """Match INE FRONTUR series name (starts with CCAA) to Atlas destinations."""
    for ccaa, dests in CCAA_TO_DESTINATIONS.items():
        if series_name.startswith(ccaa):
            return dests
    return []


def _match_province(series_name: str) -> list[str]:
    """Match INE EOH series name (starts with province) to Atlas destinations."""
    for province, dests in PROVINCE_TO_DESTINATIONS.items():
        if series_name.startswith(province):
            return dests
    return []


# ── EOH — Hotel Arrivals ──────────────────────────────────────────────────────

def fetch_eoh() -> pd.DataFrame:
    """
    INE EOH Table 49371 — Viajeros hoteleros por provincia.
    Used as hotel demand index (normalized relative arrivals per month).
    Series format: "{Province/CCAA}. Viajeros. Total."
    """
    print("    Fetching INE EOH (hotel arrivals by province)...")
    series_list = _fetch_table(INE_EOH_TABLE)
    if not series_list:
        return pd.DataFrame()

    # filter: "Viajeros. Total." — province-level series (not national, not by origin)
    relevant = [
        s for s in series_list
        if "viajeros" in s.get("Nombre", "").lower()
        and s.get("Nombre", "").rstrip().endswith("Total.")
        and not s.get("Nombre", "").startswith("Nacional")
    ]

    rows = []
    for series in relevant:
        name = series.get("Nombre", "")
        dests = _match_province(name) or _match_ccaa(name)
        if not dests:
            continue
        monthly = _series_to_monthly(series.get("Data", []))
        for (year, month), value in monthly.items():
            for dest in dests:
                rows.append({
                    "destination":       dest,
                    "year":              year,
                    "month":             month,
                    "hotel_arrivals_ine": int(value * 1000),  # INE in thousands
                })

    df = pd.DataFrame(rows)
    if df.empty:
        print("    ⚠ EOH: no province matches found")
        return df

    df = (
        df.groupby(["destination", "year", "month"])["hotel_arrivals_ine"]
        .mean().round(0).astype(int).reset_index()
    )
    # derive relative occupancy (normalized 0-100 per destination)
    dest_max = df.groupby("destination")["hotel_arrivals_ine"].transform("max")
    df["hotel_occupancy_pct_real"] = (df["hotel_arrivals_ine"] / dest_max * 95).round(1)

    out = f"{RAW_DIR}/ine_eoh.csv"
    df.to_csv(out, index=False, encoding="utf-8")
    print(f"    ✓ EOH: {len(df)} rows ({df['destination'].nunique()} destinations) → {out}")
    return df


# ── FRONTUR — International Arrivals ─────────────────────────────────────────

def fetch_frontur() -> pd.DataFrame:
    """
    INE FRONTUR Table 23988 — Annual international tourists by CCAA.
    Distributes the annual total across months using a seasonal pattern
    derived from the congestion_index in config (peak months get more weight).
    Returns: (destination, year, month, intl_visitors_real)
    """
    print("    Fetching INE FRONTUR (annual international arrivals by CCAA)...")
    time.sleep(SLEEP)
    series_list = _fetch_table(INE_FRONTUR_TABLE)
    if not series_list:
        return pd.DataFrame()

    relevant = [
        s for s in series_list
        if "dato base" in s.get("Nombre", "").lower()
        and "total nacional" not in s.get("Nombre", "").lower()
    ]

    # annual visitor totals per CCAA/destination
    annual: dict[str, dict[int, float]] = {}
    for series in relevant:
        name = series.get("Nombre", "")
        dests = _match_ccaa(name)
        if not dests:
            continue
        by_year = _series_to_annual(series.get("Data", []))
        for dest in dests:
            if dest not in annual:
                annual[dest] = {}
            for yr, val in by_year.items():
                # multiple CCAAs may map to same dest (e.g. CCAA alias) — take max
                annual[dest][yr] = max(annual[dest].get(yr, 0), val)

    if not annual:
        print("    ⚠ FRONTUR: no CCAA matches found")
        return pd.DataFrame()

    # seasonal distribution weights (from Spain tourism pattern)
    from config import SEASONS
    season_weights = {"peak": 1.0, "high": 0.70, "shoulder": 0.40, "low": 0.20}
    monthly_weights = {m: season_weights[s] for m, s in SEASONS.items()}
    total_weight = sum(monthly_weights.values())
    monthly_fractions = {m: w / total_weight for m, w in monthly_weights.items()}

    cap = {k: v["capacity_index"] for k, v in DESTINATIONS.items()}

    rows = []
    for dest, year_data in annual.items():
        for year, annual_total in year_data.items():
            if year < 2023:
                continue  # keep last 2 years only
            # split proportionally by destination capacity within shared CCAAs
            factor = cap.get(dest, 50) / 100
            for month, frac in monthly_fractions.items():
                rows.append({
                    "destination":        dest,
                    "year":               year,
                    "month":              month,
                    "intl_visitors_real": int(annual_total * frac * factor),
                })

    df = pd.DataFrame(rows)
    out = f"{RAW_DIR}/ine_frontur.csv"
    df.to_csv(out, index=False, encoding="utf-8")
    print(f"    ✓ FRONTUR: {len(df)} rows ({df['destination'].nunique()} destinations, annual→monthly) → {out}")
    return df


# ── EGATUR — National Seasonal Spending Pattern ───────────────────────────────

def fetch_egatur() -> pd.DataFrame:
    """
    INE EGATUR Table 35104 — national average daily tourist spending.
    Used as seasonal multiplier; per-destination baselines stay synthetic.
    Series: "TOTAL, Total, Total"
    """
    print("    Fetching INE EGATUR (national spending seasonal pattern)...")
    time.sleep(SLEEP)
    series_list = _fetch_table(INE_EGATUR_TABLE)
    if not series_list:
        return pd.DataFrame()

    # find national total series: "TOTAL, Total, Total"
    national = next(
        (s for s in series_list
         if s.get("Nombre", "").strip() == "TOTAL, Total, Total"),
        None
    )
    if not national:
        # fallback: first series
        national = series_list[0] if series_list else None
    if not national:
        return pd.DataFrame()

    monthly = _series_to_monthly(national.get("Data", []))
    if not monthly:
        return pd.DataFrame()

    rows = [
        {"year": y, "month": m, "national_avg_spend_eur": round(v, 2)}
        for (y, m), v in monthly.items()
    ]
    df = pd.DataFrame(rows)
    out = f"{RAW_DIR}/ine_egatur.csv"
    df.to_csv(out, index=False, encoding="utf-8")
    print(f"    ✓ EGATUR: {len(df)} rows (national seasonal pattern) → {out}")
    return df


# ── Orchestrator ──────────────────────────────────────────────────────────────

def extract_ine() -> dict:
    print("\n  [INE Open Data]")
    return {
        "ine_eoh":     fetch_eoh(),
        "ine_frontur": fetch_frontur(),
        "ine_egatur":  fetch_egatur(),
    }


if __name__ == "__main__":
    extract_ine()
