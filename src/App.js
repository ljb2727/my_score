import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Container from "@mui/material/Container";
import Main from "./Pages/Main";
import Modify from "./Pages/Modify";
import Score from "./Pages/Score";
import Card from "./Pages/Card";
import theme from "./Common/theme";

import { ThemeProvider } from "@mui/material/styles";
import useStore from "./Data/useStore";

function App() {
  const { info } = useStore();

  useEffect(() => {
    if (info.length === 0) {
      console.log("empty");
      localStorage.setItem("storageInfo", JSON.stringify([]));
      localStorage.setItem("storageCount", 999);
    } else {
      localStorage.setItem("storageInfo", JSON.stringify(info));
      localStorage.setItem(
        "storageCount",
        Number(
          Math.max.apply(
            null,
            info.map((e) => e.id)
          ) + 1
        )
      );
    }
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container maxWidth="lg" sx={{ p: 0 }}>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/modify/:golfzone" element={<Modify />} />
            <Route path="/score/:golfzone" element={<Score />} />
            <Route path="/card/:golfzone" element={<Card />} />
          </Routes>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
