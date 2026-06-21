# Solution Architecture and Technical Design

## Atlas — AI Dashboard para la Gestión de Oferta Turística Georreferenciada

---

# 1. Architecture Overview

Atlas follows a two-tier architecture:

```
Tier 1 — Landing Page (IMPLEMENTED)
  React 19 SPA · TypeScript · Vite · Material UI v9
  Communicates vision, previews dashboard, presents analytical framework
  Hosted statically · localhost:5175 in development

Tier 2 — Analytics Dashboard (DESIGNED, PLANNED)
  ETL Pipeline (Python) → Geospatial Data Model → Power BI / Streamlit
  Full interactive geospatial analytics across 20 Spanish destinations
  Planned in TUI-Atlas/ repository
```

The two tiers are designed to be independent deployments that share a visual identity (coastal turquoise design system) and conceptual framework (the 4 key questions).

---

# 2. Landing Page Architecture

## Application Structure

The landing page is a single-page React 19 application. There is no routing library — all sections render top-to-bottom in `App.tsx` and are navigated by anchor scroll.

```
frontend/
├── src/
│   ├── App.tsx                         # Root — renders all sections + Header + Footer
│   ├── main.tsx                        # Entry — wraps App in ThemeProvider + LanguageProvider
│   ├── index.css                       # Global reset, scrollbar styles, keyframe animations
│   ├── theme/
│   │   ├── darkTheme.ts                # MUI dark palette (primary #0DD3C5, bg #0B1220)
│   │   ├── lightTheme.ts               # MUI light palette (primary #00A152)
│   │   └── ThemeProvider.tsx           # Dark/light context + localStorage persistence
│   ├── context/
│   │   └── LanguageContext.tsx         # EN/ES bilingual support + localStorage persistence
│   ├── locales/
│   │   ├── en.ts                       # All English strings (source of truth for types)
│   │   └── es.ts                       # Spanish translations
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx              # Fixed AppBar — ATLAS logo, nav (Coming Soon), toggles
│   │   │   └── Footer.tsx              # 4-column footer — coastal teal in light mode
│   │   ├── common/
│   │   │   └── GeoDots.tsx             # Cartographic dot grid animation (light mode only)
│   │   └── sections/
│   │       ├── HeroSection.tsx         # Photo bg, carousel, particles, scroll CTAs
│   │       ├── MockDashboardCard.tsx   # Coastal card, exports HeroSlide type
│   │       ├── FeaturesSection.tsx     # 4 feature cards with MUI icons
│   │       ├── StatsBar.tsx            # 4 large KPI stats
│   │       ├── DashboardPreviewSection.tsx  # 4-card coastal carousel
│   │       ├── KeyQuestionsSection.tsx      # 4 strategic question cards
│   │       ├── DataSourcesSection.tsx       # 8 data source chips
│   │       └── HowItWorksSection.tsx        # 4-step flow + CTA card
│   ├── types/
│   │   └── index.ts                    # Shared TypeScript interfaces
│   └── assets/
│       └── logo/                       # horizon-logo.svg
├── public/
│   └── hero-bg.jpg                     # Valencia coast photo (static asset)
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## State Management

The application uses React Context for two global state domains:

**ThemeContext** — dark/light mode toggle, persisted to `localStorage`. Defaults to dark (`true`). Consumed by all components via `useTheme()` from MUI.

**LanguageContext** — EN/ES language selection, persisted to `localStorage`. Defaults to English. All copy is loaded from `locales/en.ts` or `locales/es.ts` — no hardcoded strings in components.

## Section Navigation

There is no routing. CTAs scroll to anchor IDs using:
```ts
document.getElementById("dashboard-preview")?.scrollIntoView({ behavior: "smooth" })
```

Anchor IDs:
- `#features` — FeaturesSection
- `#dashboard-preview` — DashboardPreviewSection

## Hero Carousel

The `HeroSection` exports and consumes a `HeroSlide` type (defined in `MockDashboardCard.tsx`). Each slide contains its own KPI stats, AI insight text, and optional donut chart data. Navigation uses `useState` with prev/next wrap-around:

```ts
export interface HeroSlide {
  label: string;
  title: string;
  stats: { label: string; value: string; change?: string }[];
  aiInsight: string;
  aiInsightCta: string;
  donut?: { label: string; pct: string }[];
}
```

The default card (no active slide) shows the overview donut. Slide-specific cards show their own donut or nothing:
```ts
const activeDonut = slide === undefined ? h.donutLegend : slide.donut;
```

---

