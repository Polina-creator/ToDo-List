import React, { useState } from "react";
import { Grid, TextField, Checkbox, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

export default function Task({
  task,
  changeCheckTask,
  removeTask,
  saveNewText,
}) {
  const [textValue, setTextValue] = useState(task.name);
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
        checked={task.done}
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
              saveNewText(event.target.value, task);
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
        value={task.createdAt.split("T").join(" ").slice(0, -1)}
      />
      <IconButton onClick={() => removeTask(task.uuid)} aria-label="delete">
        <DeleteIcon color="secondary" />
      </IconButton>
    </Grid>
  );
}
