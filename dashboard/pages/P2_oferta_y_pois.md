# Página 2 — Oferta Turística & POIs

**Pregunta que responde:** ¿Dónde se concentra la oferta turística?

---

## Layout

```
┌─────────────────────────────────────────────────────────────────┐
│  Filtros: Destino ▼  Tipo de activo ▼  Categoría ▼             │
├─────────────────────────────┬───────────────────────────────────┤
│  MAPA DE DENSIDAD DE POIs   │  Distribución por tipo de activo  │
│  (16,932 puntos)            │  (Donut chart)                   │
│                             │  Alojamiento / Restauración /    │
│  Punto = POI                │  Atracción / Transporte /        │
│  Color = asset_type         │  Patrimonio / Naturaleza         │
│                             ├───────────────────────────────────┤
│                             │  Top 10 destinos por POIs        │
│                             │  (Barra vertical)                │
├─────────────────────────────┴───────────────────────────────────┤
│  Tabla detalle POIs (nombre, destino, tipo, estrellas, lat/lon) │
└─────────────────────────────────────────────────────────────────┘
```

---

## Visualizaciones

### Mapa de POIs (principal)
- **Tipo**: Mapa de puntos (ArcGIS o Power BI Maps)
- **Lat**: `pois[lat]`  |  **Lon**: `pois[lon]`
- **Color**: `pois[asset_type]`
  - Alojamiento → `#0EA5E9`
  - Restauración → `#F59E0B`
  - Atracción → `#8B5CF6`
  - Patrimonio → `#EF4444`
  - Naturaleza → `#10B981`
  - Transporte → `#6B7280`
- **Tooltip**: `pois[name]`, `pois[asset_type]`, `pois[destination]`, `pois[stars]`
- **Drill-through**: al hacer clic → tabla filtrada de ese destino

### Donut — Distribución por tipo
- **Valores**: COUNT de `pois[poi_id]`
- **Leyenda**: `pois[asset_type]`
- **Colores**: mismos que el mapa

### Barra vertical — POIs por destino
- **Eje X**: `pois[destination]`
- **Eje Y**: COUNT(`pois[poi_id]`)
- **Ordenado**: descendente
- **Color**: `destination_summary[status]` (join por destination)

### Tabla detalle
Columnas: `name | destination | asset_type | stars | cuisine | website`
- Filtrada por selección en mapa o donut
- Paginación: 20 filas

---

## KPIs de página
| KPI | Fórmula |
|-----|---------|
| Total POIs | `COUNTROWS(pois)` |
| Hoteles | `COUNTROWS(FILTER(pois, pois[category] = "accommodation"))` |
| Restaurantes | `COUNTROWS(FILTER(pois, pois[category] = "food_beverage"))` |
| Atracciones | `COUNTROWS(FILTER(pois, pois[category] = "attraction"))` |
