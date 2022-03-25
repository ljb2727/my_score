import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Container from "@mui/material/Container";
import Main from "./Pages/Main";
import Modify from "./Pages/Modify";
import theme from "./Common/theme";
import { ThemeProvider } from "@mui/material/styles";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/modify" element={<Modify />} />
          </Routes>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
