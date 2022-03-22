import * as React from "react";
import { ko } from "date-fns/esm/locale";
import { format } from "date-fns";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

import StaticDatePicker from "@mui/lab/StaticDatePicker";
import TextField from "@mui/material/TextField";
import Slide from "@mui/material/Slide";

import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";

import "../Date.scss";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CustomInput() {
  const [value, setValue] = React.useState(new Date());
  let [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      document.activeElement.blur();
    }, 0);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <LocalizationProvider
          dateAdapter={AdapterDateFns}
          locale={ko}
          dateFormats={{ monthAndYear: "yyyy MM" }}
        >
          <StaticDatePicker
            label="Custom input"
            value={value}
            inputFormat="yyyy/MM/dd"
            showToolbar={false}
            okText="확인"
            cancelText="취소"
            views={["day"]}
            TransitionComponent={Transition}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={() => {}}
          />
        </LocalizationProvider>
        <Button
          onClick={handleClose}
          color="primary"
          variant="contained"
          sx={{ borderRadius: 0 }}
        >
          확인
        </Button>
      </Dialog>

      <TextField
        id="date"
        fullWidth
        inputProps={{ style: { fontSize: "1rem" } }} // font size of input text
        label="날짜"
        value={format(value, "yyyy년 MM월 dd일")}
        onClick={() => {
          setOpen(true);
        }}
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
