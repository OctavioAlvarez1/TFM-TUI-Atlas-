"""
Synthetic data generator.
Produces realistic sentiment scores, visitor counts, congestion index,
ESG metrics and time series — all statistically coherent with real Spain tourism data.
"""

import numpy as np
import pandas as pd
from faker import Faker
from datetime import date, timedelta
from dateutil.relativedelta import relativedelta
from config import (
    DESTINATIONS, RANDOM_SEED, MONTHS, MARKET_ORIGINS, SEASONS, RAW_DIR
)

rng = np.random.default_rng(RANDOM_SEED)
fake = Faker("es_ES")
fake.seed_instance(RANDOM_SEED)


# ── Helpers ───────────────────────────────────────────────────────────────────

def season_multiplier(month: int, dest_type: str) -> float:
    base = {"peak": 1.0, "high": 0.80, "shoulder": 0.55, "low": 0.30}[SEASONS[month]]
    # coastal destinations are much more seasonal
    if dest_type == "coastal" and SEASONS[month] == "peak":
        return 1.0
    if dest_type == "coastal" and SEASONS[month] == "low":
        return 0.15
    return base


def clamp(value: float, lo: float, hi: float) -> float:
    return max(lo, min(hi, value))


# ── Monthly time series ───────────────────────────────────────────────────────

def generate_time_series() -> pd.DataFrame:
    rows = []
    start = date(2023, 1, 1)

    for dest_name, info in DESTINATIONS.items():
        cap = info["capacity_index"] / 100
        dest_type = info["type"]
        region = info["region"]

        # base visitors scales with capacity (popular destinations → more visitors)
        base_visitors = int(rng.integers(15_000, 45_000) * cap)

        for m in range(MONTHS):
            period = start + relativedelta(months=m)
            month  = period.month
            smul   = season_multiplier(month, dest_type)

            visitors = int(base_visitors * smul * rng.uniform(0.88, 1.12))
            congestion = clamp(cap * smul * rng.uniform(0.85, 1.10), 0.05, 1.0)
            sentiment  = clamp(rng.normal(3.8, 0.4), 1.0, 5.0)
            review_vol = int(visitors * rng.uniform(0.08, 0.18))
            avg_spend  = rng.normal(142, 38) * (1 + cap * 0.3)
            occupancy  = clamp(congestion * rng.uniform(0.85, 1.05), 0.10, 1.0)
            esg_score  = clamp(rng.normal(58, 12), 20, 95)

            # underutilised destinations have lower sentiment variance but good scores
            if cap < 0.4:
                sentiment = clamp(rng.normal(4.1, 0.25), 3.0, 5.0)

            rows.append({
                "destination":        dest_name,
                "region":             region,
                "destination_type":   dest_type,
                "year":               period.year,
                "month":              month,
                "period":             period.strftime("%Y-%m"),
                "season":             SEASONS[month],
                "visitors":           visitors,
                "congestion_index":   round(congestion * 100, 1),
                "hotel_occupancy_pct":round(occupancy * 100, 1),
                "avg_daily_spend_eur":round(avg_spend, 2),
                "sentiment_score":    round(sentiment, 2),
                "review_volume":      review_vol,
                "esg_score":          round(esg_score, 1),
                "capacity_index":     info["capacity_index"],
            })

    df = pd.DataFrame(rows)
    out = f"{RAW_DIR}/synthetic_time_series.csv"
    df.to_csv(out, index=False, encoding="utf-8")
    print(f"[OK] Time series: {len(df):,} rows saved -> {out}")
    return df


# ── Market origin breakdown ───────────────────────────────────────────────────

