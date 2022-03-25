import React from "react";
import useStore from "../Data/useStore";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import Menu from "../Common/Menu";
import Button from "@mui/material/Button";

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
      {info.map((item) => {
        const { id, 골프장, 전반, 후반, 날짜, 시간 } = item;

        return (
          <Item
            key={id}
            id={id}
            골프장={골프장}
            전반={전반}
            후반={후반}
            날짜={날짜}
            시간={시간}
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

function Item({ id, 골프장, 전반, 후반, 날짜, 시간 }) {
  return (
    <>
      <StyleItem sx={{ position: "relative" }}>
        <Menu parentId={id} />
        <Typography variant="caption">{날짜}</Typography>
        <Typography variant="body1">{골프장}</Typography>
        <Typography variant="caption" color="text.secondary">
          {`전반:${전반}`}
          {후반.length !== 0 && ` - 후반:${후반}`}
        </Typography>
        <Button
          variant="contained"
          size="small"
          color="secondary"
          sx={{ position: "absolute", right: "5px", bottom: "5px" }}
          disableElevation
        >
          입력{id}
        </Button>
      </StyleItem>
    </>
  );
}

export default RoundingList;
