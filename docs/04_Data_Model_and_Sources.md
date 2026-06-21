# Data Model and Sources

## Atlas — Geospatial Tourism Data Architecture

---

# 1. Overview

The Atlas data architecture is designed to integrate tourism supply, demand, congestion, sustainability, and climate data across 20 Spanish destinations into a unified geospatial model. All data is processed through the Python ETL pipeline and stored as CSV and GeoJSON files — no database server required for the initial implementation.

The model shares key datasets with **Horizon** (Reto 2): congestion scores and sustainability scores are calculated from the same INE EOH and FRONTUR sources, ensuring analytical consistency across the suite.

---

# 2. Core Datasets

## destinations.csv

**Description:** Master destination repository. One row per destination.

| Field | Type | Description |
|---|---|---|
| destination_id | string | Primary key (e.g. "D001") |
| name | string | Destination display name |
| region | string | Comunidad Autónoma |
| type | enum | beach · city · nature · rural · cultural |
| latitude | float | Centroid latitude (WGS84) |
| longitude | float | Centroid longitude (WGS84) |
| area_km2 | float | Destination territory area in km² |
| accessibility_index | int | 0–100 composite (road + rail + air) |
| natural_value_index | int | 0–100 (protected areas, biodiversity, landscape) |
| cultural_value_index | int | 0–100 (heritage sites, UNESCO, historical significance) |
| population | int | Resident population |
| coastline_km | float | Coastal length in km (0 for inland) |

**Records:** 20

## congestion_monthly.csv

**Description:** Monthly congestion pressure per destination. Derived from INE EOH hotel occupancy data (Table 49371) and normalised to a 0–100 index.

| Field | Type | Description |
|---|---|---|
| destination_id | string | Foreign key → destinations.csv |
| month | int | 1–12 |
| year | int | Reference year |
| hotel_occupancy_rate | float | % hotel rooms occupied (from INE EOH) |
| international_arrivals | int | Monthly international arrivals (from FRONTUR) |
| congestion_index | int | 0–100 derived score |
| congestion_level | enum | low · moderate · high · very_high |
| peak_flag | bool | True if highest congestion month for this destination |

**Records:** 240 (20 destinations × 12 months)

**Congestion Index Formula:**
```
congestion_index = 
  0.60 × normalise(hotel_occupancy_rate) +
  0.40 × normalise(international_arrivals)

Normalised to 0–100 within each destination's historical range.
```

## offer_density.csv

**Description:** Tourism supply density per destination and category. Derived from OpenStreetMap POI extraction.

| Field | Type | Description |
|---|---|---|
| destination_id | string | Foreign key → destinations.csv |
| category | enum | hotels · restaurants · experiences · attractions · transport |
| poi_count | int | Total POIs of this category in the destination territory |
| density_score | float | poi_count / area_km2 (POIs per km²) |
| density_percentile | int | Percentile rank within category across all 20 destinations |
| last_updated | date | Date of last OSM extraction |

**Records:** 100 (20 destinations × 5 categories)

## opportunities.csv

**Description:** Composite opportunity score per destination for investment and development targeting.

| Field | Type | Description |
|---|---|---|
| destination_id | string | Foreign key → destinations.csv |
| opportunity_score | int | 0–100 composite (see formula in doc 03) |
| offer_gap_score | int | 0–100 inverse density (high = underserved) |
| sentiment_score | float | 0–10 aggregate visitor rating |
| accessibility_score | int | 0–100 (from destinations.csv) |
| natural_cultural_value | int | 0–100 average of natural + cultural indices |
| congestion_headroom | int | 0–100 (100 − avg congestion index) |
| roi_projection_m | float | Estimated investment return in €M (model-based) |
| recommended_category | string | Primary recommended development category |

**Records:** 20

## esg_scores.csv

**Description:** ESG sustainability profile per destination. Integrates FRONTUR carbon data, OSM transport accessibility, and synthetic sustainability indicators.

| Field | Type | Description |
|---|---|---|
| destination_id | string | Foreign key → destinations.csv |
| carbon_score | int | 0–100 (higher = lower carbon footprint per tourist) |
| local_business_pct | float | % tourism revenue going to local (non-chain) businesses |
| sustainable_transport_access | int | 0–100 (rail + public transport accessibility) |
| environmental_certification | int | 0–3 (UNESCO/Biosphere/ISO14001 certifications) |
| waste_management_score | int | 0–100 (recycling rate, waste per tourist) |
| overall_esg_score | int | 0–100 weighted composite |
| esg_tier | enum | green · amber · red |

**Records:** 20

## sentiment.csv

**Description:** Aggregated visitor review scores per destination and category.

| Field | Type | Description |
|---|---|---|
| destination_id | string | Foreign key → destinations.csv |
| category | enum | hotels · restaurants · experiences · overall |
| platform | enum | google · tripadvisor · booking · composite |
| avg_rating | float | 0–10 average score |
| review_count | int | Total reviews contributing to average |
| sentiment_trend | enum | improving · stable · declining |
| last_updated | date | Date of last data refresh |

**Records:** 80+ (20 destinations × 4 categories)

---

# 3. Geospatial Files

## destinations.geojson

