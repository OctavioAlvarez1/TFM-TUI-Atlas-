import type { Locale } from "./en";

export const es: Locale = {
  nav: {
    destinations: "Destinos",
    insights: "Análisis",
    analytics: "Analítica",
    about: "Acerca de",
    comingSoon: "Próximamente",
  },
  hero: {
    badge: "INTELIGENCIA TURÍSTICA CON IA",
    title: "Dashboards de IA para una Gestión Inteligente del Destino",
    subtitle:
      "Explora métricas clave, monitoriza la dinámica turística y toma decisiones basadas en datos con nuestros dashboards interactivos.",
    ctaPrimary: "Explorar Dashboards",
    ctaSecondary: "Saber Más",
    dashboardLabel: "VISIÓN GENERAL",
    dashboardTitle: "Oferta y Demanda Turística",
    dashboardRegion: "Todas las Regiones",
    dashboardDate: "1 Jul – 31 Jul, 2024",
    kpi: {
      arrivals: "Total Llegadas",
      arrivalsValue: "22.5M",
      arrivalsChange: "+12.5%",
      occupancy: "Ocupación Hotelera",
      occupancyValue: "72%",
      occupancyChange: "+8.2%",
      rate: "Tarifa Media Diaria",
      rateValue: "134.7€",
      rateChange: "+15.3%",
      sustainability: "Puntuación Sostenibilidad",
      sustainabilityValue: "68/100",
      sustainabilityChange: "+6.1%",
    },
    chartLabel: "Llegadas Turísticas en el Tiempo",
    donutLabel: "Llegadas por Región",
    donutLegend: [
      { label: "Cataluña", pct: "28%" },
      { label: "Islas Baleares", pct: "24%" },
      { label: "Islas Canarias", pct: "18%" },
      { label: "Andalucía", pct: "16%" },
      { label: "Otros", pct: "14%" },
    ],
    aiInsight: "Insight IA",
    aiInsightText:
      "Las Islas Canarias muestran alto crecimiento de demanda con congestión moderada. Considera estrategias de redistribución de demanda para un crecimiento sostenible.",
    aiInsightCta: "Ver Recomendaciones →",
  },
  features: {
    heading: "¿Por qué Atlas?",
    items: [
      {
        title: "Interactivo y en Tiempo Real",
        description: "Los dashboards se actualizan en tiempo real con los últimos datos.",
      },
      {
        title: "Insights con IA",
        description: "Insights automatizados y recomendaciones para la acción.",
      },
      {
        title: "Georreferenciado",
        description: "Análisis espacial y mapas para una mejor comprensión.",
      },
      {
        title: "Exportar y Compartir",
        description: "Exporta informes y comparte insights con tu equipo.",
      },
    ],
  },
  stats: [
    { value: "120K+", label: "POIs monitorizados" },
    { value: "20", label: "Destinos analizados" },
    { value: "15+", label: "Fuentes de datos integradas" },
    { value: "Diaria", label: "Actualización" },
  ],
  dashboardPreview: {
    badge: "Dashboard Inteligente",
    heading: "Dashboard Inteligente",
    subtitle: "Explora visualizaciones interactivas diseñadas para la toma de decisiones",
    cards: [
      {
        title: "Oferta Turística Georreferenciada",
        label: "MAPA DE OFERTA",
        stats: [
          { label: "Hoteles", value: "25.8K" },
          { label: "Restaurantes", value: "18.4K" },
          { label: "Experiencias", value: "9.2K" },
          { label: "Atracciones", value: "6.1K" },
        ],
        aiInsight: "Barcelona y Madrid concentran el 43% de la oferta. 8 zonas rurales detectadas con alta valoración pero baja visibilidad comercial.",
        aiInsightCta: "Ver Mapa →",
      },
      {
        title: "Demanda & Comportamiento",
        label: "ANALÍTICA DE DEMANDA",
        stats: [
          { label: "Visitantes", value: "22.5M" },
          { label: "Satisfacción", value: "4.3/5" },
          { label: "Reseñas", value: "890K" },
          { label: "Crecimiento", value: "+12.5%" },
        ],
        donut: [
          { label: "Parejas", pct: "38%" },
          { label: "Familias", pct: "27%" },
          { label: "Amigos", pct: "20%" },
          { label: "Viajeros solitarios", pct: "15%" },
        ],
        aiInsight: "Las Islas Canarias muestran alto crecimiento de demanda con congestión moderada. Considera estrategias de redistribución de demanda.",
        aiInsightCta: "Ver Recomendaciones →",
      },
      {
        title: "Riesgos de Saturación",
        label: "ALERTAS DE CONGESTIÓN",
        stats: [
          { label: "Zonas críticas", value: "12" },
          { label: "Índice congestión", value: "78/100" },
          { label: "Variación", value: "+14%" },
          { label: "Alertas activas", value: "5" },
        ],
        aiInsight: "Costa Brava y Mallorca alcanzan niveles críticos en temporada alta. Se recomienda implementar medidas de regulación de flujos.",
        aiInsightCta: "Ver Alertas →",
      },
      {
        title: "Oportunidades de Crecimiento",
        label: "OPORTUNIDADES",
        stats: [
          { label: "Zonas potenciales", value: "23" },
          { label: "Inversión estimada", value: "134M€" },
          { label: "ROI proyectado", value: "+26%" },
          { label: "Nuevas rutas", value: "7" },
        ],
        aiInsight: "23 zonas rurales con alta accesibilidad y excelentes valoraciones están infrarepresentadas en la oferta comercial actual.",
        aiInsightCta: "Ver Oportunidades →",
      },
    ],
  },
  keyQuestions: {
    badge: "Preguntas Clave",
    heading: "Responde preguntas clave. Toma decisiones con impacto.",
    items: [
      {
        icon: "📍",
        text: "¿Dónde se concentra actualmente la oferta turística?",
      },
      {
        icon: "📈",
        text: "¿Qué zonas tienen potencial de crecimiento, pero poca visibilidad?",
      },
      {
        icon: "⚠️",
        text: "¿Dónde existen riesgos de saturación?",
      },
      {
        icon: "💼",
        text: "¿Qué oportunidades de inversión o diversificación podemos identificar?",
      },
    ],
  },
  dataSources: {
    badge: "Fuentes de Datos",
    heading: "Integramos múltiples fuentes de datos abiertos y privadas",
    sources: [
      { name: "OpenStreetMap", type: "Geoespacial" },
      { name: "INE", type: "Demografía" },
      { name: "AEMET", type: "Clima" },
      { name: "Google", type: "Movilidad" },
      { name: "Tripadvisor", type: "Reputación" },
      { name: "Booking.com", type: "Alojamientos" },
      { name: "TRANSPORTES", type: "Transporte" },
      { name: "+ Más", type: "Conectores" },
    ],
  },
  howItWorks: {
    badge: "Cómo Funciona",
    heading: "Cómo funciona",
    steps: [
      {
        num: "01",
        title: "Conectamos datos",
        desc: "Integramos múltiples fuentes de datos abiertos y privadas.",
      },
      {
        num: "02",
        title: "Analizamos con IA",
        desc: "Modelos de IA detectan patrones, oportunidades y riesgos.",
      },
      {
        num: "03",
        title: "Visualizamos insights",
        desc: "Dashboards interactivos para exploración y seguimiento.",
      },
      {
        num: "04",
        title: "Decisiones con impacto",
        desc: "Planificación estratégica basada en datos confiables.",
      },
    ],
    ctaTitle: "Convierte tu destino en un destino inteligente.",
    ctaSubtitle:
      "Accede a dashboards avanzados, insights con IA y análisis geoespacial de todo el territorio español.",
    ctaPrimary: "Solicitar demo →",
    ctaSecondary: "Ver caso de éxito →",
  },
  footer: {
    tagline: "Analítica Geoespacial del Turismo",
    description:
      "Dashboard geoespacial impulsado por IA para la monitorización del turismo sostenible en España. Desarrollado como parte del programa Future Shapers Spain de TUI Care Foundation.",
    features: {
      heading: "Características",
      items: [
        "Análisis Geoespacial",
        "Monitorización de Congestión",
        "Insights con IA",
        "Exportar e Informes",
      ],
    },
    technology: {
      heading: "Tecnología",
      items: ["React 19 + TypeScript", "Material UI v9", "Framer Motion", "APIs de Datos Abiertos"],
    },
    project: {
      heading: "Sobre el proyecto",
      university: "TFM — Universidad Complutense de Madrid",
      description:
        "Reto 3: Dashboard geoespacial de congestión y sostenibilidad para inteligencia de destino y planificación estratégica.",
      problemTitle: "El problema",
      problemText:
        "El 85% de los turistas visita solo el 10% de los destinos. Atlas visualiza la presión geográfica en España para ayudar a los gestores de destinos a tomar decisiones basadas en datos.",
    },
    copyright: "© 2024 Horizon by TUI. All rights reserved.",
    bottomLinks: ["Acerca de", "Metodología", "Fuentes de datos"],
  },
};
