# Página 4 — Oportunidades de Crecimiento e Inversión

**Pregunta que responde:** ¿Qué zonas tienen potencial de crecimiento? ¿Dónde invertir?

---

## Lógica de oportunidad

Un destino es **oportunidad de inversión** cuando cumple al menos 2 de:
- `capacity_index < 50` (poca oferta instalada)
- `avg_sentiment >= 3.8` (visitantes satisfechos)
- `avg_congestion < 60` (no saturado)
- `avg_esg >= 60` (sostenible / atractivo para turismo responsable)

Destinos candidatos actuales: **Ronda, Picos de Europa, Extremadura, Teruel**

---

## Layout

```
┌─────────────────────────────────────────────────────────────────┐
│  Pregunta: ¿Dónde invertir? Matriz oferta vs demanda            │
├─────────────────────────────┬───────────────────────────────────┤
│  SCATTER PLOT               │  Ranking de oportunidades         │
│                             │                                   │
│  Eje X: capacity_index      │  1. Picos de Europa  Score: 82   │
│  Eje Y: avg_sentiment       │  2. Extremadura      Score: 78   │
│  Tamaño: avg_visitors       │  3. Ronda            Score: 71   │
│  Color: status              │  4. Teruel           Score: 65   │
│                             │  ...                              │
│  Zona verde = oportunidad   │                                   │
│  (bajo capacity, alto sent) │                                   │
├─────────────────────────────┴───────────────────────────────────┤
│  Perfil detallado del destino seleccionado                      │
│  [Capacity] [Congestion] [Sentiment] [ESG] [Clima] [Visitantes] │
└─────────────────────────────────────────────────────────────────┘
```

---

## Visualizaciones

### Scatter plot — Matriz oferta vs demanda
- **Tipo**: Scatter chart
- **Eje X**: `destination_summary[capacity_index]` (0-100, menos es más oportunidad)
- **Eje Y**: `destination_summary[avg_sentiment]` (1-5)
- **Tamaño burbuja**: `destination_summary[avg_visitors]`
- **Color**: `destination_summary[status]`
- **Etiqueta**: `destination_summary[destination]`
- **Cuadrante de oportunidad**: zona en esquina inferior-izquierda (bajo capacity, alto sentiment)
  - Añadir forma rectángulo semitransparente verde en ese cuadrante con texto "OPORTUNIDAD"

### Ranking de oportunidades (tabla rankeada)
- **Medida**: `Score Oportunidad` (ver measures.dax)
- Ordenada descendente
- Columnas: destination | capacity_index | avg_sentiment | avg_congestion | avg_esg | Score
- Formato condicional en Score: mayor = más verde

### Tarjetas de perfil (al seleccionar destino)
Usar bookmarks o drill-through para mostrar:
- **Capacity Index**: gauge 0-100
- **Congestion Media**: gauge 0-100
- **Sentimiento**: stars rating
- **ESG Score**: gauge 0-100
- **Temperatura media**: número con ícono
- **Tipo de destino**: badge (rural / coastal / urban / island / cultural)

---

## Insight narrativo (cuadro de texto)
Añadir cuadro de texto con el insight dinámico del ejemplo del brief:

> "El sistema detecta que **Picos de Europa**, **Extremadura** y **Ronda** tienen buena 
> accesibilidad, alto valor natural y excelentes valoraciones de visitantes, pero apenas 
> aparecen en la oferta comercial disponible. Estas zonas representan una oportunidad 
> real de diversificación y desarrollo turístico sostenible."