**Description:** Destination polygon boundaries and centroid points. Used for choropleth maps and spatial joins in the ETL pipeline.

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "destination_id": "D001",
        "name": "Barcelona",
        "type": "city",
        "congestion_index": 82,
        "opportunity_score": 28
      },
      "geometry": {
        "type": "MultiPolygon",
        "coordinates": [...]
      }
    }
  ]
}
```

**Source:** OpenStreetMap administrative boundaries (CC BY-SA).

---

# 4. Open Data Sources

## INE — Instituto Nacional de Estadística

### EOH Table 49371 (Encuesta de Ocupación Hotelera)
- **Description:** Monthly hotel occupancy rates by province
- **Fields used:** province, month, year, occupancy_rate, overnight_stays
- **Update frequency:** Monthly (published 6 weeks after reference month)
- **API endpoint:** `https://servicios.ine.es/wstempus/js/ES/DATOS_TABLA/49371?tip=AM`
- **License:** CC BY 4.0
- **ETL script:** `data/scripts/fetch_open_data.py`

### FRONTUR Table 23988 (Estadística de Movimientos Turísticos en Fronteras)
- **Description:** International tourist arrivals by autonomous community and country of origin
- **Fields used:** region, month, year, arrivals, country_origin
- **Update frequency:** Monthly
- **API endpoint:** `https://servicios.ine.es/wstempus/js/ES/DATOS_TABLA/23988?tip=AM`
- **License:** CC BY 4.0
- **ETL script:** `data/scripts/fetch_open_data.py`

## AEMET — Agencia Estatal de Meteorología

- **Description:** Climate normals, monthly temperature and precipitation by station
- **Fields used:** station_id, month, avg_temp, max_temp, min_temp, precipitation, sunshine_hours
- **API:** AEMET Open Data REST API (`/valores/climatologicos/mensualesanuales/`)
- **Auth:** `AEMET_API_KEY` environment variable (free registration at opendata.aemet.es)
- **Note:** Returns a pre-signed datos URL; must fetch without API key. Subject to per-hour rate limits.
- **License:** AEMET Open Data terms (non-commercial)

## OpenStreetMap

- **Description:** Points of interest (hotels, restaurants, attractions, transport nodes) and administrative boundaries
- **Access:** Overpass API (`https://overpass-api.de/api/interpreter`)
- **Query example (hotels in Barcelona):**
  ```
  [out:json];
  area["name"="Barcelona"]["admin_level"="8"];
  node["tourism"="hotel"](area);
  out body;
  ```
- **License:** ODbL (Open Database License)
- **Categories extracted:** hotel, hostel, restaurant, cafe, museum, park, beach, attraction, bus_stop, train_station

## Google / Tripadvisor / Booking.com (Planned)

- **Description:** Visitor reviews, ratings, and sentiment scores
- **Access:** Google Places API, Tripadvisor Content API, Booking.com Demand API
- **Fields:** rating, review_count, sentiment_keywords, response_rate
- **Status:** Planned for Phase 3 ETL implementation
- **Note:** Requires API keys and respect of rate limits; sentiment analysis via Python NLTK or transformers

## Ministerio de Transportes, Movilidad y Agenda Urbana (Planned)

- **Description:** Road network data, public transport connections, accessibility scores by municipality
- **Access:** Datos Abiertos portal (datos.gob.es)
- **License:** CC BY 4.0

---

# 5. Dataset Relationships

```
destinations (20)
  │
  ├── congestion_monthly (240)    [destination_id]
  ├── offer_density (100)         [destination_id]
  ├── opportunities (20)          [destination_id]
  ├── esg_scores (20)             [destination_id]
  └── sentiment (80+)             [destination_id]

destinations.geojson
  │
  └── spatial join → offer_density (zone-level POI aggregation)
```

---

# 6. Data Quality and Validation

## Completeness Checks

- All 20 destinations must have entries in every dataset
- `congestion_monthly`: exactly 12 rows per destination (months 1–12)
- `esg_scores`: no null values in `overall_esg_score`
- `destinations.geojson`: geometry validity check (no self-intersecting polygons)

## Range Validation

All index fields (0–100) validated against range. Values outside range logged and capped:
- `congestion_index`: clamp to [0, 100]
- `opportunity_score`: clamp to [0, 100]
- `sentiment_score`: clamp to [0, 10]

## Freshness

| Dataset | Expected Update Frequency | Alert Threshold |
|---|---|---|
| `congestion_monthly` | Monthly (INE) | > 45 days since last update |
| `offer_density` | Quarterly (OSM) | > 90 days since last update |
| `sentiment` | Weekly (APIs) | > 14 days since last update |
| `esg_scores` | Annual (INE/FRONTUR) | > 365 days since last update |

## Cross-Dataset Consistency

`congestion_index` values in `congestion_monthly` must be consistent with `congestion_headroom` in `opportunities`: `congestion_headroom = 100 − mean(congestion_index for all months)`.

---

# 7. Integration with Horizon

Atlas shares two datasets directly with the Horizon project to ensure consistency across the suite:

| Dataset | Horizon path | Atlas path | Notes |
|---|---|---|---|
| Congestion scores | `data/raw/congestion_scores.csv` | `data/processed/congestion_monthly.csv` | Same INE EOH source; Atlas adds spatial aggregation |
| Sustainability scores | `data/raw/sustainability_scores.csv` | `data/processed/esg_scores.csv` | Horizon's overall score = Atlas `overall_esg_score` |

When Atlas's ETL pipeline is built, it will either consume Horizon's processed files directly or run the same INE/FRONTUR extraction independently — the two approaches produce identical congestion and sustainability values.
