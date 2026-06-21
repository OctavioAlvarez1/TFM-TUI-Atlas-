# Business Problem and Vision

## Atlas — AI Dashboard para la Gestión de Oferta Turística Georreferenciada

---

# 1. Business Problem Definition

Spain is the second most visited country in the world, receiving **104.3 million international tourists in 2025**. Despite this massive volume, the tourism sector operates largely blind: the data that would enable intelligent management exists, but it is fragmented across dozens of public bodies, private platforms, and local administrations.

Destination managers — the professionals responsible for planning, promoting, and sustaining tourism at a regional or municipal level — face a structural information deficit. They cannot answer, in real time or even retrospectively, questions as fundamental as: where exactly is tourism concentrated right now? Which areas are approaching saturation? Which underserved zones have the most growth potential?

## Data Fragmentation Problem

Tourism destinations generate enormous amounts of data daily:

- **Accommodation data** — occupancy rates, pricing, availability (INE EOH, Booking.com, Airbnb)
- **Visitor behaviour** — mobility patterns, dwell times, repeat visits
- **Transport and accessibility** — road congestion, public transport usage, parking saturation
- **Online reputation** — review volumes, sentiment scores, platform ratings (Google, Tripadvisor)
- **Sustainability and climate** — carbon footprint indicators, climate comfort, water/energy consumption
- **Events and seasonality** — festivals, congresses, sporting events driving demand spikes
- **Economic activity** — restaurant, retail, and service revenue per destination

This data exists. The problem is that it sits in separate systems, in incompatible formats, owned by different organisations, updated at different frequencies. No destination manager has a unified, real-time view.

## Environmental Challenges

- Undetected saturation in high-demand zones causes irreversible ecological damage.
- Over-concentration of visitors degrades natural landscapes and heritage sites.
- Without visibility into congestion patterns, intervention comes too late.

## Social Challenges

- Resident quality of life deteriorates in over-visited areas without early warning systems.
- Tourism revenue concentrates in already-developed zones, starving peripheral areas.
- Communities in underserved zones lack the data to attract targeted investment.

## Economic Challenges

- Destination development decisions are made on intuition rather than evidence.
- Investment capital misallocates to already-saturated zones, missing high-potential alternatives.
- Seasonal volatility goes unmanaged, leading to infrastructure waste during low season.

## Opportunity for TUI

TUI, as a major player in European tourism, holds data on bookings, preferences, accommodation occupancy, and destination performance across its portfolio. By integrating this proprietary data with open public sources (INE, AEMET, OpenStreetMap) through an AI-powered geospatial platform, TUI can:

- Provide destination managers with a unified intelligence layer.
- Identify emerging congestion risks before they become crises.
- Surface high-potential, low-visibility zones for targeted investment.
- Support sustainable destination development aligned with SDG 8.9.

---

# 2. Solution Objectives

## Primary Objective

Build an AI-powered geospatial analytics dashboard that integrates multi-source tourism data into a unified, interactive platform — giving destination managers the actionable intelligence they need to manage offer, congestion, and growth across Spanish destinations.

## Secondary Objectives

### Congestion Management

Provide real-time and predictive visibility into tourism density and saturation risk, enabling proactive intervention before zones reach critical thresholds.

### Opportunity Identification

Surface underutilised zones with high growth potential — areas with good accessibility, high natural or cultural value, and positive visitor ratings that barely appear in the current commercial offering.

### Sustainability Monitoring

Integrate ESG indicators into every destination analysis, making sustainability performance visible and comparable across the portfolio.

### Investment Support

Generate data-driven investment recommendations by combining offer gaps, demand signals, and sustainability profiles into actionable opportunity scores.

### Operational Intelligence

Enable daily decision-making for destination managers through dashboards that update automatically from open data feeds.

---

# 3. Stakeholders

## Internal Stakeholders

### Destination Managers

The primary users of the Atlas dashboard. Responsible for strategic planning, offer development, and sustainability management at the destination level. They need a unified view of their territory across all data dimensions.

### Revenue Management

Interested in occupancy optimisation, demand forecasting, and identifying underserved market segments. Atlas provides the supply-side intelligence to complement Horizon's demand-side recommendations.

### Sustainability Team

