import React from "react";
import { Grid } from "@material-ui/core";
import Task from "./Task";

export default function TasksList({
  filteredTasks,
  changeCheckTask,
  removeTask
}) {
  return (
    <Grid container justify="center" alignItems="center">
      {filteredTasks.map((task) => (
        <Task
          key={task.uuid}
          task={task}
          index={task.uuid}
          changeCheckTask={changeCheckTask}
          removeTask={removeTask}
        />
      ))}
    </Grid>
  );
}
