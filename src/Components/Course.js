import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Course({ label }) {
  const [open, setOpen] = useState(false);
  const [radio, setRadio] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(function () {
      document.activeElement.blur();
    }, 0);
  };

  const handleChange = (event) => {
    setRadio(event.target.value);
    handleClose();
  };

  return (
    <>
      <TextField
        onClick={handleClickOpen}
        autoComplete="off"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Typography sx={{ color: "#000", fontSize: "12px" }}>
                {label}
              </Typography>
            </InputAdornment>
          ),
        }}
        value={radio}
      />
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <Typography sx={{ flex: 1 }} variant="h6" component="div">
              {label}
            </Typography>
          </Toolbar>
        </AppBar>
        {/* custom component */}
        <Golfcourse
          id={0}
          handleChange={handleChange}
          value={radio}
          label={label}
        />
      </Dialog>
    </>
  );
}

function Golfcourse({ handleChange, value, id, label }) {
  return (
    <FormControl>
      <RadioGroup name="course_list" onChange={handleChange} value={value}>
        <List>
          {course_list[id].course.map((e, i) => {
            return (
              <div key={i}>
                {i !== 0 && <Divider />}
                <ListItem button>
                  <FormControlLabel
                    sx={{ flex: 1 }}
                    value={e}
                    control={<Radio />}
                    label={e}
                  ></FormControlLabel>
                </ListItem>
              </div>
            );
          })}
        </List>
      </RadioGroup>
    </FormControl>
  );
}

let course_list = [
  {
    id: 0,
    course: ["a1", "a2", "a3"],
  },
  { id: 1, course: ["b1", "b2", "b3"] },
  { id: 2, course: ["c1", "c2", "c3"] },
];

export default Course;
