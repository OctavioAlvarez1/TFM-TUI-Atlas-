import { Box, Container, Typography, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import GeoDots from "../common/GeoDots";

const CARD_COLORS = ["#0EA5E9", "#10B981", "#EF4444", "#F59E0B"];

const KeyQuestionsSection = () => {
  const { locale } = useLanguage();
  const kq = locale.keyQuestions;
  const theme = useTheme();
  const dark = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
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
              {kq.badge}
            </Typography>
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: "1.8rem", md: "2.8rem" },
                fontWeight: 900,
                color: "text.primary",
                maxWidth: 700,
                mx: "auto",
                lineHeight: 1.15,
              }}
            >
              {kq.heading}
            </Typography>
          </Box>
        </motion.div>

        <Grid container spacing={3}>
          {kq.items.map((item, i) => {
            const color = CARD_COLORS[i];
            return (
              <Grid key={i} size={{ xs: 12, sm: 6, md: 3 }}>
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
                          : `0 24px 50px ${color}18`,
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
                        opacity: 0.5,
                      }}
                    />
                    <Typography sx={{ fontSize: "2rem", mb: 2.5 }}>
                      {item.icon}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "1rem",
                        fontWeight: 700,
                        color: "text.primary",
                        lineHeight: 1.6,
                      }}
                    >
                      {item.text}
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

export default KeyQuestionsSection;
