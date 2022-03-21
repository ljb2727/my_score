import * as React from "react";
import { ko } from "date-fns/esm/locale";
import { format } from "date-fns";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import TextField from "@mui/material/TextField";
import "../Date.scss";
export default function CustomInput() {
  const [value, setValue] = React.useState(new Date());

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      locale={ko}
      dateFormats={{ monthAndYear: "yyyy MM" }}
    >
      <MobileDatePicker
        label="Custom input"
        value={value}
        inputFormat="yyyy/MM/dd"
        showToolbar={false}
        okText="확인"
        cancelText="취소"
        views={["day"]}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        onClose={() =>
          setTimeout(() => {
            document.activeElement.blur();
          }, 0)
        }
        renderInput={({ inputRef, inputProps, InputProps }) => (
          // <Box sx={{ display: "flex", alignItems: "center" }}>
          //   <button ref={inputRef} {...inputProps}>
          //     {format(value, "yyyy년 MM월 dd일")}
          //   </button>
          // </Box>

          <TextField
            sx={{ mt: 2, width: "50%" }}
            inputProps={{ style: { fontSize: "0.8rem" } }} // font size of input text
            label="날짜"
            ref={inputRef}
            {...inputProps}
            value={format(value, "yyyy년 MM월 dd일")}
          />
        )}
      />
    </LocalizationProvider>
  );
}
