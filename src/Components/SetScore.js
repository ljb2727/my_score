import React from "react";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Dialog from "@mui/material/Dialog";
import InputLabel from "@mui/material/InputLabel";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import Box from "@mui/material/Box";
import useStore from "../Data/useStore"; //useStore
import { useParams } from "react-router";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SetScore({ modalOpen, setModalOpen, target }) {
  const { golfzone } = useParams();
  const { info, 스코어수정, 기본스코어 } = useStore();
  //console.log(target); //inCourse, hole, par, meter, id, 골프장, 전반, 후반
  const { inCourse, hole = 0, par, meter, id } = target;
  const findIndex = info.findIndex((e) => e.id === golfzone);

  function defaultZero() {
    기본스코어(id, inCourse, hole);
  }

  function handleClose() {
    setModalOpen(false);
    defaultZero();
  }

  function setPut(num) {
    const array = [];
    for (var i = 0; i < num; i++) {
      array.push(i);
    }
    return array;
  }

  //let holeIndex = inCourse ? Number(hole) : Number(hole) + 9;
  let findScore = inCourse ? info[findIndex].inScore : info[findIndex].outScore;

  let diaScore =
    String(findScore[hole].score) === "null"
      ? "0"
      : String(findScore[hole].score);
  let diaPut =
    String(findScore[hole].put) === "null" ? "2" : String(findScore[hole].put);

  const handleChange = (event) => {
    let val = event.target.value;
    let name = event.target.name;
    스코어수정(findIndex, inCourse, hole, name, val);
  };

  return (
    <>
      <Dialog
        open={modalOpen}
        onClose={handleClose}
        fullWidth
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }} elevation={0}>
          <Toolbar>
            <Typography variant="h6" sx={{ mr: 2, lineHeight: 1 }}>
              {`${Number(hole) + 1}H`}
            </Typography>
            <Typography
              sx={{ fontSize: "12px" }}
            >{`파${par} | ${meter}m`}</Typography>
          </Toolbar>
        </AppBar>
        <DialogContent
          sx={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Box style={{ display: par === "3" ? "block" : "none" }}>
            <FormControl variant="outlined">
              <InputLabel>스코어</InputLabel>
              <Select
                name="스코어"
                value={diaScore}
                label="스코어"
                onChange={handleChange}
                displayEmpty
              >
                {/* 파3 */}
                <MenuItem sx={{ display: "none" }} value="-3"></MenuItem>
                <MenuItem sx={{ display: "none" }} value="-4"></MenuItem>
                <MenuItem sx={{ display: "none" }} value="4"></MenuItem>
                <MenuItem sx={{ display: "none" }} value="5"></MenuItem>
                <MenuItem value="-2">-2 / 홀인원</MenuItem>
                <MenuItem value="-1">-1 / 버디</MenuItem>
                <MenuItem value="0">0 / 파</MenuItem>
                <MenuItem value="1">+1 / 보기</MenuItem>
                <MenuItem value="2">+2 / 더블보기</MenuItem>
                <MenuItem value="3">+3 / 더블파</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box style={{ display: par === "4" ? "block" : "none" }}>
            <FormControl variant="outlined">
              <InputLabel>스코어</InputLabel>

              <Select
                name="스코어"
                value={diaScore}
                label="스코어"
                onChange={handleChange}
                displayEmpty
              >
                {/* 파4 */}
                <MenuItem sx={{ display: "none" }} value="-4"></MenuItem>
                <MenuItem sx={{ display: "none" }} value="5"></MenuItem>
                <MenuItem value="-3">-3 / 홀인원</MenuItem>
                <MenuItem value="-2">-2 / 이글</MenuItem>
                <MenuItem value="-1">-1 / 버디</MenuItem>
                <MenuItem value="0">0 / 파</MenuItem>
                <MenuItem value="1">+1 / 보기</MenuItem>
                <MenuItem value="2">+2 / 더블보기</MenuItem>
                <MenuItem value="3">+3 / 트리플보기</MenuItem>
                <MenuItem value="4">+4 / 더블파</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box style={{ display: par === "5" ? "block" : "none" }}>
            <FormControl variant="outlined">
              <InputLabel>스코어</InputLabel>
              <Select
                name="스코어"
                value={diaScore}
                label="스코어"
                onChange={handleChange}
                displayEmpty
              >
                {/* 파5 */}
                <MenuItem value="-4">-4 / 홀인원</MenuItem>
                <MenuItem value="-3">-3 / 알바트로스</MenuItem>
                <MenuItem value="-2">-2 / 이글</MenuItem>
                <MenuItem value="-1">-1 / 버디</MenuItem>
                <MenuItem value="0">0 / 파</MenuItem>
                <MenuItem value="1">+1 / 보기</MenuItem>
                <MenuItem value="2">+2 / 더블보기</MenuItem>
                <MenuItem value="3">+3 / 트리플보기</MenuItem>
                <MenuItem value="4">+4 / 쿼드러플보기</MenuItem>
                <MenuItem value="5">+5 / 더블파</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box>
            <FormControl variant="outlined" style={{ minWidth: "5em" }}>
              <InputLabel>퍼팅수</InputLabel>
              <Select
                name="퍼팅수"
                value={diaPut}
                label="퍼팅수"
                onChange={handleChange}
                displayEmpty
              >
                {setPut(par).map((e, i) => {
                  return (
                    <MenuItem key={i} value={e}>
                      {e}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="contained">
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
