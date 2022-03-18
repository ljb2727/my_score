import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import Date from "./Date";

import { CalendarMonth, AccessTime } from "@mui/icons-material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const changeClose = (date) => {
    handleClose();
    props.setDate(date);
  };

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        startIcon={<CalendarMonth />}
      >
        {props.date.toISOString().substr(0, 10)}
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent sx={{ padding: "0px" }}>
          <Date date={props.date} changeClose={changeClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
