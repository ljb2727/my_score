import React from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

export default function Toast({ message, setToastShow }) {
  const [toast, setToast] = React.useState({
    open: true,
    vertical: "top",
    horizontal: "center",
  });
  const { open, vertical, horizontal } = toast;
  const handleClose = () => {
    setToast({ ...toast, open: false });
    setToastShow({
      show: false,
      message: "",
    });
  };
  return (
    <>
      <Snackbar
        autoHideDuration={3000}
        open={open}
        anchorOrigin={{ vertical, horizontal }}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}
