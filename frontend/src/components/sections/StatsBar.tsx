import { Box, Container, Typography, Grid } from "@mui/material";
import { motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";

const StatsBar = () => {
  const { locale } = useLanguage();

  return (
    <Box
      sx={{
        bgcolor: "#070C16",
        py: { xs: 6, md: 8 },
        borderTop: "1px solid rgba(255,255,255,0.07)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={{ xs: 4, md: 2 }} sx={{ justifyContent: "center" }}>
          {locale.stats.map((stat, i) => (
            <Grid key={stat.label} size={{ xs: 6, md: 3 }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Box sx={{ textAlign: "center" }}>
                  <Typography
                    sx={{
                      fontSize: { xs: "2rem", md: "2.8rem" },
                      fontWeight: 900,
                      color: "#38BDF8",
                      lineHeight: 1,
                      mb: 0.8,
                      letterSpacing: "-.02em",
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: ".82rem", md: ".9rem" },
                      color: "rgba(255,255,255,.55)",
                      fontWeight: 500,
                    }}
                  >
                    {stat.label}
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default StatsBar;
