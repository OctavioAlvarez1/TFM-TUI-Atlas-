# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Project Overview

**Atlas** is a single-page React 19 landing page for a geospatial tourism analytics dashboard, part of the TUI Care Foundation Future Shapers Spain suite. It covers **Reto 3 — AI Dashboard para la Gestión de Oferta Turística Georreferenciada & Integración con Datos Abiertos Externos** (SDG Target 8.9).

- **Stack**: React 19 · TypeScript · Vite · Material UI v9 · Framer Motion
- **Port**: 5175
- **Type**: Landing page (no backend, no routing library — full dashboard implementation is future work)
- **Sibling project**: Horizon (`TUI-Smart-Destination-Recommender`) — shares design system

## Reto 3 — Challenge Definition

Tourism destinations generate enormous amounts of data (accommodations, experiences, transport, events, mobility, climate, sustainability, online reputation, visitor behaviour), but this data is scattered across multiple organisations and systems. The result: destination managers lack a unified, actionable view of what is happening on the territory.

**The challenge**: Build an AI-powered geospatial dashboard that integrates data from multiple sources to support strategic decisions. The system must answer four key questions:
1. ¿Dónde se concentra actualmente la oferta turística?
2. ¿Qué zonas tienen potencial de crecimiento, pero poca visibilidad?
3. ¿Dónde existen riesgos de saturación?
4. ¿Qué oportunidades de inversión o diversificación podemos identificar?

**Example insight**: The system detects that several rural areas have good accessibility, high natural value, and excellent visitor ratings — but barely appear in the commercial offering. This becomes a real opportunity for destination development.

### Dashboard Requirements (from reto brief)
Tool candidates: Power BI, Tableau, Metabase, Grafana, or Streamlit with:
- Interactive maps
- Filters: zone, asset type, tourism category, congestion level, sentiment, accessibility, sustainability, season, issuer market

### Key Metrics
- Densidad de oferta turística y concentración espacial
- Accesibilidad por transporte/tiempo
- Sentimiento promedio y volumen de reseñas
- Hotspots de demanda y zonas infrautilizadas
- Índice de congestión y crecimiento de oferta
- Cobertura ESG y estacionalidad
- Brechas de producto y oportunidades de inversión

### Deliverables (full scope)
- Pipeline ETL funcional
- Modelo de datos documentado
- Base georreferenciada
- Dashboard interactivo
- Mapa de oferta turística
- Motor básico de escenarios
- Sistema de alertas
- Informe estratégico con recomendaciones para el destino

**Current status**: This repo contains the landing page (React). The full dashboard is planned for a future Streamlit/Python implementation in `TUI-Atlas/`.

## Commands

```bash
# From frontend/ directory:
npm install
npm run dev       # Dev server at localhost:5175
npm run build     # TypeScript check + Vite build
npm run lint      # ESLint
npm run preview   # Preview production build
```

## Architecture

Single-page app — no React Router. All sections render top-to-bottom in `App.tsx`.

```
frontend/src/
├── App.tsx                         # Root — renders all sections + Header + Footer
├── main.tsx                        # Entry point — wraps App in ThemeProvider + LanguageProvider
├── index.css                       # Global reset + scrollbar styles
├── theme/
│   ├── darkTheme.ts                # MUI dark palette (primary #0EA5E9, bg #0B1220)
│   ├── lightTheme.ts               # MUI light palette (primary #00A152)
│   └── ThemeProvider.tsx           # Dark/light context + localStorage persistence
├── context/
│   └── LanguageContext.tsx         # EN/ES bilingual support + localStorage persistence
├── locales/
│   ├── en.ts                       # All English strings (source of truth for types)
│   └── es.ts                       # Spanish translations
├── components/
│   ├── layout/
│   │   ├── Header.tsx              # Fixed AppBar — ATLAS logo, greyed nav (Coming Soon tooltip), lang + theme toggle
│   │   └── Footer.tsx              # Full footer — brand, features, technology, project columns
│   ├── common/
│   │   └── ThemeToggle.tsx         # (stub — toggle is embedded in Header)
│   └── sections/
│       ├── HeroSection.tsx         # Dark gradient hero — badge, H1, CTAs, MockDashboardCard
│       ├── MockDashboardCard.tsx   # Glassmorphism card with fake KPIs, line chart, donut chart, AI Insight
│       ├── FeaturesSection.tsx     # 4 feature cards with MUI icons
│       ├── StatsBar.tsx            # 4 large stats (120K+ POIs, 20 destinations, etc.)
│       ├── DashboardPreviewSection.tsx  # 4 dashboard preview cards with fake visualisations
│       ├── KeyQuestionsSection.tsx      # 4 question cards with emoji icons
│       ├── DataSourcesSection.tsx       # 8 data source chips
│       └── HowItWorksSection.tsx        # 4-step flow + CTA card
└── types/
    └── index.ts                    # Shared TypeScript interfaces
```

## Design System

Same as Horizon — see `DESIGN_SYSTEM.md` at the project root.

### MUI v9 — Dark Mode Rules

All color values must use MUI theme tokens in `sx` props:
- Text: `color: "text.primary"` / `color: "text.secondary"`
- Borders: `border: "1px solid"` + `borderColor: "divider"`
- Dynamic backgrounds: use `useTheme()` → `const dark = theme.palette.mode === "dark"`
- Inline `style` (not `sx`): `dark ? "#F1F5F9" : "#0F172A"`
- `InputProps` is deprecated in v9 → use `slotProps={{ input: {...} }}`

### Key Palette

| Token | Value | Usage |
|---|---|---|
| Primary | `#0EA5E9` | Buttons, active states, key highlights |
| Secondary | `#38BDF8` | Hover states, accents |
| bg.default | `#0B1220` | Page background (dark) |
| bg.paper | `#111827` | Card backgrounds (dark) |
| Green | `#10B981` | Sustainability, positive indicators |

## Suite Context

Atlas is **Reto 3** in the TUI Care Foundation 5-project suite:
- See `SUITE.md` for the full suite overview and shared data sources
- See `DESIGN_SYSTEM.md` for shared design patterns and congestion colour scale
- The sibling Horizon project (`TUI-Smart-Destination-Recommender`) is the primary data source

## Important Notes

- **No backend** — this is a pure frontend landing page
- **No React Router** — single page, all sections in one scroll
- All mock data (KPIs, chart values, stats) is hardcoded in locales (`en.ts` / `es.ts`)
- Framer Motion animations use `whileInView` with `viewport={{ once: true }}`
- Dark mode defaults to `true` (page is designed dark-first)
