import React, { useState, useEffect } from "react";
import NewTask from "./Components/NewTask";
import DateSortButtons from "./Components/DateSortButtons";
import FilterButtons from "./Components/FilterButtons";
import TasksList from "./Components/TasksList";
import ErrorSnackbar from "./Axios/ErrorSnackbar";
import { Grid, Box } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import axios from "./Axios/AxiosIntercept";

export default function App() {
  const numOfTasksOnPage = 5;
  const [allTasks, setAllTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filter, setFilter] = useState("");
  const [order, setOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(1);
  const [error, setError] = useState("");

  useEffect(() => {
    handleFilter();
  }, [allTasks, filter, order, currentPage]);

  useEffect(() => {
    async function getTasks() {
      const response = await axios.get("tasks/5");
      setAllTasks(response.data);
    }
    getTasks();
  }, []);

  async function addTaskInList(newTaskText) {
    const response = await axios.post("task/5", {
      name: newTaskText,
      done: false,
    });
    setAllTasks([...allTasks, { ...response.data }]);
    setError(response.message);
  }

  async function removeTask(removeId) {
    const response=await axios.delete("task/5/" + removeId);
    let tasksRemoving = allTasks.filter((task) => task.uuid !== removeId);
    setAllTasks(tasksRemoving);
    const pages = Math.trunc((tasksRemoving.length - 1) / numOfTasksOnPage) + 1;
    setNumberOfPages(pages);
    if (currentPage > pages) {
      setCurrentPage(currentPage - 1);
    }
    setError(response.message);
  }

  async function saveNewText(newText,task) {
    const response=await axios.patch("task/5/" + task.uuid, {
      name: newText,
    });
    setError(response.message);
  }

  async function changeCheckTask(task) {
    const response = await axios.patch("task/5/" + task.uuid, {
      done: !task.done,
    });
    task.done = !task.done;
    setAllTasks([...allTasks]);
    setError(response.message);
  }

  async function handleFilter() {
    const response = await axios.get("tasks/5?filterBy=" + filter + "&order=" + order);
    setNumberOfPages(Math.ceil(response.data.length / numOfTasksOnPage));
    setFilteredTasks([
      ...response.data.slice(
        (currentPage - 1) * numOfTasksOnPage,
        currentPage * numOfTasksOnPage
      ),
    ]);
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
        saveNewText={saveNewText}
      />
      <Grid container justify="center">
        <Pagination
          count={numberOfPages}
          color="secondary"
          page={currentPage}
          onChange={(e, numOfPage) => setCurrentPage(numOfPage)}
        />
      </Grid>
      <ErrorSnackbar message={error}/>
    </Grid>
  );
}
