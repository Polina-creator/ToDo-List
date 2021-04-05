import React, { useState, useEffect } from "react";
import NewTask from "./Components/NewTask";
import DateSortButtons from "./Components/DateSortButtons";
import FilterButtons from "./Components/FilterButtons";
import TasksList from "./Components/TasksList";
import { Grid, Box } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import axios from "axios";

export default function App() {
  const numOfTasksOnPage = 5;
  const [allTasks, setAllTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filter, setFilter] = useState("");
  const [order, setOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(1);

  useEffect(() => {
    handleFilter();
  }, [allTasks, filter, order, currentPage]);

  const url = "https://todo-api-learning.herokuapp.com/v1/";

  useEffect(() => {
    async function getTasks() {
      const response = await axios.get(url + "tasks/5");
      if (response.status === 200) {
        setAllTasks(response.data);
      } else alert(response.message);
    }
    getTasks();
  }, []);

  async function addTaskInList(newTaskText) {
    console.log(newTaskText);
    const response = await axios.post(url + "task/5", {
      name: newTaskText,
      done: false,
    });
    if (response.status === 200) {
      setAllTasks([...allTasks, { ...response.data }]);
    }
  }

  async function removeTask(removeId) {
    const response = await axios.delete(url + "task/5/" + removeId);
    if (response.status === 204) {
      let tasksRemoving = allTasks.filter((task) => task.uuid !== removeId);
      setAllTasks(tasksRemoving);
      setNumberOfPages(
        Math.trunc((tasksRemoving.length - 1) / numOfTasksOnPage) + 1
      );
    }
  }

  async function changeCheckTask(task) {
    const response = await axios.patch(url + "task/5/" + task.uuid, {
      done: !task.done,
    });
    if (response.status === 200) {
      task.done = !task.done;
      setAllTasks([...allTasks]);
    }
  }

  async function handleFilter() {
    let response;
    if (filter === "" && order === "") {
      response = await axios.get(url + "tasks/5");
    }
    if (filter === "") {
      response = await axios.get(url + "tasks/5?order=" + order);
    }
    if (order === "") {
      response = await axios.get(url + "tasks/5?filterBy=" + filter);
    } else {
      response = await axios.get(
        url + "tasks/5?filterBy=" + filter + "&order=" + order
      );
    }

    if (response.status === 200) {
      setNumberOfPages(Math.ceil(response.data.length / numOfTasksOnPage));
      setFilteredTasks([
        ...response.data.slice(
          (currentPage - 1) * numOfTasksOnPage,
          currentPage * numOfTasksOnPage
        ),
      ]);
    } else alert(response.message);
  }

  

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
