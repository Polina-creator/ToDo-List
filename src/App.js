import React, {useState} from "react";
import NewTask from "./Components/NewTask";
import TasksList from "./Components/TasksList";
import Grid from "@material-ui/core/Grid";

export default function App() {
  const [allTasks, setAllTasks] = useState([]);
  const [taskId, setTaskId] = useState(0);
    
  const addTaskInList = (newTaskText) => {
    setAllTasks([...allTasks, {id: taskId, text: newTaskText, completed: false, date: new Date()}]);
    setTaskId(taskId + 1);
  }

  const changeCheckTask = (task) => {
    task.completed =!  task.completed;
    setAllTasks([...allTasks])
  }

  console.log (allTasks);
    
  return(
    <Grid>
      <Grid container direction="row" justify="center" alignItems="center">
        <NewTask addTaskInList={addTaskInList}/>
      </Grid>
      <TasksList 
        allTasks = {allTasks}
        changeCheckTask = {changeCheckTask}
      />
    </Grid>
  );
}