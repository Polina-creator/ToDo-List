import React, { useState, useEffect } from "react";
import NewTask from "./Components/NewTask";
import DateSortButtons from "./Components/DateSortButtons";
import FilterButtons from "./Components/FilterButtons";
import TasksList from "./Components/TasksList";
import { Grid, Box } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

export default function App() {
  const numOfTasksOnPage = 5;
  const [allTasks, setAllTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [order, setOrder] = useState("Down");
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(1);

  useEffect(() => {
    handleFilter();
  }, [allTasks, filter, order, currentPage]);

  const get_url = "https://todo-api-learning.herokuapp.com/v1/tasks/5?order=asc";
  const post_url = "https://todo-api-learning.herokuapp.com/v1/task/5";

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = () => {
    axios
      .get(get_url)
      .then((response) => {
        const todos = response.data;
        setAllTasks(todos);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  const postTodos = () => {
    axios
      .post(post_url, {
        name: newTaskText,
        done: false
      })
      .then((response) =>{
        console.log(response);
      }, (error) => {
        console.log(error)
      })
  };

  const handleFilter = () => {
    let filterArr;
    switch (filter) {
      case "All":
        filterArr = allTasks;
        break;
      case "Done":
        filterArr = allTasks.filter((task) => task.done);
        break;
      case "Undone":
        filterArr = allTasks.filter((task) => !task.done);
        break;
      default:
        break;
    }
    switch (order) {
      case "Up":
        filterArr = filterArr.sort((task1, task2) => task2.createdAt - task1.createdAt);
        break;
      case "Down":
        filterArr = filterArr.sort((task1, task2) => task1.createdAt - task2.createdAt);
        break;
      default:
        break;
    }
    setNumberOfPages(Math.ceil(filterArr.length / numOfTasksOnPage));
    setFilteredTasks([
      ...filterArr.slice(
        (currentPage - 1) * numOfTasksOnPage,
        currentPage * numOfTasksOnPage
      ),
    ]);
  };

  const addTaskInList = (newTaskText) => {
    setAllTasks([
      ...allTasks,
      { uuid: uuidv4(), name: newTaskText, done: false, createdAt: new Date() },
    ]);
  };

  const changeCheckTask = (task) => {
    task.done = !task.done;
    setAllTasks([...allTasks]);
  };

  const removeTask = (removeId) => {
    let tasksRemoving = allTasks.filter((task) => task.uuid !== removeId);
    setAllTasks(tasksRemoving);
    setNumberOfPages(
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
        <FilterButtons setFilter={setFilter} setCurrentPage={setCurrentPage} />
        <DateSortButtons setOrder={setOrder} />
      </Grid>
      <TasksList
        filteredTasks={filteredTasks}
        changeCheckTask={changeCheckTask}
        removeTask={removeTask}
      />
      <Grid container justify="center">
        <Pagination
          count={numberOfPages}
          color="secondary"
          page={currentPage}
          onChange={(e, numOfPage) => setCurrentPage(numOfPage)}
        />
      </Grid>
    </Grid>
  );
}
