# Página 3 — Riesgo de Saturación

**Pregunta que responde:** ¿Dónde existen riesgos de saturación?

---

## Layout

```
┌─────────────────────────────────────────────────────────────────┐
│  Filtros: Año ▼  Mes ▼  Umbral congestión ─────────────── 75   │
├──────────────────────────┬──────────────────────────────────────┤
│  HEATMAP                 │  Semáforo de destinos               │
│  Destino vs Mes          │                                      │
│  Color = congestion_idx  │  🔴 CRÍTICO (≥80): Barcelona,       │
│                          │     Mallorca, Tenerife              │
│  Ene Feb Mar ... Dic     │  🟠 ALTO (60-79): Madrid,           │
│  Barcelona ████░░░█████  │     Costa del Sol, Costa Brava      │
│  Mallorca  ░░░░████████  │  🟡 MODERADO (40-59): Sevilla,      │
│  Madrid    ░██░░░░░░░░░  │     Valencia, Granada, S.Sebastián  │
│  ...                     │  🟢 BAJO (<40): Ronda, Extremadura, │
│                          │     Picos, Teruel                   │
├──────────────────────────┴──────────────────────────────────────┤
│  Serie temporal congestión (línea) — top 5 destinos más altos  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Visualizaciones

### Heatmap (matriz)
- **Tipo**: Matrix visual (o Table con formato condicional)
- **Filas**: `time_series[destination]`
- **Columnas**: `time_series[month]` (1-12, etiquetas Ene-Dic)
- **Valores**: `AVERAGE(time_series[congestion_index])`
- **Formato condicional** (escala de color):
  - 0–39: `#10B981` (verde) — Bajo
  - 40–59: `#F59E0B` (amarillo) — Moderado
  - 60–74: `#F97316` (naranja) — Alto
  - 75–79: `#EF4444` (rojo claro) — Riesgo
  - 80–100: `#7F1D1D` (rojo oscuro) — Crítico

### Semáforo (tabla con iconos)
- **Tipo**: Table con columna calculada de iconos
- Columna `Nivel`:
  ```dax
  Nivel Congestion =
  IF([avg_congestion] >= 80, "CRITICO",
  IF([avg_congestion] >= 60, "ALTO",
  IF([avg_congestion] >= 40, "MODERADO", "BAJO")))
  ```
- Formato condicional por nivel (color fondo de fila)

### Serie temporal
- **Tipo**: Línea con marcadores
- **Eje X**: fecha (year-month)
- **Eje Y**: `Congestion Seleccion`
- **Leyenda**: top 5 destinos por congestion media
- **Banda de referencia**: línea horizontal en 75 (umbral saturación)

---

## Alertas automáticas (tarjeta condicional)
```dax
Mensaje Alerta =
VAR MaxCong = MAX(time_series[congestion_index])
RETURN
IF(MaxCong >= 80,
   "ALERTA: " & SELECTEDVALUE(time_series[destination]) & " en nivel CRÍTICO",
   "Sistema en niveles normales"
)
```

Colocar como tarjeta de texto dinámico en la parte superior con fondo rojo/verde según valor.
