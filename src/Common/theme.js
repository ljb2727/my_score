import { createTheme } from "@mui/material/styles";
const theme = createTheme({
  palette: {
    primary: {
      main: "#6BCB77",
      contrastText: "#fff",
    },
    secondary: {
      main: "#A2D5AB",
      contrastText: "#fff",
    },
    error: {
      main: "#FF6B6B",
      contrastText: "#fff",
    },
    info: {
      main: "#FFD93D",
      contrastText: "#fff",
    },
    success: {
      main: "#4D96FF",
      contrastText: "#fff",
    },
  },
});

export default theme;
