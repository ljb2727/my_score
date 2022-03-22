import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Golfzone from "../Components/Golfzone";
import Course from "../Components/Course";
import Grid from "@mui/material/Grid";
import Mpicker from "../Components/Mpicker";
import Time from "../Components/Time";
import Button from "@mui/material/Button";

function createScore() {
  console.log("create");
}
function Main() {
  return (
    <>
      <Typography variant="h6" color="initial">
        search
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
          <Grid item xs={6}>
            <Mpicker />
          </Grid>
          <Grid item xs={6}>
            <Time />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              size="large"
              color="primary"
              fullWidth
              onClick={createScore}
            >
              생성
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Main;
