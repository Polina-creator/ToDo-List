import React, { useEffect, useState } from "react";
import NewTask from "./Components/NewTask";
import TasksList from "./Components/TasksList.js";
import Head from "./Components/Head";
import FilterButtons from "./Components/FilterButtons";
import DateSortButtons from "./Components/DateSortButtons";
import Grid from "@material-ui/core/Grid";
import Pagination from "@material-ui/lab/Pagination";
import { v4 as uuidv4 } from 'uuid';

const numOfTasksOnPage = 5;

export default function App() {
  //const [newTaskText, setNewTaskText] = useState("");
  const [allTasks, setAllTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filterName, setFilterName] = useState("All");
  const [order, setOrder] = useState('asc');
  const [numberOfPages, setNumberOfPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  //   const [visibleTasks, setVisibleTasks] = useState([]);

  // update on change filters/order/add-remove tasks/page
  useEffect(() => {
    filtering();
  }, [currentPage, filterName, order, allTasks]);

  // Move pagination inside "filtering function"

  //   function viewListOnPage(tasks) {
  //     setVisibleTasks(
  //       tasks.slice(
  //         numOfTasksOnPage * (currentPage - 1),
  //         numOfTasksOnPage * currentPage
  //       )
  //     );
  //   }

  function filtering() {
    let currentTasks = [];
    switch (filterName) {
      case "All":
        currentTasks = allTasks;
        break;
      case "Done":
        currentTasks = allTasks.filter((task) => task.completed === true);
        break;
      case "Undone":
        currentTasks = allTasks.filter((task) => task.completed === false);
        break;
      default:
        break;

      // ordering must be there
    }
    setFilteredTasks(currentTasks);
    setNumberOfPages(
      Math.trunc((currentTasks.length - 1) / numOfTasksOnPage) + 1
    );
    // viewListOnPage(currentTasks);
  }

  const addTaskInList = (e) => {
    // if (e.keyCode === 13) {
    //   if (newTaskText.trim() === "") return;
    
      setAllTasks([
        ...allTasks,
        {
          text: e.target.value,
          completed: false,
          id: uuidv4(),
          date: new Date(),
        },
      ]);      
    //   setNewTaskText("");
    // }
  };

  const editTask = (index, e) => {
    // if (startEditing) {
    //   setInitialTask(
    //     filteredTasks[index + numOfTasksOnPage * (currentPage - 1)].text
    //   );
    //   setStartEditing(false);
    // }
    filteredTasks[index + numOfTasksOnPage * (currentPage - 1)].text =
      e.target.value;


    // find task my ID, update array of tasks
    // google "update object in array react hooks"
    setFilteredTasks(filteredTasks);
  };

//   const pressKeyInEditMode = (index, e) => {
//     if (e.keyCode === 13) {      
//     //   setInitialTask("");
//       document.getElementById(index).blur();
//     }
//     if (e.keyCode === 27 && ) {
//       filteredTasks[
//         index + numOfTasksOnPage * (currentPage - 1)
//       ].text = initialTask;
//     //   setInitialTask("");
//       document.getElementById(index).blur();
//     }
//   };

  const removeTask = (removeId, e) => {
    let tasksRemoving = filteredTasks.filter((task) => task.id !== removeId);
    setFilteredTasks(tasksRemoving);
    setAllTasks(allTasks.filter((task) => task.id !== removeId));
    setNumberOfPages(
      Math.trunc((tasksRemoving.length - 1) / numOfTasksOnPage) + 1
    );
    if (
      currentPage !== 1 &&
      tasksRemoving.length <= (currentPage - 1) * numOfTasksOnPage
    ) {
      setCurrentPage(currentPage - 1);
    }
  };

  const changeCheckTask = (task) => {
    task.completed = !task.completed;
    setFilteredTasks(filteredTasks);
  };

// setFilteredTasks(filteredTasks.sort((task1, task2) => task2.id - task1.id));
// setFilteredTasks(filteredTasks.sort((task1, task2) => task1.id - task2.id));

  return (
    <Grid>
      <Grid container justify="center">
        <Head />
      </Grid>
      <Grid container direction="row" justify="center" alignItems="center">
        <NewTask addTaskInList={addTaskInList}
/>
      </Grid>
      <Grid container direction="row" justify="center" alignItems="center">
        <FilterButtons handleFilter={({currentTarget}) => setFilterName(currentTarget.id)} />
        <DateSortButtons handleFilter={({currentTarget}) => setOrder(currentTarget.id)} />          
      </Grid>
      <TasksList
        changeCheckTask={changeCheckTask}
        filteredTasks={filteredTasks}
        // visibleTasks={visibleTasks}
        editTask={editTask}
        // pressKeyInEditMode={pressKeyInEditMode}
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
