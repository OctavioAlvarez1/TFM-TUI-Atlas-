import { Box, Typography, Chip, Button } from "@mui/material";
import { useLanguage } from "../../context/LanguageContext";

// Fake line chart using SVG
const FakeLineChart = () => (
  <Box
    sx={{
      position: "relative",
      height: 80,
      width: "100%",
      bgcolor: "rgba(14,165,233,0.04)",
      borderRadius: "8px",
      overflow: "hidden",
    }}
  >
    <svg
      viewBox="0 0 300 80"
      preserveAspectRatio="none"
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0.0" />
        </linearGradient>
      </defs>
      <path
        d="M0,60 C30,55 60,30 90,35 C120,40 150,20 180,22 C210,24 240,18 270,15 L300,14 L300,80 L0,80 Z"
        fill="url(#chartGrad)"
      />
      <path
        d="M0,60 C30,55 60,30 90,35 C120,40 150,20 180,22 C210,24 240,18 270,15 L300,14"
        fill="none"
        stroke="#0EA5E9"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="180" cy="22" r="3" fill="#0EA5E9" />
    </svg>
    {[20, 40, 60].map((y) => (
      <Box
        key={y}
        sx={{
          position: "absolute",
          left: 0,
          right: 0,
          top: `${y}px`,
          borderBottom: "1px dashed rgba(255,255,255,0.06)",
        }}
      />
    ))}
  </Box>
);

