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
├── index.css                       # Global reset + scrollbar styles + @keyframes geoDrift
├── theme/
│   ├── darkTheme.ts                # MUI dark palette (primary #0EA5E9, bg #0B1220)
│   ├── lightTheme.ts               # MUI light palette (primary #00A152)
│   └── ThemeProvider.tsx           # Dark/light context + localStorage persistence
├── context/
│   └── LanguageContext.tsx         # EN/ES bilingual support + localStorage persistence
├── locales/
│   ├── en.ts                       # All English strings (source of truth for types) — dates 2026
│   └── es.ts                       # Spanish translations — dates 2026
├── components/
│   ├── layout/
│   │   ├── Header.tsx              # Fixed AppBar — ATLAS logo, greyed nav, lang + theme toggle
│   │   └── Footer.tsx              # Full footer — coastal teal in light mode (darkTheme injection)
│   ├── common/
│   │   └── GeoDots.tsx             # Cartographic dot grid animation — light mode sections only
│   └── sections/
│       ├── HeroSection.tsx         # Photo bg (hero-bg.jpg), carousel, particles, scroll CTAs
│       ├── MockDashboardCard.tsx   # Coastal card — exports HeroSlide type
│       ├── FeaturesSection.tsx     # 4 feature cards + GeoDots in light mode
│       ├── StatsBar.tsx            # 4 large stats (104.3M arrivals 2025, etc.)
│       ├── DashboardPreviewSection.tsx  # Coastal teal carousel cards, "Perspectiva"
│       ├── KeyQuestionsSection.tsx      # 4 question cards + GeoDots in light mode
│       ├── DataSourcesSection.tsx       # 8 data source chips
│       └── HowItWorksSection.tsx        # 4-step flow + CTA card + GeoDots in light mode
└── types/
    └── index.ts                    # Shared TypeScript interfaces
frontend/public/
    └── hero-bg.jpg                 # Valencia coast photo (static asset served by Vite)
```

## Design System

Same as Horizon — see `DESIGN_SYSTEM.md` at the project root.

### Coastal Turquoise Palette (Atlas-specific)

Atlas uses a Mediterranean coastal palette derived from the Valencia coast hero photo. This overrides the cold navy+electric-blue typical of AI products.

| Token | Value | Usage |
|---|---|---|
| Card background | `linear-gradient(158deg, rgba(5,62,78,0.97) 0%, rgba(3,44,58,0.95) 100%)` | Dashboard cards, footer (light mode) |
| Turquoise accent | `#0DD3C5` | Borders, labels, icons, active states |
| Coral accent | `#F97316` | "Perspectiva" AI insight boxes, warm highlights |
| Sunset bar | `#0DD3C5 → #22D3EE → #818CF8 → #F97316 → #EAB308` | Card header gradient |
| Amber | `#EAB308` | Golden highlights |
| Green | `#10B981` | Sustainability, positive KPI trends |
| Page bg (dark) | `#0B1220` | Dark mode page background |
| Card bg (dark) | `#111827` | Dark mode section backgrounds |

### MUI v9 — Dark Mode Rules

All color values must use MUI theme tokens in `sx` props:
- Text: `color: "text.primary"` / `color: "text.secondary"`
- Borders: `border: "1px solid"` + `borderColor: "divider"`
- Dynamic backgrounds: use `useTheme()` → `const dark = theme.palette.mode === "dark"`
- Inline `style` (not `sx`): `dark ? "#F1F5F9" : "#0F172A"`
- `InputProps` is deprecated in v9 → use `slotProps={{ input: {...} }}`

### Dark Section Injection

Sections with coastal teal backgrounds inject `darkTheme` via a nested `MuiThemeProvider` so all child MUI tokens render as white text:

```tsx
// DashboardPreviewSection — wraps each CarouselCard
<MuiThemeProvider theme={darkTheme}>
  <CarouselCard ... />
</MuiThemeProvider>

// Footer — wraps entire footer when in light mode
return dark ? footer : <MuiThemeProvider theme={darkTheme}>{footer}</MuiThemeProvider>;
```

### HeroSlide Type (carousel)

`MockDashboardCard.tsx` exports `HeroSlide`. `HeroSection.tsx` imports it as a `type`:

```ts
export interface HeroSlide {
  label: string; title: string;
  stats: { label: string; value: string; change?: string }[];
  aiInsight: string; aiInsightCta: string;
  donut?: { label: string; pct: string }[];
}
// Donut fallback: slide === undefined → show overview donut; slide defined → show slide.donut
const activeDonut = slide === undefined ? h.donutLegend : slide.donut;
```

### GeoDots (light mode animation)

Light mode sections use `<GeoDots />` for a cartographic dot grid parallax effect:
- Added to: FeaturesSection, ProblemSection, KeyQuestionsSection, HowItWorksSection
- Pattern: `{!dark && <GeoDots />}` inside outer Box, requires `position: "relative", overflow: "hidden"` on outer Box
- Container needs `position: "relative", zIndex: 1`
- CSS keyframe `geoDrift` defined in `index.css`

### Scroll Navigation

CTA buttons scroll to anchor IDs:
```ts
document.getElementById("dashboard-preview")?.scrollIntoView({ behavior: "smooth" })
document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })
```
- `id="dashboard-preview"` on `DashboardPreviewSection` outer Box
- `id="features"` on `FeaturesSection` outer Box
- "Perspectiva" CTA in `MockDashboardCard` also scrolls to `#dashboard-preview`

### Mock Data Dates

All mock data references updated to 2026 / 2025:
- Dashboard date chips: "Jul 1 – Jul 31, 2026"
- Chart legends: 2026 (current year) / 2025 (prior year)
- Stats bar: 104.3M arrivals (Spain, 2025)
- Copyright: © 2026 Atlas by TUI

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
- Hero background uses `public/hero-bg.jpg` (Valencia coast photo — static asset served by Vite)
