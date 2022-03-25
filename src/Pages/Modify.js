import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import useStore from "../Data/useStore";
import { useParams } from "react-router";

const Modify = (parentId) => {
  const { info } = useStore();
  let { id } = useParams();

  return (
    <>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {id}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Modify;
