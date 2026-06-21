"""
ETL configuration — destinations, categories, API endpoints, data mappings.
"""

import os

# ── Destinations ──────────────────────────────────────────────────────────────
# Bounding boxes: [south, west, north, east]
DESTINATIONS = {
    "Barcelona": {
        "bbox": [41.32, 2.06, 41.47, 2.23],
        "region": "Cataluña",
        "type": "urban",
        "capacity_index": 92,
    },
    "Madrid": {
        "bbox": [40.33, -3.83, 40.56, -3.57],
        "region": "Madrid",
        "type": "urban",
        "capacity_index": 78,
    },
    "Mallorca": {
        "bbox": [39.25, 2.30, 39.97, 3.48],
        "region": "Islas Baleares",
        "type": "island",
        "capacity_index": 88,
    },
    "Tenerife": {
        "bbox": [27.97, -16.93, 28.60, -16.10],
        "region": "Islas Canarias",
        "type": "island",
        "capacity_index": 82,
    },
    "Sevilla": {
        "bbox": [37.31, -6.05, 37.44, -5.88],
        "region": "Andalucía",
        "type": "urban",
        "capacity_index": 71,
    },
    "Valencia": {
        "bbox": [39.42, -0.44, 39.52, -0.31],
        "region": "Comunidad Valenciana",
        "type": "urban",
        "capacity_index": 65,
    },
    "Costa Brava": {
        "bbox": [41.65, 2.78, 42.42, 3.32],
        "region": "Cataluña",
        "type": "coastal",
        "capacity_index": 85,
    },
    "Costa del Sol": {
        "bbox": [36.43, -5.20, 36.75, -4.35],
        "region": "Andalucía",
        "type": "coastal",
        "capacity_index": 80,
    },
    "Granada": {
        "bbox": [37.14, -3.64, 37.22, -3.57],
        "region": "Andalucía",
        "type": "cultural",
        "capacity_index": 74,
    },
    "San Sebastián": {
        "bbox": [43.28, -2.03, 43.34, -1.93],
        "region": "País Vasco",
        "type": "urban",
        "capacity_index": 69,
    },
    "Ronda": {
        "bbox": [36.72, -5.18, 36.76, -5.15],
        "region": "Andalucía",
        "type": "rural",
        "capacity_index": 42,
    },
    "Extremadura": {
        "bbox": [38.70, -7.05, 40.15, -4.67],
        "region": "Extremadura",
        "type": "rural",
        "capacity_index": 28,
    },
    "Picos de Europa": {
        "bbox": [43.07, -5.03, 43.30, -4.44],
        "region": "Asturias/Cantabria",
        "type": "rural",
        "capacity_index": 35,
    },
    "Teruel": {
        "bbox": [40.27, -1.25, 40.42, -1.08],
        "region": "Aragón",
        "type": "rural",
        "capacity_index": 22,
    },
}

# ── OSM POI categories ─────────────────────────────────────────────────────────
OSM_QUERIES = {
    "accommodation": [
        'tourism~"hotel|hostel|apartment|guest_house|motel|resort|camp_site"',
    ],
    "food_beverage": [
        'amenity~"restaurant|cafe|bar|fast_food"',
    ],
    "attraction": [
        'tourism~"museum|attraction|viewpoint|artwork|gallery|theme_park|zoo"',
        'historic~"monument|castle|ruins|archaeological_site|memorial"',
        'leisure~"park|beach|nature_reserve|marina"',
    ],
    "transport": [
        'amenity~"bus_station|ferry_terminal"',
        'railway~"station|halt"',
        'aeroway~"aerodrome"',
    ],
}

# ── Overpass API ──────────────────────────────────────────────────────────────
OVERPASS_URL = "https://overpass-api.de/api/interpreter"
OVERPASS_TIMEOUT = 60

# ── INE Open Data APIs ────────────────────────────────────────────────────────
INE_BASE          = "https://servicios.ine.es/wstempus/js/ES/DATOS_TABLA"
INE_EOH_TABLE     = "49371"  # EOH — Viajeros hoteleros por provincia/CCAA
INE_FRONTUR_TABLE = "23988"  # FRONTUR — Turistas internacionales por CCAA
INE_EGATUR_TABLE  = "35104"  # ETUR/EGATUR (tabla 35104 = demografía, Data[] vacía vía nult — patrón derivado de EOH)
INE_MONTHS        = 40       # months of history to fetch

