import { Box, Typography, Chip, Button } from "@mui/material";
import { useLanguage } from "../../context/LanguageContext";

export interface HeroSlide {
  label: string;
  title: string;
  stats: { label: string; value: string; change?: string }[];
  aiInsight: string;
  aiInsightCta: string;
  donut?: { label: string; pct: string }[];
}

// Coastal / warm-sea palette
const STAT_COLORS = ["#0DD3C5", "#F97316", "#EAB308", "#22D3EE"];
const DONUT_COLORS = ["#0DD3C5", "#F97316", "#EAB308", "#22D3EE", "#818CF8"];

// Two-layer wave chart — turquoise current year + amber last year
const WaveChart = () => (
  <Box
    sx={{
      position: "relative",
      height: 76,
      width: "100%",
      bgcolor: "rgba(13,211,197,0.04)",
      borderRadius: "10px",
      overflow: "hidden",
    }}
  >
    {/* Dot grid — geographic map feel */}
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        backgroundImage: "radial-gradient(rgba(255,255,255,0.028) 1px, transparent 1px)",
        backgroundSize: "16px 16px",
      }}
    />
    <svg
      viewBox="0 0 300 76"
      preserveAspectRatio="none"
      style={{ width: "100%", height: "100%", display: "block", position: "relative", zIndex: 1 }}
    >
      <defs>
        <linearGradient id="waveMain" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0DD3C5" stopOpacity="0.30" />
          <stop offset="100%" stopColor="#0DD3C5" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="waveSecond" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EAB308" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#EAB308" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Horizon guide */}
      <line x1="0" y1="38" x2="300" y2="38" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      {/* Prior-year wave (amber, slower) */}
      <path
        d="M0,58 C50,52 100,64 150,56 C200,48 250,40 300,42 L300,76 L0,76 Z"
        fill="url(#waveSecond)"
      />
      <path
        d="M0,58 C50,52 100,64 150,56 C200,48 250,40 300,42"
        fill="none"
        stroke="#EAB308"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.45"
      />
      {/* Current-year wave (turquoise) */}
      <path
        d="M0,65 C28,54 58,37 90,42 C122,47 152,28 185,24 C215,20 252,15 300,13 L300,76 L0,76 Z"
        fill="url(#waveMain)"
      />
      <path
        d="M0,65 C28,54 58,37 90,42 C122,47 152,28 185,24 C215,20 252,15 300,13"
        fill="none"
        stroke="#0DD3C5"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Peak highlight */}
      <circle cx="185" cy="24" r="3.5" fill="#0DD3C5" />
      <circle cx="185" cy="24" r="7" fill="#0DD3C5" opacity="0.18" />
    </svg>
    {/* Year legend */}
    <Box
      sx={{
        position: "absolute",
        bottom: 5,
        right: 8,
        display: "flex",
        gap: 1.2,
        zIndex: 2,
      }}
    >
      {[{ c: "#0DD3C5", l: "2024" }, { c: "#EAB308", l: "2023" }].map((item) => (
        <Box key={item.l} sx={{ display: "flex", alignItems: "center", gap: 0.4 }}>
          <Box sx={{ width: 12, height: 2, bgcolor: item.c, borderRadius: 1 }} />
          <Typography sx={{ fontSize: ".5rem", color: "rgba(255,255,255,.32)" }}>{item.l}</Typography>
        </Box>
      ))}
    </Box>
  </Box>
);

