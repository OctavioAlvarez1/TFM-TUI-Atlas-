# Dashboard Design

## Atlas — 5 Power BI Pages Specification

---

# Overview

The Atlas analytics dashboard is organised into 5 Power BI pages, each answering a distinct analytical question for destination managers. All pages share:

- A common filter panel (zone, destination type, congestion level, sentiment range, season, market of origin)
- The congestion colour scale: Green (0–30) · Amber (31–60) · Orange (61–80) · Red (81–100)
- Consistent typography and the Atlas coastal turquoise colour theme
- Cross-page filter propagation — selecting a destination on any page highlights it across all pages

Full page-level specifications are in `dashboard/pages/P1–P5_*.md`. This document provides the design rationale, visualisation choices, and key interactions.

---

# Page 1 — Resumen General

**Analytical question:** What is the current state of the entire destination portfolio?

## Purpose

The executive overview page. Designed for destination managers who need a daily health check of the full 20-destination portfolio without drilling into a specific area. Surfaces the most critical signals — congestion alerts, demand trends, top and bottom performers.

## Layout

```
┌─────────────────────────────────────────────────────────────┐
│  FILTER BAR: Season · Month · Destination Type · Region     │
├──────────────┬──────────────┬──────────────┬────────────────┤
│  KPI: Total  │  KPI: Avg    │  KPI: Active │  KPI: ESG Avg  │
│  POIs        │  Congestion  │  Alerts      │  Score         │
├──────────────┴──────────────┴──────────────┴────────────────┤
│                                                             │
│  MAIN MAP — Spain · 20 destinations · bubble size =         │
│  visitor volume · bubble colour = congestion index          │
│                                                             │
├─────────────────────────────┬───────────────────────────────┤
│  CONGESTION BAR CHART       │  VISITOR TIME SERIES          │
│  Destinations ranked        │  Monthly arrivals 2025–2026   │
│  by congestion index        │  Line chart with 2 years      │
└─────────────────────────────┴───────────────────────────────┘
```

## Key Visualisations

**Main Map (Bubble Map)**
- Each destination shown as a bubble at its centroid coordinates
- Bubble size proportional to visitor volume (scaled 8px–48px)
- Bubble colour: congestion colour scale (Green/Amber/Orange/Red)
- Tooltip: destination name, congestion index, visitor volume, trend arrow
- Click to drill through to P2 (Oferta y POIs) for that destination

**KPI Cards (4)**
- Total POIs monitorizados (current portfolio count)
- Average Congestion Index (portfolio mean, with trend vs. prior month)
- Active Alerts (count of destinations above congestion threshold 80)
- Average ESG Score (portfolio sustainability mean)

**Congestion Bar Chart**
- Horizontal bars, all 20 destinations
- Sorted descending by congestion index
- Bar colour matches congestion scale
- Reference line at threshold 80 (critical) and 60 (warning)

**Visitor Time Series**
- Monthly visitor arrivals aggregated across the portfolio
- Two lines: current year (2026) vs prior year (2025)
- Area fill under current year with 15% opacity
- Seasonal pattern clearly visible (summer peak)

---

# Page 2 — Oferta y POIs

**Analytical question:** Where exactly is the tourism supply concentrated, and what categories dominate each zone?

## Purpose

The supply intelligence page. Destination managers use this to understand the composition and geographic distribution of their tourism offer — hotels, restaurants, experiences, attractions — at the micro-zone level within each destination.

## Layout

```
┌──────────────────────────────────────────────────────────────┐
│  FILTER BAR: Destination · Category · Offer Density Range    │
├────────────────────────────┬─────────────────────────────────┤
│                            │  KPI: Hotels  KPI: Restaurants  │
│  DENSITY HEATMAP           │  KPI: Experiences  KPI: Attrac  │
│  Destination zone grid     ├─────────────────────────────────┤
│  Tile colour = density     │  DISTRIBUTION DONUT             │
│  score per zone            │  POI share by category          │
│                            ├─────────────────────────────────┤
│                            │  TOP 10 DESTINATIONS BAR        │
│                            │  By total POI count             │
└────────────────────────────┴─────────────────────────────────┘
```

## Key Visualisations

**Density Heatmap**
- Destination territory divided into hexagonal grid cells
- Cell colour = offer density score (POIs per km²), same colour scale as congestion
- Filters: category (Hotels / Restaurants / Experiences / Attractions / All)
- Hovering a cell shows: zone name, POI count, density score, top category
- Clicking a cell highlights the matching rows in the detail table

