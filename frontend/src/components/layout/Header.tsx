import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import ES from "country-flag-icons/react/3x2/ES";
import US from "country-flag-icons/react/3x2/US";

import { useThemeContext } from "../../theme/ThemeProvider";
import { useLanguage } from "../../context/LanguageContext";

import horizonLogo from "../../assets/logo/horizon-logo.svg";

const Header = () => {
  const { darkMode, toggleTheme } = useThemeContext();
  const { lang, toggleLanguage } = useLanguage();
  const theme = useTheme();
  const dark = theme.palette.mode === "dark";

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background: dark
          ? "rgba(7,12,22,0.65)"
          : "rgba(255,255,255,0.82)",
        backdropFilter: "blur(16px)",
        borderBottom: dark
          ? "1px solid rgba(255,255,255,0.10)"
          : "1px solid rgba(0,0,0,0.08)",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ minHeight: "62px", px: { xs: 2, md: 4 } }}>
        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexGrow: 1, cursor: "default" }}>
          <img src={horizonLogo} alt="Atlas" style={{ width: 28, height: 28 }} />
          <Typography
            sx={{
              color: dark ? "#FFFFFF" : "text.primary",
              fontSize: "1.1rem",
              fontWeight: 800,
              letterSpacing: ".08em",
            }}
          >
            ATLAS
          </Typography>
        </Box>

        {/* Language toggle */}
        <Box
          onClick={toggleLanguage}
          sx={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            border: dark ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(0,0,0,0.12)",
            borderRadius: "8px",
            px: 1,
            py: 0.6,
            transition: "border-color .2s",
            "&:hover": { borderColor: dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.3)" },
          }}
        >
          <US style={{ width: 22, opacity: lang === "en" ? 1 : 0.3, transition: "opacity .2s", borderRadius: 2, display: "block" }} title="English" />
          <Typography sx={{ fontSize: ".65rem", color: dark ? "rgba(255,255,255,.28)" : "rgba(0,0,0,.2)", lineHeight: 1 }}>|</Typography>
          <ES style={{ width: 22, opacity: lang === "es" ? 1 : 0.3, transition: "opacity .2s", borderRadius: 2, display: "block" }} title="Español" />
        </Box>

        {/* Theme toggle */}
        <IconButton
          onClick={toggleTheme}
          sx={{
            ml: 1.5,
            color: dark ? "#FFFFFF" : "text.primary",
            width: 42,
            height: 42,
            border: dark ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(0,0,0,0.12)",
          }}
        >
          {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
