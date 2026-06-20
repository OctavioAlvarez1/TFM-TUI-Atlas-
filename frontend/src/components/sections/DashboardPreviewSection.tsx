import { useState, useRef, useEffect } from "react";
import { Box, Container, Typography, Chip, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import HotelOutlinedIcon from "@mui/icons-material/HotelOutlined";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import RouteOutlinedIcon from "@mui/icons-material/RouteOutlined";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import FilterListIcon from "@mui/icons-material/FilterList";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import { useLanguage } from "../../context/LanguageContext";

// ─── Decorative metadata (icons + changes, not translated) ───────────────────

const CARDS_META = [
  {
    headerIcon: MapOutlinedIcon,
    kpiMeta: [
      { Icon: HotelOutlinedIcon,       change: "+3.2%",  vsLabel: "vs last year", positive: true  },
      { Icon: RestaurantOutlinedIcon,  change: "+5.1%",  vsLabel: "vs last year", positive: true  },
      { Icon: ExploreOutlinedIcon,     change: "+8.4%",  vsLabel: "vs last year", positive: true  },
      { Icon: StarBorderOutlinedIcon,  change: "+2.1%",  vsLabel: "vs last year", positive: true  },
    ],
  },
  {
    headerIcon: BarChartOutlinedIcon,
    donutCenter: "22.5M",
    donutCenterSub: "Total",
    kpiMeta: [
      { Icon: PeopleAltOutlinedIcon,   change: "+12.5%", vsLabel: "vs last year", positive: true  },
      { Icon: StarBorderOutlinedIcon,  change: "+0.2",   vsLabel: "vs last year", positive: true  },
      { Icon: CommentOutlinedIcon,     change: "+18.3%", vsLabel: "vs last year", positive: true  },
      { Icon: TrendingUpIcon,          change: "YoY",    vsLabel: "",             positive: true  },
    ],
  },
  {
    headerIcon: WarningAmberOutlinedIcon,
    kpiMeta: [
      { Icon: LocationOnOutlinedIcon,       change: "+16.7%", vsLabel: "vs last year", positive: false },
      { Icon: WarningAmberOutlinedIcon,     change: "+8pts",  vsLabel: "vs last year", positive: false },
      { Icon: TrendingUpIcon,               change: "+14%",   vsLabel: "YoY",          positive: false },
      { Icon: NotificationsOutlinedIcon,    change: "Active", vsLabel: "now",          positive: false },
    ],
  },
  {
    headerIcon: LightbulbOutlinedIcon,
    kpiMeta: [
      { Icon: LocationOnOutlinedIcon,    change: "Identified", vsLabel: "",      positive: true  },
      { Icon: AccountBalanceOutlinedIcon,change: "Projected",  vsLabel: "",      positive: true  },
      { Icon: ShowChartIcon,             change: "+26%",       vsLabel: "proj.", positive: true  },
      { Icon: RouteOutlinedIcon,         change: "Planned",    vsLabel: "",      positive: true  },
    ],
  },
];

// ─── Visualizations ───────────────────────────────────────────────────────────

const FakeHeatmap = () => (
  <Box sx={{ display: "flex", gap: 2 }}>
    {/* Map grid */}
    <Box sx={{ flex: 1, height: 200, position: "relative", bgcolor: "rgba(14,165,233,0.04)", borderRadius: "10px", overflow: "hidden" }}>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.45, p: 1 }}>
        {Array.from({ length: 110 }, (_, i) => {
          const palette = ["#16A34A","#CA8A04","#0EA5E9","#16A34A","#EA580C","#CA8A04","#16A34A","#0EA5E9","#DC2626","#CA8A04","#16A34A","#16A34A","#EA580C","#0EA5E9","#CA8A04"];
          return (
            <Box key={i} sx={{ width: "calc(10% - 5px)", height: 20, borderRadius: "3px", bgcolor: palette[i % palette.length], opacity: 0.22 + (i % 5) * 0.14 }} />
          );
        })}
      </Box>
      <Box sx={{ position: "absolute", bottom: 8, right: 10, bgcolor: "rgba(0,0,0,0.65)", borderRadius: "5px", px: 1.2, py: 0.4 }}>
        <Typography sx={{ fontSize: ".6rem", color: "rgba(255,255,255,.75)" }}>España · 20 destinos</Typography>
      </Box>
      <Box sx={{ position: "absolute", top: 8, left: 10, display: "flex", flexDirection: "column", gap: 0.5 }}>
        {[{ color: "#DC2626", label: "Alta densidad" }, { color: "#EA580C", label: "Media" }, { color: "#16A34A", label: "Baja" }].map(item => (
          <Box key={item.label} sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
            <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: item.color }} />
            <Typography sx={{ fontSize: ".58rem", color: "rgba(255,255,255,.65)" }}>{item.label}</Typography>
          </Box>
        ))}
      </Box>
    </Box>

    {/* Side stats panel */}
    <Box sx={{ width: 170, display: "flex", flexDirection: "column", gap: 1, flexShrink: 0 }}>
      <Typography sx={{ fontSize: ".65rem", color: "text.secondary", fontWeight: 600 }}>Top destinos</Typography>
      {[
        { name: "Barcelona", pct: 28, color: "#0EA5E9" },
        { name: "Madrid", pct: 22, color: "#38BDF8" },
        { name: "Málaga", pct: 15, color: "#10B981" },
        { name: "Sevilla", pct: 12, color: "#F59E0B" },
        { name: "Valencia", pct: 9,  color: "#6366F1" },
        { name: "Otros",    pct: 14, color: "#64748B" },
      ].map(d => (
        <Box key={d.name}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.3 }}>
            <Typography sx={{ fontSize: ".62rem", color: "text.secondary" }}>{d.name}</Typography>
            <Typography sx={{ fontSize: ".62rem", color: "rgba(255,255,255,.7)", fontWeight: 700 }}>{d.pct}%</Typography>
          </Box>
          <Box sx={{ height: 5, borderRadius: 3, bgcolor: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
            <Box sx={{ width: `${d.pct * 3}%`, height: "100%", bgcolor: d.color, borderRadius: 3 }} />
          </Box>
        </Box>
      ))}
    </Box>
  </Box>
);

