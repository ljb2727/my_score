import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Golfzone from "../Components/Golfzone";
import Course from "../Components/Course";
import Grid from "@mui/material/Grid";
import Mpicker from "../Components/Mpicker";
import Time from "../Components/Time";
import Button from "@mui/material/Button";
import Toast from "../Common/Toast";
import useStore from "../Data/useStore";
import RoundingList from "../Components/RoundingList";

function Main() {
  const { count, 라운드추가, resetStore } = useStore();
  const [toastShow, setToastShow] = React.useState({
    show: false,
    message: "",
  });

  function createScore() {
    const golfzone = document.getElementById("golfzone").value;
    const course1 = document.getElementById("course1").value;
    const course2 = document.getElementById("course2").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    if (!golfzone) {
      setToastShow({
        show: true,
        message: "먼저 골프장을 선택해주세요.",
      });
      return null;
    }
    if (!course1) {
      setToastShow({
        show: true,
        message: "먼저 전반코스를 선택해주세요.",
      });
      return null;
    }

    //라운드생성
    라운드추가(golfzone, course1, course2, date, time);
    resetStore(); //useStore 골프장명 리셋
  }

  return (
    <>
      {toastShow.show && (
        <Toast message={toastShow.message} setToastShow={setToastShow} />
      )}

      <Typography variant="h6" color="initial">
        search {`count : ${count}`}
      </Typography>
      <Box sx={{ mt: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Golfzone />
          </Grid>
          <Grid item xs={6}>
            <Course label={"전반"} id="course1" />
          </Grid>
          <Grid item xs={6}>
            <Course label={"후반"} id="course2" />
          </Grid>
          <Grid item xs={6}>
            <Mpicker />
          </Grid>
          <Grid item xs={6}>
            <Time />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              size="large"
              color="primary"
              fullWidth
              onClick={createScore}
              disableElevation
            >
              생성
            </Button>
          </Grid>

          <Grid item xs={12}>
            <RoundingList />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Main;
