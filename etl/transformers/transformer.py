"""
Transform raw extracted data into clean, Power BI-ready tables.
Merges synthetic baseline with real data from INE, AEMET and Horizon (Reto 2).
Priority: real data overwrites synthetic wherever available.
"""

import pandas as pd
import numpy as np
from config import DESTINATIONS, PROCESSED_DIR


# ── POI transform ─────────────────────────────────────────────────────────────

def transform_pois(df_raw: pd.DataFrame) -> pd.DataFrame:
    df = df_raw.copy()

    def classify(row):
        if row["category"] == "accommodation":  return "Alojamiento"
        if row["category"] == "food_beverage":  return "Restauración"
        if row["category"] == "transport":       return "Transporte"
        if row["historic"]:                      return "Patrimonio"
        if row["leisure"] in ("beach", "marina"): return "Playa/Marina"
        if row["leisure"] in ("park", "nature_reserve"): return "Naturaleza"
        return "Atracción"

    df["asset_type"] = df.apply(classify, axis=1)

    dest_meta = pd.DataFrame([
        {"destination": k, "region": v["region"],
         "destination_type": v["type"], "capacity_index": v["capacity_index"]}
        for k, v in DESTINATIONS.items()
    ])
    df = df.merge(dest_meta, on="destination", how="left")
    df["stars_num"] = pd.to_numeric(df["stars"], errors="coerce")

    out = df[[
        "osm_id", "name", "destination", "region", "destination_type",
        "capacity_index", "category", "asset_type", "lat", "lon",
        "stars_num", "cuisine", "website",
    ]].rename(columns={"stars_num": "stars", "osm_id": "poi_id"})

    out = out.dropna(subset=["lat", "lon"])
    out["poi_id"] = out["poi_id"].astype(str)

    path = f"{PROCESSED_DIR}/pois.csv"
    out.to_csv(path, index=False, encoding="utf-8")
    print(f"  + POIs: {len(out):,} rows → {path}")
    return out


# ── Time series transform ─────────────────────────────────────────────────────

