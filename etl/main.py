"""
Atlas ETL Pipeline — main orchestrator.

Data sources (in priority order):
  1. OSM Overpass       — real POIs (hotels, restaurants, attractions, transport)
  2. INE EOH            — real hotel occupancy by province/month
  3. INE FRONTUR        — real international arrivals by CCAA/month
  4. INE EGATUR         — real tourist daily spending by CCAA/month
  5. Horizon (Reto 2)   — real INE-derived congestion + FRONTUR sustainability scores
  6. AEMET              — 30-year climate normals (requires free API key)
  7. Synthetic          — fills any gaps not covered by real sources

Usage:
    cd etl/
    python main.py              # full pipeline (all sources)
    python main.py --skip-osm   # skip OSM (faster, no POI map layer)
    python main.py --skip-ine   # skip INE APIs (offline mode)
"""

import os
import sys
import argparse
import pandas as pd
from dotenv import load_dotenv

# Force UTF-8 on Windows (default console is cp1252, can't encode ✓ → etc.)
if sys.stdout.encoding and sys.stdout.encoding.lower() != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

load_dotenv()  # loads AEMET_API_KEY from etl/.env if present

sys.path.insert(0, os.path.dirname(__file__))

from config import RAW_DIR, PROCESSED_DIR
from extractors.synthetic_generator import generate_all as generate_synthetic
from extractors.osm_extractor import extract_osm
from extractors.ine_extractor import extract_ine
from extractors.aemet_extractor import extract_aemet
from extractors.horizon_extractor import extract_horizon
from transformers.transformer import transform_all
from loaders.loader import load


def ensure_dirs():
    for d in [RAW_DIR, PROCESSED_DIR]:
        os.makedirs(d, exist_ok=True)


def run(skip_osm: bool = False, skip_ine: bool = False):
    print("=" * 62)
    print("  ATLAS ETL PIPELINE")
    print("  TUI Care Foundation — Reto 3 — SDG 8.9")
    print("=" * 62)

    ensure_dirs()

    # ── 1. Synthetic baseline ─────────────────────────────────────
    print("\n[1/5] Synthetic baseline\n")
    raw = generate_synthetic()

    # ── 2. OSM POIs ───────────────────────────────────────────────
    if skip_osm:
        print("\n[2/5] OSM — skipped (--skip-osm)\n")
        raw["pois"] = pd.DataFrame()
    else:
        print("\n[2/5] OSM POIs (est. 20 min)...\n")
        raw["pois"] = extract_osm()

    # ── 3. INE real data ──────────────────────────────────────────
    if skip_ine:
        print("\n[3/5] INE — skipped (--skip-ine)\n")
    else:
        print("\n[3/5] INE Open Data (EOH + FRONTUR + EGATUR)...\n")
        ine_data = extract_ine()
        raw.update(ine_data)

    # ── 4. AEMET climate ──────────────────────────────────────────
    print("\n[4/5] AEMET climate normals...\n")
    aemet_data = extract_aemet()
    raw.update(aemet_data)

    # ── 5. Horizon (Reto 2) ───────────────────────────────────────
    print("\n[5/5] Horizon Reto 2 integration...\n")
    horizon_data = extract_horizon()
    raw.update(horizon_data)

    # ── Transform ─────────────────────────────────────────────────
    processed = transform_all(raw)

    # ── Load / validate ───────────────────────────────────────────
    print("\n[Load]\n")
    ok = load(processed)

    if ok:
        print("\n Pipeline complete. Connect Power BI to etl/data/processed/\n")
    else:
        print("\n Pipeline completed with missing outputs. Check errors above.\n")
        sys.exit(1)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Atlas ETL Pipeline")
    parser.add_argument("--skip-osm", action="store_true",
                        help="Skip OSM extraction (no POI layer)")
    parser.add_argument("--skip-ine", action="store_true",
                        help="Skip INE API calls (offline/fast mode)")
    args = parser.parse_args()
    run(skip_osm=args.skip_osm, skip_ine=args.skip_ine)
