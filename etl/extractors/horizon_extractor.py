"""
Horizon (Reto 2) extractor.
Reads congestion_scores.csv and sustainability_scores.csv from the sibling
TUI-Smart-Destination-Recommender project and maps them to Atlas destinations.
"""

import os
import pandas as pd
import numpy as np
from config import HORIZON_DATA_PATH, HORIZON_TO_ATLAS, HORIZON_CCAA_FALLBACK, DESTINATIONS, RAW_DIR


def _load_horizon_csv(filename: str) -> pd.DataFrame | None:
    path = os.path.join(HORIZON_DATA_PATH, filename)
    if not os.path.exists(path):
        print(f"  ⚠ Horizon file not found: {path}")
        return None
    df = pd.read_csv(path)
    print(f"  ✓ Loaded {filename} ({len(df)} rows) from Horizon")
    return df


def extract_congestion() -> pd.DataFrame:
    """
    Returns a DataFrame indexed by (destination, month) with real INE-derived
    congestion scores from Horizon.  Horizon data is a monthly seasonal pattern
    (month 1-12, same every year) — we expand it to 24 months for Atlas.
    """
    df = _load_horizon_csv("congestion_scores.csv")
    if df is None:
        return pd.DataFrame()

    rows = []
    for dest_atlas, dest_info in DESTINATIONS.items():
        # find Horizon ID for this Atlas destination
        horizon_id = None
        for hid, aname in HORIZON_TO_ATLAS.items():
            if aname == dest_atlas:
                horizon_id = hid
                break

        # fallback: average of related Horizon destinations
        if horizon_id is None:
            fallback_ids = HORIZON_CCAA_FALLBACK.get(dest_atlas, [])
            if not fallback_ids:
                continue   # keep synthetic for Extremadura / Teruel
            monthly_scores = (
                df[df["destination_id"].isin(fallback_ids)]
                .groupby("month")["congestion_score"]
                .mean()
                .reset_index()
            )
        else:
            monthly_scores = (
                df[df["destination_id"] == horizon_id][["month", "congestion_score"]]
                .copy()
            )

        # scale underutilised destinations down (Horizon doesn't have them)
        cap = dest_info["capacity_index"] / 100
        for _, row in monthly_scores.iterrows():
            rows.append({
                "destination": dest_atlas,
                "month":       int(row["month"]),
                "congestion_index_real": round(float(row["congestion_score"]) * cap, 1),
            })

    result = pd.DataFrame(rows)
    if not result.empty:
        out = f"{RAW_DIR}/horizon_congestion.csv"
        result.to_csv(out, index=False, encoding="utf-8")
        print(f"  ✓ Horizon congestion mapped: {len(result)} rows → {out}")
    return result


def extract_sustainability() -> pd.DataFrame:
    """
    Returns a DataFrame with one row per Atlas destination containing
    real INE/FRONTUR-derived sustainability scores from Horizon.
    """
    df_sust = _load_horizon_csv("sustainability_scores.csv")
    if df_sust is None:
        return pd.DataFrame()

    rows = []
    for dest_atlas in DESTINATIONS:
        horizon_id = None
        for hid, aname in HORIZON_TO_ATLAS.items():
            if aname == dest_atlas:
                horizon_id = hid
                break

        if horizon_id is None:
            fallback_ids = HORIZON_CCAA_FALLBACK.get(dest_atlas, [])
            if not fallback_ids:
                continue
            sub = df_sust[df_sust["destination_id"].isin(fallback_ids)]
            score = sub["sustainability_score"].mean()
            carbon = sub["carbon_score"].mean()
            transport = sub["public_transport_score"].mean()
        else:
            sub = df_sust[df_sust["destination_id"] == horizon_id]
            if sub.empty:
                continue
            score    = sub["sustainability_score"].iloc[0]
            carbon   = sub["carbon_score"].iloc[0]
            transport = sub["public_transport_score"].iloc[0]

        rows.append({
            "destination":              dest_atlas,
            "esg_score_real":           round(float(score), 1),
            "carbon_score":             round(float(carbon), 1),
            "public_transport_score":   round(float(transport), 1),
        })

    result = pd.DataFrame(rows)
    if not result.empty:
        out = f"{RAW_DIR}/horizon_sustainability.csv"
        result.to_csv(out, index=False, encoding="utf-8")
        print(f"  ✓ Horizon sustainability mapped: {len(result)} rows → {out}")
    return result


def extract_horizon() -> dict:
    print("\n  [Horizon Reto 2 integration]")
    return {
        "horizon_congestion":     extract_congestion(),
        "horizon_sustainability": extract_sustainability(),
    }
