import { Box, Container, Typography, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import BarChartIcon from "@mui/icons-material/BarChart";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import MapIcon from "@mui/icons-material/Map";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { useLanguage } from "../../context/LanguageContext";
import GeoDots from "../common/GeoDots";

const ICONS = [BarChartIcon, AutoAwesomeIcon, MapIcon, FileDownloadIcon];
const COLORS = ["#0EA5E9", "#10B981", "#F59E0B", "#6366F1"];

const FeaturesSection = () => {
  const { locale } = useLanguage();
  const { features } = locale;
  const theme = useTheme();
  const dark = theme.palette.mode === "dark";

  return (
    <Box id="features" sx={{ bgcolor: "background.default", py: { xs: 8, md: 12 }, position: "relative", overflow: "hidden" }}>
      {!dark && <GeoDots />}
      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography
              sx={{
                fontSize: ".82rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: ".25em",
                color: "primary.main",
                mb: 1.5,
              }}
            >
              {features.heading}
            </Typography>
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: "2rem", md: "2.8rem" },
                fontWeight: 800,
                color: "text.primary",
                lineHeight: 1.1,
              }}
            >
              {features.subheading ?? "Powerful Features"}
            </Typography>
          </Box>
        </motion.div>

        <Grid container spacing={3}>
          {features.items.map((item, i) => {
            const Icon = ICONS[i];
            const color = COLORS[i];
            return (
              <Grid key={item.title} size={{ xs: 12, sm: 6, md: 3 }}>
                <motion.div
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.65, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] }}
                  style={{ height: "100%" }}
                >
                  <Box
                    sx={{
                      height: "100%",
                      p: 4,
                      borderRadius: "28px",
                      background: dark
                        ? `linear-gradient(180deg, ${color}10 0%, #111827 100%)`
                        : `linear-gradient(180deg, ${color}08 0%, #FFFFFF 100%)`,
                      border: `1px solid ${color}25`,
                      position: "relative",
                      overflow: "hidden",
                      transition: "all .35s ease",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: dark
                          ? `0 24px 50px ${color}22`
                          : `0 24px 50px ${color}20`,
                        border: `1px solid ${color}55`,
                      },
                    }}
                  >
                    {/* Top accent bar */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0, left: 0, right: 0,
                        height: 3,
                        bgcolor: color,
                        opacity: 0.6,
                      }}
                    />
                    {/* Icon container */}
                    <Box
                      sx={{
                        width: 64,
                        height: 64,
                        borderRadius: "18px",
                        bgcolor: dark ? `${color}22` : `${color}12`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 3,
                      }}
                    >
                      <Icon sx={{ color, fontSize: "2rem" }} />
                    </Box>
                    <Typography
                      sx={{
                        fontWeight: 800,
                        fontSize: "1.1rem",
                        color: "text.primary",
                        mb: 1.5,
                        lineHeight: 1.3,
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: ".9rem",
                        color: "text.secondary",
                        lineHeight: 1.7,
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
