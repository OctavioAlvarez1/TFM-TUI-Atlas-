# Atlas Landing Page — Design Document

## Overview

Atlas landing page is a single-scroll promotional page for the geospatial tourism analytics dashboard. It is built with React 19, TypeScript, Vite, Material UI v9, and Framer Motion.

All content is bilingual (EN/ES) via `locales/en.ts` and `locales/es.ts`.  
Dev server: `localhost:5175`

## Reto 3 Context

**Challenge**: AI Dashboard para la Gestión de Oferta Turística Georreferenciada & Integración con Datos Abiertos Externos (SDG Target 8.9 — sustainable tourism).

The landing page communicates these four key questions the full dashboard will answer:
1. ¿Dónde se concentra actualmente la oferta turística?
2. ¿Qué zonas tienen potencial de crecimiento pero poca visibilidad?
3. ¿Dónde existen riesgos de saturación?
4. ¿Qué oportunidades de inversión o diversificación podemos identificar?

---

## Visual Identity: Coastal Turquoise

Atlas deliberately breaks from the cold navy + electric-blue palette typical of AI analytics. The hero background photo (Valencia coast, `public/hero-bg.jpg`) drives the entire colour strategy.

### Palette

| Token | Value | Usage |
|---|---|---|
| Card background | `linear-gradient(158deg, rgba(5,62,78,0.97) 0%, rgba(3,44,58,0.95) 100%)` | All dashboard cards, footer (light mode) |
| Turquoise accent | `#0DD3C5` | Labels, borders, icons, active states |
| Coral accent | `#F97316` | "Perspectiva" boxes, warm highlights |
| Sunset bar | `#0DD3C5 → #22D3EE → #818CF8 → #F97316 → #EAB308` | Card header gradient bar |
| Amber warmth | `#EAB308` | Golden highlights, positive indicators |
| Green | `#10B981` | Sustainability, positive KPI trends |
| Red | `#DC2626` | Congestion risk, saturation alerts |
| Orange | `#EA580C` | High congestion |
| Page bg (dark) | `#0B1220` | Dark mode page background |
| Card bg (dark) | `#111827` | Dark mode section backgrounds |

---

## Section Structure

### 1. Header (`components/layout/Header.tsx`)

- Fixed MUI `AppBar` with glassmorphism: `rgba(7,12,22,0.55)` + `backdrop-filter: blur(16px)`
- ATLAS logo (same SVG as Horizon, labelled "ATLAS")
- Navigation items are **disabled** with "Coming Soon" tooltip — communicates landing page status
- Language toggle (US/ES flags) — fully functional
- Dark/light mode toggle — fully functional

### 2. Hero Section (`components/sections/HeroSection.tsx` + `MockDashboardCard.tsx`)

**Background (4 layers, bottom to top):**
1. `/hero-bg.jpg` — Valencia coast photo served from `public/`
2. Horizontal gradient overlay: `linear-gradient(102deg, rgba(4,14,26,0.92) 0% → rgba(4,14,26,0.08) 100%)` — left side dark (readable text), right side reveals photo
3. Warm golden sun glow: `radial-gradient(ellipse at 78% 24%, rgba(234,179,8,0.11))`
4. Amber horizon: `radial-gradient(ellipse at 50% 110%, rgba(249,115,22,0.14))`

**12 floating particles:**
```tsx
animate={{ y: [0, -22, 0], opacity: [0.12, 0.38, 0.12] }}
```
Random x-positions and delays create a "light on water" shimmer effect.

**Left column:**
- Green pill badge: "AI-POWERED TOURISM INTELLIGENCE"
- H1: "AI Dashboards for Smarter Destination Management"
- Subtitle text
- Two scroll CTAs:
  - "Explorar Dashboard" → scrolls to `#dashboard-preview`
  - "Saber más" → scrolls to `#features`

**Right column — Hero Carousel:**
- `MockDashboardCard` showing 5 slides from locale data
- Navigation arrows (◀ ▶) flanking the card
- 5 pagination dots below (active dot elongated)
- Slide 0 (default): overview with donut legend
- Slides 1–4: dashboard-specific content (Oferta, Saturación, Oportunidades, ESG)

**MockDashboardCard coastal aesthetic:**
- Background: `linear-gradient(158deg, rgba(5,62,78,0.97) 0%, rgba(3,44,58,0.95) 100%)`
- Border: `1px solid rgba(13,211,197,0.22)`
- Header: sunset gradient top bar + turquoise label + title chip
- KPI stats: `["#0DD3C5", "#F97316", "#EAB308", "#22D3EE"]` per stat
- AI insight box: coral background `rgba(249,115,22,0.08)`, labelled **"Perspectiva"** (not "AI Insight")
- Perspectiva CTA: scrolls to `#dashboard-preview`

### 3. Features Section (`components/sections/FeaturesSection.tsx`)

