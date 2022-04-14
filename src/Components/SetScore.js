import React, { useState } from "react";

import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Dialog from "@mui/material/Dialog";
import InputLabel from "@mui/material/InputLabel";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import useStore from "../Data/useStore"; //useStore

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SetScore({ modalOpen, setModalOpen, target }) {
  console.log(target); //{hole: '0', par: '5', meter: '520'}
  const { hole, par, meter } = target;

  function handleClose() {
    setModalOpen(false);
  }
  const handleChange = (event) => {
    let val = event.target.value;
    let name = event.target.name;
    console.log(name);
  };

  return (
    <>
      <Dialog
        open={modalOpen}
        onClose={handleClose}
        fullWidth
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }} elevation={0}>
          <Toolbar>
            <Typography variant="h6" sx={{ mr: 2, lineHeight: 1 }}>
              {`${Number(hole) + 1}H`}
            </Typography>
            <Typography
              sx={{ fontSize: "12px" }}
            >{`파${par} | ${meter}m`}</Typography>
          </Toolbar>
        </AppBar>
        <DialogContent sx={{ textAlign: "center" }}>
          <FormControl variant="outlined">
            <InputLabel>스코어</InputLabel>
            <Select
              name="스코어"
              value="test"
              label="스코어"
              onChange={handleChange}
              defaultValue="0"
              displayEmpty
            >
              <MenuItem value="test">test1</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="contained">
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