**Distribution Donut**
- POI split by category for the selected destination/region
- Segments: Hotels, Restaurants, Experiences, Attractions, Transport, Other
- Centre label: total POI count
- Clicking a segment filters the heatmap to that category

**Top 10 Destinations Bar**
- Horizontal bars showing total POI count per destination
- Colour-coded by dominant category
- Enables rapid identification of most vs. least supplied destinations

**Detail Table**
- Zone, Category, POI Count, Density Score, Avg Sentiment, Last Updated
- Sortable by any column
- Conditional formatting: density score cells coloured by scale

---

# Page 3 — Riesgos de Saturación

**Analytical question:** Which zones are approaching or exceeding sustainable congestion thresholds?

## Purpose

The risk monitoring page. Designed to surface congestion hotspots early — before they become reputational or operational crises. Destination managers use this page to trigger intervention: promotional redirects, capacity limits, infrastructure investment.

## Layout

```
┌──────────────────────────────────────────────────────────────┐
│  FILTER BAR: Month · Destination · Congestion Level          │
├──────────────────────────────┬───────────────────────────────┤
│                              │  TRAFFIC LIGHT TABLE          │
│  CONGESTION HEATMAP          │  All destinations with        │
│  Spain map · zone colours    │  status: 🟢 🟡 🟠 🔴          │
│  = congestion index          │  and trend vs prior month     │
│                              ├───────────────────────────────┤
├──────────────────────────────┤  CONGESTION TIME SERIES       │
│  ALERT PANEL                 │  Monthly congestion index     │
│  Active alerts, ranked       │  for selected destination     │
│  by severity                 │  12 months · trend line       │
└──────────────────────────────┴───────────────────────────────┘
```

## Key Visualisations

**Congestion Heatmap (Choropleth Map)**
- Full Spain map with destination zones coloured by congestion index
- Four-level congestion colour scale (Green/Amber/Orange/Red)
- Tooltip: destination, current congestion index, trend, peak month
- Month selector (Jan–Dec) to animate seasonal congestion patterns

**Traffic Light Status Table**
- One row per destination
- Columns: Name, Type, Region, Congestion Index, Status (🟢/🟡/🟠/🔴), Trend (↑/↓/→), Peak Month
- Sorted by congestion index descending
- Conditional row background matching the status colour
- Click row to highlight destination on map and update time series

**Congestion Time Series**
- 12-month line chart for selected destination
- Reference bands: Green zone (0–30), Amber (31–60), Orange (61–80), Red (81–100)
- Marker at current month
- Comparison with prior year as dotted line

**Alert Panel**
- Cards for destinations currently above threshold 80 (critical)
- Each card: destination name, current index, days above threshold, recommended action
- Colour-coded by severity (orange = warning, red = critical)

---

# Page 4 — Oportunidades de Crecimiento

**Analytical question:** Which zones have high potential for tourism development but low current visibility?

## Purpose

The investment intelligence page. Combines multiple signals (accessibility, natural/cultural value, visitor sentiment, current offer gap, congestion headroom) into a composite opportunity score. Used by investment analysts and destination development teams to identify where to focus next.

## Layout

```
┌──────────────────────────────────────────────────────────────┐
│  FILTER BAR: Region · Opportunity Score Min · Category Gap   │
├────────────────────────────────────┬─────────────────────────┤
│                                    │  TOP OPPORTUNITIES       │
│  OPPORTUNITY SCATTER PLOT          │  Ranked cards with       │
│  X: Current offer density          │  opportunity score,      │
│  Y: Projected demand growth        │  key signals, and        │
│  Size: Accessibility index         │  recommended actions     │
│  Colour: Opportunity score         │                          │
├────────────────────────────────────┤                          │
│  OPPORTUNITY MAP                   │                          │
│  Green bubble = high potential     │                          │
│  zones on Spain geography          │                          │
└────────────────────────────────────┴─────────────────────────┘
```

## Key Visualisations

**Opportunity Scatter Plot**
- X-axis: Current offer density (low = underserved)
- Y-axis: Projected demand growth (high = strong opportunity)
- Bubble size: Accessibility index (larger = more accessible)
- Bubble colour: Opportunity score (Green = high, Amber = medium)
- Ideal quadrant: top-left (high demand growth, low current density)
- Clicking a bubble populates the opportunity card panel

**Opportunity Map**
- Spain geography with green bubbles on high-potential zones
- Bubble size proportional to opportunity score
- Distinguishes high-potential zones from saturated zones (red)
- Shows the geographic clustering of opportunity zones

