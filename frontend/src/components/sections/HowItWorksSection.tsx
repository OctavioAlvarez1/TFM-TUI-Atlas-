import { Box, Container, Typography, Stack, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useLanguage } from "../../context/LanguageContext";
import GeoDots from "../common/GeoDots";

const STEP_COLORS = ["#0EA5E9", "#10B981", "#F59E0B", "#6366F1"];

const HowItWorksSection = () => {
  const { locale } = useLanguage();
  const hw = locale.howItWorks;
  const theme = useTheme();
  const dark = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        bgcolor: "background.default",
        py: { xs: 8, md: 12 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      {!dark && <GeoDots />}

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography
              sx={{
                fontSize: ".82rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: ".2em",
                color: "primary.main",
                mb: 1,
              }}
            >
              {hw.badge}
            </Typography>
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: "1.7rem", md: "2.2rem" },
                fontWeight: 900,
                color: "text.primary",
              }}
            >
              {hw.heading}
            </Typography>
          </Box>
        </motion.div>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1.5fr 1fr" },
            gap: { xs: 6, lg: 8 },
            alignItems: "start",
          }}
        >
          {/* LEFT — 4-step flow */}
          <Box>
            <Box
              sx={{
                display: { xs: "flex", md: "grid" },
                flexDirection: { xs: "column", sm: "row" },
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 2,
                alignItems: "flex-start",
              }}
            >
              {hw.steps.map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                >
                  <Box sx={{ textAlign: "center", position: "relative" }}>
                    {/* Step number circle */}
                    <Box
                      sx={{
                        width: 52,
                        height: 52,
                        borderRadius: "50%",
                        border: `2px solid ${STEP_COLORS[i]}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mx: "auto",
                        mb: 1.5,
                        bgcolor: `${STEP_COLORS[i]}12`,
                        position: "relative",
                        zIndex: 1,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: ".85rem",
                          fontWeight: 900,
                          color: STEP_COLORS[i],
                        }}
                      >
                        {step.num}
                      </Typography>
                    </Box>

                    {/* Arrow connector (desktop only) */}
                    {i < hw.steps.length - 1 && (
                      <Box
                        sx={{
                          display: { xs: "none", md: "block" },
                          position: "absolute",
                          top: 26,
                          right: -12,
                          zIndex: 0,
                        }}
                      >
                        <ArrowForwardIcon sx={{ fontSize: "1rem", color: "text.disabled" }} />
                      </Box>
                    )}

                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: ".85rem",
                        color: "text.primary",
                        mb: 0.5,
                      }}
                    >
                      {step.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: ".78rem",
                        color: "text.secondary",
                        lineHeight: 1.6,
                      }}
                    >
                      {step.desc}
                    </Typography>
                  </Box>
                </motion.div>
              ))}
            </Box>
          </Box>

          {/* RIGHT — CTA card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Box
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: "20px",
                bgcolor: "background.paper",
                border: "1px solid",
                borderColor: "primary.main",
                background: dark
                  ? "linear-gradient(135deg, rgba(14,165,233,0.08) 0%, rgba(16,185,129,0.05) 100%)"
                  : "linear-gradient(135deg, rgba(14,165,233,0.06) 0%, rgba(16,185,129,0.04) 100%)",
                backdropFilter: "blur(10px)",
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "1.2rem", md: "1.4rem" },
                  fontWeight: 900,
                  color: "text.primary",
                  mb: 1.5,
                  lineHeight: 1.3,
                }}
              >
                {hw.ctaTitle}
              </Typography>
              <Typography
                sx={{
                  fontSize: ".9rem",
                  color: "text.secondary",
                  lineHeight: 1.7,
                  mb: 3,
                }}
              >
                {hw.ctaSubtitle}
              </Typography>
              <Stack spacing={1.5}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    bgcolor: "primary.main",
                    color: "#FFF",
                    fontWeight: 700,
                    py: 1.3,
                    borderRadius: "10px",
                    textTransform: "none",
                    fontSize: ".95rem",
                    "&:hover": { bgcolor: "primary.dark" },
                  }}
                >
                  {hw.ctaPrimary}
                </Button>
                <Button
                  variant="text"
                  sx={{
                    color: "text.secondary",
                    fontWeight: 500,
                    textTransform: "none",
                    fontSize: ".9rem",
                    "&:hover": { color: "text.primary", background: "transparent" },
                  }}
                >
                  {hw.ctaSecondary}
                </Button>
              </Stack>
            </Box>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default HowItWorksSection;
