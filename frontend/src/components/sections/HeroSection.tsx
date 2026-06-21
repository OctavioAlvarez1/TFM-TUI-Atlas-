import { useState, useRef } from "react";
import { Box, Container, Typography, Button, Stack, IconButton } from "@mui/material";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useLanguage } from "../../context/LanguageContext";
import MockDashboardCard from "./MockDashboardCard";
import type { HeroSlide } from "./MockDashboardCard";

// Add a destination photo at /public/hero-bg.jpg (1920×1080 recommended).
const HERO_BG = "/hero-bg.jpg";

const HeroSection = () => {
  const { locale } = useLanguage();
  const h = locale.hero;
  const dp = locale.dashboardPreview;
  const [slide, setSlide] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  const slides: HeroSlide[] = [
    {
      label: h.dashboardLabel,
      title: h.dashboardTitle,
      stats: [
        { label: h.kpi.arrivals,     value: h.kpi.arrivalsValue,     change: h.kpi.arrivalsChange },
        { label: h.kpi.occupancy,    value: h.kpi.occupancyValue,    change: h.kpi.occupancyChange },
        { label: h.kpi.rate,         value: h.kpi.rateValue,         change: h.kpi.rateChange },
        { label: h.kpi.sustainability, value: h.kpi.sustainabilityValue, change: h.kpi.sustainabilityChange },
      ],
      aiInsight: h.aiInsightText,
      aiInsightCta: h.aiInsightCta,
      donut: h.donutLegend,
    },
    ...dp.cards.map((c) => ({
      label: c.label,
      title: c.title,
      stats: c.stats,
      aiInsight: c.aiInsight,
      aiInsightCta: c.aiInsightCta,
      donut: c.donut,
    })),
  ];

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  const prev = () => setSlide((s) => (s - 1 + slides.length) % slides.length);
  const next = () => setSlide((s) => (s + 1) % slides.length);

  return (
    <Box
      ref={heroRef}
      sx={{
        position: "relative",
        overflow: "hidden",
        pt: { xs: 14, md: 16 },
        pb: { xs: 10, md: 14 },
        minHeight: { md: "100vh" },
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Parallax background photo + subtle zoom */}
      <motion.div
        style={{
          y: bgY,
          position: "absolute",
          top: "-25%",
          left: 0,
          right: 0,
          bottom: "-25%",
          zIndex: 0,
        }}
      >
        <motion.div
          animate={{ scale: [1, 1.07, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: "100%",
            height: "100%",
            backgroundImage: `url('${HERO_BG}')`,
            backgroundSize: "cover",
            backgroundPosition: "center 30%",
            backgroundColor: "#0d2137",
          }}
        />
      </motion.div>

      {/* Overlay — horizontal split: left dark for text, right reveals photo */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(102deg, rgba(4,14,26,0.92) 0%, rgba(4,14,26,0.76) 38%, rgba(4,14,26,0.34) 65%, rgba(4,14,26,0.08) 100%)",
          zIndex: 1,
        }}
      />
      {/* Bottom warm vignette — Mediterranean sunset */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          background: "linear-gradient(to top, rgba(6,20,38,0.82) 0%, rgba(6,20,38,0.18) 32%, transparent 55%)",
        }}
      />
      {/* Top edge darken for the header */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          background: "linear-gradient(to bottom, rgba(0,0,0,0.28) 0%, transparent 22%)",
        }}
      />
      {/* Golden sun glow — warm, not AI blue */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          background: "radial-gradient(ellipse at 78% 24%, rgba(234,179,8,0.11) 0%, transparent 42%)",
        }}
      />
      {/* Warm amber horizon at bottom */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          background: "radial-gradient(ellipse at 50% 110%, rgba(249,115,22,0.14) 0%, transparent 48%)",
        }}
      />
      {/* Floating light particles — sunlight on water */}
      {[
        { left: "12%", top: "32%", size: 3, delay: 0,   dur: 5.2 },
        { left: "27%", top: "55%", size: 2, delay: 1.1, dur: 6.8 },
        { left: "42%", top: "22%", size: 4, delay: 0.5, dur: 4.5 },
        { left: "58%", top: "44%", size: 2, delay: 2.2, dur: 7.1 },
        { left: "68%", top: "18%", size: 3, delay: 1.7, dur: 5.8 },
        { left: "75%", top: "62%", size: 2, delay: 0.3, dur: 6.2 },
        { left: "83%", top: "35%", size: 4, delay: 3.0, dur: 4.9 },
        { left: "88%", top: "72%", size: 2, delay: 1.4, dur: 7.4 },
        { left: "20%", top: "75%", size: 3, delay: 2.6, dur: 5.5 },
        { left: "50%", top: "80%", size: 2, delay: 0.8, dur: 6.0 },
        { left: "63%", top: "28%", size: 3, delay: 3.5, dur: 4.8 },
        { left: "35%", top: "68%", size: 2, delay: 1.9, dur: 7.0 },
      ].map((p, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -22, 0], opacity: [0.12, 0.38, 0.12] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
          style={{
            position: "absolute",
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.9)",
            filter: "blur(0.8px)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
      ))}

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 2 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: { xs: 6, md: 8 },
            alignItems: "center",
          }}
        >
          {/* LEFT — text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <Box sx={{ mb: 3 }}>
              <Typography
                sx={{
                  display: "inline-block",
                  px: 3,
                  py: 1.2,
                  borderRadius: "999px",
                  color: "#38BDF8",
                  fontWeight: 700,
                  fontSize: ".85rem",
                  textTransform: "uppercase",
                  letterSpacing: ".25em",
                  border: "1px solid rgba(255,255,255,.15)",
                  background: "rgba(255,255,255,.06)",
                  backdropFilter: "blur(10px)",
                }}
              >
                {h.badge}
              </Typography>
            </Box>

            <Typography
              component="h1"
              sx={{
                fontSize: { xs: "2.6rem", sm: "3.2rem", md: "4rem", lg: "4.5rem" },
                fontWeight: 900,
                color: "#FFFFFF",
                lineHeight: 0.95,
                mb: 3,
                letterSpacing: "-.02em",
                textShadow: "0 12px 40px rgba(0,0,0,.35)",
              }}
            >
              {h.title}
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: "1rem", md: "1.15rem" },
                color: "rgba(255,255,255,.92)",
                lineHeight: 1.75,
                mb: 4,
                maxWidth: 560,
                fontWeight: 400,
              }}
            >
              {h.subtitle}
            </Typography>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Button
                variant="contained"
                size="large"
                onClick={() =>
                  document.getElementById("dashboard-preview")?.scrollIntoView({ behavior: "smooth" })
                }
                sx={{
                  bgcolor: "#0EA5E9",
                  color: "#FFF",
                  fontWeight: 700,
                  px: 3.5,
                  py: 1.4,
                  borderRadius: "10px",
                  textTransform: "none",
                  fontSize: ".95rem",
                  "&:hover": { bgcolor: "#0284C7" },
                }}
              >
                {h.ctaPrimary}
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() =>
                  document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })
                }
                sx={{
                  borderColor: "rgba(255,255,255,.25)",
                  color: "rgba(255,255,255,.75)",
                  fontWeight: 600,
                  px: 3.5,
                  py: 1.4,
                  borderRadius: "10px",
                  textTransform: "none",
                  fontSize: ".95rem",
                  "&:hover": {
                    borderColor: "rgba(255,255,255,.5)",
                    bgcolor: "rgba(255,255,255,.04)",
                  },
                }}
              >
                {h.ctaSecondary}
              </Button>
            </Stack>
          </motion.div>

          {/* RIGHT — carousel: [arrow] [card] [arrow] inline */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: { xs: 1, md: 2 },
                justifyContent: "center",
              }}
            >
              {/* Left arrow */}
              <IconButton
                onClick={prev}
                sx={{
                  flexShrink: 0,
                  color: "rgba(255,255,255,.7)",
                  bgcolor: "rgba(255,255,255,.08)",
                  border: "1px solid rgba(255,255,255,.15)",
                  "&:hover": { bgcolor: "rgba(255,255,255,.15)", color: "#FFF" },
                }}
              >
                <ArrowBackIosNewIcon sx={{ fontSize: ".9rem" }} />
              </IconButton>

              {/* Animated card */}
              <Box sx={{ flex: 1, minWidth: 0, maxWidth: 460 }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={slide}
                    initial={{ opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -18 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <MockDashboardCard slide={slides[slide]} />
                  </motion.div>
                </AnimatePresence>
              </Box>

              {/* Right arrow */}
              <IconButton
                onClick={next}
                sx={{
                  flexShrink: 0,
                  color: "rgba(255,255,255,.7)",
                  bgcolor: "rgba(255,255,255,.08)",
                  border: "1px solid rgba(255,255,255,.15)",
                  "&:hover": { bgcolor: "rgba(255,255,255,.15)", color: "#FFF" },
                }}
              >
                <ArrowForwardIosIcon sx={{ fontSize: ".9rem" }} />
              </IconButton>
            </Box>
          </motion.div>
        </Box>

        {/* Pagination dots */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mt: { xs: 5, md: 6 } }}>
          {slides.map((_, i) => (
            <Box
              key={i}
              onClick={() => setSlide(i)}
              sx={{
                width: i === slide ? 20 : 7,
                height: 7,
                borderRadius: "999px",
                bgcolor: i === slide ? "#0EA5E9" : "rgba(255,255,255,.2)",
                transition: "all .3s",
                cursor: "pointer",
              }}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;
