import React, { useState } from "react";
import { Grid, TextField, Checkbox, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

export default function Task({ task, index, changeCheckTask, removeTask, handleFilter }) {
  const [textValue, setTextValue] = useState(task.text);
  const [editable, setEditable] = useState(false);

  const handleEdit = (e) => {
    setEditable(true);
    e.target.value = textValue;
  };
  // handleFilter();
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
          }}
        />
      )}

      {!editable && (
        <TextField
          size="small"
          variant="outlined"
          onClick={handleEdit}
          //onBlur={setEditable(false)}          
          type="text"
          value={textValue}
          disabled
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