**Top Opportunity Cards**
- One card per top-5 opportunity destination
- Shows: Opportunity Score, Accessibility Index, Current Offer Gap, Sentiment Score, ROI Projection (€M), Recommended Category (Ecoturismo, Rural, Cultural, etc.)
- Expandable for full profile

**Investment Ranking Table**
- All 20 destinations ranked by opportunity score
- Columns: Rank, Destination, Score, Offer Gap, Sentiment, Accessibility, Congestion Headroom, ROI Projection
- Export button for analyst use

## Opportunity Score Formula

```
Opportunity Score = 
  0.30 × (100 - Offer Density) +   // Low density = high gap
  0.25 × Sentiment Score +          // Good visitor ratings
  0.20 × Accessibility Index +      // Reachable by visitors
  0.15 × Natural/Cultural Value +   // Intrinsic attraction
  0.10 × (100 - Congestion Index)   // Congestion headroom
```

This formula surfaces destinations that are underserved commercially but have the underlying quality and accessibility to support tourism growth — the "hidden gems" the system is designed to find.

---

# Page 5 — Sostenibilidad y Clima

**Analytical question:** How do destinations compare on sustainability performance, and how does climate affect visitor experience?

## Purpose

The ESG and climate intelligence page. Supports sustainability officers tracking environmental performance and destination managers planning seasonal promotion strategies based on climate comfort.

## Layout

```
┌──────────────────────────────────────────────────────────────┐
│  FILTER BAR: Destination · Season · ESG Dimension            │
├─────────────────────────────┬────────────────────────────────┤
│  ESG RANKING BAR            │  RADAR CHART                   │
│  Destinations ranked        │  ESG profile for selected      │
│  by overall ESG score       │  destination: Carbon · Local   │
│  Coloured by tier           │  Business · Transport ·        │
│                             │  Certification · Waste         │
├─────────────────────────────┼────────────────────────────────┤
│  TEMPERATURE LINE CHART     │  CLIMATE COMFORT HEATMAP       │
│  Monthly avg temperature    │  Destinations × Months grid    │
│  for selected destination   │  Colour = climate comfort      │
│  vs national average        │  score (visitor experience)    │
└─────────────────────────────┴────────────────────────────────┘
```

## Key Visualisations

**ESG Ranking Bar Chart**
- Horizontal bars, all 20 destinations
- Sorted by overall ESG score
- Colour by tier: Green (score ≥ 75), Amber (50–74), Red (< 50)
- Reference line at TUI sustainability target (75)
- Clicking a bar updates the radar chart

**ESG Radar Chart**
- Five dimensions: Carbon Score, Local Business %, Sustainable Transport Access, Environmental Certification Level, Waste Management Score
- Comparison: selected destination vs portfolio average
- Filled area for selected, line only for portfolio average
- Immediately visible where a destination leads or lags

**Temperature Line Chart**
- 12-month temperature profile for selected destination
- Compared against Spain national average
- Shaded comfort band (18°C–26°C)
- Helps destination managers plan shoulder-season promotion

**Climate Comfort Heatmap**
- Grid: rows = all 20 destinations, columns = 12 months
- Cell colour: Green (comfortable), Amber (warm), Orange (hot), Blue (cold)
- Enables instant comparison of when each destination is most pleasant for visitors
- Supports seasonal demand diversification strategies

---

# Common Filters (All Pages)

| Filter | Type | Options |
|---|---|---|
| Destination | Multi-select dropdown | All 20 destinations |
| Region / Comunidad Autónoma | Multi-select | 10 regions |
| Destination Type | Multi-select | Beach · City · Nature · Rural · Cultural |
| Month | Single-select slider | Jan–Dec |
| Season | Single-select | Spring · Summer · Autumn · Winter |
| Congestion Level | Range slider | 0–100 |
| Sentiment Score | Range slider | 0–10 |
| Market of Origin | Multi-select | UK · Germany · France · USA · Domestic · Other |

---

# Colour System

All pages use the shared congestion colour scale:

| Level | Score Range | Fill | Label |
|---|---|---|---|
| Low | 0–30 | `#16A34A` | Verde — Bajo |
| Moderate | 31–60 | `#CA8A04` | Ámbar — Moderado |
| High | 61–80 | `#EA580C` | Naranja — Alto |
| Very High | 81–100 | `#DC2626` | Rojo — Muy Alto |

ESG tiers use the same scale. Opportunity score uses inverted scale (high score = green).

Full Power BI setup in [`dashboard/README.md`](../dashboard/README.md).
