# Business Case, KPIs and ESG Alignment

## Atlas — AI Dashboard para la Gestión de Oferta Turística Georreferenciada

---

# 1. Business Case

## The Problem in Numbers

Spain's tourism sector is structurally strong but analytically blind at the destination level:

- **104.3 million** international tourists received in 2025
- **85%** of visitors concentrate in **10%** of destinations
- Destination managers across Spain's 50+ provinces operate without a unified data platform
- Tourism data from INE, AEMET, OSM, and review platforms exists in separate, incompatible systems
- Investment decisions worth hundreds of millions of euros are made without geospatial intelligence

## The Opportunity

A unified geospatial analytics platform for destination management creates value across three dimensions:

### Operational Value (Destination Managers)

Destination managers currently spend significant time manually aggregating data from multiple sources — INE downloads, Google Analytics exports, local accommodation surveys — into fragmented Excel reports. Atlas replaces this with an automated, real-time dashboard that surfaces actionable intelligence in minutes rather than days.

**Estimated time saving:** 15–25 hours/week per destination manager team on data aggregation tasks.

### Strategic Value (Tourism Authorities)

Regional and national tourism bodies allocate development funding and infrastructure investment based on incomplete information. Atlas provides the evidence base for:

- Identifying which secondary destinations can absorb redirected demand
- Prioritising infrastructure investment in high-opportunity, low-visibility zones
- Measuring the impact of sustainability initiatives with quantified ESG tracking

**Expected outcome:** 20–30% improvement in investment decision accuracy for secondary destination development.

### Sustainability Value (ESG Reporting)

Tourism sustainability reporting in Spain is fragmented. Atlas creates a standardised ESG measurement framework across 20 destinations, enabling TUI to:

- Report sustainability performance with verified, comparable metrics
- Identify destinations approaching environmental thresholds before damage occurs
- Demonstrate SDG 8.9 progress to investors and regulatory bodies

---

# 2. Key Performance Indicators

## Operational KPIs (Dashboard Performance)

### Data Freshness Rate
**Definition:** Percentage of data sources updated within their expected refresh window at any given time.  
**Target:** > 95% of sources current (not stale).  
**Measurement:** ETL pipeline timestamp monitoring.

### Dashboard Load Time
**Definition:** Time from page open to interactive dashboard (all visuals rendered).  
**Target:** < 3 seconds on standard connection.  
**Measurement:** Power BI performance analyser / Streamlit loading time.

### Filter Response Time
**Definition:** Time for dashboard to re-render after a filter selection.  
**Target:** < 1 second for all filter interactions.

## Analytical KPIs (Tourism Intelligence)

### Congestion Alert Accuracy
**Definition:** Percentage of automated congestion alerts that correctly identified a zone approaching saturation (validated against subsequent INE data).  
**Target:** > 80% precision, < 20% false positive rate.

### Opportunity Detection Rate
**Definition:** Number of underutilised high-potential zones identified per quarter that destination managers subsequently acted on.  
**Target:** 5+ actionable opportunity zones identified per quarter.

### Offer Coverage Completeness
**Definition:** Percentage of destinations with complete multi-category offer density data (all 5 POI categories populated).  
**Target:** 100% of 20 destinations fully covered.

### Sentiment Coverage
**Definition:** Percentage of destinations with review data from at least 2 platforms.  
**Target:** > 90% of destinations covered.

## Strategic KPIs (Business Impact)

### Investment Decision Support Rate
**Definition:** Percentage of major destination development investment decisions (> €500K) that used Atlas data as part of the evidence base.  
**Target:** > 60% within 12 months of full platform launch.

### Demand Redistribution Support
**Definition:** Alignment with Horizon (Reto 2) recommendations — percentage of Atlas-identified opportunity zones that also receive Horizon recommendation traffic.  
**Target:** > 70% overlap between Atlas opportunity rankings and Horizon demand redistribution.

### Destination Manager Adoption
**Definition:** Percentage of destination manager teams in the 20-destination portfolio using Atlas at least weekly.  
**Target:** > 80% adoption within 6 months of launch.

### Time-to-Insight Reduction
**Definition:** Reduction in time from "I need to know X about destination Y" to having a data-backed answer.  
**Target:** From ~2 days (manual research) to < 30 minutes (Atlas query).

## ESG KPIs

### Portfolio ESG Coverage
**Definition:** Percentage of destinations with a complete ESG score (all 5 dimensions populated).  
**Target:** 100% by end of Phase 3.

### Average Portfolio ESG Score
**Definition:** Mean overall ESG score across all 20 destinations.  
**Target:** Portfolio mean ≥ 65/100; 0 destinations below 40/100.