def generate_market_origin() -> pd.DataFrame:
    rows = []
    for dest_name, info in DESTINATIONS.items():
        # weights vary by destination type
        if info["type"] == "island":
            weights = [0.30, 0.25, 0.10, 0.12, 0.08, 0.08, 0.07]
        elif info["type"] == "urban":
            weights = [0.20, 0.15, 0.18, 0.25, 0.10, 0.07, 0.05]
        else:
            weights = [0.15, 0.12, 0.15, 0.45, 0.05, 0.05, 0.03]

        weights = np.array(weights)
        weights = weights / weights.sum()

        for origin, pct in zip(MARKET_ORIGINS, weights):
            rows.append({
                "destination":  dest_name,
                "region":       info["region"],
                "market_origin":origin,
                "share_pct":    round(float(pct) * 100, 1),
            })

    df = pd.DataFrame(rows)
    out = f"{RAW_DIR}/synthetic_market_origin.csv"
    df.to_csv(out, index=False, encoding="utf-8")
    print(f"[OK] Market origin: {len(df):,} rows saved -> {out}")
    return df


# ── Reviews sample ────────────────────────────────────────────────────────────

def generate_reviews(n: int = 2000) -> pd.DataFrame:
    sentiments = ["Positivo", "Neutro", "Negativo"]
    aspects = ["Alojamiento", "Gastronomía", "Transporte", "Atractivos", "Masificación", "Limpieza", "Precio"]
    rows = []
    dest_names = list(DESTINATIONS.keys())

    for _ in range(n):
        dest = rng.choice(dest_names)
        cap  = DESTINATIONS[dest]["capacity_index"] / 100
        # crowded destinations generate more negative reviews about masificación
        neg_bias = clamp(cap - 0.5, 0, 0.4)
        weights  = [0.65 - neg_bias, 0.20, 0.15 + neg_bias]

        sentiment = rng.choice(sentiments, p=weights)
        score = {"Positivo": rng.uniform(3.5, 5.0),
                 "Neutro":   rng.uniform(2.5, 3.5),
                 "Negativo": rng.uniform(1.0, 2.5)}[sentiment]

        rows.append({
            "destination":   dest,
            "region":        DESTINATIONS[dest]["region"],
            "date":          fake.date_between(start_date="-2y", end_date="today"),
            "platform":      rng.choice(["TripAdvisor", "Google Reviews", "Booking.com", "Airbnb"]),
            "sentiment":     sentiment,
            "score":         round(float(score), 1),
            "aspect":        rng.choice(aspects),
            "language":      rng.choice(["es", "en", "de", "fr", "it"], p=[0.30, 0.28, 0.18, 0.14, 0.10]),
            "reviewer_type": rng.choice(["Pareja", "Familia", "Amigos", "Solo", "Negocios"],
                                        p=[0.38, 0.27, 0.20, 0.10, 0.05]),
        })

    df = pd.DataFrame(rows)
    df = df.sort_values("date")
    out = f"{RAW_DIR}/synthetic_reviews.csv"
    df.to_csv(out, index=False, encoding="utf-8")
    print(f"[OK] Reviews: {len(df):,} rows saved -> {out}")
    return df


# ── Destination master ────────────────────────────────────────────────────────

def generate_destination_master() -> pd.DataFrame:
    rows = []
    for name, info in DESTINATIONS.items():
        s, w, n, e = info["bbox"]
        rows.append({
            "destination":       name,
            "region":            info["region"],
            "destination_type":  info["type"],
            "capacity_index":    info["capacity_index"],
            "status":            ("saturado" if info["capacity_index"] >= 80
                                  else "en crecimiento" if info["capacity_index"] >= 50
                                  else "infrautilizado"),
            "lat_center":        round((s + n) / 2, 5),
            "lon_center":        round((w + e) / 2, 5),
            "bbox_south":        s,
            "bbox_west":         w,
            "bbox_north":        n,
            "bbox_east":         e,
        })

    df = pd.DataFrame(rows)
    out = f"{RAW_DIR}/destination_master.csv"
    df.to_csv(out, index=False, encoding="utf-8")
    print(f"[OK] Destination master: {len(df):,} rows saved -> {out}")
    return df


# ── Entry point ───────────────────────────────────────────────────────────────

def generate_all() -> dict:
    print("[START] Generating synthetic datasets...\n")
    return {
        "destinations":  generate_destination_master(),
        "time_series":   generate_time_series(),
        "market_origin": generate_market_origin(),
        "reviews":       generate_reviews(),
    }


if __name__ == "__main__":
    generate_all()
