import React, { useState } from "react";
import { Grid, TextField, Checkbox, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";

export default function Task({ task, changeCheckTask, removeTask }) {
  const [textValue, setTextValue] = useState(task.name);
  const [editable, setEditable] = useState(false);

  const handleEdit = (e) => {
    setEditable(true);
    e.target.value = textValue;
  };

  async function saveNewText(newText) {
    const response = await axios.patch(
      "https://todo-api-learning.herokuapp.com/v1/task/5/" + task.uuid,
      { name: newText }
    );
    if (response.status === 200){
      setEditable(false);
      setTextValue(newText);
    }else alert (response.message);
  }

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
              saveNewText(event.target.value);
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
        value={task.createdAt.split('T').join(' ').slice(0,-1)}
      />
      <IconButton onClick={() => removeTask(task.uuid)} aria-label="delete">
        <DeleteIcon color="secondary" />
      </IconButton>
    </Grid>
  );
}
