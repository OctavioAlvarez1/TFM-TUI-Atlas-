# Final Solution Blueprint

Document 07 – Final Solution Blueprint  
Atlas — AI Dashboard para la Gestión de Oferta Turística Georreferenciada  
Trabajo Final de Máster · Universidad Complutense de Madrid  
TUI Care Foundation · Future Shapers Spain · Reto 3  
Version 1.0 · June 2026

---

## Purpose

This document provides the consolidated blueprint of the Atlas solution. It summarises the business challenge, proposed architecture, data strategy, analytical framework, dashboard design, sustainability approach, and future roadmap.

The objective is to present a comprehensive, enterprise-grade AI analytics platform capable of supporting evidence-based destination management, reducing tourism over-concentration, and enabling data-driven sustainable tourism development across Spain.

---

## 1. Executive Summary

Spain's tourism destinations generate enormous amounts of data daily — from hotel occupancy and visitor mobility to online reviews and sustainability indicators. Yet destination managers, the professionals responsible for planning and developing these territories, operate without a unified, real-time view of this information. The data exists; the integration does not.

**Atlas** addresses this structural gap through an AI-powered geospatial analytics platform that integrates multi-source tourism data into a single, interactive dashboard. The platform answers four strategic questions that destination managers cannot currently answer from any single source:

1. ¿Dónde se concentra actualmente la oferta turística?
2. ¿Qué zonas tienen potencial de crecimiento pero poca visibilidad?
3. ¿Dónde existen riesgos de saturación?
4. ¿Qué oportunidades de inversión o diversificación podemos identificar?

The Atlas MVP as of June 2026 consists of:
- A **React 19 landing page** fully built and operational, communicating the platform vision, demonstrating the dashboard interface through interactive mock visualisations, and presenting the full analytical framework
- **Complete Power BI dashboard specifications** for 5 interactive pages (designed and documented in `dashboard/pages/`)
- A **data architecture specification** covering the geospatial data model, ETL pipeline design, and integration with 8 open data sources
- A **suite integration design** connecting Atlas to Horizon (Reto 2) for cross-project data sharing

The full dashboard implementation (ETL pipeline + Power BI deployment) is planned for Phase 2.

---

## 2. Business Challenge

### The Over-Concentration Problem

Spain received 104.3 million international tourists in 2025. Approximately 85% of these visitors concentrated in 10% of the country's destinations — Barcelona, Madrid, Mallorca, Ibiza, Tenerife, Costa del Sol, and a handful of other established hotspots. This creates simultaneous, connected crises:

**For saturated destinations:**
- Infrastructure operates beyond sustainable capacity during peak months
- Resident quality of life deteriorates (housing costs, noise, waste, crowding)
- Natural and cultural heritage face irreversible damage from excessive footfall
- Visitor satisfaction declines as the experience quality they came for disappears

**For under-visited destinations:**
- Investment capital bypasses zones with genuine tourism potential
- Local communities receive no economic benefit from national tourism growth
- Infrastructure built for potential demand sits underutilised
- Tourism revenue concentrates in already-wealthy regions

### The Data Fragmentation Problem

The information needed to manage this imbalance exists — but it is fragmented across incompatible systems:

- Hotel occupancy data (INE EOH) updates monthly, by province, in a JSON API
- Visitor arrival statistics (FRONTUR) cover international arrivals by region, also monthly
- Climate and comfort data (AEMET) is available by weather station but requires geocoding to destinations
- POI supply data (OpenStreetMap) is free and comprehensive but requires Overpass API extraction and category normalisation
- Visitor sentiment (Google, Tripadvisor, Booking.com) is locked in proprietary platforms with varying API access
- Transport accessibility data (Ministerio de Transportes) exists in open data portals but in unlinked formats

No single tool currently integrates all these sources into a geospatial, filterable, real-time view for destination managers. This is the market gap Atlas fills.

### Opportunity for TUI

TUI's position in the European tourism market — with access to booking data, accommodation networks, and traveler preference data — makes it uniquely positioned to add proprietary intelligence on top of the open data foundation. By building Atlas as the analytics layer for destination management, TUI creates:

