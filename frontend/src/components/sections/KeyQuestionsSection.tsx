import { Box, Container, Typography, Grid, Chip } from "@mui/material";
import { motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";

const KeyQuestionsSection = () => {
  const { locale } = useLanguage();
  const kq = locale.keyQuestions;

  return (
    <Box
      sx={{
        bgcolor: "#070C16",
        py: { xs: 8, md: 12 },
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <Container maxWidth="xl">
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
                color: "#2563EB",
                mb: 1,
              }}
            >
              {kq.badge}
            </Typography>
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: "1.6rem", md: "2.2rem" },
                fontWeight: 900,
                color: "#FFFFFF",
                maxWidth: 700,
                mx: "auto",
                lineHeight: 1.3,
              }}
            >
              {kq.heading}
            </Typography>
          </Box>
        </motion.div>

        <Grid container spacing={2.5}>
          {kq.items.map((item, i) => (
            <Grid key={i} size={{ xs: 12, sm: 6, md: 3 }}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{ height: "100%" }}
              >
                <Box
                  sx={{
                    height: "100%",
                    p: 3,
                    borderRadius: "16px",
                    bgcolor: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    transition: "border-color .25s, transform .25s",
                    "&:hover": {
                      borderColor: "rgba(14,165,233,0.3)",
                      transform: "translateY(-4px)",
                    },
                  }}
                >
                  <Typography sx={{ fontSize: "1.8rem", mb: 2 }}>
                    {item.icon}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: ".95rem",
                      fontWeight: 600,
                      color: "rgba(255,255,255,.85)",
                      lineHeight: 1.6,
                    }}
                  >
                    {item.text}
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Bottom tag */}
        <Box sx={{ textAlign: "center", mt: 5 }}>
          <Chip
            label="Powered by Atlas · TUI Care Foundation"
            sx={{
              bgcolor: "rgba(14,165,233,0.08)",
              color: "rgba(255,255,255,.45)",
              fontSize: ".72rem",
              border: "1px solid rgba(14,165,233,0.15)",
            }}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default KeyQuestionsSection;
