import React, { useState } from "react";
import { Grid, TextField, Checkbox, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

export default function Task({ task, changeCheckTask, removeTask }) {
  const [textValue, setTextValue] = useState(task.text);
  const [editable, setEditable] = useState(false);

  const handleEdit = (e) => {
    setEditable(true);
    e.target.value = textValue;
  };
  return (
    <Grid container justify="center">
      <Checkbox
        inputProps={{ "aria-label": "primary checkbox" }}
        onClick={() => changeCheckTask(task)}
        checked={task.completed}
      />
      {editable && (
        <TextField
          size="small"
          variant="outlined"
          type="text"
          onFocus={(e) => {
            e.target.value = textValue;
          }}
          onBlur={() => {
            setEditable(false);
          }}
          autoFocus
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              setEditable(false);
              setTextValue(event.target.value);
            }
            if (event.key === "Escape") {
              setEditable(false);
            }
          }}
        />
      )}

      {!editable && (
        <TextField
          size="small"
          variant="outlined"
          onClick={handleEdit}
          type="text"
          value={textValue}
        />
      )}
      <TextField
        size="small"
        variant="outlined"
        type="text"
        disabled
        value={task.date.toLocaleString()}
      />
      <IconButton
        onClick={(event) => removeTask(task.id, event)}
        aria-label="delete"
      >
        <DeleteIcon color="secondary" />
      </IconButton>
    </Grid>
  );
}
