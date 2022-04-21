import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Container from "@mui/material/Container";
import Main from "./Pages/Main";
import Modify from "./Pages/Modify";
import Score from "./Pages/Score";
import theme from "./Common/theme";
import Test from "./Pages/Test";
import { ThemeProvider } from "@mui/material/styles";
import useStore from "./Data/useStore";

function App() {
  const { info, setLocalInfo } = useStore();

  const [storageInfo, setStorageInfo] = useState();

  useEffect(() => {
    console.log("1");
    window.localStorage.setItem("storageInfo", JSON.stringify(info));
    console.log("2");
    setLocalInfo("@@@");
  }, [info]);

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
