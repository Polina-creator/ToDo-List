import React, { useState, useEffect } from "react";
import NewTask from "./Components/NewTask";
import DateSortButtons from "./Components/DateSortButtons";
import FilterButtons from "./Components/FilterButtons";
import TasksList from "./Components/TasksList";
import { Grid, Box } from "@material-ui/core";
import { v4 as uuidv4 } from 'uuid';

export default function App() {
  const [allTasks, setAllTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [order, setOrder] = useState("Down");
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    handleFilter();
  }, [allTasks, filter]);

  useEffect(() => {
    handleOrder();
  }, [order]);

  const handleFilter = () => {
    let filterArr;
    switch (filter) {
      case "All":
        filterArr = allTasks;
        break;
      case "Done":
        filterArr = allTasks.filter((task) => task.completed);
        break;
      case "Undone":
        filterArr = allTasks.filter((task) => !task.completed);
        break;
      default:
        break;
    }
    setFilteredTasks(filterArr);
  };

  const handleOrder = () => {
    let orderArr;
    switch (order) {
      case "Up":
        orderArr = filteredTasks.sort((task1, task2) => task2.date - task1.date);
        break;
      case "Down":
        orderArr = filteredTasks.sort((task1, task2) => task1.date - task2.date);
        break;
      default:
        break;
    }
    setFilteredTasks([...orderArr]);
  };

  const addTaskInList = (newTaskText) => {
    setAllTasks([
      ...allTasks,
      { id: uuidv4(), text: newTaskText, completed: false, date: new Date() },
    ]);
  };

  const changeCheckTask = (task) => {
    task.completed = !task.completed;
    setAllTasks([...allTasks]);
  };

  const removeTask = (removeId, e) => {
    setAllTasks(allTasks.filter((task) => task.id !== removeId));
  };

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
        <FilterButtons setFilter={setFilter} />
        <DateSortButtons setOrder={setOrder} />
      </Grid>
      <TasksList
        //handleFilter={handleFilter()}
        filteredTasks={filteredTasks}
        changeCheckTask={changeCheckTask}
        removeTask={removeTask}
      />
    </Grid>
  );
}
