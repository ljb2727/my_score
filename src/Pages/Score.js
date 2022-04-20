import React, { useState, useEffect } from "react";
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
  const { info, 총스코어, score } = useStore();

  const findIndex = info.findIndex((e) => e.id === golfzone);
  const { id, 골프장, 전반, 후반, 날짜, 시간, inScore, outScore, sum } =
    info[findIndex];

  const findGolfzone = holeinfo.findIndex((e) => e.label === 골프장);

  const back = () => {
    navigate("/");
  };
  const imgUrl = "/image/sample.png";
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    총스코어(findIndex, 골프장, 전반, 후반);
  }, [info]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };
  useEffect(() => {
    window.addEventListener("scroll", updateScroll);
    console.log("scroll");
  });

  return (
    <>
      <ScorePut
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        target={target}
      />
      <Box>
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
              {scrollPosition < 1 ? (
                <Box>{골프장}</Box>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    gap: "1em",
                    justifyContent: "center",
                  }}
                >
                  <Box>
                    스코어
                    {`${sum} (${
                      score.총스코어 > 0 ? "+" + score.총스코어 : score.총스코어
                    })`}
                  </Box>
                  <Box>
                    퍼팅수
                    {score.총퍼팅수}
                  </Box>
                </Box>
              )}
            </Typography>
          </Toolbar>
        </AppBar>
        <Toolbar variant="dense" />

        <Box id="scrollY">
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
                    gap: "15px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      textAlign: "center",
                    }}
                  >
                    <span style={{ fontSize: "12px" }}>총 스코어</span>
                    <strong style={{ fontSize: "22px", lineHeight: 1 }}>
                      {`${sum} (${
                        score.총스코어 > 0
                          ? "+" + score.총스코어
                          : score.총스코어
                      })`}
                    </strong>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      textAlign: "center",
                    }}
                  >
                    <span style={{ fontSize: "12px" }}>총 퍼팅수</span>
                    <strong style={{ fontSize: "22px", lineHeight: 1 }}>
                      {score.총퍼팅수}
                    </strong>
                  </div>
                </Box>
              </CardContent>
            </CardMedia>
          </Card>

          <Box sx={{ px: 2, pb: 2 }}>
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
      </Box>
    </>
  );
}

export default Score;
