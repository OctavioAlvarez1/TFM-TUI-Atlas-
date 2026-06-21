# Página 5 — Sostenibilidad & Clima

**Pregunta que responde:** ¿Qué destinos son más sostenibles? ¿Cómo influye el clima en la estacionalidad?

---

## Fuentes de datos
- **ESG scores**: Horizon Reto 2 (`destination_summary[avg_esg]`, `carbon_score`, `public_transport_score`)
- **Clima**: AEMET (`time_series[avg_temp_c]`, `time_series[climate_comfort]`)

---

## Layout

```
┌─────────────────────────────────────────────────────────────────┐
│  Filtros: Destino ▼  Mes ▼                                      │
├─────────────────────────┬───────────────────────────────────────┤
│  ESG RANKING            │  CLIMA — Temperatura media mensual    │
│  (Barra horizontal)     │  (Línea por destino)                 │
│                         │                                       │
│  ████ Picos de Europa   │  30°                                  │
│  ████ Extremadura       │  25°     ___Mallorca                  │
│  ███  San Sebastián     │  20°  __/   \__Sevilla               │
│  ███  Granada           │  15° /         \                      │
│  ██   Barcelona         │  10°             \___Picos            │
│  █    Mallorca          │  Ene Feb Mar... Nov Dic               │
├─────────────────────────┼───────────────────────────────────────┤
│  RADAR CHART ESG        │  CONFORT CLIMÁTICO — Heatmap mensual │
│  (por destino)          │  (Eje Y: destino, Eje X: mes)        │
│                         │  Color: climate_comfort (0-100)      │
│  · ESG Score            │                                       │
│  · Carbon Score         │  Palma   ░░░████████████░░░          │
│  · Transporte Público   │  Sevilla ░░░░████████████░░          │
│  · Sentiment            │  Picos   ░░░░░████░░░░░░░░░          │
└─────────────────────────┴───────────────────────────────────────┘
```

---

## Visualizaciones

### Barra ESG Ranking
- **Tipo**: Barra horizontal ordenada
- **Eje Y**: `destination_summary[destination]`
- **Eje X**: `destination_summary[avg_esg]`
- **Referencia**: línea en 70 (umbral "sostenible")
- **Color**: escala verde (más alto = más verde)

### Línea temperatura mensual
- **Tipo**: Línea con marcadores
- **Eje X**: `time_series[month]` (etiquetas Ene-Dic)
- **Eje Y**: `Temperatura Media C`
- **Leyenda**: `time_series[destination]`
- **Top 6** destinos por temperatura media (costeros + insulares)

### Radar / Spider chart ESG
- **Ejes**: ESG Score | Carbon Score | Transporte Público | Puntuación Reseñas
- **Por destino**: comparativa 3 destinos seleccionados
- (Power BI no tiene radar nativo — usar visual de AppSource: "Radar Chart")

### Heatmap confort climático
- **Tipo**: Matrix
- **Filas**: `time_series[destination]`
- **Columnas**: mes (1-12)
- **Valores**: `AVERAGE(time_series[climate_comfort])`
- **Colores**: 0 = azul (frío/lluvioso), 100 = naranja (cálido ideal)
- Escala divergente centrada en 50

---

## KPIs de página
| KPI | Medida |
|-----|--------|
| ESG Promedio | `ESG Score Prom` |
| Carbon Score | `Carbon Score Prom` |
| Transporte Público | `Transporte Publico Score Prom` |
| Confort Climático | `Confort Climatico Prom` |
| Meses con T > 20°C | `COUNTROWS(FILTER(time_series, time_series[avg_temp_c] > 20))` |
