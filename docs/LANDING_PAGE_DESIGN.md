# Atlas Landing Page — Design Document

## Overview

Atlas landing page is a single-scroll promotional page for the geospatial tourism analytics dashboard. It is built with React 19, TypeScript, Vite, Material UI v9, and Framer Motion.

All content is bilingual (EN/ES) via `locales/en.ts` and `locales/es.ts`.

## Reto 3 Context

**Challenge**: AI Dashboard para la Gestión de Oferta Turística Georreferenciada & Integración con Datos Abiertos Externos (SDG Target 8.9 — sustainable tourism).

Tourism destinations generate enormous amounts of data (accommodations, experiences, transport, events, mobility, climate, sustainability, online reputation, visitor behaviour), but this data is scattered across multiple organisations and systems. Destination managers lack a unified, actionable view of the territory.

The landing page communicates these four key questions the full dashboard will answer:
1. ¿Dónde se concentra actualmente la oferta turística?
2. ¿Qué zonas tienen potencial de crecimiento pero poca visibilidad?
3. ¿Dónde existen riesgos de saturación?
4. ¿Qué oportunidades de inversión o diversificación podemos identificar?

The full dashboard implementation (planned) will use Power BI / Streamlit with interactive maps, ETL pipeline, and a geospatial database across 20 Spanish destinations. See `CLAUDE.md` for the full list of deliverables and metrics from the reto brief.

---

## Section Structure

### 1. Header (`components/layout/Header.tsx`)

**Design decisions:**
- Identical to Horizon — same glassmorphism AppBar (`rgba(7,12,22,0.55)`, `backdrop-filter: blur(16px)`)
- Logo is the same SVG but labelled "ATLAS" instead of "HORIZON"
- Navigation items (Destinations, Insights, Analytics, About) are **disabled** with MUI `Tooltip` showing "Coming Soon" — this communicates that Atlas is a landing page, not a full app
- Language toggle (US/ES flags) fully functional
- Dark/light mode toggle fully functional

### 2. Hero Section (`components/sections/HeroSection.tsx` + `MockDashboardCard.tsx`)

**Layout:** Two-column grid on md+ (text left, card right), stacked on mobile.

**Left column:**
- Green pill badge: "AI-POWERED TOURISM INTELLIGENCE"
- H1: "AI Dashboards for Smarter Destination Management"
- Subtitle text
- Two CTAs: primary filled button + outlined button

**Right column:**
- `MockDashboardCard` — glassmorphism card (`rgba(17,24,39,0.85)`, `backdrop-filter: blur(20px)`)
- Navigation arrows (◀ ▶) using `IconButton` flanking the card
- 5 pagination dots below (first active, elongated)

**Background:**
- `linear-gradient(160deg, #070C16 0%, #0F1A2E 100%)`
- Two radial accent blobs (blue at 70%/40%, green at 20%/80%)

**MockDashboardCard contents:**
1. Header: "OVERVIEW" chip + "Tourism Offer & Demand" title + region/date chips
2. 4 KPI boxes in 2×2 grid (Total Arrivals, Hotel Occupancy, Avg. Daily Rate, Sustainability Score)
3. Fake line chart — SVG bezier path + gradient fill + x-axis labels
4. Fake donut chart — SVG circles + legend with 5 regions
5. AI Insight teal banner — Chip + text + "View Recommendations →" button

**Animations:** `motion.div` with `initial+animate` (not `whileInView`) since hero is visible on load.

### 3. Features Section (`components/sections/FeaturesSection.tsx`)