def transform_time_series(
    df_raw: pd.DataFrame,
    ine_eoh: pd.DataFrame,
    ine_frontur: pd.DataFrame,
    ine_egatur: pd.DataFrame,
    horizon_congestion: pd.DataFrame,
    aemet_climate: pd.DataFrame,
) -> pd.DataFrame:
    df = df_raw.copy()

    # ── Merge INE EOH hotel demand → relative occupancy ──────────────────────
    if not ine_eoh.empty and "hotel_occupancy_pct_real" in ine_eoh.columns:
        df = df.merge(
            ine_eoh[["destination", "year", "month", "hotel_occupancy_pct_real"]],
            on=["destination", "year", "month"], how="left"
        )
        mask = df["hotel_occupancy_pct_real"].notna()
        df.loc[mask, "hotel_occupancy_pct"] = df.loc[mask, "hotel_occupancy_pct_real"]
        df.drop(columns=["hotel_occupancy_pct_real"], inplace=True)
        print(f"  + EOH real hotel demand: {mask.sum():,} rows overwritten")

    # ── Merge INE FRONTUR international arrivals ──────────────────────────────
    if not ine_frontur.empty and "intl_visitors_real" in ine_frontur.columns:
        df = df.merge(
            ine_frontur[["destination", "year", "month", "intl_visitors_real"]],
            on=["destination", "year", "month"], how="left"
        )
        mask = df["intl_visitors_real"].notna()
        df.loc[mask, "visitors"] = df.loc[mask, "intl_visitors_real"].astype(int)
        df.drop(columns=["intl_visitors_real"], inplace=True)
        print(f"  + FRONTUR real international arrivals: {mask.sum():,} rows overwritten")

    # ── Apply EGATUR seasonal multiplier (national pattern, no CCAA breakdown) ──
    if not ine_egatur.empty and "national_avg_spend_eur" in ine_egatur.columns:
        nat_avg = ine_egatur["national_avg_spend_eur"].mean()
        if nat_avg > 0:
            df = df.merge(
                ine_egatur[["year", "month", "national_avg_spend_eur"]],
                on=["year", "month"], how="left"
            )
            mask = df["national_avg_spend_eur"].notna()
            # scale synthetic spend by the national seasonal ratio
            df.loc[mask, "avg_daily_spend_eur"] = (
                df.loc[mask, "avg_daily_spend_eur"]
                * (df.loc[mask, "national_avg_spend_eur"] / nat_avg)
            ).round(2)
            df.drop(columns=["national_avg_spend_eur"], inplace=True)
            print(f"  + EGATUR seasonal correction applied: {mask.sum():,} rows")

    # ── Merge Horizon congestion (real INE pattern, seasonal) ─────────────────
    if not horizon_congestion.empty:
        df = df.merge(
            horizon_congestion.rename(columns={"congestion_index_real": "_cong_real"}),
            on=["destination", "month"], how="left"
        )
        mask = df["_cong_real"].notna()
        df.loc[mask, "congestion_index"] = df.loc[mask, "_cong_real"]
        df.drop(columns=["_cong_real"], inplace=True)
        n = mask.sum()
        print(f"  + Horizon congestion (INE-derived): {n:,} rows overwritten")

    # ── Merge AEMET climate ───────────────────────────────────────────────────
    if not aemet_climate.empty:
        aemet_cols = ["destination", "month", "avg_temp_c", "climate_comfort"]
        if "avg_precip_mm" in aemet_climate.columns:
            aemet_cols.append("avg_precip_mm")
        df = df.merge(aemet_climate[aemet_cols], on=["destination", "month"], how="left")
        n = df["avg_temp_c"].notna().sum()
        print(f"  + AEMET climate: {n:,} rows enriched")

    # ── Derived fields ────────────────────────────────────────────────────────
    def congestion_label(val):
        if val >= 80: return "Crítico"
        if val >= 60: return "Alto"
        if val >= 40: return "Moderado"
        return "Bajo"

    df["congestion_level"]  = df["congestion_index"].apply(congestion_label)
    df["growth_opportunity"] = (df["capacity_index"] < 50) & (df["sentiment_score"] >= 3.8)
    df["saturation_risk"]    = df["congestion_index"] >= 75

    df = df.sort_values(["destination", "year", "month"])
    df["visitors_yoy_pct"] = (
        df.groupby(["destination", "month"])["visitors"]
        .pct_change() * 100
    ).round(1)

    path = f"{PROCESSED_DIR}/time_series.csv"
    df.to_csv(path, index=False, encoding="utf-8")
    print(f"  + Time series: {len(df):,} rows → {path}")
    return df


# ── Reviews transform ─────────────────────────────────────────────────────────

def transform_reviews(df_raw: pd.DataFrame) -> tuple[pd.DataFrame, pd.DataFrame]:
    df = df_raw.copy()
    df["date"]   = pd.to_datetime(df["date"])
    df["year"]   = df["date"].dt.year
    df["month"]  = df["date"].dt.month
    df["period"] = df["date"].dt.to_period("M").astype(str)

    agg = (
        df.groupby(["destination", "region", "period", "year", "month"])
        .agg(
            avg_score=("score", "mean"),
            review_count=("score", "count"),
            pct_positive=("sentiment", lambda x: (x == "Positivo").mean() * 100),
            pct_negative=("sentiment", lambda x: (x == "Negativo").mean() * 100),
        )
        .round(2)
        .reset_index()
    )

    df.to_csv(f"{PROCESSED_DIR}/reviews_detail.csv",     index=False, encoding="utf-8")
    agg.to_csv(f"{PROCESSED_DIR}/reviews_aggregated.csv", index=False, encoding="utf-8")
    print(f"  + Reviews: {len(df):,} detail + {len(agg):,} aggregated rows")
    return df, agg


# ── Destination summary ───────────────────────────────────────────────────────

