import React, { useState, useEffect } from "react";
import NewTask from "./Components/NewTask";
import DateSortButtons from "./Components/DateSortButtons";
import FilterButtons from "./Components/FilterButtons";
import TasksList from "./Components/TasksList";
import { Grid, Box } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { v4 as uuidv4 } from "uuid";

export default function App() {
  const numOfTasksOnPage = 5;
  const [allTasks, setAllTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [order, setOrder] = useState("Down");
  const [currentPage, setCurrentPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState(1);

  useEffect(() => {
    handleFilter();
  }, [allTasks, filter, order]);

  console.log("render");

  const handleFilter = () => {
    let filterArr;
    console.log(filter,order)
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
    switch (order) {
      case "Up":
        filterArr = filterArr.sort((task1, task2) => task2.date - task1.date);
        break;
      case "Down":
        filterArr = filterArr.sort((task1, task2) => task1.date - task2.date);
        break;
      default:
        break;
    }
    setNumOfPages(Math.trunc((filterArr.length - 1) / numOfTasksOnPage) + 1);
    setFilteredTasks([...filterArr]);
  };

  // const handleOrder = () => {
  //   let orderArr;
  //   switch (order) {
  //     case "Up":
  //       orderArr = allTasks.sort((task1, task2) => task2.date - task1.date);
  //       break;
  //     case "Down":
  //       orderArr = allTasks.sort((task1, task2) => task1.date - task2.date);
  //       break;
  //     default:
  //       break;
  //   }
  //   setAllTasks(orderArr);
  // };

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

  const removeTask = (removeId) => {
    let tasksRemoving = allTasks.filter((task) => task.id !== removeId);
    setAllTasks(tasksRemoving);
    setNumOfPages(
      Math.trunc((tasksRemoving.length - 1) / numOfTasksOnPage) + 1
    );
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
        filteredTasks={filteredTasks}
        changeCheckTask={changeCheckTask}
        removeTask={removeTask}
      />
      <Grid container justify="center">
        <Pagination
          count={numOfPages}
          color="secondary"
          page={currentPage}
          //onChange={(e, numOfPage) => setCurrentPage(numOfPage)}
        />
      </Grid>
    </Grid>
  );
}