- A platform that makes TUI an indispensable partner for tourism authorities
- An intelligence advantage in identifying and developing secondary destinations before competitors
- An ESG reporting capability that positions TUI as a sustainable tourism leader
- A data layer that feeds and validates the Horizon recommendation engine, strengthening the entire suite

---

## 3. Solution Vision

Atlas introduces a new generation of destination management intelligence.

The platform combines:
- **Geospatial analytics** — every metric anchored to a physical location on a map
- **Multi-source integration** — 8 open data sources unified through a Python ETL pipeline
- **AI-powered opportunity detection** — composite scoring that finds hidden gems automatically
- **Real-time congestion monitoring** — early warning before saturation becomes a crisis
- **ESG as a first-class dimension** — sustainability embedded in every analytical view
- **Suite intelligence** — integrated with Horizon's demand-side engine for full supply-demand analytics

The result is a platform that benefits destination managers, tourism authorities, investment analysts, and the traveler ecosystem simultaneously.

---

## 4. Solution Components

The platform consists of five major components — the first two implemented, the remaining three designed and planned.

```
Open Data Sources (INE · AEMET · OSM · Sentiment APIs)
  │
  ▼
ETL Pipeline (Python — extractors/ transformers/ loaders/)   [PLANNED]
  │
  ▼
Geospatial Data Model (CSV + GeoJSON — data/processed/)      [DESIGNED]
  │
  ▼
Analytics Dashboard (Power BI 5 pages + Streamlit)           [DESIGNED]
  │
  ▼
Landing Page (React 19 SPA — frontend/)                      [IMPLEMENTED]
```

Each component is fully documented. The landing page and data model specifications are the deliverables of this TFM phase. The ETL pipeline and dashboard will be implemented in Phase 2.

---

## 5. Data Foundation

### Core Datasets

| File | Description | Records |
|---|---|---|
| `destinations.csv` | 20 Spanish destinations with coordinates, type, accessibility index | 20 |
| `congestion_monthly.csv` | Monthly congestion pressure (0–100) per destination | 240 |
| `offer_density.csv` | POI count and density score per destination and category | 100 |
| `opportunities.csv` | Composite opportunity score per destination | 20 |
| `esg_scores.csv` | 5-dimension ESG profile per destination | 20 |
| `sentiment.csv` | Aggregated visitor ratings by platform and category | 80+ |
| `destinations.geojson` | Destination polygon boundaries and centroid points | 20 |

### Open Data Sources

| Source | Data | License |
|---|---|---|
| INE EOH Table 49371 | Monthly hotel occupancy by province | CC BY 4.0 |
| INE FRONTUR Table 23988 | International arrivals by autonomous community | CC BY 4.0 |
| AEMET Open Data | Climate normals, monthly temperature/precipitation | AEMET terms |
| OpenStreetMap Overpass API | POIs by category, administrative boundaries | ODbL |
| Google / Tripadvisor / Booking.com | Visitor reviews, ratings, sentiment (planned) | API terms |
| Ministerio de Transportes | Road/rail accessibility data (planned) | CC BY 4.0 |

### Integration with Horizon

Atlas shares the INE EOH and FRONTUR data processing pipeline with Horizon (Reto 2). The congestion scores and sustainability scores calculated by Horizon's Python engine can be consumed directly by Atlas, ensuring both projects work from identical underlying metrics:

- Horizon's `congestion_scores.csv` → Atlas `congestion_monthly.csv` (same base data, Atlas adds spatial aggregation)
- Horizon's `sustainability_scores.csv` → Atlas `esg_scores.csv` (Horizon's overall score = Atlas `overall_esg_score`)

---

## 6. Analytical Framework

### The Four Strategic Questions

**Q1: ¿Dónde se concentra actualmente la oferta turística?**

Answered through the **Oferta y POIs** dashboard page:
- Density heatmap showing POI concentration at zone level within each destination
- Distribution donut by category (Hotels / Restaurants / Experiences / Attractions)
- Top 10 destinations ranked by total offer supply
- Filters by category, density range, and region

