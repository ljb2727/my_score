import React from "react";
import useStore from "../Data/useStore";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Menu from "../Common/Menu";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";
import Box from "@mui/material/Box";
const RoundingList = () => {
  const { info } = useStore();
  // const info = [
  //   {
  //     id: 0,
  //     골프장: "강남300",
  //     전반: "a1",
  //     후반: "a2",
  //     날짜: "2022년 03월 24일",
  //     시간: "오전 10시 30분",
  //   },
  // ];

  return (
    <>
      {info.map((value, i) => {
        const { id, 골프장, 전반, 후반, 날짜, 시간, sum } = value;

        return (
          <Item
            key={id}
            id={id}
            골프장={골프장}
            전반={전반}
            후반={후반}
            날짜={날짜}
            시간={시간}
            sum={sum}
          ></Item>
        );
      })}
    </>
  );
};

const StyleItem = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  background: "#f9f7f9",
  padding: theme.spacing(1),
  marginBottom: theme.spacing(1),
  color: theme.palette.text,
}));

function Item({ id, 골프장, 전반, 후반, 날짜, 시간, sum }) {
  let navigate = useNavigate();
  function rounding(event) {
    navigate(`/score/${id}`);
  }
  return (
    <>
      <StyleItem sx={{ position: "relative" }}>
        <Menu parentId={id} />
        <div onClick={(event) => rounding(event)}>
          <Typography variant="caption">
            {날짜} / {시간}
          </Typography>
          <Typography variant="body1">{골프장}</Typography>
          <Typography variant="caption" color="text.secondary">
            {`전반:${전반}`}
            {후반.length !== 0 && ` - 후반:${후반}`}
          </Typography>

          {sum === undefined ? (
            <Box sx={{ position: "absolute", right: "5px", bottom: "5px" }}>
              <Button
                variant="contained"
                size="small"
                color="secondary"
                disableElevation
              >
                입력
              </Button>
            </Box>
          ) : (
            <Box sx={{ position: "absolute", right: "10px", bottom: "5px" }}>
              <Typography color="error" sx={{ fontSize: "20px" }}>
                {sum}
              </Typography>
            </Box>
          )}
        </div>
      </StyleItem>
    </>
  );
}

export default RoundingList;