# 3. Planned Dashboard Architecture

## ETL Pipeline

```
Data Sources (Open APIs + Scraped)
  │
  ├── INE API (EOH Table 49371 — hotel occupancy by province)
  ├── INE API (FRONTUR Table 23988 — international arrivals)
  ├── AEMET API (climate normals, monthly temperature/precipitation)
  ├── OpenStreetMap (Overpass API — POI extraction by category)
  ├── Tripadvisor / Google (sentiment scraping — planned)
  └── Ministerio de Transportes (accessibility data)
  │
  ▼
Extract Layer (Python — extractors/)
  ├── ine_extractor.py       — INE JSON API → Pandas DataFrame
  ├── aemet_extractor.py     — AEMET API → climate DataFrame
  ├── osm_extractor.py       — Overpass API → GeoJSON POIs
  └── sentiment_extractor.py — Review API → sentiment scores
  │
  ▼
Transform Layer (Python — transformers/)
  ├── congestion_transformer.py    — Calculate congestion index (0–100) per destination/month
  ├── offer_density_transformer.py — Spatial join POIs → destination polygons → density score
  ├── opportunity_transformer.py   — Composite opportunity score from 5 dimensions
  ├── esg_transformer.py           — ESG composite from carbon + local business + transport
  └── sentiment_transformer.py     — Aggregate review scores per destination/category
  │
  ▼
Load Layer (Python — loaders/)
  ├── csv_loader.py       — Write processed DataFrames to data/processed/*.csv
  └── geojson_loader.py   — Write spatial data to data/geo/*.geojson
  │
  ▼
Data Store (data/)
  ├── processed/destinations.csv          — 20 destinations with all scores
  ├── processed/congestion_monthly.csv    — 240 records (20 × 12 months)
  ├── processed/offer_density.csv         — POI density per destination/category
  ├── processed/opportunities.csv         — Opportunity rankings
  ├── processed/esg_scores.csv            — ESG indicators per destination
  └── geo/destinations.geojson            — Destination polygons + centroid coordinates
  │
  ▼
Dashboard Layer
  ├── Power BI — 5 interactive pages (primary)
  └── Streamlit — alternative Python dashboard (secondary)
```

## Data Model

| Dataset | Records | Key Fields |
|---|---|---|
| `destinations.csv` | 20 | id, name, region, type, coordinates, accessibility_index |
| `congestion_monthly.csv` | 240 | destination_id, month, occupancy_rate, congestion_index |
| `offer_density.csv` | 20+ | destination_id, category, poi_count, density_score |
| `opportunities.csv` | 20 | destination_id, opportunity_score, gap_score, sentiment, roi_projection |
| `esg_scores.csv` | 20 | destination_id, carbon_score, local_business_pct, transport_access, overall_esg |

Full data model specification in [`docs/04_Data_Model_and_Sources.md`](04_Data_Model_and_Sources.md).

## Dashboard Technology

**Power BI (Primary)** — Interactive reports connecting directly to the processed CSV files. 5 pages covering all analytical dimensions. Filters propagate across visuals. Congestion colour scale consistent with the design system.

**Streamlit (Secondary)** — Python-based alternative dashboard for technical users and development iteration. Uses Folium for interactive maps, Plotly for charts, matching the Power BI colour scheme.

---

# 4. Data Flow

```
External APIs and Open Sources
  │
  ▼ (Python ETL — daily batch)
Processed CSVs + GeoJSON
  │
  ▼ (Power BI / Streamlit connection)
Dashboard Visualisations
  │
  ▼ (User interaction — filters, drill-down)
Destination Manager Decision
```

The landing page operates independently — it uses hardcoded mock data from `locales/en.ts` and `locales/es.ts` to simulate the dashboard interface without requiring a live data connection.

---

# 5. Technology Stack

| Component | Technology | Status |
|---|---|---|
| Landing page framework | React 19 + TypeScript | Implemented |
| Build tool | Vite 8 | Implemented |
| UI components | Material UI v9 | Implemented |
| Animations | Framer Motion | Implemented |
| Internationalisation | Custom React Context (EN/ES) | Implemented |
| Theme system | MUI ThemeProvider (dark/light) | Implemented |
| Static assets | Vite public/ directory | Implemented |
| ETL pipeline | Python + Pandas + GeoPandas | Planned |
| Geospatial processing | GeoPandas + Shapely | Planned |
| Data storage | CSV + GeoJSON (no database) | Planned |
| Primary dashboard | Power BI Desktop | Designed |
| Alternative dashboard | Streamlit + Plotly + Folium | Planned |
| Open data APIs | INE JSON API, AEMET API | Planned |
| POI data | OpenStreetMap Overpass API | Planned |
| Sentiment data | Google / Tripadvisor (scraping) | Planned |

