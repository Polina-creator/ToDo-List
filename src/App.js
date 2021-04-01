import React, { useState, useEffect } from "react";
import NewTask from "./Components/NewTask";
import TasksList from "./Components/TasksList";
import FilterButtons from "./Components/FilterButtons";
import DateSortButtons from "./Components/DateSortButtons";
import { Grid, Box } from "@material-ui/core";

export default function App() {
  const [allTasks, setAllTasks] = useState([]);
  const [taskId, setTaskId] = useState(0);
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    handleFilter("All");
  }, [allTasks]);

  const handleFilter = (filterName) => {
    let visibleTasks;
    switch (filterName) {
      case "Up":
        visibleTasks = allTasks.sort((task1, task2) => task2.id - task1.id);
        break;
      case "Down":
        visibleTasks = allTasks.sort((task1, task2) => task1.id - task2.id);
        break;
      case "All":
        visibleTasks = allTasks;
        break;
      case "Done":
        visibleTasks = allTasks.filter((task) => task.completed);
        break;
      case "Undone":
        visibleTasks = allTasks.filter((task) => !task.completed);
        break;
      default:
        break;
    }
    setFilteredTasks(visibleTasks);
  };

  const addTaskInList = (newTaskText) => {
    setAllTasks([
      ...allTasks,
      { id: taskId, text: newTaskText, completed: false, date: new Date() },
    ]);
    setTaskId(taskId + 1);
  };

  const changeCheckTask = (task) => {
    task.completed = !task.completed;
    setAllTasks([...allTasks]);
  };

  const removeTask = (removeId, e) => {
    setAllTasks(allTasks.filter((task) => task.id !== removeId));
  };

  console.log(allTasks);

  return (
    <Grid>
      <Grid container justify="center">
        <Box fontSize="h3.fontSize" m={1}>
          ToDo
        </Box>
      </Grid>
      <Grid container direction="row" justify="center" alignItems="center">
        <NewTask addTaskInList={addTaskInList} />
      </Grid>
      <Grid container direction="row" justify="center" alignItems="center">
        <FilterButtons handleFilter={handleFilter} />
        <DateSortButtons handleFilter={handleFilter} />
      </Grid>
      <TasksList
        filteredTasks={filteredTasks}
        changeCheckTask={changeCheckTask}
        removeTask={removeTask}
        handleFilter={handleFilter}
      />
    </Grid>
  );
}
