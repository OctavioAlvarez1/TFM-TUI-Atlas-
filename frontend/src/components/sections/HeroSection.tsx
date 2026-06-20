import { Box, Container, Typography, Button, Stack, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useLanguage } from "../../context/LanguageContext";
import MockDashboardCard from "./MockDashboardCard";

const HeroSection = () => {
  const { locale } = useLanguage();
  const h = locale.hero;

  return (
    <Box
      sx={{
        background: "linear-gradient(160deg, #070C16 0%, #0F1A2E 100%)",
        pt: { xs: 14, md: 16 },
        pb: { xs: 10, md: 14 },
        position: "relative",
        overflow: "hidden",
        minHeight: { md: "100vh" },
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Radial accent blobs */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(circle at 70% 40%, rgba(14,165,233,0.07), transparent 55%)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(circle at 20% 80%, rgba(16,185,129,0.05), transparent 45%)",
        }}
      />

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: { xs: 6, md: 8 },
            alignItems: "center",
          }}
        >
          {/* LEFT — text content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Badge pill */}
            <Box sx={{ mb: 3 }}>
              <Typography
                sx={{
                  display: "inline-block",
                  px: 2.5,
                  py: 0.9,
                  borderRadius: "999px",
                  color: "#10B981",
                  fontWeight: 700,
                  fontSize: ".78rem",
                  textTransform: "uppercase",
                  letterSpacing: ".2em",
                  border: "1px solid rgba(16,185,129,.2)",
                  background: "rgba(16,185,129,.06)",
                }}
              >
                {h.badge}
              </Typography>
            </Box>

            {/* H1 */}
            <Typography
              component="h1"
              sx={{
                fontSize: { xs: "2rem", md: "2.8rem", lg: "3.2rem" },
                fontWeight: 900,
                color: "#FFFFFF",
                lineHeight: 1.15,
                mb: 2.5,
                letterSpacing: "-.02em",
              }}
            >
              {h.title}
            </Typography>

            {/* Subtitle */}
            <Typography
              sx={{
                fontSize: { xs: ".95rem", md: "1.05rem" },
                color: "rgba(255,255,255,.6)",
                lineHeight: 1.75,
                mb: 4,
                maxWidth: 520,
              }}
            >
              {h.subtitle}
            </Typography>

            {/* CTAs */}
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Button
                variant="contained"
                size="large"
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

          {/* RIGHT — mock dashboard card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            style={{ display: "flex", justifyContent: "center", position: "relative" }}
          >
            {/* Navigation arrows */}
            <IconButton
              sx={{
                position: "absolute",
                left: { xs: -8, md: -20 },
                top: "50%",
                transform: "translateY(-50%)",
                color: "rgba(255,255,255,.4)",
                bgcolor: "rgba(255,255,255,.06)",
                border: "1px solid rgba(255,255,255,.1)",
                zIndex: 2,
                "&:hover": { bgcolor: "rgba(255,255,255,.1)", color: "#FFF" },
              }}
            >
              <ArrowBackIosNewIcon sx={{ fontSize: ".9rem" }} />
            </IconButton>

            <MockDashboardCard />

            <IconButton
              sx={{
                position: "absolute",
                right: { xs: -8, md: -20 },
                top: "50%",
                transform: "translateY(-50%)",
                color: "rgba(255,255,255,.4)",
                bgcolor: "rgba(255,255,255,.06)",
                border: "1px solid rgba(255,255,255,.1)",
                zIndex: 2,
                "&:hover": { bgcolor: "rgba(255,255,255,.1)", color: "#FFF" },
              }}
            >
              <ArrowForwardIosIcon sx={{ fontSize: ".9rem" }} />
            </IconButton>
          </motion.div>
        </Box>

        {/* Pagination dots */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mt: { xs: 5, md: 6 } }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <Box
              key={i}
              sx={{
                width: i === 0 ? 20 : 7,
                height: 7,
                borderRadius: "999px",
                bgcolor: i === 0 ? "#0EA5E9" : "rgba(255,255,255,.2)",
                transition: "all .3s",
              }}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;