Responsible for measuring and reporting the environmental and social impact of TUI's destination portfolio. Atlas integrates ESG indicators directly into the geospatial analytics layer.

### Data and AI Teams

Responsible for building and maintaining the ETL pipeline, geospatial data model, and AI analytics modules. Atlas defines the data architecture and integration patterns they will implement.

### Product and Digital Experience Teams

Responsible for surfacing Atlas insights within TUI's customer-facing and partner-facing digital channels.

## External Stakeholders

### Tourism Authorities (Comunidades Autónomas, Patronatos)

Regional tourism bodies that need aggregated, cross-source intelligence for policy-making and infrastructure planning. Atlas provides the analytical foundation for evidence-based tourism governance.

### Hotels and Commercial Partners

Accommodation and experience providers in secondary destinations benefit from Atlas identifying their zones as growth opportunities — directing both TUI investment and traveler demand toward them.

### Local Communities

Communities in underutilised destinations gain visibility and potential economic development when Atlas surfaces their zones as high-potential investment targets.

### Urban Planners and Infrastructure Teams

Authorities responsible for managing transport, waste, and public services in high-demand zones need congestion data to plan capacity.

### Investment Analysts

Financial analysts evaluating tourism infrastructure investment use Atlas's opportunity scoring to identify high-ROI destinations ahead of market saturation.

---

# 4. Key Performance Indicators (KPIs)

## Offer Density Index

Spatial concentration of tourism supply (accommodations, restaurants, experiences, attractions) per km² per destination. Enables comparison of offer density across the 20-destination portfolio.

## Congestion Index

Monthly tourism pressure score (0–100) per destination, derived from hotel occupancy (INE EOH), mobility data, and visitor volume. Tracks saturation risk over time.

## Underutilised Zone Detection Rate

Number of zones identified per period with high natural/cultural value, good accessibility, and positive sentiment — but low current commercial visibility. The core opportunity discovery metric.

## ESG Coverage Score

Percentage of destinations with complete sustainability data coverage (carbon indicators, local business ratio, sustainable transport access, climate comfort index).

## Average Sentiment Score

Mean visitor satisfaction rating (0–10) per destination and category, derived from aggregated review data (Google, Tripadvisor, Booking.com).

## Seasonality Variance Index

Ratio of peak-month to trough-month visitor volume per destination. High variance indicates fragile, seasonally dependent destinations requiring diversification strategies.

## Investment Opportunity Score

Composite score combining: accessibility index + natural/cultural value + visitor sentiment + current offer gap + projected demand growth. Ranks destinations by investment potential.

## Data Source Coverage

Percentage of destinations with complete multi-source data integration (all 8 open data sources connected and current).

---

# 5. Target Users

## Destination Planners

Professionals at regional tourism boards and municipal tourism offices responsible for developing the destination's tourism offer. They use Atlas to identify gaps in supply, benchmark against peer destinations, and prioritise investment in new experiences and infrastructure.

## Tourism Authorities

Regional and national bodies (Secretaría de Estado de Turismo, Turespaña, Comunidades Autónomas) that set tourism policy and allocate development funding. They use Atlas to monitor the health of the destination portfolio and measure the impact of sustainability initiatives.

## Investment Analysts

Financial professionals evaluating tourism infrastructure investment (hotels, transport links, attraction development) who need data-driven evidence for location selection and ROI projection.

## Sustainability Officers

Professionals responsible for ESG reporting and sustainable tourism certification. They use Atlas to track environmental and social indicators across the destination portfolio and identify areas requiring intervention.

## TUI Product Managers

Internal product managers who use Atlas's supply intelligence to complement Horizon's demand-side recommendations — ensuring that new destinations surfaced for traveler recommendation also have adequate supply infrastructure.

---

# 6. Primary Use Cases

## Geospatial Offer Visualisation

A destination manager for the Costa del Sol opens Atlas and immediately sees a geospatial heatmap of tourism offer density — where hotels, restaurants, experiences, and attractions are concentrated, with filtering by category, zone, and congestion level. They can identify in seconds which micro-zones are over-served and which are commercially invisible.

## Congestion Hotspot Detection