# ── INE province names → Atlas destination(s) ────────────────────────────────
# Keys are substrings that appear in INE series "Nombre" field
PROVINCE_TO_DESTINATIONS: dict[str, list[str]] = {
    "Barcelona":               ["Barcelona", "Costa Brava"],
    "Girona":                  ["Costa Brava"],
    "Madrid":                  ["Madrid"],
    "Balears":                 ["Mallorca"],
    "Illes Balears":           ["Mallorca"],
    "Santa Cruz de Tenerife":  ["Tenerife"],
    "Tenerife":                ["Tenerife"],
    "Sevilla":                 ["Sevilla"],
    "Valencia":                ["Valencia"],
    "Málaga":                  ["Costa del Sol", "Ronda"],
    "Malaga":                  ["Costa del Sol", "Ronda"],
    "Granada":                 ["Granada"],
    "Gipuzkoa":                ["San Sebastián"],
    "Badajoz":                 ["Extremadura"],
    "Cáceres":                 ["Extremadura"],
    "Asturias":                ["Picos de Europa"],
    "Cantabria":               ["Picos de Europa"],
    "Teruel":                  ["Teruel"],
}

# ── INE CCAA names → Atlas destination(s) ────────────────────────────────────
CCAA_TO_DESTINATIONS: dict[str, list[str]] = {
    # exact names as they appear in INE FRONTUR series
    "Cataluña":                          ["Barcelona", "Costa Brava"],
    "Madrid, Comunidad de":              ["Madrid"],
    "Balears, Illes":                    ["Mallorca"],
    "Canarias":                          ["Tenerife"],
    "Andalucía":                         ["Sevilla", "Costa del Sol", "Granada", "Ronda"],
    "Comunitat Valenciana":              ["Valencia"],
    "País Vasco":                        ["San Sebastián"],
    "Extremadura":                       ["Extremadura"],
    "Asturias, Principado de":           ["Picos de Europa"],
    "Aragón":                            ["Teruel"],
    # aliases for other parsers
    "Illes Balears":                     ["Mallorca"],
    "Madrid":                            ["Madrid"],
    "Asturias":                          ["Picos de Europa"],
}

# ── Horizon (Reto 2) integration ──────────────────────────────────────────────
HORIZON_DATA_PATH = os.path.join(
    os.path.dirname(__file__),
    "..", "..", "TUI-Smart-Destination-Recommender", "data", "raw"
)

# Horizon destination_id → Atlas destination name (direct matches only)
HORIZON_TO_ATLAS: dict[str, str] = {
    "D001": "Mallorca",
    "D004": "Tenerife",
    "D007": "Costa del Sol",
    "D010": "Valencia",
    "D013": "Barcelona",
    "D014": "Madrid",
    "D015": "Sevilla",
    "D016": "Granada",
    "D018": "San Sebastián",
    "D019": "Picos de Europa",
}

# Horizon CCAA fallback for Atlas destinations not directly in Horizon
# Atlas destination → list of Horizon IDs to average
HORIZON_CCAA_FALLBACK: dict[str, list[str]] = {
    "Costa Brava":   ["D013"],          # same CCAA as Barcelona
    "Ronda":         ["D007", "D016"],  # Andalucía coastal + cultural
    "Extremadura":   [],                # no equivalent — keep synthetic
    "Teruel":        [],                # no equivalent — keep synthetic
}

# ── AEMET Climate API ─────────────────────────────────────────────────────────
AEMET_BASE    = "https://opendata.aemet.es/opendata/api"
AEMET_API_KEY = os.getenv("AEMET_API_KEY", "")

# AEMET province station IDs (closest main station per destination)
# From AEMET station catalogue — indicativo codes
AEMET_PROVINCE_STATIONS: dict[str, str] = {
    "Barcelona":      "0076",   # Barcelona Aeropuerto
    "Madrid":         "3195",   # Madrid Retiro (referencia oficial)
    "Mallorca":       "B278",   # Palma de Mallorca Aeropuerto
    "Tenerife":       "C447A",  # Tenerife Norte Aeropuerto (C029O era Lanzarote)
    "Sevilla":        "5783",   # Sevilla Aeropuerto
    "Valencia":       "8416",   # Valencia
    "Costa Brava":    "0367",   # Girona Aeropuerto
    "Costa del Sol":  "6155A",  # Málaga Aeropuerto
    "Granada":        "5514",   # Granada Aeropuerto
    "San Sebastián":  "1024E",  # Donostia/San Sebastián Igeldo
    "Ronda":          "6032X",  # Ronda Instituto (6367 no tiene datos mensuales)
    "Extremadura":    "4452",   # Badajoz Aeropuerto (3469A no tiene datos mensuales)
    "Picos de Europa":"1212E",  # Asturias Aeropuerto
    "Teruel":         "8368U",  # Teruel
}

# ── Output paths ──────────────────────────────────────────────────────────────
RAW_DIR       = "data/raw"
PROCESSED_DIR = "data/processed"

# ── Synthetic data config ─────────────────────────────────────────────────────
RANDOM_SEED    = 42
MONTHS         = 40
MARKET_ORIGINS = ["Germany", "UK", "France", "Spain (domestic)", "USA", "Italy", "Netherlands"]
SEASONS        = {1: "low", 2: "low", 3: "shoulder", 4: "shoulder", 5: "shoulder",
                  6: "high", 7: "peak", 8: "peak", 9: "high", 10: "shoulder",
                  11: "low", 12: "low"}
