import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import IconButton from "@mui/material/IconButton";
import { useParams, useNavigate } from "react-router";
import { Card, CardMedia, CardContent, Button } from "@mui/material";

import useStore from "../Data/useStore";

function Score() {
  const navigate = useNavigate();
  const { golfzone } = useParams();

  const { info } = useStore();

  console.log(info);

  const back = () => {
    navigate("/");
  };

  const imgUrl = "/image/sample.png";

  return (
    <>
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
        <Card sx={{ borderRadius: "0" }}>
          <CardMedia image={imgUrl} sx={{ height: "46vw" }}>
            <CardContent>
              <Typography color="common.white">test</Typography>
            </CardContent>
          </CardMedia>
        </Card>
      </Dialog>
    </>
  );
}

export default Score;
