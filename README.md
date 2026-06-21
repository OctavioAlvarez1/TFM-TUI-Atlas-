# Atlas — Geospatial Tourism Analytics Dashboard

> AI-powered geospatial dashboard for destination managers.  
> Trabajo Final de Máster · Universidad Complutense de Madrid · TUI Care Foundation · Future Shapers Spain

---

## What It Does

Spain received **104.3 million international tourists in 2025**, but destination managers still lack a unified view of what is happening across their territory. Tourism data exists — accommodations, events, mobility, climate, sentiment, sustainability — but it is scattered across dozens of organisations and systems.

**Atlas** answers four strategic questions for destination managers:

1. ¿Dónde se concentra actualmente la oferta turística?
2. ¿Qué zonas tienen potencial de crecimiento pero poca visibilidad?
3. ¿Dónde existen riesgos de saturación?
4. ¿Qué oportunidades de inversión o diversificación podemos identificar?

This repository contains the **React 19 landing page** that communicates the Atlas vision, previews the dashboard interface, and presents the analytical framework. The full geospatial dashboard is planned for implementation in Power BI / Streamlit with a Python ETL pipeline.

---

## Stack

| Layer | Technology |
|---|---|
| Landing Page | React 19 · TypeScript · Vite |
| UI Components | Material UI v9 |
| Animations | Framer Motion |
| Internationalisation | Custom EN/ES context (`locales/en.ts` · `locales/es.ts`) |
| Theme | MUI dark/light with coastal turquoise palette |
| Full Dashboard (planned) | Power BI · Streamlit · Python |
| ETL Pipeline (planned) | Python · Pandas · GeoPandas |
| Open Data | INE (EOH + FRONTUR) · AEMET · OpenStreetMap · Tripadvisor |

---

## Project Structure

```
TUI-Atlas2/
├── frontend/                        # React 19 SPA (landing page)
│   └── src/
│       ├── App.tsx                  # Root — renders all sections
│       ├── main.tsx                 # Entry — ThemeProvider + LanguageProvider
│       ├── theme/                   # darkTheme.ts · lightTheme.ts · ThemeProvider.tsx
│       ├── context/                 # LanguageContext.tsx (EN/ES)
│       ├── locales/                 # en.ts · es.ts (all copy)
│       └── components/
│           ├── layout/              # Header.tsx · Footer.tsx
│           ├── common/              # GeoDots.tsx (cartographic dot grid)
│           └── sections/            # HeroSection · MockDashboardCard · FeaturesSection
│                                    # StatsBar · DashboardPreviewSection · KeyQuestionsSection
│                                    # DataSourcesSection · HowItWorksSection
├── dashboard/                       # Power BI dashboard design
│   ├── README.md                    # Setup guide, DAX measures, colour theme
│   └── pages/                       # P1–P5 page specifications
│       ├── P1_resumen_general.md
│       ├── P2_oferta_y_pois.md
│       ├── P3_saturacion.md
│       ├── P4_oportunidades.md
│       └── P5_sostenibilidad_clima.md
├── docs/                            # Full documentation set (01–07 + design docs)
│   ├── 01_Business_Problem_and_Vision.md
│   ├── 02_Solution_Architecture_and_Technical_Design.md
│   ├── 03_Dashboard_Design.md
│   ├── 04_Data_Model_and_Sources.md
│   ├── 05_Frontend_Architecture.md
│   ├── 06_Business_Case_KPIs_ESG.md
│   ├── 07_Final_Solution_Blueprint.md
│   └── LANDING_PAGE_DESIGN.md
├── etl/                             # ETL pipeline (planned)
├── data/                            # Geospatial datasets (planned)
├── CLAUDE.md                        # Claude Code guidance
├── DESIGN_SYSTEM.md                 # Shared design patterns (suite-wide)
└── SUITE.md                         # 5-project suite overview
```

---

## Quick Start

```bash
cd frontend
npm install
npm run dev        # localhost:5175
npm run build      # TypeScript check + Vite build
npm run lint       # ESLint
```

---

## Landing Page Sections

