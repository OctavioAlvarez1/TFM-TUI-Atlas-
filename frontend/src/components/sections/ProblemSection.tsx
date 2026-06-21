import { Box, Container, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import GeoDots from "../common/GeoDots";

const ProblemSection = () => {
  const { locale } = useLanguage();
  const p = locale.problema;
  const theme = useTheme();
  const dark = theme.palette.mode === "dark";

  return (
    <Box sx={{ bgcolor: "background.default", py: { xs: 8, md: 12 }, position: "relative", overflow: "hidden" }}>
      {!dark && <GeoDots />}
      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: "center", mb: { xs: 6, md: 8 } }}>
            <Typography
              sx={{
                fontSize: ".82rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: ".25em",
                color: "#EF4444",
                mb: 1.5,
              }}
            >
              {p.badge}
            </Typography>
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: "1.8rem", md: "2.8rem" },
                fontWeight: 900,
                color: "text.primary",
                lineHeight: 1.15,
                mb: 2,
                maxWidth: 680,
                mx: "auto",
              }}
            >
              {p.heading}
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: ".9rem", md: "1rem" },
                color: "text.secondary",
                maxWidth: 560,
                mx: "auto",
                lineHeight: 1.75,
              }}
            >
              {p.subtitle}
            </Typography>
          </Box>
        </motion.div>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: 3,
          }}
        >
          {p.challenges.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 44 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.65, delay: i * 0.12, ease: [0.4, 0, 0.2, 1] }}
            >
              <Box
                sx={{
                  height: "100%",
                  p: { xs: 3, md: 4 },
                  borderRadius: "28px",
                  background: dark
                    ? `linear-gradient(145deg, ${c.color}10 0%, #111827 100%)`
                    : `linear-gradient(145deg, ${c.color}08 0%, #FFFFFF 100%)`,
                  border: `1px solid ${c.color}25`,
                  position: "relative",
                  overflow: "hidden",
                  transition: "all .35s ease",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: dark
                      ? `0 24px 50px ${c.color}22`
                      : `0 24px 50px ${c.color}18`,
                    border: `1px solid ${c.color}55`,
                  },
                }}
              >
                {/* Top accent bar */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 0, left: 0, right: 0,
                    height: 3,
                    bgcolor: c.color,
                    opacity: 0.6,
                  }}
                />

                {/* Big stat */}
                <Typography
                  sx={{
                    fontSize: { xs: "2.4rem", md: "3rem" },
                    fontWeight: 900,
                    color: c.color,
                    lineHeight: 1,
                    letterSpacing: "-.03em",
                    mb: 0.5,
                    mt: 1,
                  }}
                >
                  {c.stat}
                </Typography>
                <Typography
                  sx={{
                    fontSize: ".75rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: ".12em",
                    color: `${c.color}99`,
                    mb: 2.5,
                  }}
                >
                  {c.statLabel}
                </Typography>

                <Box
                  sx={{
                    width: 36,
                    height: 2,
                    borderRadius: 1,
                    bgcolor: c.color,
                    opacity: 0.4,
                    mb: 2.5,
                  }}
                />

                <Typography
                  sx={{
                    fontSize: { xs: "1rem", md: "1.1rem" },
                    fontWeight: 800,
                    color: "text.primary",
                    mb: 1.5,
                  }}
                >
                  {c.title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: ".88rem",
                    color: "text.secondary",
                    lineHeight: 1.75,
                  }}
                >
                  {c.desc}
                </Typography>
              </Box>
            </motion.div>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default ProblemSection;