const CoastalDonut = ({ items }: { items: { label: string; pct: string }[] }) => (
  <Box sx={{ display: "flex", flexDirection: "row", gap: 1.5, alignItems: "center" }}>
    <Box sx={{ position: "relative", width: 64, height: 64, flexShrink: 0 }}>
      <svg viewBox="0 0 64 64" style={{ width: 64, height: 64, transform: "rotate(-90deg)" }}>
        <circle cx="32" cy="32" r="24" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
        <circle cx="32" cy="32" r="24" fill="none" stroke="#0DD3C5" strokeWidth="8" strokeDasharray="43 108" />
        <circle cx="32" cy="32" r="24" fill="none" stroke="#F97316" strokeWidth="8" strokeDasharray="37 108" strokeDashoffset="-43" />
        <circle cx="32" cy="32" r="24" fill="none" stroke="#EAB308" strokeWidth="8" strokeDasharray="31 108" strokeDashoffset="-80" />
        <circle cx="32" cy="32" r="24" fill="none" stroke="#22D3EE" strokeWidth="8" strokeDasharray="24 108" strokeDashoffset="-111" />
      </svg>
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography sx={{ fontSize: ".5rem", color: "rgba(255,255,255,.32)", letterSpacing: ".05em" }}>
          %
        </Typography>
      </Box>
    </Box>
    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.45, flex: 1, minWidth: 0 }}>
      {items.map((item, i) => (
        <Box key={item.label} sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Box
            sx={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              bgcolor: DONUT_COLORS[i % DONUT_COLORS.length],
              flexShrink: 0,
              boxShadow: `0 0 4px ${DONUT_COLORS[i % DONUT_COLORS.length]}66`,
            }}
          />
          <Typography sx={{ fontSize: ".61rem", color: "rgba(255,255,255,.55)", flex: 1 }}>{item.label}</Typography>
          <Typography sx={{ fontSize: ".61rem", color: "rgba(255,255,255,.9)", fontWeight: 700 }}>{item.pct}</Typography>
        </Box>
      ))}
    </Box>
  </Box>
);

interface Props {
  slide?: HeroSlide;
}