| Section | Description |
|---|---|
| **Hero** | Full-bleed Valencia coast photo · carousel with 5 dashboard slides · floating particles |
| **Features** | 4 capability cards: Real-time analytics, AI Insights, Geo-Referenced, Export & Share |
| **Stats Bar** | 120K+ POIs · 20 destinations · 15+ data sources · Daily updates |
| **Dashboard Preview** | 4 carousel cards with coastal teal aesthetic showing mock dashboard visualisations |
| **Key Questions** | The 4 strategic questions the dashboard answers |
| **Data Sources** | 8 open data sources: OSM, INE, AEMET, Google, Tripadvisor, Booking.com, Transportes |
| **How It Works** | 4-step flow: Conectamos datos → Analizamos con IA → Visualizamos insights → Decisiones |
| **Footer** | Brand, features, technology, project columns · coastal teal in light mode |

---

## Dashboard Design (Planned — Power BI)

| Page | Content |
|---|---|
| **P1 Resumen General** | Executive KPIs · map with congestion bubbles · visitor time series |
| **P2 Oferta y POIs** | Density map · distribution donut · top 10 destinations bar |
| **P3 Saturación** | Congestion heatmap · traffic light table · temporal series · alerts |
| **P4 Oportunidades** | Scatter plot · opportunity ranking · investment potential |
| **P5 Sostenibilidad y Clima** | ESG ranking · temperature line · radar chart · climate comfort heatmap |

Full specs in [`dashboard/pages/`](dashboard/pages/).

---

## Documentation

| File | Description |
|---|---|
| [`docs/01_Business_Problem_and_Vision.md`](docs/01_Business_Problem_and_Vision.md) | Reto 3 challenge definition, stakeholders, KPIs, use cases |
| [`docs/02_Solution_Architecture_and_Technical_Design.md`](docs/02_Solution_Architecture_and_Technical_Design.md) | Landing page + planned dashboard architecture, data flow |
| [`docs/03_Dashboard_Design.md`](docs/03_Dashboard_Design.md) | 5 Power BI page designs, visualisations, filters |
| [`docs/04_Data_Model_and_Sources.md`](docs/04_Data_Model_and_Sources.md) | Geospatial data model, open data sources, ETL concept |
| [`docs/05_Frontend_Architecture.md`](docs/05_Frontend_Architecture.md) | React SPA component tree, theme system, coastal palette |
| [`docs/06_Business_Case_KPIs_ESG.md`](docs/06_Business_Case_KPIs_ESG.md) | Business case, key metrics, ESG alignment |
| [`docs/07_Final_Solution_Blueprint.md`](docs/07_Final_Solution_Blueprint.md) | Comprehensive TFM blueprint — full solution design |
| [`docs/LANDING_PAGE_DESIGN.md`](docs/LANDING_PAGE_DESIGN.md) | Detailed landing page design reference |
| [`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md) | Shared UI patterns across the TUI suite |
| [`SUITE.md`](SUITE.md) | 5-project suite overview and shared data sources |
| [`dashboard/README.md`](dashboard/README.md) | Power BI setup guide, DAX measures, data model |

---

## Alignment with SDG 8.9

This project is built in response to the TUI Care Foundation's **Future Shapers Spain** challenge (Reto 3 — AI Dashboard para la Gestión de Oferta Turística Georreferenciada), targeting UN SDG 8.9:

> *"By 2030, devise and implement policies to promote sustainable tourism that creates jobs and promotes local culture and products."*

**Targets:**
- Unified geospatial view of tourism offer across 20+ Spanish destinations
- Real-time congestion detection and saturation alerts
- Identification of underutilised zones with investment potential
- ESG and sustainability coverage integrated into destination scoring
- Data-driven decisions for destination managers and tourism authorities

---

## Suite Context

| Project | Reto | Description |
|---|---|---|
| **Horizon** | Reto 2 | AI Smart Destination Recommender — demand redistribution for travelers |
| **Atlas** | Reto 3 | Geospatial Dashboard — supply analytics for destination managers |
| Sentinel | Reto 4 | Sustainability Monitor (planned) |
| Pathfinder | Reto 5 | Route Optimizer (planned) |

Atlas uses Horizon as its primary data source — the recommendation engine's congestion and sustainability scores feed directly into the geospatial visualisations.

---

## License

Academic project — Universidad Complutense de Madrid · 2026.  
Open data: INE (CC BY 4.0), FRONTUR (CC BY 4.0), OpenStreetMap (ODbL).
