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
import Toast from "../Common/Toast";
import useStore from "../Data/useStore";
import course_list from "../Data/Golfzone";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Course({ label, id }) {
  const { useCourse, setCourse, currentId } = useStore();
  // 토스트 설정_s
  const [toastShow, setToastShow] = React.useState({
    show: false,
    message: "",
  });

  const [defaultCourse, setdefaultCourse] = React.useState();
  console.log(defaultCourse);
  // 토스트 설정_e

  const [open, setOpen] = useState(false);

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

  //setdefaultCourse();

  React.useEffect(() => {
    //console.log("골프장 변경시 코스 리셋");
    if (currentId !== null) {
      const array = [];
      console.log(
        course_list
          .filter((e) => e.id === currentId)[0]
          .courseInfo.map((e) => array.push(e.name))
      );
      setdefaultCourse(array);

      setCourse({ 전반: "", 후반: "" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentId]);

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
        <AppBar sx={{ position: "relative" }} elevation={0}>
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
          defaultCourse={defaultCourse}
        />
      </Dialog>
    </>
  );
}

function Golfcourse({ handleChange, value, id, label, defaultCourse }) {
  let radioValue = "";
  if (label === "전반") {
    radioValue = value.전반;
  } else {
    radioValue = value.후반;
  }

  return (
    <FormControl>
      <RadioGroup name={label} onChange={handleChange} value={radioValue}>
        <List>
          {defaultCourse.map((e, i) => {
            console.log(e);
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
