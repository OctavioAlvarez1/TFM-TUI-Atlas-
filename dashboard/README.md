# Atlas Dashboard — Power BI

**TUI Care Foundation · Reto 3 · SDG Target 8.9**
Dashboard geoespacial para la gestión de oferta turística en España.

---

## Estructura de archivos

```
dashboard/
├── README.md          ← este archivo (setup guide)
├── measures.dax       ← todas las medidas DAX listas para copiar
├── atlas_dashboard.pbix  ← archivo Power BI (crear manualmente)
└── pages/
    ├── P1_resumen_general.md      ← diseño página 1
    ├── P2_oferta_y_pois.md        ← diseño página 2
    ├── P3_saturacion.md           ← diseño página 3
    ├── P4_oportunidades.md        ← diseño página 4
    └── P5_sostenibilidad_clima.md ← diseño página 5
```

---

## Paso 1 — Conectar los datos

1. Abrir **Power BI Desktop**
2. **Inicio → Obtener datos → Texto o CSV**
3. Cargar **en este orden** (el orden importa para las relaciones):

| Archivo | Ruta | Filas |
|---------|------|-------|
| `destination_summary.csv` | `etl/data/processed/` | 14 |
| `time_series.csv` | `etl/data/processed/` | 336 |
| `reviews_aggregated.csv` | `etl/data/processed/` | 349 |
| `market_origin.csv` | `etl/data/processed/` | 98 |
| `pois.csv` | `etl/data/processed/` | 16,932 |

> ✓ Todas las columnas se detectan automáticamente con delimitador coma y encoding UTF-8.

---

## Paso 2 — Configurar el modelo de datos

En la vista **Modelo** (icono de diagrama), crear las siguientes relaciones:

```
destination_summary[destination]  ──1:N──  time_series[destination]
destination_summary[destination]  ──1:N──  reviews_aggregated[destination]
destination_summary[destination]  ──1:N──  market_origin[destination]
destination_summary[destination]  ──1:N──  pois[destination]
```

**Configuración de cada relación:**
- Cardinalidad: Uno a varios (1:N)
- Dirección del filtro cruzado: Único (→)
- Activa: Sí

---

## Paso 3 — Crear las medidas DAX

1. En la vista **Datos**, seleccionar la tabla `destination_summary`
2. **Nueva medida** → copiar cada bloque de `measures.dax`
3. Organizar en carpetas de presentación (display folder):
   - `KPIs Globales`
   - `Congestión`
   - `Visitantes`
   - `Sostenibilidad ESG`
   - `Clima`
   - `Oportunidades`

---

## Paso 4 — Configurar columnas clave

### En `time_series`:
- `year` → tipo **Número entero**
- `month` → tipo **Número entero** + crear columna:
  ```dax
  Mes Nombre = FORMAT(DATE(2024, time_series[month], 1), "MMM", "es-ES")
  ```
- `congestion_index` → tipo **Número decimal**
- `saturation_risk` → tipo **Verdadero/falso**

### En `destination_summary`:
- `lat_center`, `lon_center` → tipo **Número decimal** + marcar como coordenadas geográficas
  (clic derecho → Categoría de datos → Latitud / Longitud)

### En `pois`:
- `lat`, `lon` → mismo proceso que arriba
- `stars` → tipo **Número decimal**

---

## Paso 5 — Paleta de colores del tema

Usar el tema **Atlas Dark** (consistente con la landing page):

```json
{
  "name": "Atlas",
  "dataColors": [
    "#0EA5E9",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#F97316",
    "#6B7280",
    "#38BDF8"
  ],
  "background": "#0B1220",
  "foreground": "#F1F5F9",
  "tableAccent": "#0EA5E9"
}
```

Guardar como `atlas_theme.json` y aplicar en **Vista → Temas → Examinar**.

---

## Paso 6 — Crear las páginas

Seguir el diseño detallado en cada archivo `pages/P*.md`:

| Página | Archivo | Pregunta clave |
|--------|---------|---------------|
| 1. Resumen General | `P1_resumen_general.md` | Vista 360° del sistema |
| 2. Oferta & POIs | `P2_oferta_y_pois.md` | ¿Dónde se concentra la oferta? |
| 3. Saturación | `P3_saturacion.md` | ¿Dónde hay riesgo de colapso? |
| 4. Oportunidades | `P4_oportunidades.md` | ¿Dónde invertir? |
| 5. Sostenibilidad | `P5_sostenibilidad_clima.md` | ESG + clima |

---

## Escala de congestión (referencia visual)

| Rango | Etiqueta | Color hex | Color nombre |
|-------|---------|-----------|-------------|
| 0 – 39 | Bajo | `#10B981` | Verde esmeralda |
| 40 – 59 | Moderado | `#F59E0B` | Amarillo ámbar |
| 60 – 74 | Alto | `#F97316` | Naranja |
| 75 – 79 | Riesgo | `#EF4444` | Rojo |
| 80 – 100 | Crítico | `#7F1D1D` | Rojo oscuro |

---

## Fuentes de datos integradas

| Fuente | Variable | Cobertura |
|--------|---------|-----------|
| INE EOH | `hotel_occupancy_pct` | 13/14 destinos, mensual |
| INE FRONTUR | `visitors` (intl) | 14/14 destinos, mensual |
| AEMET | `avg_temp_c`, `climate_comfort` | 12–13/14 destinos, mensual |
| Horizon (Reto 2) | `congestion_index`, `avg_esg` | 10+2/14 destinos |
| OSM Overpass | POIs (pois.csv) | 16,932 puntos, 14 destinos |
| Sintético | Gap-filling temporal | Todos los destinos |

---

## Publicar a Power BI Service (opcional)

1. **Inicio → Publicar** → seleccionar workspace del equipo TUI
2. Configurar **actualización programada** si los datos cambian
3. Compartir enlace del dashboard con el tutor/tribunal
