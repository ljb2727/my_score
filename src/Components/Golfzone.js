import React, { useState } from "react";
import Hangul from "hangul-js";
import { matchSorter } from "match-sorter";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import golfzone from "../Golfzone";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import useStore from "../Data/useStore";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const filterOptions = (options, { inputValue }) => {
  //console.log(Hangul.disassemble(inputValue));
  return matchSorter(options, Hangul.disassemble(inputValue).join(""), {
    keys: ["chosung"],
  });
};
function Golfzone() {
  const { useGolfzone, setGolfzone, useCourse1, useCourse2 } = useStore();
  const [open, setOpen] = useState(false);
  const [openDia, setDia] = useState(false);

  //골프장정보
  const [zone, setZone] = useState("");

  function blur() {
    setTimeout(() => {
      document.activeElement.blur();
    }, 0);
  }

  function close() {
    setOpen(false);
    blur();
  }

  function handleClose() {
    setDia(false);
    setTimeout(function () {
      document.activeElement.blur();
    }, 0);
  }

  return (
    <>
      <Dialog
        open={openDia}
        onClose={handleClose}
        fullScreen
        TransitionComponent={Transition}
      >
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h6">골프장 검색</Typography>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <Autocomplete
            autoFocus
            open={open}
            onInputChange={(_, value) => {
              setGolfzone(value);
              if (value.length === 0) {
                if (open) setOpen(false);
              } else {
                if (!open) setOpen(true);
              }
            }}
            onClose={close}
            getOptionLabel={(option) => option.label}
            filterOptions={filterOptions}
            disablePortal
            id="combo-box-demo"
            options={golfzone}
            //disableClearable
            fullWidth
            renderInput={(params) => (
              <TextField
                {...params}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: <PlaceOutlinedIcon />,
                }}
                label="검색"
              />
            )}
            popupIcon={null}
            noOptionsText={"검색된 골프장이 없습니다."}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="primary"
            variant="contained"
            size="large"
            fullWidth
          >
            확인
          </Button>
        </DialogActions>
      </Dialog>

      <TextField
        id="golfzone"
        fullWidth
        label={"골프장 검색"}
        autoComplete="off"
        value={useGolfzone}
        onClick={() => setDia(true)}
        disabled
        sx={{
          "& .Mui-disabled": {
            textFillColor: "#000 !important",
          },
        }}
      />
    </>
  );
}

export default Golfzone;
