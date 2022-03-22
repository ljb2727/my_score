import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Dialog from "@mui/material/Dialog";
import InputLabel from "@mui/material/InputLabel";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function Time() {
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState({
    오전오후: "오전",
    시: "10시",
    분: "30분",
  });

  const handleChange = (event) => {
    let val = event.target.value;
    let name = event.target.name;
    const change = { ...time };
    change[name] = val;
    setTime(change);
  };

  function handleClose() {
    setOpen(false);
    setTimeout(function () {
      document.activeElement.blur();
    }, 0);
  }

  function getTime(num) {
    let time = [];
    if (num === 60) {
      for (var i = 0; i < num; i++) {
        let str = "0" + String(i);
        time.push(str.slice(-2));
      }
    } else {
      for (var i = 1; i <= num; i++) {
        let str = "0" + String(i);
        time.push(str.slice(-2));
      }
    }
    return time;
  }

  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <Typography sx={{ flex: 1 }} variant="h6" component="div">
              시간
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent sx={{ textAlign: "center" }}>
          <FormControl variant="outlined" sx={{ mr: 1 }}>
            <InputLabel>오전/오후</InputLabel>
            <Select
              name="오전오후"
              value={time.오전오후}
              label="오전/오후"
              onChange={handleChange}
              defaultValue="오전"
              displayEmpty
            >
              <MenuItem value={"오전"}>오전</MenuItem>
              <MenuItem value={"오후"}>오후</MenuItem>
            </Select>
          </FormControl>

          <FormControl variant="outlined" sx={{ mr: 1 }}>
            <InputLabel>시</InputLabel>
            <Select
              name="시"
              value={time.시}
              label="시"
              onChange={handleChange}
              defaultValue="10시"
              displayEmpty
            >
              {getTime(12).map((e, i) => {
                return (
                  <MenuItem key={i} value={`${e}시`}>
                    {`${e}시`}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          <FormControl variant="outlined">
            <InputLabel>분</InputLabel>
            <Select
              name="분"
              value={time.분}
              label="분"
              onChange={handleChange}
              defaultValue="30분"
              displayEmpty
            >
              {getTime(60).map((e, i) => {
                return (
                  <MenuItem key={i} value={`${e}분`}>
                    {`${e}분`}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="contained">
            확인
          </Button>
        </DialogActions>
      </Dialog>

      <TextField
        label="시간"
        autoComplete="off"
        onClose={handleClose}
        onClick={() => setOpen(true)}
        fullWidth
        value={`${time.오전오후} ${time.시} ${time.분}`}
      />
    </>
  );
}