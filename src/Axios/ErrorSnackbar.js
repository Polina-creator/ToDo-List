import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";

export default function ErrorSnackbar({ message }) {

  return (
    <Snackbar
      id="message"
      open={message !== '' && message!==undefined}
      autoHideDuration={3000}
    >
      <Alert severity="error">
        {message}
      </Alert>
    </Snackbar>
  );
}
