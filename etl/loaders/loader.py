"""
Loader — verifies processed outputs and prints a summary manifest.
Data is already written to disk by the transformer; this validates
and logs what Power BI should connect to.
"""

import os
import pandas as pd
from config import PROCESSED_DIR


REQUIRED_FILES = [
    "destination_summary.csv",
    "time_series.csv",
    "reviews_detail.csv",
    "reviews_aggregated.csv",
    "market_origin.csv",
]

OPTIONAL_FILES = [
    "pois.csv",   # only present when OSM extraction ran
]


def validate_outputs() -> bool:
    print(f"\n[Validating outputs in {PROCESSED_DIR}/]\n")
    ok = True
    for fname in REQUIRED_FILES + OPTIONAL_FILES:
        path = os.path.join(PROCESSED_DIR, fname)
        optional = fname in OPTIONAL_FILES
        if not os.path.exists(path):
            if optional:
                print(f"  - OPTIONAL (skipped): {fname}")
            else:
                print(f"  x MISSING: {fname}")
                ok = False
            continue
        df = pd.read_csv(path)
        size_kb = os.path.getsize(path) / 1024
        print(f"  + {fname:<35} {len(df):>7,} rows  {size_kb:>7.1f} KB")
    return ok


def print_powerbi_guide():
    print("""
==============================================================
  POWER BI CONNECTION GUIDE
==============================================================

  1. Open Power BI Desktop → Get Data → Text/CSV
  2. Load each file from:  etl/data/processed/

  RECOMMENDED DATA MODEL:
  ┌──────────────────────┐
  │  destination_summary  │ (1 row per destination — main dimension)
  └──────────┬───────────┘
             │ destination (FK)
  ┌──────────┴───────────────────────────┐
  │  time_series    (336 rows, 24M × 14) │
  │  reviews_aggregated                  │
  │  market_origin                       │
  │  pois           (OSM POIs, map layer)│
  └──────────────────────────────────────┘

  KEY MEASURES TO CREATE IN DAX:
  • Avg Congestion Index    = AVERAGE(time_series[congestion_index])
  • Underutilised Count     = COUNTROWS(FILTER(destination_summary, [capacity_index] < 40))
  • YoY Visitor Growth %    = AVERAGE(time_series[visitors_yoy_pct])
  • Avg Sentiment           = AVERAGE(reviews_aggregated[avg_score])

  MAP VISUALS:
  • Use destination_summary[lat_center] / [lon_center] for destination map
  • Use pois[lat] / [lon] for POI density map
  • Color by destination_summary[status]: Saturado / En crecimiento / Infrautilizado
==============================================================
""")


def load(processed: dict) -> bool:
    ok = validate_outputs()
    if ok:
        print_powerbi_guide()
    return ok
