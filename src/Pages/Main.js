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
      <Box sx={{ mt: 1 }}>
        <Golfzone /> <br />
      </Box>
      <Box sx={{ mt: 1 }}>
        <Mpicker />
      </Box>
    </>
  );
}

export default Main;