const MockDashboardCard = ({ slide }: Props) => {
  const { locale } = useLanguage();
  const h = locale.hero;

  const activeLabel        = slide?.label ?? h.dashboardLabel;
  const activeTitle        = slide?.title ?? h.dashboardTitle;
  const activeStats        = slide?.stats ?? [
    { label: h.kpi.arrivals,       value: h.kpi.arrivalsValue,       change: h.kpi.arrivalsChange },
    { label: h.kpi.occupancy,      value: h.kpi.occupancyValue,      change: h.kpi.occupancyChange },
    { label: h.kpi.rate,           value: h.kpi.rateValue,           change: h.kpi.rateChange },
    { label: h.kpi.sustainability, value: h.kpi.sustainabilityValue, change: h.kpi.sustainabilityChange },
  ];
  const activeAiInsight    = slide?.aiInsight    ?? h.aiInsightText;
  const activeAiInsightCta = slide?.aiInsightCta ?? h.aiInsightCta;
  const activeDonut        = slide === undefined ? h.donutLegend : slide.donut;

  return (
    <Box
      sx={{
        backdropFilter: "blur(24px)",
        background: "linear-gradient(158deg, rgba(5,62,78,0.97) 0%, rgba(3,44,58,0.95) 100%)",
        border: "1px solid rgba(13,211,197,0.22)",
        borderRadius: "22px",
        p: { xs: 2, md: 2.5 },
        maxWidth: 460,
        width: "100%",
        boxShadow: "0 28px 80px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.04), 0 0 0 1px rgba(13,211,197,0.05)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Sunset gradient top bar */}
      <Box
        sx={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: 3,
          background: "linear-gradient(90deg, #0DD3C5 0%, #22D3EE 20%, #818CF8 50%, #F97316 78%, #EAB308 100%)",
          opacity: 0.8,
        }}
      />

      {/* Sun-on-water warm glow (top-right) */}
      <Box
        sx={{
          position: "absolute",
          top: -50, right: -50,
          width: 220, height: 220,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 65%)",
          filter: "blur(24px)",
          pointerEvents: "none",
        }}
      />

      {/* Turquoise glow (bottom-left) */}
      <Box
        sx={{
          position: "absolute",
          bottom: -40, left: -40,
          width: 180, height: 180,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(13,211,197,0.08) 0%, transparent 65%)",
          filter: "blur(20px)",
          pointerEvents: "none",
        }}
      />

      {/* Dot grid */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(rgba(255,255,255,0.022) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <Box sx={{ position: "relative", zIndex: 1 }}>

        {/* ── Header ── */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 1.5,
            mt: 0.5,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: 0 }}>
            <Chip
              label={"📍 " + activeLabel}
              size="small"
              sx={{
                bgcolor: "rgba(13,211,197,0.12)",
                color: "#0DD3C5",
                fontSize: ".58rem",
                fontWeight: 700,
                height: 20,
                letterSpacing: ".06em",
                flexShrink: 0,
              }}
            />
            <Typography
              sx={{
                fontSize: ".82rem",
                fontWeight: 700,
                color: "rgba(255,255,255,.92)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {activeTitle}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 0.5, flexShrink: 0 }}>
            <Chip
              label={h.dashboardRegion}
              size="small"
              sx={{ bgcolor: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,.45)", fontSize: ".57rem", height: 18 }}
            />
            <Chip
              label="Jul 2024"
              size="small"
              sx={{ bgcolor: "rgba(234,179,8,0.10)", color: "#EAB308", fontSize: ".57rem", height: 18 }}
            />
          </Box>
        </Box>

        {/* ── KPI grid ── */}
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, mb: 1.5 }}>
          {activeStats.map((kpi, i) => (
            <Box
              key={kpi.label}
              sx={{
                bgcolor: "rgba(255,255,255,0.03)",
                border: `1px solid ${STAT_COLORS[i % 4]}1A`,
                borderRadius: "10px",
                p: 1.2,
              }}
            >
              <Typography sx={{ fontSize: ".58rem", color: "rgba(255,255,255,.38)", mb: 0.3 }}>
                {kpi.label}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.5 }}>
                <Typography sx={{ fontSize: ".95rem", fontWeight: 800, color: "#FFF" }}>
                  {kpi.value}
                </Typography>
                {kpi.change && (
                  <Typography sx={{ fontSize: ".6rem", color: "#0DD3C5", fontWeight: 600 }}>
                    {kpi.change}
                  </Typography>
                )}
              </Box>
              {/* Gradient underline bar */}
              <Box
                sx={{
                  mt: 0.5,
                  height: 2,
                  borderRadius: 1,
                  background: `linear-gradient(90deg, ${STAT_COLORS[i % 4]}, transparent)`,
                  width: "68%",
                  opacity: 0.65,
                }}
              />
            </Box>
          ))}
        </Box>

        {/* ── Wave chart ── */}
        <Box sx={{ mb: 1.5 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
            <Typography sx={{ fontSize: ".6rem", color: "rgba(255,255,255,.32)", textTransform: "uppercase", letterSpacing: ".1em" }}>
              {h.chartLabel}
            </Typography>
            <Typography sx={{ fontSize: ".58rem", color: "#0DD3C5", fontWeight: 600 }}>
              ↑ +12.5%
            </Typography>
          </Box>
          <WaveChart />
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 0.3, px: 0.5 }}>
            {["E", "F", "M", "A", "M", "J", "J"].map((m, idx) => (
              <Typography key={idx} sx={{ fontSize: ".52rem", color: "rgba(255,255,255,.18)" }}>
                {m}
              </Typography>
            ))}
          </Box>
        </Box>

        {/* ── Donut (per-slide, optional) ── */}
        {activeDonut && activeDonut.length > 0 && (
          <Box sx={{ mb: 1.5 }}>
            <Typography sx={{ fontSize: ".6rem", color: "rgba(255,255,255,.32)", mb: 0.6, textTransform: "uppercase", letterSpacing: ".1em" }}>
              {h.donutLabel}
            </Typography>
            <CoastalDonut items={activeDonut} />
          </Box>
        )}

        {/* ── Perspectiva (replaces cold "AI Insight") ── */}
        <Box
          sx={{
            bgcolor: "rgba(249,115,22,0.08)",
            border: "1px solid rgba(249,115,22,0.18)",
            borderRadius: "12px",
            p: 1.2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mb: 0.5 }}>
            <Box
              sx={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                bgcolor: "#F97316",
                boxShadow: "0 0 6px #F9731688",
                flexShrink: 0,
              }}
            />
            <Typography
              sx={{
                fontSize: ".58rem",
                color: "#FB923C",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: ".1em",
              }}
            >
              Perspectiva
            </Typography>
          </Box>
          <Typography
            sx={{
              fontSize: ".68rem",
              color: "rgba(255,255,255,.68)",
              lineHeight: 1.55,
              mb: 0.6,
            }}
          >
            {activeAiInsight}
          </Typography>
          <Button
            size="small"
            onClick={() =>
              document.getElementById("dashboard-preview")?.scrollIntoView({ behavior: "smooth" })
            }
            sx={{
              color: "#F97316",
              fontSize: ".63rem",
              fontWeight: 700,
              p: 0,
              minWidth: 0,
              textTransform: "none",
              "&:hover": { background: "transparent", opacity: 0.75 },
            }}
          >
            {activeAiInsightCta}
          </Button>
        </Box>

      </Box>
    </Box>
  );
};

export default MockDashboardCard;
