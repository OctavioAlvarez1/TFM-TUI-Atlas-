import { Box, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";

const ProblemSection = () => {
  const { locale } = useLanguage();
  const p = locale.problema;

  return (
    <Box sx={{ bgcolor: "#070C16", py: { xs: 8, md: 12 } }}>
      <Container maxWidth="xl">
        {/* Header */}
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
                letterSpacing: ".2em",
                color: "#EF4444",
                mb: 1.5,
              }}
            >
              {p.badge}
            </Typography>
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: "1.7rem", md: "2.4rem" },
                fontWeight: 900,
                color: "#FFFFFF",
                lineHeight: 1.2,
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
                color: "rgba(255,255,255,.5)",
                maxWidth: 560,
                mx: "auto",
                lineHeight: 1.7,
              }}
            >
              {p.subtitle}
            </Typography>
          </Box>
        </motion.div>

        {/* Challenge cards */}
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
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.12 }}
            >
              <Box
                sx={{
                  height: "100%",
                  p: { xs: 3, md: 4 },
                  borderRadius: "20px",
                  background: `linear-gradient(145deg, ${c.color}0d 0%, rgba(11,18,32,0) 60%)`,
                  border: "1px solid",
                  borderColor: `${c.color}28`,
                  position: "relative",
                  overflow: "hidden",
                  transition: "border-color .25s",
                  "&:hover": { borderColor: `${c.color}55` },
                }}
              >
                {/* Glow accent top-left */}
                <Box
                  sx={{
                    position: "absolute",
                    top: -40,
                    left: -40,
                    width: 160,
                    height: 160,
                    borderRadius: "50%",
                    background: `${c.color}12`,
                    filter: "blur(40px)",
                    pointerEvents: "none",
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

                {/* Divider */}
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
                    color: "#FFF",
                    mb: 1.5,
                  }}
                >
                  {c.title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: ".88rem",
                    color: "rgba(255,255,255,.52)",
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