---

# 6. Design System

## Coastal Turquoise Palette

Atlas uses a coastal Mediterranean palette derived from the hero background photo (Valencia coast). This deliberately breaks from the cold navy+electric-blue palette typical of AI analytics products.

| Token | Value | Usage |
|---|---|---|
| Card background | `linear-gradient(158deg, rgba(5,62,78,0.97) → rgba(3,44,58,0.95))` | Dashboard cards, footer (light mode) |
| Turquoise accent | `#0DD3C5` | Borders, labels, icons, active states |
| Coral accent | `#F97316` | "Perspectiva" AI insight boxes, warm highlights |
| Sunset bar | `#0DD3C5 → #22D3EE → #818CF8 → #F97316 → #EAB308` | Card header gradient bar |
| Amber warmth | `#EAB308` | Golden accents, positive indicators |
| Green | `#10B981` | Sustainability, positive KPI trends |
| Page bg (dark) | `#0B1220` | Dark mode page background |
| Card bg (dark) | `#111827` | Dark mode section backgrounds |

## MUI v9 Dark Mode Rules

All interactive sections use MUI theme tokens in `sx` props. Hardcoded hex values are only used for decorative SVG elements and CSS gradient values that cannot accept MUI tokens.

```tsx
// Correct — uses MUI tokens
<Box sx={{ color: "text.primary", borderColor: "divider" }} />

// Correct — conditional for inline style
const dark = theme.palette.mode === "dark";
<div style={{ color: dark ? "#F1F5F9" : "#0F172A" }} />
```

## Dark Section Injection

Sections with dark backgrounds (the coastal teal cards, the footer in light mode) inject `darkTheme` via MUI `ThemeProvider` so all child tokens render correctly:

```tsx
<MuiThemeProvider theme={darkTheme}>
  <CarouselCard ... />
</MuiThemeProvider>
```

This pattern is used in:
- `DashboardPreviewSection` — wraps each `CarouselCard`
- `Footer` — wraps entire footer when `!dark`

## Light Mode Animation

In light mode, white-background sections would appear flat and unrelated to the coastal theme. The `GeoDots` component adds a cartographic dot grid:

```
Primary layer: 36px grid · rgba(0,161,82,0.22) · 32s forward drift
Secondary layer: 18px grid · rgba(2,132,199,0.10) · 18s reverse drift
```

The two-layer parallax effect references the geospatial theme (map coordinate grids) while remaining visually subtle. Applied to FeaturesSection, ProblemSection, KeyQuestionsSection, HowItWorksSection.

---

# 7. Deployment Considerations

## Landing Page

The React SPA builds to a static `dist/` directory and can be deployed to:
- **GitHub Pages** — `npm run build` + push `dist/` to `gh-pages` branch
- **Vercel / Netlify** — Connect repository, set build command `npm run build`, publish dir `frontend/dist`
- **Static hosting** — Any web server capable of serving static files

Build output: ~559KB gzipped JS + ~3KB CSS. Single HTML entry point with asset hashing.

## Full Dashboard

The Power BI dashboard is distributed as a `.pbix` file requiring Power BI Desktop or Power BI Service. The Streamlit alternative can be deployed as a Python application on any server supporting Python 3.11+.

---

# 8. Integration with the Suite

Atlas is **Reto 3** in a 5-project suite. Its primary integration point is with **Horizon** (Reto 2).

## Atlas ← Horizon Data Flow

Horizon generates per-destination scores that Atlas consumes as input data:

| Horizon output | Atlas usage |
|---|---|
| `congestion_scores.csv` (20 × 12 monthly) | Powers Atlas's congestion heatmap and saturation alerts |
| `sustainability_scores.csv` (20 destinations) | Atlas ESG layer baseline scores |
| Destination rankings (by month) | Atlas opportunity scoring for low-congestion, high-potential zones |

This integration means Atlas's congestion and sustainability visualisations are grounded in the same INE EOH and FRONTUR data that Horizon uses for its recommendation penalties and boosts — ensuring analytical consistency across the suite.

## Atlas → Suite Data Flow

The Atlas ETL pipeline will produce enriched geospatial datasets (POI density, accessibility scores, sentiment by zone) that future suite projects (Sentinel, Pathfinder) can consume.