The system continuously calculates congestion indices from hotel occupancy and mobility data. When a destination approaches a critical threshold (e.g. congestion index > 80), the dashboard surfaces an automated alert with the affected zones, trend data, and comparable historical peaks.

## Growth Opportunity Identification

Atlas detects rural interior zones that have excellent road accessibility, high natural value scores, positive visitor reviews, and low current commercial offer. These zones are surfaced in the Oportunidades de Crecimiento dashboard with an investment opportunity score and recommended offer development actions.

## ESG and Sustainability Monitoring

Every destination in the Atlas portfolio carries an ESG profile: carbon footprint indicators, percentage of local business revenue, sustainable transport accessibility, and climate comfort score. Destination managers can filter and rank destinations by sustainability performance and track improvement over time.

## Seasonality and Demand Forecasting

Atlas visualises monthly visitor volume trends per destination, identifying extreme seasonality patterns. Destination managers can use this to plan promotional campaigns in shoulder months, diversify experiences to attract year-round visitors, and manage infrastructure capacity more efficiently.

## Data-Driven Investment Decision Support

An investment analyst queries Atlas for destinations with: congestion index < 40, sentiment score > 7.5, natural value index > 70, and current offer density < 30th percentile. The system returns a ranked list of high-potential investment targets with supporting evidence across all dimensions.

---

# 7. MVP Functional Scope

## Currently Implemented: Landing Page

The Atlas landing page (React 19 SPA) is fully built and operational as of June 2026. It communicates the Atlas vision, demonstrates the dashboard interface through mock visualisations, and presents the analytical framework to stakeholders.

### Landing Page Capabilities

- **Hero carousel** — 5 slides previewing different dashboard modules with coastal aesthetic
- **Dashboard Preview** — 4 interactive cards showing mock versions of the 4 core dashboard pages (Oferta, Demanda, Saturación, Oportunidades)
- **Key Questions** — Visual presentation of the 4 strategic questions Atlas answers
- **Data Sources** — Overview of 8 integrated open data sources
- **How It Works** — 4-step analytical workflow
- **Bilingual** — Full EN/ES support
- **Dark/Light mode** — Full theme switching with coastal turquoise palette

### Dashboard Design Specifications

Complete specifications for the 5 Power BI dashboard pages have been designed and documented in `dashboard/pages/`. These cover: visualisation types, KPI definitions, filter configurations, DAX measures, and data model requirements.

## Planned: Full Dashboard Implementation

The full geospatial dashboard will be implemented in a separate `TUI-Atlas/` repository using:

- **ETL Pipeline** — Python scripts to extract, transform, and load data from INE, AEMET, OSM, and sentiment APIs
- **Geospatial Data Model** — PostGIS or GeoJSON-based spatial database covering 20 Spanish destinations
- **Interactive Dashboard** — Power BI (primary) and Streamlit (secondary) implementations
- **AI Analytics Layer** — Python modules for congestion scoring, opportunity detection, and seasonality analysis

## Features Outside Current Scope

- Real-time data streaming (batch ETL is the target)
- Conversational analytics interface
- Predictive demand modelling (rule-based scoring only in MVP)
- Mobile native app

---

# 8. Executive Summary

**Atlas** (AI Dashboard para la Gestión de Oferta Turística Georreferenciada) is a geospatial tourism analytics platform designed to give destination managers the unified intelligence they need to manage Spain's tourism offer strategically.

The platform addresses a fundamental structural problem: Spain's tourism data exists but is fragmented across incompatible systems. Atlas integrates data from OpenStreetMap, INE, AEMET, Google, Tripadvisor, Booking.com, and transport authorities into a single geospatial analytics layer — answering the four questions that destination managers cannot currently answer from any single source.

The Atlas landing page is fully built (React 19, TypeScript, Vite, Material UI v9, Framer Motion). The full dashboard has been designed in detail across 5 Power BI pages covering offer concentration, demand behaviour, saturation risk, growth opportunities, and sustainability. The implementation of the full ETL pipeline and dashboard is the next development phase.

Atlas is **Reto 3** in the TUI Care Foundation Future Shapers Spain 5-project suite, targeting SDG 8.9. It is designed to work in conjunction with **Horizon** (Reto 2), using Horizon's congestion and sustainability scores as a primary data feed into the geospatial visualisation layer.