**Q2: ¿Qué zonas tienen potencial de crecimiento pero poca visibilidad?**

Answered through the **Oportunidades de Crecimiento** dashboard page:
- Opportunity scatter plot (X: current density, Y: demand growth potential, size: accessibility)
- Opportunity map with green bubbles on high-potential, low-visibility zones
- Investment opportunity score combining 5 dimensions
- Recommended development category per zone

**Q3: ¿Dónde existen riesgos de saturación?**

Answered through the **Riesgos de Saturación** dashboard page:
- Congestion heatmap across all 20 destinations by month
- Traffic light status table with trend indicators
- Automated alerts for zones exceeding congestion threshold (> 80/100)
- Temporal series for any destination showing 12-month congestion trend

**Q4: ¿Qué oportunidades de inversión o diversificación podemos identificar?**

Answered through the **Oportunidades** page (investment dimension) and the **Resumen General** page (portfolio view):
- ROI projection per opportunity zone
- Gap analysis: current supply vs latent demand
- Investment ranking table with filtering
- Category-specific opportunity breakdown (Ecoturismo, Rural, Cultural, Gastronómica)

### Opportunity Score Formula

The core analytical innovation of Atlas. Combines five independent dimensions into a single, actionable score:

```
Opportunity Score = 
  0.30 × (100 − Offer Density)     // Commercially underserved
+ 0.25 × Sentiment Score           // Visitors already like it
+ 0.20 × Accessibility Index       // Reachable
+ 0.15 × Natural/Cultural Value    // Intrinsic attraction
+ 0.10 × (100 − Congestion Index)  // Not yet saturated
```

A destination that scores high on all five dimensions is a genuine "hidden gem" — underserved commercially, well-regarded by visitors, accessible, intrinsically attractive, and with plenty of capacity headroom. These are the investment opportunities the system surfaces automatically.

### Congestion Index Formula

```
Congestion Index = 
  0.60 × normalise(hotel_occupancy_rate) +
  0.40 × normalise(international_arrivals)
```

Values normalised to 0–100 within each destination's historical range. Threshold levels: Low (0–30) · Moderate (31–60) · High (61–80) · Very High (81–100).

---

## 7. Dashboard Architecture

### Five-Page Power BI Dashboard

| Page | Primary Question | Key Visualisations |
|---|---|---|
| P1 — Resumen General | Portfolio health overview | KPI cards · congestion bubble map · visitor time series |
| P2 — Oferta y POIs | Where is the supply? | Density heatmap · distribution donut · top 10 bar |
| P3 — Saturación | Where are the risks? | Congestion choropleth · traffic light table · time series · alerts |
| P4 — Oportunidades | Where to invest? | Opportunity scatter · map · ranking table · investment cards |
| P5 — Sostenibilidad | How sustainable? | ESG ranking · radar chart · temperature line · climate heatmap |

### Common Design Principles

- **Cross-page filter propagation** — selecting a destination on any page updates all pages
- **Congestion colour scale** — consistent Green/Amber/Orange/Red across all pages
- **Coastal turquoise identity** — consistent with the landing page palette
- **Mobile-responsive** — Power BI responsive layout for tablet access by field teams

### Streamlit Alternative

A Streamlit-based Python dashboard provides:
- Folium interactive maps matching the Power BI choropleth design
- Plotly charts with matching colours and annotations
- Pandas DataFrames displayed with conditional background gradients
- Useful for development iteration and technical stakeholders

---

## 8. Landing Page Implementation

The React 19 landing page is the fully implemented deliverable of this TFM phase. It serves as a functional prototype of the Atlas vision.

### Visual Identity: Coastal Turquoise

The landing page deliberately avoids the cold navy + electric blue palette typical of AI analytics products. Instead, it uses a coastal Mediterranean palette inspired by the Valencia coast hero photo:

