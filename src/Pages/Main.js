import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import Golfzone from "../Components/Golfzone";
import Mpicker from "../Components/Mpicker";
import Course from "../Components/Course";
import Grid from "@mui/material/Grid";

function Main() {
  return (
    <>
      <Typography variant="h6" color="initial">
        hi
      </Typography>
      <Box sx={{ mt: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Golfzone />
          </Grid>
          <Grid item xs={6}>
            <Course label={"전반"} />
          </Grid>
          <Grid item xs={6}>
            <Course label={"후반"} />
          </Grid>
          <Grid item xs={12}>
            <Mpicker />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Main;
