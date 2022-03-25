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
import course_list from "../Data/cousr_list";
import Toast from "../Common/Toast";
import useStore from "../Data/useStore";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Course({ label, id }) {
  const { useCourse, setCourse } = useStore();
  // 토스트 설정_s
  const [toastShow, setToastShow] = React.useState({
    show: false,
    message: "",
  });
  // 토스트 설정_e

  const [open, setOpen] = useState(false);
  const [radio, setRadio] = useState("");

  const handleClickOpen = (event) => {
    //전반 코스 없으면 후반 코스 disable
    if (event.target.id === "course2") {
      const course1 = document.getElementById("course1").value;
      if (!course1) {
        setToastShow({
          show: true,
          message: "먼저 전반코스를 선택해주세요.",
        });
        blur();
        return false;
      } else {
        setOpen(true);
      }
    } else {
      const golfzone = document.getElementById("golfzone").value;
      if (!golfzone) {
        setToastShow({
          show: true,
          message: "먼저 골프장을 선택해주세요.",
        });
        blur();
        return false;
      } else {
        setOpen(true);
      }
    }
  };

  const blur = () => {
    setTimeout(function () {
      document.activeElement.blur();
    }, 0);
  };

  const handleClose = () => {
    setOpen(false);
    blur();
  };

  const handleChange = (event) => {
    //console.log(event.target);
    //setRadio(event.target.value);
    if (event.target.name === "전반") {
      setCourse({ ...useCourse, 전반: event.target.value });
    } else {
      setCourse({ ...useCourse, 후반: event.target.value });
    }
    handleClose();
  };
  return (
    <>
      {toastShow.show && (
        <Toast message={toastShow.message} setToastShow={setToastShow} />
      )}
      <TextField
        id={id}
        onClick={handleClickOpen}
        autoComplete="off"
        label="코스"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Typography sx={{ color: "#000", fontSize: "12px" }}>
                {label}
              </Typography>
            </InputAdornment>
          ),
        }}
        sx={{
          "& .Mui-disabled": {
            textFillColor: "#000 !important",
          },
        }}
        value={id === "course1" ? useCourse.전반 : useCourse.후반} //코스 값
        disabled
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
          value={useCourse}
          label={label}
        />
      </Dialog>
    </>
  );
}

function Golfcourse({ handleChange, value, id, label }) {
  let radioValue = "";
  if (label === "전반") {
    radioValue = value.전반;
  } else {
    radioValue = value.후반;
  }
  console.log(radioValue);

  return (
    <FormControl>
      <RadioGroup name={label} onChange={handleChange} value={radioValue}>
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

export default Course;
