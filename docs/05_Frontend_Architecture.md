# Frontend Architecture

## Atlas Landing Page — React 19 SPA

---

# 1. Overview

The Atlas landing page is a single-page React 19 application built with TypeScript, Vite, and Material UI v9. It has no backend, no routing library, and no external API calls — all content is delivered from hardcoded locale files that simulate the dashboard data.

The application serves two purposes:
1. **Stakeholder communication** — conveys the Atlas vision, demonstrates the dashboard interface, and presents the analytical framework.
2. **Design prototype** — validates the coastal turquoise visual identity that will carry through to the full dashboard implementation.

**Dev server:** `localhost:5175`  
**Build:** Vite 8, output to `frontend/dist/`  
**Bundle size:** ~559KB gzipped JS

---

# 2. Entry Point and Providers

## main.tsx

```tsx
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>        // MUI dark/light + localStorage
      <LanguageProvider>   // EN/ES + localStorage
        <App />
      </LanguageProvider>
    </ThemeProvider>
  </React.StrictMode>
);
```

## App.tsx

Renders all sections top-to-bottom with no routing:

```tsx
const App = () => (
  <>
    <Header />
    <HeroSection />
    <FeaturesSection />
    <StatsBar />
    <ProblemSection />
    <DashboardPreviewSection />
    <KeyQuestionsSection />
    <DataSourcesSection />
    <HowItWorksSection />
    <Footer />
  </>
);
```

---

# 3. Theme System

## darkTheme.ts

Primary theme. Defaults on first load.

```ts
palette: {
  mode: "dark",
  primary: { main: "#0EA5E9", dark: "#0284C7" },
  background: { default: "#0B1220", paper: "#111827" },
}
```

Note: while the theme primary is `#0EA5E9`, interactive coastal sections override with `#0DD3C5` directly in component `sx` props to achieve the turquoise aesthetic.

## lightTheme.ts

```ts
palette: {
  mode: "light",
  primary: { main: "#00A152" },
  background: { default: "#F8FAFC", paper: "#FFFFFF" },
}
```

## ThemeProvider.tsx

Wraps the app in MUI `ThemeProvider`. Persists mode to `localStorage` under key `atlas-theme`. Exposes `toggleTheme()` via context.

## Dark Section Injection

Sections that require dark/coastal backgrounds in light mode inject `darkTheme` locally via a nested `ThemeProvider`:

```tsx
// DashboardPreviewSection — every carousel card
<MuiThemeProvider theme={darkTheme}>
  <CarouselCard ... />
</MuiThemeProvider>

// Footer — entire footer when !dark
return dark ? footer : <MuiThemeProvider theme={darkTheme}>{footer}</MuiThemeProvider>;
```

This ensures MUI tokens (`text.primary`, `divider`, etc.) render as white text on the dark teal background without hardcoding every color.

---

# 4. Internationalisation

## LanguageContext.tsx

Provides `{ locale, setLocale }` via React Context. Persists language to `localStorage` under key `atlas-lang`. The `locale` object is typed against `en.ts`.

```ts
const { locale } = useLanguage();
// locale.hero.heading → string
// locale.dashboardPreview.cards[0].title → string
```

## locales/en.ts

Single source of truth for all content. Contains:
- Hero slides (5 slides with labels, titles, stats, AI insight text, CTA, donut data)
- All section copy (features, stats, key questions, how it works, footer)
- Dashboard preview cards (4 cards with KPIs, insight text, CTA chips)
- Date references updated to 2026

## locales/es.ts

Mirrors `en.ts` exactly — every key present in EN must be present in ES. Spanish translation of all user-facing strings.

---

# 5. Components

## Header (`components/layout/Header.tsx`)

- Fixed MUI `AppBar` with glassmorphism: `rgba(7,12,22,0.55)` background, `backdrop-filter: blur(16px)`
- ATLAS logo (same SVG as Horizon but labelled "ATLAS")
- Navigation items are **disabled** with "Coming Soon" tooltip — signals landing page status
- Language toggle (US/ES flags)
- Dark/light mode toggle

## Footer (`components/layout/Footer.tsx`)

