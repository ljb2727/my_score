import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import useStore from "../Data/useStore";
import { useNavigate } from "react-router";
import GolfInfo from "../Data/Golfzone";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { Card, CardMedia, CardContent } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import CircularProgress from "@mui/material/CircularProgress";

function ScoreCard() {
  const { golfzone } = useParams();
  const { info } = useStore();
  const findIndex = info.findIndex((e) => e.id === golfzone);
  const { id, 골프장, 전반, 후반, 날짜, 시간, inScore, outScore, sum } =
    info[findIndex];

  function createData(name, h1, h2, h3, h4, h5, h6, h7, h8, h9, total) {
    return { name, h1, h2, h3, h4, h5, h6, h7, h8, h9, total };
  }

  const golfCourseInfo = GolfInfo.find((e) => e.label === 골프장).courseInfo;

  // 전반
  const firstCorse = golfCourseInfo
    .find((e) => e.name === 전반)
    .hole.map((e) => e.par);
  console.log(inScore);
  const findInScore = inScore.map((e) => (e.score === null ? "-" : e.score));
  const findInPut = inScore.map((e) => (e.put === null ? "-" : e.put));
  console.log(findInScore);
  const inRows = [
    createData(
      "파",
      ...firstCorse,
      firstCorse.reduce((a, c) => a + c)
    ),
    createData(
      "점수",
      ...findInScore,
      findInScore
        .map((e) => (typeof e === "number" ? e : 0))
        .reduce((a, c) => a + c)
    ),
    createData(
      "퍼팅",
      ...findInPut,
      findInPut
        .map((e) => (typeof e === "number" ? e : 0))
        .reduce((a, c) => a + c)
    ),
  ];

  // 후반

  console.log(후반.length);
  console.log(후반.length === 0);
  const secondCorse =
    후반.length === 0
      ? []
      : golfCourseInfo.find((e) => e.name === 후반).hole.map((e) => e.par);
  console.log(secondCorse);

  const findOutScore = outScore.map((e) => e.score);
  const findOutPut = outScore.map((e) => e.put);
  const outRows =
    후반.length === 0
      ? []
      : [
          createData(
            "파",
            ...secondCorse,
            secondCorse.reduce((a, c) => a + c)
          ),
          createData(
            "점수",
            ...findOutScore,
            findOutScore.reduce((a, c) => a + c)
          ),
          createData(
            "퍼팅",
            ...findOutPut,
            findOutPut.reduce((a, c) => a + c)
          ),
        ];

  const navigate = useNavigate();
  const back = () => {
    navigate(-1);
  };

  function BasicTable() {
    const [image, setImage] = useState({});
    const [loaded, setLoaded] = React.useState(false);
    const { score } = useStore();
    function handleImageLoad() {
      setLoaded(true);
      console.log("loaded @@@@@");
    }

    useEffect(() => {
      const image = new Image();
      image.onload = handleImageLoad;
      image.src = "/image/sample.png";
      setImage(image);
    }, []);
    return (
      <>
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
              상세보기
            </Typography>
          </Toolbar>
        </AppBar>
        <Toolbar variant="dense" />
        <Box>
          <Card sx={{ borderRadius: "0" }}>
            <CardMedia image={image.src} sx={{ position: "relative" }}>
              {loaded === false && (
                <CircularProgress
                  size={50}
                  style={{
                    position: "absolute",
                    top: "calc(50% - 25px)",
                    left: "calc(50% - 25px)",
                  }}
                />
              )}
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
                    position: "absolute",
                    bottom: "16px",
                  }}
                ></Box>
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
        </Box>
        <TableContainer component={Paper}>
          {/* 전반 */}
          <Table
            aria-label="table"
            size="small"
            sx={{
              tableLayout: "fixed",
              width: "100%",
              "& th,& td": { padding: 0 },
            }}
          >
            <TableHead
              sx={{
                "& th": {
                  fontSize: "2vw",
                  background: "#9e9e9e",
                  color: "#fff",
                },
              }}
            >
              <TableRow>
                <TableCell align="center">HOLE</TableCell>
                <TableCell align="center">1</TableCell>
                <TableCell align="center">2</TableCell>
                <TableCell align="center">3</TableCell>
                <TableCell align="center">4</TableCell>
                <TableCell align="center">5</TableCell>
                <TableCell align="center">6</TableCell>
                <TableCell align="center">7</TableCell>
                <TableCell align="center">8</TableCell>
                <TableCell align="center">9</TableCell>
                <TableCell align="center">합계</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inRows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{
                    "&:last-child&:last-child td, &:last-child th": {
                      border: 0,
                    },
                    "& th,& td": { fontSize: "2vw" },
                    "& th": { fontWeight: "bold" },
                  }}
                >
                  <TableCell component="th" scope="row" align="center">
                    {row.name}
                  </TableCell>
                  <TableCell align="center">{row.h1}</TableCell>
                  <TableCell align="center">{row.h2}</TableCell>
                  <TableCell align="center">{row.h3}</TableCell>
                  <TableCell align="center">{row.h4}</TableCell>
                  <TableCell align="center">{row.h5}</TableCell>
                  <TableCell align="center">{row.h6}</TableCell>
                  <TableCell align="center">{row.h7}</TableCell>
                  <TableCell align="center">{row.h8}</TableCell>
                  <TableCell align="center">{row.h9}</TableCell>
                  <TableCell component="th" scope="row" align="center">
                    {row.total}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* 후반 */}
          {후반.length === 0 ? null : (
            <Table
              aria-label="table"
              size="small"
              sx={{
                tableLayout: "fixed",
                width: "100%",
                "& th,& td": { padding: 0 },
              }}
            >
              <TableHead
                sx={{
                  "& th": {
                    fontSize: "2vw",
                    background: "#9e9e9e",
                    color: "#fff",
                  },
                }}
              >
                <TableRow>
                  <TableCell align="center">HOLE</TableCell>
                  <TableCell align="center">10</TableCell>
                  <TableCell align="center">11</TableCell>
                  <TableCell align="center">12</TableCell>
                  <TableCell align="center">13</TableCell>
                  <TableCell align="center">14</TableCell>
                  <TableCell align="center">15</TableCell>
                  <TableCell align="center">16</TableCell>
                  <TableCell align="center">17</TableCell>
                  <TableCell align="center">18</TableCell>
                  <TableCell align="center">합계</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {outRows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{
                      "&:last-child&:last-child td, &:last-child th": {
                        border: 0,
                      },
                      "& th,& td": { fontSize: "2vw" },
                      "& th": { fontWeight: "bold" },
                    }}
                  >
                    <TableCell component="th" scope="row" align="center">
                      {row.name}
                    </TableCell>
                    <TableCell align="center">{row.h1}</TableCell>
                    <TableCell align="center">{row.h2}</TableCell>
                    <TableCell align="center">{row.h3}</TableCell>
                    <TableCell align="center">{row.h4}</TableCell>
                    <TableCell align="center">{row.h5}</TableCell>
                    <TableCell align="center">{row.h6}</TableCell>
                    <TableCell align="center">{row.h7}</TableCell>
                    <TableCell align="center">{row.h8}</TableCell>
                    <TableCell align="center">{row.h9}</TableCell>
                    <TableCell component="th" scope="row" align="center">
                      {row.total}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <Box sx={{ display: "flex", gap: "10px", mt: "5px" }}>
          <Box sx={{ display: "flex", alignItems: "center", fontSize: "11px" }}>
            <CircleIcon color="red" sx={{ fontSize: "12px" }} />
            이글
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", fontSize: "11px" }}>
            <CircleIcon color="pink" sx={{ fontSize: "12px" }} />
            버디
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", fontSize: "11px" }}>
            <CircleIcon color="gray" sx={{ fontSize: "12px" }} />파
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", fontSize: "11px" }}>
            <CircleIcon color="lightBlue" sx={{ fontSize: "12px" }} />
            보기
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", fontSize: "11px" }}>
            <CircleIcon color="blue" sx={{ fontSize: "12px" }} />
            더블보기이상
          </Box>
        </Box>
      </>
    );
  }

  return (
    <div>
      <BasicTable />
    </div>
  );
}

export default ScoreCard;