const FakeDemandViz = ({
  donutItems,
  donutCenter,
  donutCenterSub,
}: {
  donutItems: { label: string; pct: string }[];
  donutCenter: string;
  donutCenterSub: string;
}) => {
  const colors = ["#0EA5E9", "#10B981", "#F59E0B", "#6366F1", "#E879F9"];
  return (
    <Box sx={{ display: "flex", gap: 2, height: 200 }}>
      {/* Line chart */}
      <Box sx={{ flex: 1, bgcolor: "rgba(255,255,255,0.02)", borderRadius: "10px", overflow: "hidden", position: "relative" }}>
        <Box sx={{ position: "absolute", top: 10, left: 12 }}>
          <Typography sx={{ fontSize: ".65rem", fontWeight: 700, color: "text.primary" }}>Tourist Arrivals Over Time</Typography>
        </Box>
        {/* Y-axis labels */}
        <Box sx={{ position: "absolute", left: 8, top: 30, bottom: 28, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          {["40K","30K","20K","10K","0"].map(l => (
            <Typography key={l} sx={{ fontSize: ".5rem", color: "rgba(255,255,255,.3)", lineHeight: 1 }}>{l}</Typography>
          ))}
        </Box>
        <svg viewBox="0 0 240 155" preserveAspectRatio="none" style={{ width: "100%", height: "100%", paddingLeft: 8 }}>
          <defs>
            <linearGradient id="dg1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="dg2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Grid lines */}
          {[35,60,85,110,135].map(y => (
            <line key={y} x1="24" y1={y} x2="240" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          ))}
          {/* 2024 area */}
          <path d="M24,115 C54,100 84,52 124,60 C154,66 194,42 240,46 L240,155 L24,155 Z" fill="url(#dg1)" />
          <path d="M24,115 C54,100 84,52 124,60 C154,66 194,42 240,46" fill="none" stroke="#0EA5E9" strokeWidth="2" strokeLinecap="round" />
          {/* 2023 area */}
          <path d="M24,128 C54,118 84,82 124,88 C154,93 194,68 240,72 L240,155 L24,155 Z" fill="url(#dg2)" />
          <path d="M24,128 C54,118 84,82 124,88 C154,93 194,68 240,72" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
          {/* X axis */}
          <line x1="24" y1="140" x2="240" y2="140" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        </svg>
        {/* X-axis labels */}
        <Box sx={{ position: "absolute", bottom: 4, left: 24, right: 0, display: "flex", justifyContent: "space-between", pr: 1 }}>
          {["Jul 1","Jul 8","Jul 15","Jul 22","Jul 31"].map(l => (
            <Typography key={l} sx={{ fontSize: ".5rem", color: "rgba(255,255,255,.3)" }}>{l}</Typography>
          ))}
        </Box>
        {/* Legend */}
        <Box sx={{ position: "absolute", top: 10, right: 10, display: "flex", gap: 1 }}>
          {[{ c: "#0EA5E9", l: "2024" }, { c: "#10B981", l: "2023" }].map(item => (
            <Box key={item.l} sx={{ display: "flex", alignItems: "center", gap: 0.4 }}>
              <Box sx={{ width: 16, height: 2, bgcolor: item.c, borderRadius: 1 }} />
              <Typography sx={{ fontSize: ".55rem", color: "rgba(255,255,255,.5)" }}>{item.l}</Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Donut + legend */}
      <Box sx={{ width: 190, bgcolor: "rgba(255,255,255,0.02)", borderRadius: "10px", p: 1.5, display: "flex", flexDirection: "column", gap: 1, flexShrink: 0 }}>
        <Typography sx={{ fontSize: ".65rem", fontWeight: 700, color: "text.primary" }}>Arrivals by Region</Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flex: 1 }}>
          {/* Donut SVG with center label */}
          <Box sx={{ position: "relative", flexShrink: 0 }}>
            <svg viewBox="0 0 80 80" style={{ width: 80, height: 80, transform: "rotate(-90deg)" }}>
              <circle cx="40" cy="40" r="30" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="12" />
              <circle cx="40" cy="40" r="30" fill="none" stroke="#0EA5E9" strokeWidth="12" strokeDasharray="53 135" />
              <circle cx="40" cy="40" r="30" fill="none" stroke="#10B981" strokeWidth="12" strokeDasharray="38 135" strokeDashoffset="-53" />
              <circle cx="40" cy="40" r="30" fill="none" stroke="#F59E0B" strokeWidth="12" strokeDasharray="27 135" strokeDashoffset="-91" />
              <circle cx="40" cy="40" r="30" fill="none" stroke="#6366F1" strokeWidth="12" strokeDasharray="24 135" strokeDashoffset="-118" />
            </svg>
            <Box sx={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <Typography sx={{ fontSize: ".75rem", fontWeight: 900, color: "text.primary", lineHeight: 1 }}>{donutCenter}</Typography>
              <Typography sx={{ fontSize: ".52rem", color: "text.secondary" }}>{donutCenterSub}</Typography>
            </Box>
          </Box>
          {/* Legend */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.7, flex: 1 }}>
            {donutItems.map((item, i) => (
              <Box key={item.label} sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
                <Box sx={{ width: 7, height: 7, borderRadius: "50%", bgcolor: colors[i % 5], flexShrink: 0 }} />
                <Typography sx={{ fontSize: ".58rem", color: "rgba(255,255,255,.55)", flex: 1 }}>{item.label}</Typography>
                <Typography sx={{ fontSize: ".58rem", color: "rgba(255,255,255,.85)", fontWeight: 700 }}>{item.pct}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const FakeRiskViz = () => (
  <Box sx={{ display: "flex", gap: 2 }}>
    {/* Risk map */}
    <Box sx={{ flex: 1, height: 200, bgcolor: "rgba(220,38,38,0.05)", borderRadius: "10px", position: "relative", overflow: "hidden" }}>
      <Box sx={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
      {[
        { top: "12%", left: "18%", size: 44, color: "#DC2626", opacity: 0.72 },
        { top: "40%", left: "50%", size: 36, color: "#EA580C", opacity: 0.65 },
        { top: "20%", left: "67%", size: 30, color: "#DC2626", opacity: 0.62 },
        { top: "58%", left: "27%", size: 26, color: "#EA580C", opacity: 0.54 },
        { top: "8%",  left: "42%", size: 22, color: "#F59E0B", opacity: 0.56 },
        { top: "70%", left: "72%", size: 18, color: "#EA580C", opacity: 0.46 },
        { top: "78%", left: "45%", size: 14, color: "#F59E0B", opacity: 0.42 },
      ].map((dot, i) => (
        <Box key={i} sx={{ position: "absolute", top: dot.top, left: dot.left, width: dot.size, height: dot.size, borderRadius: "50%", bgcolor: dot.color, opacity: dot.opacity, boxShadow: `0 0 18px ${dot.color}99` }} />
      ))}
      <Box sx={{ position: "absolute", top: 8, left: 10, display: "flex", flexDirection: "column", gap: 0.5 }}>
        {[{ color: "#DC2626", label: "Muy alta (>80)" }, { color: "#EA580C", label: "Alta (60-80)" }, { color: "#F59E0B", label: "Moderada (40-60)" }].map(item => (
          <Box key={item.label} sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
            <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: item.color }} />
            <Typography sx={{ fontSize: ".58rem", color: "rgba(255,255,255,.65)" }}>{item.label}</Typography>
          </Box>
        ))}
      </Box>
      <Box sx={{ position: "absolute", bottom: 8, right: 10, bgcolor: "rgba(0,0,0,0.65)", borderRadius: "5px", px: 1.2, py: 0.4 }}>
        <Typography sx={{ fontSize: ".6rem", color: "#F87171" }}>⚠ 12 zonas críticas detectadas</Typography>
      </Box>
    </Box>

    {/* Congestion over time mini chart */}
    <Box sx={{ width: 170, bgcolor: "rgba(255,255,255,0.02)", borderRadius: "10px", p: 1.5, display: "flex", flexDirection: "column", gap: 1, flexShrink: 0 }}>
      <Typography sx={{ fontSize: ".65rem", fontWeight: 700, color: "text.primary" }}>Congestión en el tiempo</Typography>
      <Typography sx={{ fontSize: ".6rem", color: "text.secondary" }}>(Media ponderada)</Typography>
      <Box sx={{ flex: 1, position: "relative" }}>
        <svg viewBox="0 0 150 90" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
          <defs>
            <linearGradient id="cg1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#DC2626" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#DC2626" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[20,40,60,80].map(y => (
            <line key={y} x1="0" y1={y} x2="150" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          ))}
          <path d="M0,60 C20,52 30,30 50,42 C65,50 75,25 90,35 C105,44 115,60 130,50 C138,45 144,38 150,40 L150,90 L0,90 Z" fill="url(#cg1)" />
          <path d="M0,60 C20,52 30,30 50,42 C65,50 75,25 90,35 C105,44 115,60 130,50 C138,45 144,38 150,40" fill="none" stroke="#DC2626" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        <Box sx={{ position: "absolute", left: 0, top: 0, bottom: 0, display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
          {["100","75","50","25"].map(v => (
            <Typography key={v} sx={{ fontSize: ".48rem", color: "rgba(255,255,255,.3)" }}>{v}</Typography>
          ))}
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        {["Jul 1","Jul 8","Jul 15"].map(l => (
          <Typography key={l} sx={{ fontSize: ".48rem", color: "rgba(255,255,255,.3)" }}>{l}</Typography>
        ))}
      </Box>
    </Box>
  </Box>
);

const FakeGrowthViz = () => (
  <Box sx={{ display: "flex", gap: 2 }}>
    {/* Growth map */}
    <Box sx={{ flex: 1, height: 200, bgcolor: "rgba(16,185,129,0.04)", borderRadius: "10px", position: "relative", overflow: "hidden" }}>
      <Box sx={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
      {[
        { top: "26%", left: "11%", size: 36, color: "#10B981", opacity: 0.65 },
        { top: "16%", left: "38%", size: 30, color: "#16A34A", opacity: 0.6 },
        { top: "48%", left: "62%", size: 26, color: "#10B981", opacity: 0.56 },
        { top: "62%", left: "21%", size: 22, color: "#16A34A", opacity: 0.52 },
        { top: "9%",  left: "74%", size: 20, color: "#10B981", opacity: 0.48 },
        { top: "72%", left: "77%", size: 18, color: "#16A34A", opacity: 0.46 },
        { top: "36%", left: "85%", size: 16, color: "#10B981", opacity: 0.43 },
        { top: "55%", left: "44%", size: 14, color: "#16A34A", opacity: 0.4 },
      ].map((dot, i) => (
        <Box key={i} sx={{ position: "absolute", top: dot.top, left: dot.left, width: dot.size, height: dot.size, borderRadius: "50%", bgcolor: dot.color, opacity: dot.opacity, boxShadow: `0 0 16px ${dot.color}99` }} />
      ))}
      <Box sx={{ position: "absolute", top: 8, left: 10, display: "flex", flexDirection: "column", gap: 0.5 }}>
        {[{ color: "#10B981", label: "Alto potencial" }, { color: "#16A34A", label: "Pot. moderado" }].map(item => (
          <Box key={item.label} sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
            <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: item.color }} />
            <Typography sx={{ fontSize: ".58rem", color: "rgba(255,255,255,.65)" }}>{item.label}</Typography>
          </Box>
        ))}
      </Box>
      <Box sx={{ position: "absolute", bottom: 8, right: 10, bgcolor: "rgba(0,0,0,0.65)", borderRadius: "5px", px: 1.2, py: 0.4 }}>
        <Typography sx={{ fontSize: ".6rem", color: "#34D399" }}>✦ 23 zonas con potencial</Typography>
      </Box>
    </Box>

    {/* Opportunity breakdown */}
    <Box sx={{ width: 170, bgcolor: "rgba(255,255,255,0.02)", borderRadius: "10px", p: 1.5, display: "flex", flexDirection: "column", gap: 1, flexShrink: 0 }}>
      <Typography sx={{ fontSize: ".65rem", fontWeight: 700, color: "text.primary" }}>Por categoría</Typography>
      {[
        { label: "Ecoturismo",    value: 8,  color: "#10B981" },
        { label: "Rural",         value: 7,  color: "#16A34A" },
        { label: "Cultural",      value: 5,  color: "#0EA5E9" },
        { label: "Gastronómica",  value: 3,  color: "#F59E0B" },
      ].map(d => (
        <Box key={d.label}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.3 }}>
            <Typography sx={{ fontSize: ".6rem", color: "text.secondary" }}>{d.label}</Typography>
            <Typography sx={{ fontSize: ".6rem", color: "rgba(255,255,255,.75)", fontWeight: 700 }}>{d.value} zonas</Typography>
          </Box>
          <Box sx={{ height: 5, borderRadius: 3, bgcolor: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
            <Box sx={{ width: `${(d.value / 8) * 100}%`, height: "100%", bgcolor: d.color, borderRadius: 3 }} />
          </Box>
        </Box>
      ))}
      <Box sx={{ mt: "auto", p: 1, bgcolor: "rgba(16,185,129,0.1)", borderRadius: "8px", border: "1px solid rgba(16,185,129,0.2)" }}>
        <Typography sx={{ fontSize: ".6rem", color: "#34D399", fontWeight: 700 }}>134M€</Typography>
        <Typography sx={{ fontSize: ".55rem", color: "text.secondary" }}>Inversión estimada</Typography>
      </Box>
    </Box>
  </Box>
);

// ─── KPI box ──────────────────────────────────────────────────────────────────

const KpiBox = ({
  Icon,
  label,
  value,
  change,
  vsLabel,
  positive,
  isLast,
}: {
  Icon: React.ElementType;
  label: string;
  value: string;
  change: string;
  vsLabel: string;
  positive: boolean;
  isLast: boolean;
}) => (
  <Box
    sx={{
      flex: 1,
      p: { xs: 1.5, md: 2 },
      borderRight: isLast ? "none" : "1px solid",
      borderColor: "divider",
      display: "flex",
      alignItems: "flex-start",
      gap: 1.5,
    }}
  >
    <Box
      sx={{
        width: 36,
        height: 36,
        borderRadius: "8px",
        bgcolor: positive ? "rgba(14,165,233,0.12)" : "rgba(220,38,38,0.12)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <Icon sx={{ fontSize: "1.1rem", color: positive ? "#38BDF8" : "#F87171" }} />
    </Box>
    <Box sx={{ minWidth: 0 }}>
      <Typography sx={{ fontSize: ".66rem", color: "text.secondary", mb: 0.3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
        {label}
      </Typography>
      <Typography sx={{ fontSize: { xs: "1.1rem", md: "1.3rem" }, fontWeight: 900, color: "text.primary", lineHeight: 1.1, mb: 0.3 }}>
        {value}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.3, flexWrap: "wrap" }}>
        {positive
          ? <TrendingUpIcon sx={{ fontSize: ".8rem", color: "#10B981" }} />
          : <TrendingDownIcon sx={{ fontSize: ".8rem", color: "#EF4444" }} />
        }
        <Typography sx={{ fontSize: ".6rem", color: positive ? "#10B981" : "#EF4444", fontWeight: 600 }}>
          {change}
        </Typography>
        {vsLabel && (
          <Typography sx={{ fontSize: ".6rem", color: "text.secondary" }}>{vsLabel}</Typography>
        )}
      </Box>
    </Box>
  </Box>
);

// ─── Types ────────────────────────────────────────────────────────────────────

type DashCard = {
  title: string;
  label: string;
  stats: { label: string; value: string }[];
  donut?: { label: string; pct: string }[];
  aiInsight: string;
  aiInsightCta: string;
};

// ─── Carousel card ────────────────────────────────────────────────────────────

const CarouselCard = ({
  card,
  vizIdx,
  isActive,
}: {
  card: DashCard;
  vizIdx: number;
  isActive: boolean;
}) => {
  const meta = CARDS_META[vizIdx];
  const HeaderIcon = meta.headerIcon;

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: isActive ? "rgba(14,165,233,0.5)" : "divider",
        borderRadius: "20px",
        overflow: "hidden",
        transition: "border-color 0.4s, box-shadow 0.4s",
        boxShadow: isActive ? "0 24px 64px rgba(14,165,233,0.14)" : "none",
      }}
    >
      {/* ── Header ── */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          px: { xs: 2, md: 2.5 },
          py: { xs: 1.5, md: 2 },
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: "10px",
            bgcolor: "rgba(14,165,233,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <HeaderIcon sx={{ fontSize: "1.3rem", color: "#38BDF8" }} />
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            sx={{
              fontSize: ".63rem",
              color: "#38BDF8",
              fontWeight: 700,
              letterSpacing: 1.4,
              mb: 0.2,
            }}
          >
            {card.label}
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "1rem", md: "1.05rem" },
              fontWeight: 800,
              color: "text.primary",
              lineHeight: 1.2,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {card.title}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1, flexShrink: 0 }}>
          <Chip
            icon={<FilterListIcon sx={{ fontSize: ".85rem !important", color: "#38BDF8 !important" }} />}
            label="All Regions"
            size="small"
            sx={{
              bgcolor: "rgba(14,165,233,0.08)",
              color: "#38BDF8",
              fontSize: ".63rem",
              fontWeight: 600,
              height: 26,
              border: "1px solid rgba(14,165,233,0.2)",
            }}
          />
          <Chip
            icon={<CalendarTodayOutlinedIcon sx={{ fontSize: ".8rem !important", color: "rgba(255,255,255,0.4) !important" }} />}
            label="Jul 1 – Jul 31, 2024"
            size="small"
            sx={{
              bgcolor: "rgba(255,255,255,0.05)",
              color: "text.secondary",
              fontSize: ".63rem",
              height: 26,
              border: "1px solid",
              borderColor: "divider",
            }}
          />
        </Box>
      </Box>

      {/* ── KPIs ── */}
      <Box
        sx={{
          display: "flex",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        {card.stats.map((stat, i) => (
          <KpiBox
            key={stat.label}
            Icon={meta.kpiMeta[i]?.Icon ?? TrendingUpIcon}
            label={stat.label}
            value={stat.value}
            change={meta.kpiMeta[i]?.change ?? ""}
            vsLabel={meta.kpiMeta[i]?.vsLabel ?? ""}
            positive={meta.kpiMeta[i]?.positive ?? true}
            isLast={i === card.stats.length - 1}
          />
        ))}
      </Box>

      {/* ── Visualization ── */}
      <Box sx={{ p: { xs: 1.5, md: 2 } }}>
        {vizIdx === 0 && <FakeHeatmap />}
        {vizIdx === 1 && card.donut && (
          <FakeDemandViz
            donutItems={card.donut}
            donutCenter={(meta as typeof CARDS_META[1]).donutCenter ?? ""}
            donutCenterSub={(meta as typeof CARDS_META[1]).donutCenterSub ?? ""}
          />
        )}
        {vizIdx === 2 && <FakeRiskViz />}
        {vizIdx === 3 && <FakeGrowthViz />}
      </Box>

      {/* ── AI Insight ── */}
      <Box
        sx={{
          mx: { xs: 1.5, md: 2 },
          mb: { xs: 1.5, md: 2 },
          p: { xs: 1.2, md: 1.5 },
          bgcolor: "rgba(14,165,233,0.07)",
          border: "1px solid rgba(14,165,233,0.2)",
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.6,
            flexShrink: 0,
            bgcolor: "rgba(14,165,233,0.15)",
            borderRadius: "8px",
            px: 1,
            py: 0.5,
          }}
        >
          <AutoAwesomeIcon sx={{ fontSize: ".85rem", color: "#38BDF8" }} />
          <Typography sx={{ fontSize: ".68rem", color: "#38BDF8", fontWeight: 700 }}>AI Insight</Typography>
        </Box>
        <Typography sx={{ fontSize: ".76rem", color: "text.secondary", flex: 1, lineHeight: 1.55 }}>
          {card.aiInsight}
        </Typography>
        <Chip
          label={card.aiInsightCta}
          size="small"
          onClick={() => {}}
          sx={{
            flexShrink: 0,
            bgcolor: "rgba(14,165,233,0.12)",
            color: "#0EA5E9",
            fontSize: ".68rem",
            fontWeight: 700,
            height: 28,
            border: "1px solid rgba(14,165,233,0.3)",
            cursor: "pointer",
            "&:hover": { bgcolor: "rgba(14,165,233,0.22)" },
          }}
        />
      </Box>
    </Box>
  );
};

// ─── Section ──────────────────────────────────────────────────────────────────

const DashboardPreviewSection = () => {
  const { locale } = useLanguage();
  const dp = locale.dashboardPreview;
  const [activeIdx, setActiveIdx] = useState(0);
  const [containerWidth, setContainerWidth] = useState(1100);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      if (wrapperRef.current) setContainerWidth(wrapperRef.current.offsetWidth);
    };
    update();
    const ro = new ResizeObserver(update);
    if (wrapperRef.current) ro.observe(wrapperRef.current);
    return () => ro.disconnect();
  }, []);

  const total = dp.cards.length;
  const gap = 20;
  const cardWidth = Math.min(containerWidth * 0.82, 980);
  const peekOffset = (containerWidth - cardWidth) / 2;
  const trackX = peekOffset - activeIdx * (cardWidth + gap);
  const arrowPos = Math.max(peekOffset / 2 - 22, 10);

  const prev = () => setActiveIdx((i) => (i - 1 + total) % total);
  const next = () => setActiveIdx((i) => (i + 1) % total);

  return (
    <Box sx={{ bgcolor: "#0B1220", py: { xs: 8, md: 12 } }}>
      {/* Header */}
      <Container maxWidth="xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: "center", mb: { xs: 5, md: 7 } }}>
            <Chip
              label={dp.badge}
              sx={{
                bgcolor: "rgba(14,165,233,0.1)",
                color: "#38BDF8",
                fontWeight: 700,
                fontSize: ".72rem",
                mb: 2,
              }}
            />
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: "1.7rem", md: "2.2rem" },
                fontWeight: 900,
                color: "text.primary",
                mb: 1.5,
              }}
            >
              {dp.heading}
            </Typography>
            <Typography
              sx={{
                fontSize: ".95rem",
                color: "text.secondary",
                maxWidth: 560,
                mx: "auto",
                lineHeight: 1.7,
              }}
            >
              {dp.subtitle}
            </Typography>
          </Box>
        </motion.div>
      </Container>

      {/* Carousel */}
      <Box ref={wrapperRef} sx={{ overflow: "hidden", position: "relative" }}>
        <motion.div
          animate={{ x: trackX }}
          transition={{ type: "spring", stiffness: 300, damping: 35 }}
          style={{ display: "flex", gap: gap + "px" }}
        >
          {dp.cards.map((card, i) => (
            <Box
              key={i}
              onClick={() => i !== activeIdx && setActiveIdx(i)}
              sx={{
                flexShrink: 0,
                width: cardWidth,
                opacity: i === activeIdx ? 1 : 0.35,
                transform: i === activeIdx ? "scale(1)" : "scale(0.975)",
                transition: "opacity 0.4s, transform 0.4s",
                cursor: i !== activeIdx ? "pointer" : "default",
              }}
            >
              <CarouselCard
                card={card as DashCard}
                vizIdx={i}
                isActive={i === activeIdx}
              />
            </Box>
          ))}
        </motion.div>

        {/* Left arrow */}
        <IconButton
          onClick={prev}
          sx={{
            position: "absolute",
            left: arrowPos,
            top: "50%",
            transform: "translateY(-50%)",
            bgcolor: "rgba(15,23,42,0.85)",
            color: "#38BDF8",
            width: 44,
            height: 44,
            border: "1px solid rgba(14,165,233,0.3)",
            backdropFilter: "blur(8px)",
            "&:hover": { bgcolor: "rgba(14,165,233,0.2)", borderColor: "rgba(14,165,233,0.6)" },
          }}
        >
          <ChevronLeftIcon />
        </IconButton>

        {/* Right arrow */}
        <IconButton
          onClick={next}
          sx={{
            position: "absolute",
            right: arrowPos,
            top: "50%",
            transform: "translateY(-50%)",
            bgcolor: "rgba(15,23,42,0.85)",
            color: "#38BDF8",
            width: 44,
            height: 44,
            border: "1px solid rgba(14,165,233,0.3)",
            backdropFilter: "blur(8px)",
            "&:hover": { bgcolor: "rgba(14,165,233,0.2)", borderColor: "rgba(14,165,233,0.6)" },
          }}
        >
          <ChevronRightIcon />
        </IconButton>
      </Box>

      {/* Dots */}
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 1, mt: 3 }}>
        {dp.cards.map((_, i) => (
          <Box
            key={i}
            onClick={() => setActiveIdx(i)}
            sx={{
              width: i === activeIdx ? 28 : 8,
              height: 8,
              borderRadius: 4,
              bgcolor: i === activeIdx ? "#0EA5E9" : "rgba(255,255,255,0.18)",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default DashboardPreviewSection;