- `id="features"` — scroll target
- Light mode: `<GeoDots />` cartographic dot grid background
- 4 cards in responsive grid (4-col lg, 2-col sm, 1-col xs):
  - Card 1: BarChartIcon (#0EA5E9) — Interactive & Real-time
  - Card 2: AutoAwesomeIcon (#10B981) — AI-Powered Insights
  - Card 3: MapIcon (#F59E0B) — Geo-Referenced
  - Card 4: FileDownloadIcon (#6366F1) — Export & Share
- Cards hover-lift with accent border

### 4. Stats Bar (`components/sections/StatsBar.tsx`)

4 large stats on dark background:
- **120K+** POIs monitorizados
- **20** Destinos analizados
- **15+** Fuentes de datos integradas
- **104.3M** Llegadas internacionales (España, 2025)

### 5. Dashboard Preview Section (`components/sections/DashboardPreviewSection.tsx`)

- `id="dashboard-preview"` — scroll target
- Horizontal carousel: 4 cards, active card at 82% width, non-active at 35% opacity + scale(0.975)
- Spring animation: `stiffness: 300, damping: 35`

**CarouselCard coastal identity:**
- Background: `linear-gradient(158deg, rgba(5,62,78,0.97) → rgba(3,44,58,0.95))`
- Active border: `rgba(13,211,197,0.50)` — inactive: `rgba(13,211,197,0.18)`
- Wrapped in `<MuiThemeProvider theme={darkTheme}>` per card
- Header icon + label: `#0DD3C5`
- KPI icons: `#0DD3C5` (positive) / `#F87171` (alerts)
- "Perspectiva" label: `#F97316` (coral), `AutoAwesomeIcon` coral
- Date chip: "Jul 1 – Jul 31, 2026"
- "All Regions" chip: `rgba(13,211,197,0.08)` background

**4 fake visualisations (pure CSS/SVG):**

| Card | Visualisation |
|---|---|
| Oferta Turística Georreferenciada | `FakeHeatmap` — coloured tile grid + horizontal bar chart |
| Demanda & Comportamiento | `FakeDemandViz` — dual line chart (2026/2025) + donut chart |
| Riesgos de Saturación | `FakeRiskViz` — Spain map red/orange bubbles + congestion time series |
| Oportunidades de Crecimiento | `FakeGrowthViz` — Spain map green bubbles + category bar chart |

All chart colours: `#0DD3C5` replaces `#0EA5E9` throughout.

### 6. Key Questions Section (`components/sections/KeyQuestionsSection.tsx`)

- Light mode: `<GeoDots />` background
- 4 question cards with emoji icons:
  - 📍 ¿Dónde se concentra la oferta turística?
  - 📈 ¿Qué zonas tienen potencial de crecimiento?
  - ⚠️ ¿Dónde existen riesgos de saturación?
  - 💼 ¿Qué oportunidades de inversión podemos identificar?
- Card design: semi-transparent gradient background, hover lifts with accent border

### 7. Data Sources Section (`components/sections/DataSourcesSection.tsx`)

8 source cards in a centred flexbox (wraps on mobile):
- OpenStreetMap (green), INE (blue), AEMET (sky), Google (amber)
- Tripadvisor (emerald), Booking.com (indigo), Transportes (orange), + Más (teal)

### 8. How It Works Section (`components/sections/HowItWorksSection.tsx`)

- Light mode: `<GeoDots />` background

**Left — 4-step flow:**
1. 01 Conectamos datos
2. 02 Analizamos con IA
3. 03 Visualizamos insights
4. 04 Decisiones con impacto

**Right — CTA card:**
- Gradient: `rgba(14,165,233,0.08) → rgba(16,185,129,0.05)`
- "Convierte tu destino en un destino inteligente."
- "Solicitar demo →" + "Ver caso de éxito →"

### 9. Footer (`components/layout/Footer.tsx`)

**Light mode:** Wrapped in `<MuiThemeProvider theme={darkTheme}>` → coastal teal background + turquoise top border.
**Dark mode:** Standard `background.paper` (#111827).

4-column layout:
1. **Brand** — ATLAS logo + tagline + description + tags
2. **Features** — 4 feature links
3. **Technology** — 4 tech stack items
4. **Project** — University, description, problem statement box

Bottom bar: "© 2026 Atlas by TUI. All rights reserved." + 3 bottom links.

---

## Animation Strategy

| Context | Framer Motion config |
|---|---|
| Hero elements | `initial+animate` — immediate on load |
| All other sections | `whileInView` + `viewport={{ once: true }}` |
| Card stagger | `delay: i * 0.10` to `i * 0.12` |
| Slide directions | text: `x: -40`, cards: `x: 40`, most: `y: 30` |
| Duration | 0.5–0.7s, `ease: [0.4, 0, 0.2, 1]` |
| Hero particles | `animate={{ y: [0,-22,0], opacity: [0.12,0.38,0.12] }}` |
| Carousel track | spring `stiffness: 300, damping: 35` |

---

## Light Mode Animation: GeoDots

In light mode, white-background sections use an animated cartographic dot grid (`GeoDots.tsx`) to stay visually aligned with the geospatial theme:

```tsx
// Two parallax layers:
// Primary: 36px grid, rgba(0,161,82,0.22), 32s forward drift
// Secondary: 18px grid, rgba(2,132,199,0.10), 18s reverse drift
// CSS mask fades at top/bottom edges
```

CSS keyframe in `index.css`:
```css
@keyframes geoDrift {
  from { background-position: 0px 0px; }
  to   { background-position: 36px 36px; }
}
```

Applied to: FeaturesSection, ProblemSection, KeyQuestionsSection, HowItWorksSection.  
Pattern: outer Box needs `position: "relative", overflow: "hidden"`. Container needs `position: "relative", zIndex: 1`.

---

## Responsive Breakpoints

| Section | xs | sm | md | lg |
|---|---|---|---|---|
| Hero | stacked | stacked | 2-col | 2-col |
| Features | 1-col | 2-col | 2-col | 4-col |
| Stats | 2-col | 2-col | 4-col | 4-col |
| Dashboard Preview | carousel (full width) | ← same → | ← same → | ← same → |
| Key Questions | 1-col | 2-col | 2-col | 4-col |
| How It Works | 1-col | 1-col | 1-col | 2-col |
