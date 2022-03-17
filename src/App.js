import * as React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import Container from "@mui/material/Container";
import Main from "./Pages/Main";

function App() {
  return (
    <>
      <Container maxWidth="md">
        <Routes>
          <Route path="/" element={<Main></Main>} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
