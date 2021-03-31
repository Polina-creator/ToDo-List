import React, {useState} from "react";
import NewTask from "./Components/NewTask";
import Grid from "@material-ui/core/Grid";

export default function App() {
    const [allTasks, setAllTasks] = useState([]);
    const [taskId, setTaskId] = useState(0);
    
    const addTaskInList = (newTaskText) => {
        setAllTasks([...allTasks, {id: taskId, text: newTaskText, completed: false, date: new Date()}]);
        setTaskId(taskId + 1);
    }

    console.log (allTasks);
    
    return(
        <Grid container direction="row" justify="center" alignItems="center">
            <NewTask addTaskInList={addTaskInList}/>
        </Grid>
    );
}