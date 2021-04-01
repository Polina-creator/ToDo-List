import React, { useState, useEffect } from "react";
import NewTask from "./Components/NewTask";
import DateSortButtons from "./Components/DateSortButtons";
import FilterButtons from "./Components/FilterButtons";
import TasksList from "./Components/TasksList";
import { Grid, Box } from "@material-ui/core";
//import Task from './Components/Task';

export default function App() {
  const [allTasks, setAllTasks] = useState([]);
  const [taskId, setTaskId] = useState(0);
  const [filter, setFilter] = useState("All");
  const [order, setOrder] = useState("Down");
  const [filteredTasks, setFilteredTasks] = useState([]);

  //const filteredTasks = useMemo();
  useEffect(() => {
    handleFilter();
  }, [allTasks, filter]);

  useEffect(() => {
    handleOrder();
  }, [order])

  const handleFilter = () => {
    let newArray;
    switch (filter) {
      case "All":
        newArray = allTasks;
        break;
      case "Done":
        newArray = allTasks.filter((task) => task.completed);
        break;
      case "Undone":
        newArray = allTasks.filter((task) => !task.completed);
        break;
      default:
        break;
    }
    //console.log(newArray);
    setFilteredTasks([...newArray]);
  };

  const handleOrder = () => {
    let orderArr;
    switch (order) {
      case "Up":
        orderArr = filteredTasks.sort((task1, task2) => task2.id - task1.id);
        break;
      case "Down":
        orderArr = filteredTasks.sort((task1, task2) => task1.id - task2.id);
        break;
      default:
        break;
    }
    console.log (orderArr);
    setFilteredTasks([...orderArr]);
  };

  const addTaskInList = (newTaskText) => {
    setAllTasks([
      ...allTasks,
      { id: taskId, text: newTaskText, completed: false, date: new Date() },
    ]);
    setTaskId(taskId + 1);
    //handleFilter();
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
