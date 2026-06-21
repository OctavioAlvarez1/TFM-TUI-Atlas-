import {
  Box,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import horizonLogo from "../../assets/logo/horizon-logo.svg";
import darkTheme from "../../theme/darkTheme";
import { useLanguage } from "../../context/LanguageContext";

const Footer = () => {
  const { locale } = useLanguage();
  const theme = useTheme();
  const dark = theme.palette.mode === "dark";
  const footerLinks = [
    { heading: locale.footer.features.heading, items: locale.footer.features.items },
    { heading: locale.footer.technology.heading, items: locale.footer.technology.items },
  ];
  const footer = (
    <Box
      component="footer"
      sx={{
        background: dark
          ? undefined
          : "linear-gradient(158deg, rgba(5,62,78,0.97) 0%, rgba(3,44,58,0.95) 100%)",
        bgcolor: dark ? "background.paper" : undefined,
        borderTop: "1px solid",
        borderColor: dark ? "divider" : "rgba(13,211,197,0.22)",
        pt: { xs: 6, md: 10 },
        pb: 4,
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={{ xs: 5, md: 6 }}>
          {/* BRAND */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Stack
              direction="row"
              spacing={1.5}
              sx={{ alignItems: "center", mb: 2.5 }}
            >
              <img
                src={horizonLogo}
                alt="Atlas"
                style={{ width: 28, height: 28 }}
              />
              <Typography
                sx={{
                  fontSize: "1.25rem",
                  fontWeight: 900,
                  letterSpacing: ".08em",
                  color: "text.primary",
                }}
              >
                ATLAS
              </Typography>
            </Stack>

            <Typography
              sx={{
                color: "primary.main",
                fontWeight: 700,
                fontSize: ".85rem",
                mb: 2.5,
              }}
            >
              {locale.footer.tagline}
            </Typography>

            <Typography
              sx={{
                color: "text.secondary",
                lineHeight: 1.8,
                fontSize: ".9rem",
                maxWidth: 340,
                mb: 3.5,
              }}
            >
              {locale.footer.description}
            </Typography>

            <Stack direction="row" spacing={1.5} sx={{ flexWrap: "wrap" }}>
              {["TUI Care Foundation", "Reto 3", "Future Shapers Spain"].map(
                (tag) => (
                  <Box
                    key={tag}
                    sx={{
                      px: 2,
                      py: 0.75,
                      borderRadius: "8px",
                      border: "1px solid",
                      borderColor: "divider",
                      fontSize: ".75rem",
                      color: "text.secondary",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {tag}
                  </Box>
                )
              )}
            </Stack>
          </Grid>

          {/* FEATURES + TECHNOLOGY */}
          {footerLinks.map(({ heading, items }) => (
            <Grid key={heading} size={{ xs: 6, md: 2 }}>
              <Typography
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  fontSize: ".8rem",
                  textTransform: "uppercase",
                  letterSpacing: ".12em",
                  color: "text.disabled",
                }}
              >
                {heading}
              </Typography>
              {items.map((item) => (
                <Typography
                  key={item}
                  sx={{
                    color: "text.secondary",
                    mb: 1.5,
                    fontSize: ".9rem",
                    cursor: "default",
                    transition: "color .2s",
                    "&:hover": { color: "primary.main" },
                  }}
                >
                  {item}
                </Typography>
              ))}
            </Grid>
          ))}

          {/* PROJECT */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography
              sx={{
                fontWeight: 700,
                mb: 3,
                fontSize: ".8rem",
                textTransform: "uppercase",
                letterSpacing: ".12em",
                color: "text.disabled",
              }}
            >
              {locale.footer.project.heading}
            </Typography>

            <Typography
              sx={{
                color: "text.primary",
                fontWeight: 600,
                fontSize: ".95rem",
                mb: 1,
              }}
            >
              {locale.footer.project.university}
            </Typography>

            <Typography
              sx={{
                color: "text.secondary",
                lineHeight: 1.8,
                fontSize: ".9rem",
                mb: 3,
              }}
            >
              {locale.footer.project.description}
            </Typography>

            <Box
              sx={{
                p: 3,
                borderRadius: "16px",
                bgcolor: "action.hover",
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography
                sx={{
                  color: "primary.main",
                  fontWeight: 700,
                  fontSize: ".85rem",
                  mb: 1.5,
                }}
              >
                {locale.footer.project.problemTitle}
              </Typography>
              <Typography
                sx={{
                  color: "text.secondary",
                  fontSize: ".85rem",
                  lineHeight: 1.75,
                }}
              >
                {locale.footer.project.problemText}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: { xs: 5, md: 6 }, borderColor: "divider" }} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Typography
            sx={{
              color: "text.disabled",
              fontSize: ".82rem",
            }}
          >
            {locale.footer.copyright}
          </Typography>

          <Stack direction="row" spacing={3}>
            {locale.footer.bottomLinks.map(
              (item) => (
                <Typography
                  key={item}
                  sx={{
                    color: "text.disabled",
                    fontSize: ".82rem",
                    cursor: "default",
                    transition: "color .2s",
                    "&:hover": {
                      color: "text.secondary",
                    },
                  }}
                >
                  {item}
                </Typography>
              )
            )}
          </Stack>
        </Box>
      </Container>
    </Box>
  );

  return dark ? footer : <MuiThemeProvider theme={darkTheme}>{footer}</MuiThemeProvider>;
};

export default Footer;
