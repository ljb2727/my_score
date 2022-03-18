import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import Golfzone from "../Components/Golfzone";
import Mpicker from "../Components/Mpicker";

function Main() {
  return (
    <>
      <Typography variant="h6" color="initial">
        hi
      </Typography>
      <Box sx={{ p: 2, border: "1px dashed grey" }}>
        <Golfzone />
        <Mpicker />
      </Box>
    </>
  );
}

export default Main;
