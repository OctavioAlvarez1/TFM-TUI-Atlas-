"""
OpenStreetMap extractor via Overpass API.
Pulls POIs (hotels, restaurants, attractions, transport) for each destination.

Rate-limit strategy:
  - 5 s sleep between every category request
  - 15 s sleep between destinations
  - 3 retries with exponential backoff (20 s, 60 s, 120 s)
  - Result cap: 500 elements per query to avoid heavy-query rejections
"""

import time
import requests
import pandas as pd
from tqdm import tqdm
from config import DESTINATIONS, OSM_QUERIES, OVERPASS_URL, OVERPASS_TIMEOUT, RAW_DIR

SLEEP_BETWEEN_REQUESTS  = 5     # seconds between categories
SLEEP_BETWEEN_DESTS     = 15    # seconds between destinations
RETRY_DELAYS            = [20, 60, 120]
MAX_RESULTS_PER_QUERY   = 500

HEADERS = {
    "Content-Type": "application/x-www-form-urlencoded",
    "Accept": "application/json",
    "User-Agent": "TUI-Atlas-ETL/1.0 (TFM research project; contact octavio.alvarez@accenture.com)",
}


def build_overpass_query(bbox: list, filters: list) -> str:
    s, w, n, e = bbox
    node_lines = "\n  ".join(f'node[{f}]({s},{w},{n},{e});' for f in filters)
    way_lines  = "\n  ".join(f'way[{f}]({s},{w},{n},{e});'  for f in filters)
    return (
        f'[out:json][timeout:{OVERPASS_TIMEOUT}];\n'
        f'(\n'
        f'  {node_lines}\n'
        f'  {way_lines}\n'
        f');\n'
        f'out center {MAX_RESULTS_PER_QUERY};\n'
    )


def parse_overpass_response(response: dict, destination: str, category: str) -> list:
    rows = []
    for element in response.get("elements", []):
        tags = element.get("tags", {})
        lat = element.get("lat") or element.get("center", {}).get("lat")
        lon = element.get("lon") or element.get("center", {}).get("lon")
        if not lat or not lon:
            continue
        rows.append({
            "osm_id":        element.get("id"),
            "destination":   destination,
            "category":      category,
            "name":          tags.get("name", "Unknown"),
            "lat":           lat,
            "lon":           lon,
            "tourism":       tags.get("tourism", ""),
            "amenity":       tags.get("amenity", ""),
            "historic":      tags.get("historic", ""),
            "leisure":       tags.get("leisure", ""),
            "railway":       tags.get("railway", ""),
            "stars":         tags.get("stars", ""),
            "cuisine":       tags.get("cuisine", ""),
            "website":       tags.get("website", ""),
            "opening_hours": tags.get("opening_hours", ""),
        })
    return rows


def _post_with_retry(query: str, dest: str, category: str) -> list:
    """POST to Overpass with retry / exponential backoff."""
    for attempt, wait in enumerate([0] + RETRY_DELAYS, start=1):
        if wait:
            print(f"    ↻ retry {attempt-1} for [{dest}/{category}] — waiting {wait}s")
            time.sleep(wait)
        try:
            resp = requests.post(
                OVERPASS_URL,
                data={"data": query},
                headers=HEADERS,
                timeout=OVERPASS_TIMEOUT + 15,
            )
            if resp.status_code == 429 or resp.status_code == 503:
                # server busy — retry
                print(f"    ⏳ [{dest}/{category}] HTTP {resp.status_code}, will retry")
                continue
            resp.raise_for_status()
            return parse_overpass_response(resp.json(), dest, category)
        except requests.exceptions.HTTPError as e:
            print(f"    ⚠ HTTP error [{dest}/{category}]: {e}")
            if attempt > len(RETRY_DELAYS):
                break
        except requests.exceptions.RequestException as e:
            print(f"    ⚠ Request error [{dest}/{category}]: {e}")
            if attempt > len(RETRY_DELAYS):
                break
    print(f"    ✗ Giving up on [{dest}/{category}] after {len(RETRY_DELAYS)+1} attempts")
    return []


def extract_osm(destinations: dict = None) -> pd.DataFrame:
    if destinations is None:
        destinations = DESTINATIONS

    all_rows = []
    dest_list = list(destinations.items())

    for dest_idx, (dest_name, dest_info) in enumerate(tqdm(dest_list, desc="Destinations")):
        bbox = dest_info["bbox"]

        for cat_idx, (category, filters) in enumerate(OSM_QUERIES.items()):
            query = build_overpass_query(bbox, filters)
            rows  = _post_with_retry(query, dest_name, category)
            all_rows.extend(rows)
            if cat_idx < len(OSM_QUERIES) - 1:
                time.sleep(SLEEP_BETWEEN_REQUESTS)

        # longer pause between destinations
        if dest_idx < len(dest_list) - 1:
            time.sleep(SLEEP_BETWEEN_DESTS)

    df = pd.DataFrame(all_rows)
    if not df.empty:
        df = df.drop_duplicates(subset=["osm_id"])
        out = f"{RAW_DIR}/osm_pois_raw.csv"
        df.to_csv(out, index=False, encoding="utf-8")
        print(f"\n✅ OSM: {len(df):,} POIs saved → {out}")
    else:
        print("\n⚠ OSM: no POIs collected (all requests failed)")
    return df


if __name__ == "__main__":
    extract_osm()
