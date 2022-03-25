import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Divider from "@mui/material/Divider";
import SettingsIcon from "@mui/icons-material/Settings";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Typography from "@mui/material/Typography";
import useStore from "../Data/useStore";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router";

const options = [
  {
    icon: <SettingsIcon fontSize="small" sx={{ mr: 1 }} />,
    text: "라운드 수정",
    id: "modifyMenu",
  },
  {
    icon: <DeleteForeverIcon fontSize="small" sx={{ mr: 1 }} />,
    text: "라운드 삭제",
    id: "removeMenu",
  },
];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function LongMenu({ parentId }) {
  let navigate = useNavigate();
  const { 라운드삭제 } = useStore(); //라운딩 정보 배열
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (remove) => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (event, index, parentId) => {
    /*
    index0 = 수정
    index1 = 삭제
    parentId = uesStore info.id 값
    */
    console.log(parentId);
    if (index === 1) {
      setDialog(true);
      //dialog 띄워서 다시 확인함
    } else {
      console.log("수정");
      navigate(`/modify/${parentId}`);
    }
    setAnchorEl(null);
  };

  //dialog제어
  const [dialog, setDialog] = useState(false);
  const dialogClose = (remove) => {
    if (remove === "remove") {
      라운드삭제(parentId);
    }
    setDialog(false);
  };

  return (
    <>
      <Dialog
        open={dialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={dialogClose}
      >
        <DialogContent>
          <Typography variant="body1" color="initial">
            삭제 하시겠습니까???
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={dialogClose} variant="contained" color="common">
            취소
          </Button>
          <Button
            onClick={() => dialogClose("remove")}
            variant="contained"
            color="error"
          >
            확인
          </Button>
        </DialogActions>
      </Dialog>

      <div style={{ position: "absolute", right: 0, top: 0 }}>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? "long-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          sx={{
            "& ul": {
              padding: 0,
            },
          }}
        >
          {options.map((option, index) => (
            <div key={index}>
              {index !== 0 && <Divider />}
              <MenuItem
                onClick={(event) => handleMenuItemClick(event, index, parentId)}
                id={options[index].id}
              >
                {options[index].icon}
                <Typography variant="body2" color="initial">
                  {options[index].text}
                  `$부모id{parentId}`
                </Typography>
              </MenuItem>
            </div>
          ))}
        </Menu>
      </div>
    </>
  );
}
