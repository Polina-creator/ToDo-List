import React, { useState } from 'react'; 
import NewTask from './Components/NewTask';
import TasksList from './Components/TasksList.js';
import Head from './Components/Head';
import FilterButtons from './Components/FilterButtons';
import DateSortButtons from './Components/DateSortButtons';
import Grid from "@material-ui/core/Grid"
import Pagination from '@material-ui/lab/Pagination';

let currentTasks=[]

export default function App (){
    const [newTaskText, setNewTaskText] = useState('');
    const [todoId, setTodoId] = useState(0);
    const [allTasks, setAllTasks] = useState([]);
    const [startEditing, setStartEditing]=useState(true);
    const [initialTask, setInitialTask]=useState('');
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [filterName, setFilterName] = useState('All');
    const [numberOfPages, setNumberOfPages] = useState(1);
    

    function filtering (filterName) {
        switch (filterName) {
            case 'All':
                currentTasks=allTasks;
                setFilteredTasks(allTasks);
                break;
            case 'Done':
                currentTasks=allTasks.filter((task) => task.completed === true);
                setFilteredTasks(allTasks.filter((task) => task.completed === true));
                break;
            case 'Undone':
                currentTasks=allTasks.filter((task) => task.completed === false)
                setFilteredTasks(allTasks.filter((task) => task.completed === false));
                break;
            default:
                break;
        }
        setNumberOfPages(Math.trunc((currentTasks.length-1)/5)+1);
    }

    const changeNewTaskText = (e) => {
        setNewTaskText(e.target.value);
    }
                                  
    const addTaskInList = (e) => {
        if (e.keyCode === 13){
          e.preventDefault();
          if (newTaskText.trim() === '') return;
          setTodoId(todoId + 1);
          allTasks.push({text: newTaskText, completed: false, id: todoId, date: new Date()})
          setAllTasks([...allTasks]);
          filtering(filterName);        
          setNewTaskText('');         
        }
    }
 
    const editTask = (index, e) => {
        if (startEditing) {
            setInitialTask(filteredTasks[index].text);
            setStartEditing(startEditing);
        }
        filteredTasks[index].text = e.target.value;
        setFilteredTasks([...filteredTasks]);
    }
    
    const pressKeyInEditMode = (index, e) => {
        if (e.keyCode === 13){
            setStartEditing(true);
            setInitialTask('');
            document.getElementById(index).blur();
        }
        if (e.keyCode === 27 && initialTask !== ''){
            filteredTasks[index].text=initialTask;
            setStartEditing(true);
            setInitialTask('');
            document.getElementById(index).blur();
            setFilteredTasks([...filteredTasks]);
        }
    }
    
    const removeTask = (removeId,e) => {
        e.preventDefault();
        setFilteredTasks(filteredTasks.filter(task => task.id !== removeId));
        setAllTasks(allTasks.filter(task => task.id !== removeId));
        currentTasks=filteredTasks.filter(task => task.id !== removeId);
        setNumberOfPages(Math.trunc((currentTasks.length-1)/5)+1);
    }

    const sortTasksByUpDate = (e) => {
        e.preventDefault();
        filteredTasks.sort((task1, task2) => task2.id - task1.id);
        setFilteredTasks([...filteredTasks]);
    }

    const sortTasksByDownDate = (e) => {
        e.preventDefault();
        filteredTasks.sort((task1, task2) => task1.id - task2.id);
        setFilteredTasks([...filteredTasks]);
    }

    const changeCheckTask = (task) => {
        task.completed =! task.completed;
        setFilteredTasks([...filteredTasks]);
    }

    const showDoneTasks = (e) => {
        e.preventDefault();        
        setFilterName('Done');
        filtering('Done');
        
    }
      
    const showUndoneTasks = (e) => {
        e.preventDefault();        
        setFilterName('Undone');
        filtering('Undone');
        
    }
  
    const showAllTasks = (e) => {
        e.preventDefault();
        setFilterName('All');
        filtering('All');
        
    }

    return (
        <Grid>
            <Grid container justify="center">
                <Head />
            </Grid>
            <Grid container direction="row" justify="center" alignItems="center">
                <NewTask 
                    newTaskText = {newTaskText || ''}
                    changeNewTaskText = {changeNewTaskText}
                    addTaskInList = {addTaskInList}
                />
            </Grid>
            <Grid container direction="row" justify="center" alignItems="center">
                <FilterButtons 
                    showDoneTasks = {showDoneTasks}
                    showAllTasks = {showAllTasks}
                    showUndoneTasks = {showUndoneTasks}
                />
                <DateSortButtons 
                    sortTasksByUpDate = {sortTasksByUpDate}
                    sortTasksByDownDate = {sortTasksByDownDate}
                />
            </Grid>
            <TasksList 
                changeCheckTask = {changeCheckTask}
                filteredTasks = {filteredTasks}
                editTask = {editTask}
                pressKeyInEditMode = {pressKeyInEditMode}
                removeTask = {removeTask}
            />
            <Grid container justify="center">
                <Pagination count={numberOfPages} color="secondary" />
            </Grid>
        </Grid>
    );
}