| Element | Value |
|---|---|
| Card backgrounds | `linear-gradient(158deg, rgba(5,62,78,0.97) → rgba(3,44,58,0.95))` |
| Primary accent | `#0DD3C5` (turquoise) |
| Secondary accent | `#F97316` (coral) |
| Sunset bar | `#0DD3C5 → #22D3EE → #818CF8 → #F97316 → #EAB308` |

This palette will carry through to the full dashboard — creating a distinctive, recognisable Atlas brand that communicates the coastal, Mediterranean character of Spain's tourism destinations.

### Hero Section

Full-bleed Valencia coast photo with horizontal gradient overlay that reveals more of the photo on the right side (where the dashboard card is) while keeping the left (text) side readable. Twelve floating particles with `animate={{ y: [0,-22,0], opacity: [0.12,0.38,0.12] }}` create a "light on water" shimmer effect.

Five carousel slides cycle through different dashboard views (Overview, Oferta, Saturación, Oportunidades, ESG), each with its own KPIs, AI insight text, and donut chart.

### Dashboard Preview

Four carousel cards use the coastal teal card background, matching the hero `MockDashboardCard`. Each card shows a pure CSS/SVG fake visualisation (no chart libraries required) of one dashboard page. The carousel allows peeking at adjacent cards with opacity/scale transitions.

### Bilingual Support

Full EN/ES internationalisation with `localStorage` persistence. All copy (including mock data values, KPI labels, AI insight text, date chips) maintained in `locales/en.ts` and `locales/es.ts`.

---

## 9. Technology Stack

### Implemented (Landing Page)

| Layer | Technology | Version |
|---|---|---|
| Framework | React | 19 |
| Language | TypeScript | 5.x |
| Build tool | Vite | 8.x |
| UI library | Material UI | v9 |
| Animations | Framer Motion | 12.x |
| i18n | Custom React Context | — |
| Dev server | Vite | Port 5175 |

### Planned (Full Dashboard)

| Layer | Technology | Purpose |
|---|---|---|
| ETL | Python 3.11 + Pandas + GeoPandas | Data extraction and transformation |
| Geospatial | Shapely + Folium | Spatial operations and map rendering |
| Open data | INE JSON API + AEMET REST API | Live data feeds |
| POI data | OpenStreetMap Overpass API | Supply data extraction |
| Dashboard | Power BI Desktop | Primary interactive dashboard |
| Alternative | Streamlit + Plotly | Python-based alternative view |
| Deployment | Static hosting (landing) + Power BI Service | Production delivery |

---

## 10. Responsible AI and Data Ethics

### Data Privacy

All data used in Atlas is:
- **Open public data** (INE, AEMET, OSM) — licensed for reuse
- **Aggregated** — no individual visitor tracking or personal data processing
- **GDPR-compliant** — no personal identifiers; all analysis at destination/zone level

### Algorithmic Transparency

The Opportunity Score formula is fully documented and reproducible:
- Every weight is explicitly defined and justified
- The score breakdown per dimension is visible in the dashboard
- Destination managers can understand and challenge any specific recommendation

### Avoiding Harm

The congestion alert system is designed to support intervention, not to stigmatise destinations. Alerts are framed constructively ("this zone has capacity to redirect demand") rather than punitively. The ESG framework measures improvement trajectory, not just current state.

### Sustainable by Design

Atlas does not recommend development in environmentally sensitive zones regardless of economic opportunity score. When `natural_value_index > 85`, the system flags the zone as Protected and excludes it from investment opportunity rankings, regardless of other scores.

---

## 11. Future Roadmap

| Phase | Status | Description |
|---|---|---|
| Phase 1 — Design and Landing Page | ✅ COMPLETED | Business design, data architecture, dashboard specifications, React 19 landing page fully built |
| Phase 2 — ETL Pipeline and Dashboard | ⏳ PLANNED | Python ETL pipeline, geospatial data model population, Power BI dashboard deployment |
| Phase 3 — Real-Time Data Integration | ⏳ PLANNED | Automated INE/AEMET/OSM refresh, sentiment API integration, daily data pipeline |
| Phase 4 — ML Enhancement | ⏳ PLANNED | Predictive congestion modelling, ML-based opportunity scoring, anomaly detection |
| Phase 5 — Gen AI Insights | ⏳ PLANNED | Natural language querying of the dashboard, automated insight narrative generation, proactive alert summaries |

