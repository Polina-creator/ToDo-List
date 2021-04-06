import { Snackbar, Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useState } from "react";

export default function TasksList({ message }) {
  const [open, setOpen] = useState(true);
 

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onRequestClose = {()=>setOpen(false)}
    >
      <Alert severity="error">{message}</Alert>
    </Snackbar>
  );
}
