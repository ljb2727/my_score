import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import useStore from "../Data/useStore";
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

import Box from "@mui/material/Box";
import { Card, CardMedia, CardContent } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Slide from "@mui/material/Slide";
import { styled } from "@mui/system";

import "./CardDialog.css";

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

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  function BasicTable() {
    const [image, setImage] = useState({});
    const [loaded, setLoaded] = React.useState(false);
    const { score } = useStore();
    function handleImageLoad() {
      setLoaded(true);
      console.log("loaded @@@@@");
    }

    const [openDia, setDia] = useState(false);

    useEffect(() => {
      if (openDia) {
        const image = new Image();
        image.onload = handleImageLoad;
        image.src = "/image/sample.png";
        setImage(image);
      }
    }, [openDia]);

    function handleClose() {
      setDia(false);
      setTimeout(function () {
        document.activeElement.blur();
      }, 0);
    }

    // const StyleCell = styled(TableCell)`
    //   text-align: center;
    //   background: ${(props) =>
    //     props.name === "점수" && props.score <= -2 && "red"};
    //   background: ${(props) =>
    //     props.name === "점수" && props.score === -1 && "pink"};
    //   background: ${(props) =>
    //     props.name === "점수" && props.score === 0 && "gray"};
    //   background: ${(props) =>
    //     props.name === "점수" && props.score === 1 && "lightBlue"};
    //   background: ${(props) =>
    //     props.name === "점수" && props.score >= 2 && "blue"};
    // `;

    const StyleCell = styled(TableCell)(({ theme }) => ({
      textAlign: "center",
    }));

    function colorScore(type, num) {
      if (type === "점수") {
        if (num <= -2) {
          return "red";
        } else if (num === -1) {
          return "pink";
        } else if (num === 0) {
          return "gray";
        } else if (num === 1) {
          return "lightBlue";
        } else if (num >= 2) {
          return "blue";
        }
      }
    }

    return (
      <>
        <Button
          onClick={() => setDia(true)}
          variant="contained"
          color="primary"
          size="small"
        >
          스코어 카드
        </Button>
        <Dialog
          open={openDia}
          onClose={handleClose}
          fullScreen
          TransitionComponent={Transition}
        >
          <DialogContent sx={{ p: 1 }}>
            <AppBar elevation={0}>
              <Toolbar variant="dense">
                <Typography
                  variant="h6"
                  sx={{
                    flexGrow: "1",
                    textAlign: "center",
                  }}
                >
                  스코어 카드
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
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      color="common.white"
                      style={{ textAlign: "center" }}
                    >
                      <span style={{ fontSize: "4vw" }}>
                        {날짜} {시간}
                      </span>
                      <br />
                      <strong style={{ fontSize: "6vw" }}>{골프장}</strong>{" "}
                      <br />
                      <span style={{ fontSize: "4vw" }}>
                        {전반}
                        {!!후반 && ` - ${후반}`}
                      </span>
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
                      ></div>
                    </Box>
                  </CardContent>
                </CardMedia>
              </Card>
            </Box>

            <strong
              style={{
                display: "block",
                fontSize: "14px",
                lineHeight: 1,
                textAlign: "right",
                paddingTop: "5px",
                color: "#6BCB77",
              }}
            >
              {`${sum} (${
                score.총스코어 > 0 ? "+" + score.총스코어 : score.총스코어
              })`}
            </strong>
            <TableContainer component={Paper} sx={{ mt: 0.5 }}>
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
                        "& th,& td": { fontSize: "2vw", py: 0.5 },
                        "& th": { fontWeight: "bold" },
                      }}
                    >
                      <TableCell component="th" scope="row" align="center">
                        {row.name}
                      </TableCell>

                      <StyleCell
                        name={row.name}
                        score={row.h1}
                        className={colorScore(row.name, row.h1)}
                      >
                        {row.h1}
                      </StyleCell>
                      <StyleCell
                        name={row.name}
                        score={row.h2}
                        className={colorScore(row.name, row.h2)}
                      >
                        {row.h2}
                      </StyleCell>
                      <StyleCell
                        name={row.name}
                        score={row.h3}
                        className={colorScore(row.name, row.h3)}
                      >
                        {row.h3}
                      </StyleCell>
                      <StyleCell
                        name={row.name}
                        score={row.h4}
                        className={colorScore(row.name, row.h4)}
                      >
                        {row.h4}
                      </StyleCell>
                      <StyleCell
                        name={row.name}
                        score={row.h5}
                        className={colorScore(row.name, row.h5)}
                      >
                        {row.h5}
                      </StyleCell>
                      <StyleCell
                        name={row.name}
                        score={row.h6}
                        className={colorScore(row.name, row.h6)}
                      >
                        {row.h6}
                      </StyleCell>
                      <StyleCell
                        name={row.name}
                        score={row.h7}
                        className={colorScore(row.name, row.h7)}
                      >
                        {row.h7}
                      </StyleCell>
                      <StyleCell
                        name={row.name}
                        score={row.h8}
                        className={colorScore(row.name, row.h8)}
                      >
                        {row.h8}
                      </StyleCell>
                      <StyleCell
                        name={row.name}
                        score={row.h9}
                        className={colorScore(row.name, row.h9)}
                      >
                        {row.h9}
                      </StyleCell>
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
                          "& th,& td": { fontSize: "2vw", py: 0.5 },
                          "& th": { fontWeight: "bold" },
                        }}
                      >
                        <TableCell component="th" scope="row" align="center">
                          {row.name}
                        </TableCell>
                        <StyleCell
                          name={row.name}
                          score={row.h1}
                          className={colorScore(row.name, row.h1)}
                        >
                          {row.h1}
                        </StyleCell>
                        <StyleCell
                          name={row.name}
                          score={row.h2}
                          className={colorScore(row.name, row.h2)}
                        >
                          {row.h2}
                        </StyleCell>
                        <StyleCell
                          name={row.name}
                          score={row.h3}
                          className={colorScore(row.name, row.h3)}
                        >
                          {row.h3}
                        </StyleCell>
                        <StyleCell
                          name={row.name}
                          score={row.h4}
                          className={colorScore(row.name, row.h4)}
                        >
                          {row.h4}
                        </StyleCell>
                        <StyleCell
                          name={row.name}
                          score={row.h5}
                          className={colorScore(row.name, row.h5)}
                        >
                          {row.h5}
                        </StyleCell>
                        <StyleCell
                          name={row.name}
                          score={row.h6}
                          className={colorScore(row.name, row.h6)}
                        >
                          {row.h6}
                        </StyleCell>
                        <StyleCell
                          name={row.name}
                          score={row.h7}
                          className={colorScore(row.name, row.h7)}
                        >
                          {row.h7}
                        </StyleCell>
                        <StyleCell
                          name={row.name}
                          score={row.h8}
                          className={colorScore(row.name, row.h8)}
                        >
                          {row.h8}
                        </StyleCell>
                        <StyleCell
                          name={row.name}
                          score={row.h9}
                          className={colorScore(row.name, row.h9)}
                        >
                          {row.h9}
                        </StyleCell>
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
              <Box
                sx={{ display: "flex", alignItems: "center", fontSize: "11px" }}
              >
                <CircleIcon color="red" sx={{ fontSize: "12px" }} />
                이글
              </Box>
              <Box
                sx={{ display: "flex", alignItems: "center", fontSize: "11px" }}
              >
                <CircleIcon color="pink" sx={{ fontSize: "12px" }} />
                버디
              </Box>
              <Box
                sx={{ display: "flex", alignItems: "center", fontSize: "11px" }}
              >
                <CircleIcon color="gray" sx={{ fontSize: "12px" }} />파
              </Box>
              <Box
                sx={{ display: "flex", alignItems: "center", fontSize: "11px" }}
              >
                <CircleIcon color="lightBlue" sx={{ fontSize: "12px" }} />
                보기
              </Box>
              <Box
                sx={{ display: "flex", alignItems: "center", fontSize: "11px" }}
              >
                <CircleIcon color="blue" sx={{ fontSize: "12px" }} />
                더블보기이상
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              color="primary"
              variant="contained"
              size="large"
              fullWidth
            >
              확인
            </Button>
          </DialogActions>
        </Dialog>
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