def build_destination_summary(
    df_ts: pd.DataFrame,
    df_reviews_agg: pd.DataFrame,
    horizon_sustainability: pd.DataFrame,
) -> pd.DataFrame:

    latest = df_ts[df_ts["year"] == df_ts["year"].max()]

    summary = (
        latest.groupby(["destination", "region", "destination_type", "capacity_index"])
        .agg(
            avg_visitors=("visitors", "mean"),
            avg_congestion=("congestion_index", "mean"),
            avg_occupancy=("hotel_occupancy_pct", "mean"),
            avg_spend=("avg_daily_spend_eur", "mean"),
            avg_esg=("esg_score", "mean"),
        )
        .round(1)
        .reset_index()
    )

    # overwrite ESG with real Horizon sustainability scores
    if not horizon_sustainability.empty:
        sust = horizon_sustainability[["destination", "esg_score_real",
                                       "carbon_score", "public_transport_score"]]
        summary = summary.merge(sust, on="destination", how="left")
        mask = summary["esg_score_real"].notna()
        summary.loc[mask, "avg_esg"] = summary.loc[mask, "esg_score_real"]
        summary.drop(columns=["esg_score_real"], inplace=True)
        print(f"  + Horizon sustainability: {mask.sum()} destinations updated")

    # merge climate if available
    if "avg_temp_c" in df_ts.columns:
        agg_spec = {"avg_temp_annual": ("avg_temp_c", "mean")}
        if "avg_precip_mm" in df_ts.columns:
            agg_spec["avg_precip_annual"] = ("avg_precip_mm", "mean")
        climate_avg = (
            df_ts.dropna(subset=["avg_temp_c"])
            .groupby("destination")
            .agg(**agg_spec)
            .round(1)
            .reset_index()
        )
        summary = summary.merge(climate_avg, on="destination", how="left")

    # sentiment from reviews
    sent = (
        df_reviews_agg.groupby("destination")
        .agg(avg_sentiment=("avg_score", "mean"), total_reviews=("review_count", "sum"))
        .round(2)
        .reset_index()
    )
    summary = summary.merge(sent, on="destination", how="left")

    # coordinates
    coords = pd.DataFrame([
        {"destination": k,
         "lat_center": round((v["bbox"][0] + v["bbox"][2]) / 2, 5),
         "lon_center": round((v["bbox"][1] + v["bbox"][3]) / 2, 5)}
        for k, v in DESTINATIONS.items()
    ])
    summary = summary.merge(coords, on="destination", how="left")

    def status(row):
        if row["avg_congestion"] >= 80: return "Saturado"
        if row["capacity_index"] < 40:  return "Infrautilizado"
        return "En crecimiento"

    summary["status"]             = summary.apply(status, axis=1)
    summary["growth_opportunity"] = summary["capacity_index"] < 50

    # data quality flag: how many fields came from real sources
    real_fields = []
    if "avg_occupancy" in summary.columns: real_fields.append("occupancy")
    if "avg_spend" in summary.columns:     real_fields.append("spend")
    if "carbon_score" in summary.columns:  real_fields.append("esg")
    if "avg_temp_annual" in summary.columns: real_fields.append("climate")
    summary["real_data_sources"] = ",".join(real_fields) if real_fields else "synthetic"

    path = f"{PROCESSED_DIR}/destination_summary.csv"
    summary.to_csv(path, index=False, encoding="utf-8")
    print(f"  + Destination summary: {len(summary):,} rows → {path}")
    return summary


# ── Orchestrator ──────────────────────────────────────────────────────────────

def transform_all(raw: dict) -> dict:
    print("\n[Transforming — merging real + synthetic data]\n")

    pois_raw = raw.get("pois")
    pois = transform_pois(pois_raw) if (pois_raw is not None and not pois_raw.empty) else None

    ts = transform_time_series(
        df_raw             = raw["time_series"],
        ine_eoh            = raw.get("ine_eoh",            pd.DataFrame()),
        ine_frontur        = raw.get("ine_frontur",        pd.DataFrame()),
        ine_egatur         = raw.get("ine_egatur",         pd.DataFrame()),
        horizon_congestion = raw.get("horizon_congestion", pd.DataFrame()),
        aemet_climate      = raw.get("aemet_climate",      pd.DataFrame()),
    )

    rev, ragg = transform_reviews(raw["reviews"])

    summary = build_destination_summary(
        df_ts                  = ts,
        df_reviews_agg         = ragg,
        horizon_sustainability = raw.get("horizon_sustainability", pd.DataFrame()),
    )

    raw["market_origin"].to_csv(
        f"{PROCESSED_DIR}/market_origin.csv", index=False, encoding="utf-8"
    )

    return {
        "pois":                pois,
        "time_series":         ts,
        "reviews_detail":      rev,
        "reviews_aggregated":  ragg,
        "destination_summary": summary,
        "market_origin":       raw["market_origin"],
    }