**4 cards** in a responsive grid (4 cols on lg, 2 on sm, 1 on xs):
- Card 1: BarChartIcon (#0EA5E9) — Interactive & Real-time
- Card 2: AutoAwesomeIcon (#10B981) — AI-Powered Insights
- Card 3: MapIcon (#F59E0B) — Geo-Referenced
- Card 4: FileDownloadIcon (#6366F1) — Export & Share

**Card design:** `bgcolor: "background.paper"`, border with `divider` color, hover lifts 4px and changes border to accent color.

### 4. Stats Bar (`components/sections/StatsBar.tsx`)

**4 large stats** on `#070C16` background:
- 120K+ POIs monitorizados
- 20 Destinos analizados
- 15+ Fuentes de datos integradas
- Actualización diaria / Daily

**Design:** Centred text, large value in `#38BDF8`, smaller label in `rgba(255,255,255,.55)`.

### 5. Dashboard Preview Section (`components/sections/DashboardPreviewSection.tsx`)

**4 cards** showing mock dashboard visualisations:

| Card | Visualisation | Stats |
|---|---|---|
| Oferta Turística Georreferenciada | Fake heatmap (coloured tile grid) | Hotels, Restaurants, Experiences, Attractions |
| Demanda & Comportamiento | Fake dual line chart + mini donut | Parejas 38%, Familias 27%, Amigos 20%, Solitarios 15% |
| Riesgos de Saturación | Fake Spain map with red/orange blobs | Critical zones 12, Congestion 78/100, Variation +14% |
| Oportunidades de Crecimiento | Fake Spain map with green blobs | Potential zones 23, Investment 134M€, ROI +26% |

All visualisations are pure CSS/SVG — no chart libraries.

### 6. Key Questions Section (`components/sections/KeyQuestionsSection.tsx`)

4 question cards with emoji icons:
- 📍 Offer concentration
- 📈 Growth potential
- ⚠️ Saturation risk
- 💼 Investment opportunities

**Design:** Semi-transparent cards on `#070C16`, hover lifts and adds blue border.

### 7. Data Sources Section (`components/sections/DataSourcesSection.tsx`)

8 source cards in a centered flexbox row (wraps on mobile):
- OpenStreetMap (green), INE (blue), AEMET (sky), Google (amber), Tripadvisor (emerald), Booking.com (indigo), TRANSPORTES (orange), + Más (teal)

Each card: dot indicator in source color, name, type label. Hover changes border to source color.

### 8. How It Works Section (`components/sections/HowItWorksSection.tsx`)

**Left:** 4-step numbered flow in a responsive grid:
1. 01 Conectamos datos
2. 02 Analizamos con IA
3. 03 Visualizamos insights
4. 04 Decisiones con impacto

Each step: numbered circle with step color + title + description. Arrow connectors between steps (desktop only).

**Right:** CTA card with gradient background (`rgba(14,165,233,0.12)` to `rgba(16,185,129,0.08)`):
- Title: "Convierte tu destino en un destino inteligente."
- Subtitle text
- Primary button: "Solicitar demo →"
- Text link: "Ver caso de éxito →"

### 9. Footer (`components/layout/Footer.tsx`)

4-column footer on `#070C16`:
1. **Brand** — ATLAS logo + tagline + description + tags (TUI Care Foundation, Reto 3, Future Shapers Spain)
2. **Features** — 4 feature links
3. **Technology** — 4 tech stack items
4. **Project** — University, description, problem statement box

Bottom bar: copyright + 3 bottom links.

---

## Animation Strategy

- **Hero elements**: `initial+animate` (immediate, no scroll trigger)
- **All other sections**: `whileInView` + `viewport={{ once: true }}` (animate once on scroll)
- **Stagger**: `delay: i * 0.08` to `i * 0.12` for card/item arrays
- **Slide directions**: text from left (`x: -40`), card from right (`x: 40`), most elements from bottom (`y: 30`)
- **Duration**: 0.5–0.7s with `easeOut`

---

## Responsive Breakpoints

| Section | xs | sm | md | lg |
|---|---|---|---|---|
| Hero | stacked | stacked | 2-col | 2-col |
| Features | 1-col | 2-col | 2-col | 4-col |
| Stats | 2-col | 2-col | 4-col | 4-col |
| Dashboard Preview | 1-col | 2-col | 2-col | 4-col |
| Key Questions | 1-col | 2-col | 2-col | 4-col |
| How It Works | 1-col | 1-col | 1-col | 2-col |

---

## Colour Palette Used

| Purpose | Value |
|---|---|
| Hero background (dark end) | `#070C16` |
| Hero background (mid) | `#0F1A2E` |
| Section background (alt) | `#0B1220` |
| Section background (dark) | `#070C16` |
| Primary accent | `#0EA5E9` |
| Secondary accent | `#38BDF8` |
| Green (sustainability) | `#10B981` |
| Amber (moderate) | `#F59E0B` |
| Indigo (AI/features) | `#6366F1` |
| Red (risk/saturation) | `#DC2626` |
| Orange (high pressure) | `#EA580C` |
| Teal (AI insight) | `#14B8A6` |
