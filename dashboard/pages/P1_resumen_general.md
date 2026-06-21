# Página 1 — Resumen General (Overview)

**Pregunta que responde:** Vista 360° del estado del sistema turístico español

---

## Layout

```
┌─────────────────────────────────────────────────────────────────┐
│  ATLAS  │  Filtros: Región ▼  Tipo ▼  Año ▼  Mes ▼             │
├──────┬──────┬──────┬──────┬──────────────────────────────────────┤
│ POIs │ Dest │ Sat  │ Infra│                                      │
│16.9K │  14  │  3   │  4   │    MAPA DE ESPAÑA                   │
├──────┴──────┴──────┴──────┤   (ArcGIS / Bing Maps)             │
│  Congestion por destino   │   Burbujas = capacity_index         │
│  (Barra horizontal)       │   Color = status                   │
│                           │                                      │
│  Ocupación hotelera %     │                                      │
│  (Gauge o KPI card)       │   ● Saturado  ● En crecimiento     │
│                           │   ● Infrautilizado                  │
│  Puntuación media reseñas │                                      │
│  (Stars 4.1 ★★★★)        │                                      │
├───────────────────────────┴──────────────────────────────────────┤
│  Visitantes 2023-2024 (línea de tiempo con slicers de mes)       │
└─────────────────────────────────────────────────────────────────┘
```

---

## Visualizaciones

### KPI Cards (fila superior)
| Card | Medida DAX | Formato |
|------|-----------|---------|
| Total POIs | `Total POIs` | 16,932 |
| Destinos | `Total Destinos` | 14 |
| Saturados | `Destinos Saturados` | número con icono 🔴 |
| Infrautilizados | `Destinos Infrautilizados` | número con icono 🟢 |
| Ocupación media | `Ocupacion Hotelera Prom %` | xx.x% |
| ESG Score | `ESG Score Prom` | x.x / 100 |

### Mapa principal
- **Tipo**: Mapa de burbujas (ArcGIS Maps o Bing Maps integrado)
- **Ubicación**: `destination_summary[lat_center]` + `destination_summary[lon_center]`
- **Tamaño burbuja**: `destination_summary[avg_visitors]`
- **Color burbuja**: `destination_summary[status]`
  - Saturado → `#EF4444` (rojo)
  - En crecimiento → `#0EA5E9` (azul)
  - Infrautilizado → `#10B981` (verde)
- **Tooltip**: destination, avg_congestion, avg_esg, avg_sentiment

### Gráfico de barras — Congestión por destino
- **Tipo**: Barra horizontal
- **Eje Y**: `destination_summary[destination]`
- **Eje X**: `destination_summary[avg_congestion]`
- **Color**: escala de semáforo (verde 0-39, amarillo 40-74, rojo 75-100)
- **Referencia**: línea en 75 (umbral saturación)

### Serie temporal de visitantes
- **Tipo**: Línea
- **Eje X**: `time_series[year]` + `time_series[month]`
- **Eje Y**: `Visitantes Seleccion`
- **Leyenda**: `time_series[destination]` (multi-línea, top 5)

---

## Filtros / Slicers
- **Región**: `destination_summary[region]` — dropdown
- **Tipo destino**: `destination_summary[destination_type]` — botones
- **Año**: `time_series[year]` — slider 2023–2024
- **Mes**: `time_series[month]` — 1–12
