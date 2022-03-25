import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Divider from "@mui/material/Divider";
import SettingsIcon from "@mui/icons-material/Settings";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Typography from "@mui/material/Typography";
import useStore from "../Data/useStore";

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

export default function LongMenu({ parentId }) {
  const { 라운드삭제 } = useStore(); //라운딩 정보 배열
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    console.log(event);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
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
      라운드삭제(parentId);
    }
    setAnchorEl(null);
  };

  return (
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
  );
}