- 4-column grid: Brand · Features · Technology · Project
- **Light mode:** wrapped in `darkTheme` ThemeProvider → coastal teal background `linear-gradient(158deg, rgba(5,62,78,0.97) 0%, rgba(3,44,58,0.95) 100%)` with turquoise top border
- **Dark mode:** standard `background.paper` (#111827)
- Bottom bar: copyright (© 2026 Atlas by TUI) + bottom links

## GeoDots (`components/common/GeoDots.tsx`)

Cartographic dot grid applied to white-background sections in light mode only (`{!dark && <GeoDots />}`).

```tsx
// Two-layer parallax cartographic grid:
// Primary: 36px spacing, rgba(0,161,82,0.22), 32s forward drift
// Secondary: 18px spacing, rgba(2,132,199,0.10), 18s reverse drift
// CSS mask-image fades the grid at top/bottom edges
```

Applied to: FeaturesSection, ProblemSection, KeyQuestionsSection, HowItWorksSection.

---

# 6. Hero Section

## HeroSection.tsx

Full-bleed Valencia coast photo background with horizontal gradient overlay (left dark, right reveals photo). Contains the hero carousel and floating particles.

**Background layers (bottom to top):**
1. `/hero-bg.jpg` — Valencia coast photo (static asset in `public/`)
2. Horizontal gradient: `linear-gradient(102deg, rgba(4,14,26,0.92) 0% → rgba(4,14,26,0.08) 100%)`
3. Warm golden sun glow: `radial-gradient(ellipse at 78% 24%, rgba(234,179,8,0.11))`
4. Amber horizon: `radial-gradient(ellipse at 50% 110%, rgba(249,115,22,0.14))`

**12 floating particles:**
```tsx
animate={{ y: [0, -22, 0], opacity: [0.12, 0.38, 0.12] }}
```
Each particle has a unique delay and x-position creating a "light on water" shimmer effect.

**Scroll CTAs:**
```tsx
// "Explorar Dashboard" → #dashboard-preview
// "Saber más" → #features
document.getElementById("dashboard-preview")?.scrollIntoView({ behavior: "smooth" })
```

## MockDashboardCard.tsx

The hero's dashboard preview card. Uses the coastal turquoise aesthetic. **Exports `HeroSlide` type** consumed by `HeroSection`.

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

**Card visual:**
- Background: `linear-gradient(158deg, rgba(5,62,78,0.97) 0%, rgba(3,44,58,0.95) 100%)`
- Border: `1px solid rgba(13,211,197,0.22)`
- Sunset top bar: gradient `#0DD3C5 → #22D3EE → #818CF8 → #F97316 → #EAB308`
- "Perspectiva" box: coral `rgba(249,115,22,0.08)` background
- Stat colors: `["#0DD3C5", "#F97316", "#EAB308", "#22D3EE"]`

**Donut chart fallback:**
```ts
const activeDonut = slide === undefined ? h.donutLegend : slide.donut;
```
Default card (no slide selected) shows the overview donut. Slide-specific cards show their own donut or nothing.

---

# 7. Dashboard Preview Section

## DashboardPreviewSection.tsx

Horizontal carousel showing 4 dashboard preview cards. Each card represents one dashboard page (Oferta, Demanda, Saturación, Oportunidades).

**Carousel mechanics:**
```ts
const cardWidth = Math.min(containerWidth * 0.82, 980);
const peekOffset = (containerWidth - cardWidth) / 2;
const trackX = peekOffset - activeIdx * (cardWidth + gap);
```
Non-active cards have `opacity: 0.35` and `scale(0.975)` — visible as "peeks" at card edges.

**CarouselCard visual identity:**
- Background: `linear-gradient(158deg, rgba(5,62,78,0.97) → rgba(3,44,58,0.95))`
- Active border: `rgba(13,211,197,0.50)` — inactive: `rgba(13,211,197,0.18)`
- Header label + icon: `#0DD3C5`
- KPI icons: turquoise for positive (`#0DD3C5`), red for alerts (`#F87171`)
- "Perspectiva" label: `#F97316` (coral) — matches hero card
- Date chip: `Jul 1 – Jul 31, 2026`

**Wrapped in darkTheme per card** — so all MUI tokens render as white text on the teal background.

**4 fake visualisations (pure CSS/SVG, no chart library):**
| Card | Visualisation |
|---|---|
| Oferta Turística | `FakeHeatmap` — coloured tile grid + horizontal bar chart |
| Demanda & Comportamiento | `FakeDemandViz` — dual line chart + donut chart |
| Riesgos de Saturación | `FakeRiskViz` — Spain map with red/orange bubbles + congestion time series |
| Oportunidades | `FakeGrowthViz` — Spain map with green bubbles + category bar chart |

---

# 8. Animation Strategy

| Context | Framer Motion config |
|---|---|
| Hero elements | `initial+animate` — immediate on load |
| All other sections | `whileInView` + `viewport={{ once: true }}` |
| Card stagger | `delay: i * 0.10` to `i * 0.12` |
| Slide directions | text: `x: -40`, cards: `x: 40`, most: `y: 30` |
| Duration | 0.5–0.7s, `ease: [0.4, 0, 0.2, 1]` |
| Floating particles | `animate={{ y: [0,-22,0], opacity: [0.12,0.38,0.12] }}` |
| Carousel track | `type: "spring", stiffness: 300, damping: 35` |

---

# 9. Responsive Breakpoints

| Section | xs | sm | md | lg |
|---|---|---|---|---|
| Hero | stacked | stacked | 2-col | 2-col |
| Features | 1-col | 2-col | 2-col | 4-col |
| Stats Bar | 2-col | 2-col | 4-col | 4-col |
| Dashboard Preview | carousel (full width) | ← same → | ← same → | ← same → |
| Key Questions | 1-col | 2-col | 2-col | 4-col |
| How It Works | 1-col | 1-col | 1-col | 2-col |

---

# 10. MUI v9 Patterns

## Grid v2

MUI v9 uses `Grid size={{ xs: 12, md: 6 }}` — not `xs={12}` prop syntax:
```tsx
<Grid container spacing={3}>
  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
```

## slotProps (not InputProps)

`InputProps` is deprecated in v9:
```tsx
// Correct
<TextField slotProps={{ input: { startAdornment: <Icon /> } }} />
```

## Theme Tokens in sx

```tsx
// Always use tokens — never hardcode for bg/text/border
sx={{ bgcolor: "background.paper", borderColor: "divider", color: "text.primary" }}

// Exception: decorative gradients and SVG colors
sx={{ background: "linear-gradient(158deg, rgba(5,62,78,0.97) 0%, rgba(3,44,58,0.95) 100%)" }}
```

---

# 11. Build Configuration

## vite.config.ts

```ts
export default defineConfig({
  plugins: [react()],
  server: { port: 5175 },
});
```

## tsconfig.json

Strict mode enabled. `moduleResolution: bundler`.

## Commands

```bash
npm run dev       # Dev server at localhost:5175 (hot reload)
npm run build     # TypeScript check + Vite build → dist/
npm run lint      # ESLint
npm run preview   # Preview production build locally
```
