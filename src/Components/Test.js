import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function Test() {
  let [open, setOpen] = React.useState(false);
  let [input, setInput] = React.useState("");
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>test</DialogContent>
        <DialogContent>
          <TextField
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
            }}
          />
        </DialogContent>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
      </Dialog>

      <Button
        variant="outlined"
        onClick={() => {
          setOpen(true);
        }}
      >
        {input}
      </Button>
    </>
  );
}
