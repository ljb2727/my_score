import React from "react";
import Hangul from "hangul-js";
import { matchSorter } from "match-sorter";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import golfzone from "../Golfzone";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
const filterOptions = (options, { inputValue }) => {
  //console.log(Hangul.disassemble(inputValue));
  return matchSorter(options, Hangul.disassemble(inputValue).join(""), {
    keys: ["chosung"],
  });
};
function Golfzone() {
  const [open, setOpen] = React.useState(false);
  return (
    <Autocomplete
      open={open}
      onInputChange={(_, value) => {
        console.log(value);
        if (value.length === 0) {
          if (open) setOpen(false);
        } else {
          if (!open) setOpen(true);
        }
      }}
      onClose={() => setOpen(false)}
      getOptionLabel={(option) => option.label}
      filterOptions={filterOptions}
      disablePortal
      id="combo-box-demo"
      options={golfzone}
      //disableClearable
      sx={{ width: "100%" }}
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
  );
}

export default Golfzone;
