import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",

    primary: {
      main: "#00A152",
    },

    secondary: {
      main: "#0288D1",
    },

    background: {
      default: "#F8FAFC",
      paper: "#FFFFFF",
    },
  },

  typography: {
    fontFamily: "Inter, sans-serif",
  },
});

export default lightTheme;
