import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Mpicker from "../Components/Mpicker";
import golfzone from "../Golfzone";
function Main() {
  return (
    <>
      <Typography variant="h6" color="initial">
        score
      </Typography>
      <Box sx={{ p: 2, border: "1px dashed grey" }}>
        <Mpicker />
      </Box>
    </>
  );
}

export default Main;