### Phase 2 Detail — ETL and Dashboard

**Python ETL pipeline:**
```
extractors/ine_extractor.py        → INE API (EOH + FRONTUR)
extractors/aemet_extractor.py      → AEMET climate API
extractors/osm_extractor.py        → OpenStreetMap Overpass
transformers/congestion_transformer.py → Congestion index calculation
transformers/opportunity_transformer.py → Opportunity score calculation
transformers/esg_transformer.py    → ESG composite scoring
loaders/csv_loader.py              → Output to data/processed/
```

**Power BI:**
- Connect to `data/processed/*.csv` and `data/geo/*.geojson`
- Implement 5 pages per specification in `dashboard/pages/`
- Apply Atlas colour theme and congestion colour scale
- Publish to Power BI Service for web access

### Phase 4 Detail — ML Enhancement

Potential models:
- **Gradient Boosting (XGBoost/LightGBM)** for congestion prediction: predict next-month congestion index from historical occupancy, seasonal patterns, and event calendar
- **Clustering (K-Means / DBSCAN)** for destination segmentation: automatically group destinations by profile similarity
- **Anomaly Detection** for early saturation alerts: flag statistically anomalous congestion spikes before thresholds are crossed

### Phase 5 Detail — Generative AI

Capabilities:
- Natural language querying: "Show me coastal destinations with high sentiment but low congestion in July"
- Automated narrative: "This week, 3 destinations crossed the congestion threshold. The most critical is X, with a 12% increase in occupancy vs the same month last year."
- Investment brief generation: 1-page opportunity profiles generated automatically for any high-scoring destination

---

## 12. Suite Integration

Atlas is **Reto 3** in a 5-project suite designed to address Spain's tourism sustainability challenges holistically. The projects are complementary, not independent:

```
Horizon (Reto 2) — Demand Side
  Recommends sustainable destinations to travelers
  Generates: congestion scores, sustainability scores, user preference data
  │
  ▼ (feeds Atlas)
Atlas (Reto 3) — Supply Side
  Gives destination managers the data to develop their territories
  Generates: opportunity rankings, ESG scores, density maps
  │
  ▼ (feeds future projects)
Sentinel (Reto 4) — Sustainability Monitor (planned)
  Tracks environmental impact metrics at destination level
  │
  ▼
Pathfinder (Reto 5) — Route Optimizer (planned)
  Optimises traveler routes to distribute footfall within destinations
```

When Horizon identifies a destination as low-congestion and high-sustainability and recommends it to travelers, Atlas tells the destination manager: "demand is coming — here's exactly where to invest to receive it." The two projects create a virtuous cycle: demand redistribution backed by supply intelligence.

---

## 13. Conclusion

**Atlas** represents an enterprise-grade geospatial analytics platform designed to transform how Spain's tourism destinations are managed, developed, and sustained.

The platform addresses a genuinely structural problem — tourism data fragmentation — with a concrete technical solution: a Python ETL pipeline that integrates 8 open data sources into a unified geospatial model, visualised across 5 Power BI dashboard pages with AI-powered opportunity detection and real-time congestion monitoring.

The MVP deliverable for this TFM phase is the React 19 landing page — fully built, bilingual, with a coastal turquoise visual identity that previews the full dashboard and communicates the analytical framework to stakeholders. The dashboard design, data architecture, and integration specifications are complete and ready for Phase 2 implementation.

By combining geospatial intelligence, multi-source data integration, AI opportunity detection, ESG measurement, and suite integration with Horizon's demand-side engine, Atlas positions TUI as the data intelligence partner for sustainable destination management in Spain.

The solution aligns directly with SDG 8.9, contributes to the TUI Care Foundation's Future Shapers Spain mission, and demonstrates how AI can be applied not just to improve traveler experience — but to protect and develop the destinations that make that experience possible.