### Congestion Reduction in Critical Zones
**Definition:** Year-on-year change in congestion index for destinations identified as critical (index > 80) at the start of the monitoring period.  
**Target:** 10–15% reduction in average congestion index for top-5 critical destinations over 2 years.

---

# 3. ESG Framework

## Environmental Dimension

### Carbon Score (0–100)
Measures carbon efficiency of the tourism operation per visitor. Components:
- Transport modal split (higher air dependency = lower score)
- Accommodation energy intensity
- Distance from major origin markets

### Sustainable Transport Access (0–100)
Measures how accessible the destination is by low-carbon transport:
- Rail connectivity (high-speed + regional)
- Public transport frequency within destination
- EV charging infrastructure density

### Climate Resilience
Tracks long-term climate trend data per destination to identify:
- Destinations facing increasing heat stress in summer (risk to visitor experience)
- Destinations with year-round comfort potential (opportunity for season extension)

## Social Dimension

### Local Business Percentage
Measures the share of tourism revenue going to locally-owned (non-chain) businesses. High local business % = better distribution of economic benefit to the community.  
**Source:** Mix of survey data, OSM business classification, INE regional accounts.

### Waste Management Score (0–100)
Municipal recycling rate and waste generation per tourist overnight stay.  
**Source:** INE waste statistics by municipality.

## Governance Dimension

### Environmental Certification Level (0–3)
Count of formal environmental certifications held by the destination:
- 0 = No certification
- 1 = ISO 14001 or equivalent municipal environmental management system
- 2 = Biosphere Responsible Tourism certification or similar
- 3 = UNESCO designation (World Heritage, Biosphere Reserve, Global Geopark)

---

# 4. SDG 8.9 Alignment

**UN Sustainable Development Goal 8.9:**
> *"By 2030, devise and implement policies to promote sustainable tourism that creates jobs and promotes local culture and products."*

## How Atlas Supports SDG 8.9

### Evidence Base for Policy
Atlas provides the data foundation that tourism authorities need to devise evidence-based sustainable tourism policies. The congestion monitoring, opportunity identification, and ESG tracking modules directly support policy formulation.

### Promoting Sustainable Destinations
By making underutilised, high-sustainability destinations visible and attractive to investment, Atlas creates economic incentives to diversify the tourism offer — directly supporting the "promotes local culture and products" dimension.

### Job Creation in Secondary Destinations
Investment in under-visited destinations with high opportunity scores creates hospitality, transport, and experience jobs in communities that currently receive minimal tourism economic benefit.

### Environmental Sustainability
The ESG framework ensures that destination development recommendations factor in environmental capacity — identifying destinations where growth is sustainable vs. where it would cause irreversible damage.

## Concrete Targets

| SDG 8.9 Target | Atlas Metric | 2026 Baseline | 2028 Target |
|---|---|---|---|
| Policy based on evidence | Investment decisions using Atlas data | 0% | 60% |
| Promote sustainable destinations | Portfolio ESG score | TBD at launch | Mean ≥ 65 |
| Distribute economic benefit | Local business % in opportunity zones | TBD | +15% vs national avg |
| Reduce environmental pressure | Congestion index in critical zones | TBD | −10% YoY |
| Create jobs in secondary destinations | New accommodation openings in opp. zones | TBD | +25% YoY |

---

# 5. Return on Investment

## For TUI

| Value Driver | Estimated Impact |
|---|---|
| Destination manager efficiency | 15–25 hrs/week saved per team |
| Better investment decisions | 20–30% improvement in secondary destination ROI |
| Sustainability reporting | Reduced compliance cost; improved ESG ratings |
| Suite integration with Horizon | Atlas opportunity data feeds Horizon recommendations, increasing recommendation relevance and traveler conversion |

## For Destination Partners

| Benefit | Estimated Impact |
|---|---|
| High-opportunity zones identified | 5+ actionable investment targets per quarter |
| Saturation alerts prevent crisis | Estimated 10–15% congestion reduction in critical zones |
| ESG visibility | Access to standardised certification pathway |

## For Travelers (Indirect)

Improved destination management leads to better visitor experiences at less-crowded destinations, higher satisfaction at managed venues, and more sustainable alternatives surfaced through Horizon's recommendation engine.

---

# 6. Competitive Context

Traditional approaches to destination analytics:

| Approach | Limitation |
|---|---|
| Manual INE reports | Monthly delay; no geospatial view; no cross-source integration |
| Google Analytics | Tracks digital behaviour only; no physical footprint data |
| Commercial tourism dashboards (e.g. ForwardKeys) | Expensive; supply-side only; no ESG integration |
| Municipal surveys | Incomplete coverage; infrequent; non-standardised |

**Atlas differentiates** through: automatic open data integration, geospatial visualisation at zone level, ESG embedding as a first-class dimension, and suite integration with Horizon's demand-side intelligence.
