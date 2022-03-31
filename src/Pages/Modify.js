import React from "react";
import Box from "@mui/material/Box";
import useStore from "../Data/useStore"; //useStore
import { format } from "date-fns";
import { useParams, useNavigate } from "react-router";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Slide from "@mui/material/Slide";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Mpicker from "../Components/Mpicker";
import Time from "../Components/Time";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Modify = (parentId) => {
  const navigate = useNavigate();
  const { info, setDate, storeSetTime } = useStore();
  let { golfzone } = useParams();
  let target = info.filter((e) => String(e.id) === golfzone);
  const { id, 골프장, 전반, 후반, 날짜, 시간 } = target[0];
  const [oldDate, setOldDate] = React.useState(); //최초 불러온 날짜와 시간 저장

  const [parentOpen, parentSetOpen] = React.useState(false); //날짜모달창 세팅
  const [parentTimeOpen, parentSetTimeOpen] = React.useState(false); //시간모달창 세팅
  const [checkSave, setCheckSave] = React.useState(false);
  function showCal() {
    console.log("changeDate");
    parentSetOpen(true);
  }

  function parentChangePicker(changeDate) {
    //console.log(format(changeDate, "yyyy년 MM월 dd일"));
    setDate(format(changeDate, "yyyy년 MM월 dd일"), golfzone); //바뀐날짜와 아이디 넘김
    console.log(`old date ${oldDate.날짜} / ${oldDate.시간}`);
  }

  function parentChangeTime(changeTime) {
    storeSetTime(changeTime, golfzone);
    console.log("parent change");
  }

  React.useEffect(() => {
    setOldDate({
      날짜,
      시간,
    }); //기존날짜 저장
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const back = () => {
    console.log("back");
    //navigate("/");
    //setCheckSave(true);
    const { 날짜: 이전날짜, 시간: 이전시간 } = oldDate;
    console.log(`old : ${이전날짜} / ${이전시간}`);
    console.log(`new : ${날짜} / ${시간}`);
    if (이전날짜 !== 날짜 || 이전시간 !== 시간) {
      setCheckSave(true);
    } else {
      navigate("/");
    }
  };

  function checkClose(boolean) {
    setCheckSave(false);
    boolean && navigate("/");
  }

  // 시간 수정
  function showTime() {
    console.log("showtime");
    parentSetTimeOpen(true);
  }

  return (
    <>
      {/* 달력컴포넌트 시작 */}
      <Mpicker
        parentOpen={parentOpen}
        parentSetOpen={parentSetOpen}
        parentChangePicker={parentChangePicker}
        defaultValue={날짜
          .replaceAll(" ", "")
          .replace(/\D+/g, "-")
          .substr(0, 10)}
      />
      {/* 달력컴포넌트 끝 */}
      {/* 시간컴포넌트 시작 */}
      <Time
        parentTimeOpen={parentTimeOpen}
        parentSetTimeOpen={parentSetTimeOpen}
        parentChangeTime={parentChangeTime}
        defaultValue={시간}
      />
      {/* 시간컴포넌트 끝 */}
      <Dialog open={true} fullScreen>
        <AppBar elevation={0}>
          <Toolbar variant="dense">
            <Box sx={{ width: "10%" }}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                onClick={back}
              >
                <ArrowBackIosIcon />
              </IconButton>
            </Box>
            <Typography
              variant="h6"
              sx={{ flexGrow: "1", textAlign: "center", marginRight: "10%" }}
            >
              라운드 수정
            </Typography>
          </Toolbar>
        </AppBar>
        <Toolbar variant="dense" />
        <DialogContent sx={{ pt: 0 }}>
          {/* 세이브 체크 s */}
          <Dialog open={checkSave} TransitionComponent={Transition}>
            <DialogContent>
              <Typography variant="body1" color="initial">
                수정된 라운드 정보를 저장하겠습니까?
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => checkClose(false)}
                variant="contained"
                color="common"
              >
                취소
              </Button>
              <Button
                onClick={() => checkClose(true)}
                variant="contained"
                color="error"
              >
                확인
              </Button>
            </DialogActions>
          </Dialog>
          {/* 세이브 체크 e*/}

          <List>
            <ListItem disableGutters>
              <ListItemText
                primary={
                  <Typography
                    variant="subtitle1"
                    style={{ fontWeight: "bold" }}
                  >
                    골프장
                  </Typography>
                }
              />
              <Typography variant="subtitle1" color="text.secondary">
                {골프장}
              </Typography>
            </ListItem>
            <ListItem disableGutters>
              <ListItemText
                primary={
                  <Typography
                    variant="subtitle1"
                    style={{ fontWeight: "bold" }}
                  >
                    전반코스
                  </Typography>
                }
              />
              <Typography variant="subtitle1" color="text.secondary">
                {전반}
              </Typography>
            </ListItem>
            <ListItem disableGutters>
              <ListItemText
                primary={
                  <Typography
                    variant="subtitle1"
                    style={{ fontWeight: "bold" }}
                  >
                    후반코스
                  </Typography>
                }
              />
              <Typography variant="subtitle1" color="text.secondary">
                {후반}
              </Typography>
            </ListItem>
            <ListItem disableGutters>
              <ListItemText
                primary={
                  <Typography
                    variant="subtitle1"
                    style={{ fontWeight: "bold" }}
                  >
                    날짜
                  </Typography>
                }
              />
              <ListItemIcon
                onClick={showCal}
                sx={{ color: "secondary", marginRight: "-0.5em" }}
              >
                {/* {format(value, "yyyy년 MM월 dd일")} */}
                {날짜}
                <ChevronRightIcon />
              </ListItemIcon>
            </ListItem>
            <ListItem disableGutters>
              <ListItemText
                primary={
                  <Typography
                    variant="subtitle1"
                    style={{ fontWeight: "bold" }}
                  >
                    시간
                  </Typography>
                }
              />
              <ListItemIcon
                onClick={showTime}
                sx={{ color: "secondary", marginRight: "-0.5em" }}
              >
                {시간}
                <ChevronRightIcon />
              </ListItemIcon>
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            disableElevation
            onClick={checkClose}
          >
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Modify;