// Fake donut chart using SVG circles
const FakeDonutChart = ({ items }: { items: { label: string; pct: string }[] }) => {
  const colors = ["#0EA5E9", "#10B981", "#F59E0B", "#6366F1", "#EF4444"];
  return (
    <Box sx={{ display: "flex", flexDirection: "row", gap: 1.5, alignItems: "center" }}>
      {/* Donut visual */}
      <Box sx={{ position: "relative", width: 64, height: 64, flexShrink: 0 }}>
        <svg viewBox="0 0 64 64" style={{ width: 64, height: 64, transform: "rotate(-90deg)" }}>
          <circle cx="32" cy="32" r="24" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
          <circle cx="32" cy="32" r="24" fill="none" stroke="#0EA5E9" strokeWidth="8"
            strokeDasharray="43 108" strokeDashoffset="0" />
          <circle cx="32" cy="32" r="24" fill="none" stroke="#10B981" strokeWidth="8"
            strokeDasharray="37 108" strokeDashoffset="-43" />
          <circle cx="32" cy="32" r="24" fill="none" stroke="#F59E0B" strokeWidth="8"
            strokeDasharray="31 108" strokeDashoffset="-80" />
          <circle cx="32" cy="32" r="24" fill="none" stroke="#6366F1" strokeWidth="8"
            strokeDasharray="24 108" strokeDashoffset="-111" />
          <circle cx="32" cy="32" r="24" fill="none" stroke="#EF4444" strokeWidth="8"
            strokeDasharray="20 108" strokeDashoffset="-135" />
        </svg>
      </Box>
      {/* Legend */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.4, flex: 1, minWidth: 0 }}>
        {items.map((item, i) => (
          <Box key={item.label} sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 0.5 }}>
            <Box
              sx={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                bgcolor: colors[i % colors.length],
                flexShrink: 0,
              }}
            />
            <Typography sx={{ fontSize: ".62rem", color: "rgba(255,255,255,.6)", flex: 1 }}>
              {item.label}
            </Typography>
            <Typography sx={{ fontSize: ".62rem", color: "rgba(255,255,255,.9)", fontWeight: 700, flexShrink: 0 }}>
              {item.pct}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

const MockDashboardCard = () => {
  const { locale } = useLanguage();
  const h = locale.hero;

  return (
    <Box
      sx={{
        backdropFilter: "blur(20px)",
        background: "rgba(17,24,39,0.85)",
        border: "1px solid rgba(255,255,255,0.10)",
        borderRadius: "20px",
        p: { xs: 2, md: 2.5 },
        maxWidth: 460,
        width: "100%",
        boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
        position: "relative",
      }}
    >
      {/* Card header */}
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", mb: 1.5 }}>
        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 1 }}>
          <Chip
            label={h.dashboardLabel}
            size="small"
            sx={{
              bgcolor: "rgba(14,165,233,0.15)",
              color: "#38BDF8",
              fontSize: ".6rem",
              fontWeight: 700,
              height: 20,
              letterSpacing: ".08em",
            }}
          />
          <Typography sx={{ fontSize: ".82rem", fontWeight: 700, color: "rgba(255,255,255,.9)" }}>
            {h.dashboardTitle}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 0.5 }}>
          <Chip
            label={h.dashboardRegion}
            size="small"
            sx={{
              bgcolor: "rgba(255,255,255,0.06)",
              color: "rgba(255,255,255,.6)",
              fontSize: ".6rem",
              height: 20,
            }}
          />
          <Chip
            label={h.dashboardDate}
            size="small"
            sx={{
              bgcolor: "rgba(255,255,255,0.06)",
              color: "rgba(255,255,255,.6)",
              fontSize: ".6rem",
              height: 20,
            }}
          />
        </Box>
      </Box>

      {/* 4 KPI boxes */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 1,
          mb: 1.5,
        }}
      >
        {[
          { label: h.kpi.arrivals, value: h.kpi.arrivalsValue, change: h.kpi.arrivalsChange, color: "#0EA5E9" },
          { label: h.kpi.occupancy, value: h.kpi.occupancyValue, change: h.kpi.occupancyChange, color: "#10B981" },
          { label: h.kpi.rate, value: h.kpi.rateValue, change: h.kpi.rateChange, color: "#F59E0B" },
          { label: h.kpi.sustainability, value: h.kpi.sustainabilityValue, change: h.kpi.sustainabilityChange, color: "#6366F1" },
        ].map((kpi) => (
          <Box
            key={kpi.label}
            sx={{
              bgcolor: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "10px",
              p: 1.2,
            }}
          >
            <Typography sx={{ fontSize: ".6rem", color: "rgba(255,255,255,.45)", mb: 0.3 }}>
              {kpi.label}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "baseline", gap: 0.5 }}>
              <Typography sx={{ fontSize: ".95rem", fontWeight: 800, color: "#FFF" }}>
                {kpi.value}
              </Typography>
              <Typography sx={{ fontSize: ".6rem", color: "#10B981", fontWeight: 600 }}>
                {kpi.change}
              </Typography>
            </Box>
            <Box
              sx={{
                mt: 0.5,
                height: 2,
                borderRadius: 1,
                bgcolor: kpi.color,
                opacity: 0.5,
                width: "60%",
              }}
            />
          </Box>
        ))}
      </Box>

      {/* Fake line chart */}
      <Box sx={{ mb: 1.5 }}>
        <Typography sx={{ fontSize: ".65rem", color: "rgba(255,255,255,.4)", mb: 0.5, textTransform: "uppercase", letterSpacing: ".1em" }}>
          {h.chartLabel}
        </Typography>
        <FakeLineChart />
        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", mt: 0.3, px: 0.5 }}>
          {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"].map((m) => (
            <Typography key={m} sx={{ fontSize: ".55rem", color: "rgba(255,255,255,.25)" }}>{m}</Typography>
          ))}
        </Box>
      </Box>

      {/* Fake donut chart */}
      <Box sx={{ mb: 1.5 }}>
        <Typography sx={{ fontSize: ".65rem", color: "rgba(255,255,255,.4)", mb: 0.7, textTransform: "uppercase", letterSpacing: ".1em" }}>
          {h.donutLabel}
        </Typography>
        <FakeDonutChart items={h.donutLegend} />
      </Box>

      {/* AI Insight banner */}
      <Box
        sx={{
          bgcolor: "rgba(20,184,166,0.10)",
          border: "1px solid rgba(20,184,166,0.20)",
          borderRadius: "10px",
          p: 1.2,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "flex-start", gap: 1 }}>
          <Box sx={{ flex: 1 }}>
            <Chip
              label={h.aiInsight}
              size="small"
              sx={{
                bgcolor: "rgba(20,184,166,0.2)",
                color: "#14B8A6",
                fontSize: ".58rem",
                fontWeight: 700,
                height: 18,
                mb: 0.5,
              }}
            />
            <Typography sx={{ fontSize: ".68rem", color: "rgba(255,255,255,.7)", lineHeight: 1.5, mb: 0.6 }}>
              {h.aiInsightText}
            </Typography>
            <Button
              size="small"
              sx={{
                color: "#14B8A6",
                fontSize: ".65rem",
                fontWeight: 700,
                p: 0,
                minWidth: 0,
                textTransform: "none",
                "&:hover": { background: "transparent", opacity: 0.8 },
              }}
            >
              {h.aiInsightCta}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MockDashboardCard;
