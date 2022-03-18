import * as React from "react";
import Box from "@mui/material/Box";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import { ko } from "date-fns/esm/locale";
import { format } from "date-fns";
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
        renderInput={({ inputRef, inputProps, InputProps }) => (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <button ref={inputRef} {...inputProps}>
              {format(value, "yyyy년 MM월 dd일")}
            </button>
          </Box>
        )}
      />
    </LocalizationProvider>
  );
}
