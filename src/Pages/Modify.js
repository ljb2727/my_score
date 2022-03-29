import React from "react";
import Box from "@mui/material/Box";
import useStore from "../Data/useStore";
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
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Mpicker from "../Components/Mpicker";

const Modify = (parentId) => {
  const navigate = useNavigate();
  const { info, setDate } = useStore();
  let { golfzone } = useParams();
  let target = info.filter((e) => String(e.id) === golfzone);
  const { id, 골프장, 전반, 후반, 날짜, 시간 } = target[0];

  const [parentOpen, parentSetOpen] = React.useState(false);
  const back = () => {
    console.log("back");
    navigate("/");
  };

  function showCal() {
    console.log("changeDate");
    parentSetOpen(true);
  }

  function parentChangePicker(changeDate) {
    const storeDate = 날짜; //store에 저장된 날짜 2022년 03월 24일
    //console.log(storeDate);
    //console.log(format(changeDate, "yyyy년 MM월 dd일"));
    setDate(format(changeDate, "yyyy년 MM월 dd일"), golfzone);
  }

  return (
    <>
      <Mpicker
        parentOpen={parentOpen}
        parentSetOpen={parentSetOpen}
        parentChangePicker={parentChangePicker}
      />
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
              <ListItemIcon sx={{ color: "secondary", marginRight: "-0.5em" }}>
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
          >
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Modify;
