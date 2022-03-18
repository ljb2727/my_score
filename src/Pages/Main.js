import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Dialog from "../Components/Dialog";
function Main() {
  let [date, setDate] = useState(new Date());
  let [time, setTime] = useState(new Date());
  return (
    <>
      <Typography variant="h6" color="initial">
        score
      </Typography>
      <Dialog date={date} setDate={setDate} />
    </>
  );
}

export default Main;
