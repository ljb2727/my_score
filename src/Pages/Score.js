import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import IconButton from "@mui/material/IconButton";
import { useParams, useNavigate } from "react-router";
import { Card, CardMedia, CardContent } from "@mui/material";

import ScorePut from "../Components/SetScore"; //점수 설정 모달

import useStore from "../Data/useStore";
import holeinfo from "../Data/Golfzone";

function Score() {
  const [target, setTarget] = useState({});
  const setScore = (inCourse, hole, par, meter, id, 골프장, 전반, 후반) => {
    console.log(inCourse, hole, par, meter, id, 골프장, 전반, 후반); //전반인지, 홀넘버
    setTarget({
      inCourse,
      hole: String(hole),
      par: String(par),
      meter: String(meter),
      id,
      골프장,
      전반,
      후반,
    });
    setModalOpen(true);
  };

  const HoleInfo = ({ hole, par, meter, inScore, outScore, inCourse }) => {
    return (
      <>
        <Box
          component={"li"}
          sx={{
            p: 1,
            mt: hole === 0 ? 0 : 1,
            border: "1px solid #f1f1f1",
            display: "flex",
            justifyContent: "space-between",
          }}
          onClick={() =>
            setScore(inCourse, hole, par, meter, id, 골프장, 전반, 후반)
          }
        >
          <Box sx={{ display: "flex", alignItems: "baseline" }}>
            <Typography
              variant="subtitle1"
              style={{ fontWeight: "bold", paddingRight: "10px" }}
            >
              {hole + 1}H
            </Typography>
            <Typography sx={{ fontSize: "12px" }}>
              파{par} | {meter}m
            </Typography>
          </Box>
          <Box sx={{ display: "flex;" }}>
            <div
              id={
                inCourse ? `score${Number(hole)}` : `score${Number(hole) + 9}`
              }
              style={{ width: "36px", marginLeft: "10px", textAlign: "center" }}
            >
              {inCourse === true
                ? typeof inScore[hole].score == "number"
                  ? inScore[hole].score
                  : "-"
                : typeof outScore[hole].score == "number"
                ? outScore[hole].score
                : "-"}
            </div>
            <div
              id={inCourse ? `put${Number(hole)}` : `put${Number(hole) + 9}`}
              style={{ width: "36px", marginLeft: "10px", textAlign: "center" }}
            >
              {inCourse === true
                ? typeof inScore[hole].put == "number"
                  ? inScore[hole].put
                  : "-"
                : typeof outScore[hole].put == "number"
                ? outScore[hole].put
                : "-"}
            </div>
          </Box>
        </Box>
      </>
    );
  };

  const navigate = useNavigate();
  const { golfzone } = useParams();
  const { info } = useStore();
  const findIndex = info.findIndex((e) => e.id === golfzone);
  const { id, 골프장, 전반, 후반, 날짜, 시간, inScore, outScore } =
    info[findIndex];

  const findGolfzone = holeinfo.findIndex((e) => e.label === 골프장);
  //console.log(inScore);
  const back = () => {
    navigate("/");
  };
  const imgUrl = "/image/sample.png";
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <ScorePut
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        target={target}
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
              {골프장}
            </Typography>
          </Toolbar>
        </AppBar>
        <Toolbar variant="dense" />

        <Box>
          <Card sx={{ borderRadius: "0" }}>
            <CardMedia image={imgUrl}>
              <CardContent
                sx={{
                  height: "46vw",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Typography color="common.white">
                  {날짜} / {시간} <br />
                  전반 : {전반} <br />
                  {!!후반 && `후반 : ${후반}`}
                </Typography>
                <Box
                  color="common.white"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      textAlign: "center",
                    }}
                  >
                    <span>총 스코어</span>
                    <strong>0</strong>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      textAlign: "center",
                    }}
                  >
                    <span>퍼팅수</span>
                    <strong>0</strong>
                  </div>
                </Box>
              </CardContent>
            </CardMedia>
          </Card>

          <Box sx={{ p: 1 }}>
            <Box className="first_corse">
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "8px 8px 0px 8px",
                }}
              >
                <Box>
                  <strong style={{ paddingRight: "5px" }}>{전반}</strong>
                  <span>전반</span>
                </Box>
                <Box>
                  <span
                    style={{
                      fontSize: "12px",
                      width: "36px",
                      textAlign: "center",
                    }}
                  >
                    스코어
                  </span>
                  <span
                    style={{
                      fontSize: "12px",
                      width: "36px",
                      textAlign: "center",
                      marginLeft: "10px",
                    }}
                  >
                    퍼팅수
                  </span>
                </Box>
              </Box>
              <ul style={{ margin: 0, padding: 0 }}>
                {holeinfo[findGolfzone].courseInfo[
                  holeinfo[findGolfzone].courseInfo.findIndex(
                    (e) => e.name === `${전반}`
                  )
                ].hole.map((e, i) => {
                  return (
                    <HoleInfo
                      key={i}
                      hole={i}
                      par={e.par}
                      meter={e.meter}
                      inScore={inScore}
                      outScore={outScore}
                      inCourse={true} //전반일때 true
                    />
                  );
                })}
              </ul>
            </Box>

            <Box className="second_corse" sx={{ display: !후반 && "none" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 2,
                  p: 1,
                }}
              >
                <Box>
                  <strong style={{ paddingRight: "5px" }}>{후반}</strong>
                  <span>후반</span>
                </Box>
                <Box>
                  <span style={{ fontSize: "12px" }}>스코어</span>
                  <span style={{ fontSize: "12px", marginLeft: "10px" }}>
                    퍼팅수
                  </span>
                </Box>
              </Box>
              <ul style={{ margin: 0, padding: 0 }}>
                {!!`${후반}` &&
                  holeinfo[findGolfzone].courseInfo[
                    holeinfo[findGolfzone].courseInfo.findIndex(
                      (e) => e.name === `${후반}`
                    )
                  ].hole.map((e, i) => {
                    return (
                      <HoleInfo
                        key={i}
                        hole={i}
                        par={e.par}
                        meter={e.meter}
                        inScore={inScore}
                        outScore={outScore}
                        inCourse={false} //전반일때 true
                      />
                    );
                  })}
              </ul>
            </Box>
          </Box>
        </Box>
      </Dialog>
    </>
  );
}

export default Score;
