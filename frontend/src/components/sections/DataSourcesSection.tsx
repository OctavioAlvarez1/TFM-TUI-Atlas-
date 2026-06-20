import { Box, Container, Typography, Stack } from "@mui/material";
import { motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";

const SOURCE_COLORS: Record<string, string> = {
  OpenStreetMap: "#16A34A",
  INE: "#2563EB",
  AEMET: "#0EA5E9",
  Google: "#F59E0B",
  Tripadvisor: "#10B981",
  "Booking.com": "#6366F1",
  TRANSPORTES: "#EA580C",
  "+ Más": "#38BDF8",
};

const DataSourcesSection = () => {
  const { locale } = useLanguage();
  const ds = locale.dataSources;

  return (
    <Box
      sx={{
        bgcolor: "#0B1220",
        py: { xs: 8, md: 10 },
      }}
    >
      <Container maxWidth="xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: "center", mb: 5 }}>
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
              {ds.badge}
            </Typography>
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: "1.4rem", md: "1.8rem" },
                fontWeight: 800,
                color: "text.primary",
                maxWidth: 600,
                mx: "auto",
              }}
            >
              {ds.heading}
            </Typography>
          </Box>
        </motion.div>

        <Stack
          direction="row"
          spacing={2}
          sx={{
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 2,
          }}
        >
          {ds.sources.map((src, i) => {
            const color = SOURCE_COLORS[src.name] ?? "#38BDF8";
            return (
              <motion.div
                key={src.name}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
              >
                <Box
                  sx={{
                    px: 2.5,
                    py: 1.5,
                    borderRadius: "12px",
                    bgcolor: "background.paper",
                    border: "1px solid",
                    borderColor: "divider",
                    cursor: "default",
                    transition: "border-color .2s, transform .2s",
                    "&:hover": {
                      borderColor: color,
                      transform: "translateY(-2px)",
                    },
                    minWidth: 120,
                    textAlign: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      bgcolor: color,
                      mx: "auto",
                      mb: 0.8,
                    }}
                  />
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: ".85rem",
                      color: "text.primary",
                      mb: 0.2,
                    }}
                  >
                    {src.name}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: ".7rem",
                      color: "text.secondary",
                    }}
                  >
                    {src.type}
                  </Typography>
                </Box>
              </motion.div>
            );
          })}
        </Stack>
      </Container>
    </Box>
  );
};

export default DataSourcesSection;
