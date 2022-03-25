import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Container from "@mui/material/Container";
import Main from "./Pages/Main";
import theme from "./Common/theme";
import { ThemeProvider } from "@mui/material/styles";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm">
          <Routes>
            <Route path="/" element={<Main></Main>} />
          </Routes>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
