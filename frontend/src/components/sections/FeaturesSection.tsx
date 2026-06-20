import { Box, Container, Typography, Grid } from "@mui/material";
import { motion } from "framer-motion";
import BarChartIcon from "@mui/icons-material/BarChart";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import MapIcon from "@mui/icons-material/Map";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { useLanguage } from "../../context/LanguageContext";

const ICONS = [BarChartIcon, AutoAwesomeIcon, MapIcon, FileDownloadIcon];
const COLORS = ["#0EA5E9", "#10B981", "#F59E0B", "#6366F1"];

const FeaturesSection = () => {
  const { locale } = useLanguage();
  const { features } = locale;

  return (
    <Box
      sx={{
        bgcolor: "#0B1220",
        py: { xs: 8, md: 12 },
      }}
    >
      <Container maxWidth="xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            sx={{
              textAlign: "center",
              fontSize: ".82rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: ".2em",
              color: "#2563EB",
              mb: 1,
            }}
          >
            {features.heading}
          </Typography>
          <Typography
            component="h2"
            sx={{
              textAlign: "center",
              fontSize: { xs: "1.6rem", md: "2rem" },
              fontWeight: 800,
              color: "text.primary",
              mb: 6,
            }}
          >
            Powerful Features
          </Typography>
        </motion.div>

        <Grid container spacing={3}>
          {features.items.map((item, i) => {
            const Icon = ICONS[i];
            const color = COLORS[i];
            return (
              <Grid key={item.title} size={{ xs: 12, sm: 6, md: 3 }}>
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
                      bgcolor: "background.paper",
                      border: "1px solid",
                      borderColor: "divider",
                      transition: "border-color .25s, transform .25s, box-shadow .25s",
                      "&:hover": {
                        borderColor: color,
                        transform: "translateY(-4px)",
                        boxShadow: `0 16px 40px ${color}18`,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: "12px",
                        bgcolor: `${color}15`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 2,
                      }}
                    >
                      <Icon sx={{ color, fontSize: "1.4rem" }} />
                    </Box>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: "1rem",
                        color: "text.primary",
                        mb: 1,
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: ".88rem",
                        color: "text.secondary",
                        lineHeight: 1.65,
                      }}
                    >
                      {item.description}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export default FeaturesSection;
