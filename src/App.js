import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Container from "@mui/material/Container";
import Main from "./Pages/Main";
import Modify from "./Pages/Modify";
import Score from "./Pages/Score";
import theme from "./Common/theme";
import Test from "./Pages/Test";
import { ThemeProvider } from "@mui/material/styles";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Container maxWidth="lg" sx={{ p: 0 }}>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/modify/:golfzone" element={<Modify />} />
            <Route path="/score/:golfzone" element={<Score />} />
            <Route path="/test" element={<Test />} />
          </Routes>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
