import React, { useEffect, useState } from 'react'; 
import NewTask from './Components/NewTask';
import TasksList from './Components/TasksList.js';
import Head from './Components/Head';
import FilterButtons from './Components/FilterButtons';
import DateSortButtons from './Components/DateSortButtons';
import Grid from "@material-ui/core/Grid"
import Pagination from '@material-ui/lab/Pagination';

const numOfTasksOnPage = 5;

export default function App (){

    const [newTaskText, setNewTaskText] = useState('');
    const [allTasks, setAllTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [startEditing, setStartEditing]=useState(true);
    const [initialTask, setInitialTask]=useState('');
    const [filterName, setFilterName] = useState('All');
    const [numberOfPages, setNumberOfPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [visibleTasks, setVisibleTasks] = useState([]);

    useEffect(() => {viewListOnPage(filteredTasks);}, [currentPage]);

    function viewListOnPage (tasks) {
        setVisibleTasks(tasks.slice(numOfTasksOnPage*(currentPage-1), numOfTasksOnPage*currentPage));
    }

    function filtering (filterName) {
        let currentTasks = [];
        switch (filterName) {
            case 'All':
                currentTasks=allTasks;
                break;
            case 'Done':
                currentTasks=allTasks.filter((task) => task.completed === true);
                break;
            case 'Undone':
                currentTasks=allTasks.filter((task) => task.completed === false);
                break;
            default:
                break;
        }
        setFilteredTasks(currentTasks);
        viewListOnPage(currentTasks); 
        setNumberOfPages(Math.trunc((currentTasks.length-1)/numOfTasksOnPage)+1);
    }
                                  
    const addTaskInList = (e) => {
        if (e.keyCode === 13){
          e.preventDefault();
          if (newTaskText.trim() === '') return;
          allTasks.push({text: newTaskText, completed: false, id: Date.now(), date: new Date()})
          setAllTasks(allTasks);
          filtering(filterName);        
          setNewTaskText('');         
        }
    }
 
    const editTask = (index, e) => {
        if (startEditing) {
            setInitialTask(filteredTasks[index+numOfTasksOnPage*(currentPage-1)].text);
            setStartEditing(false);
        }
        filteredTasks[index+numOfTasksOnPage*(currentPage-1)].text = e.target.value;
        setFilteredTasks(filteredTasks);
        viewListOnPage(filteredTasks);
    }
    
    const pressKeyInEditMode = (index, e) => {
        if (e.keyCode === 13){
            setStartEditing(true);
            setInitialTask('');
            document.getElementById(index).blur();
        }
        if (e.keyCode === 27 && initialTask !== ''){
            filteredTasks[index+numOfTasksOnPage*(currentPage-1)].text=initialTask;
            setStartEditing(true);
            setInitialTask('');
            document.getElementById(index).blur();
        }
    }

    const removeTask = (removeId,e) => {
        e.preventDefault();
        let tasksRemoving = filteredTasks.filter(task => task.id !== removeId);
        setFilteredTasks(tasksRemoving);
        setAllTasks(allTasks.filter(task => task.id !== removeId));
        setNumberOfPages(Math.trunc((tasksRemoving.length-1)/numOfTasksOnPage)+1);
        if (currentPage!==1 && (tasksRemoving.length <= (currentPage-1)*numOfTasksOnPage)){
            setCurrentPage(currentPage-1);
        }
        viewListOnPage(tasksRemoving);
    }

    const sortTasksByUpDate = (e) => {
        e.preventDefault();
        setFilteredTasks(filteredTasks.sort((task1, task2) => task2.id - task1.id));
        viewListOnPage(filteredTasks);
    }

    const sortTasksByDownDate = (e) => {
        e.preventDefault();
        setFilteredTasks(filteredTasks.sort((task1, task2) => task1.id - task2.id));
        viewListOnPage(filteredTasks);
    }

    const changeCheckTask = (task) => {
        task.completed =! task.completed;
        setFilteredTasks(filteredTasks);
        viewListOnPage(filteredTasks);
    }

    const showDoneTasks = (e) => {
        e.preventDefault();        
        setFilterName('Done');
        setCurrentPage(1);
        filtering('Done');
    }
      
    const showUndoneTasks = (e) => {
        e.preventDefault();        
        setFilterName('Undone');
        setCurrentPage(1);
        filtering('Undone');
    }
  
    const showAllTasks = (e) => {
        e.preventDefault();
        setFilterName('All');
        setCurrentPage(1);
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
                    changeNewTaskText = {(e) => setNewTaskText(e.target.value)}
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
                visibleTasks = {visibleTasks}
                editTask = {editTask}
                pressKeyInEditMode = {pressKeyInEditMode}
                removeTask = {removeTask}
            />
            <Grid container justify="center">
                <Pagination 
                    count = {numberOfPages} 
                    color = "secondary"
                    page = {currentPage}
                    onChange = {(e, numOfPage) => setCurrentPage(numOfPage)}
                />
            </Grid>
        </Grid>
    );
}