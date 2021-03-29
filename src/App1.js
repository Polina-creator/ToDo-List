import React, { useEffect, useState } from 'react'; 
import NewTask from './Components/NewTask';
import TasksList from './Components/TasksList.js';
import Head from './Components/Head';
import FilterButtons from './Components/FilterButtons';
import DateSortButtons from './Components/DateSortButtons';
import Grid from "@material-ui/core/Grid"
import Pagination from '@material-ui/lab/Pagination';

const numOfTasksOnPage = 5;
let currentTasks = [];
let page = 1;

export default function App (){

    const [newTaskText, setNewTaskText] = useState('');
    const [todoId, setTodoId] = useState(0);
    const [allTasks, setAllTasks] = useState([]);
    const [startEditing, setStartEditing]=useState(true);
    const [initialTask, setInitialTask]=useState('');
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [filterName, setFilterName] = useState('All');
    const [numberOfPages, setNumberOfPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [visibleTasks, setVisibleTasks] = useState([]);

    useEffect(()=>{
        console.log('useEffect', currentPage)
    },[currentPage]);

    function viewListOnPage (array) {
        console.log(currentPage);
        setVisibleTasks(array.slice(numOfTasksOnPage*(page-1), numOfTasksOnPage*page));
    }

    function filtering (filterName) {
        switch (filterName) {
            case 'All':
                currentTasks=allTasks;
                setFilteredTasks(currentTasks);
                break;
            case 'Done':
                currentTasks=allTasks.filter((task) => task.completed === true);
                setFilteredTasks(currentTasks);
                break;
            case 'Undone':
                currentTasks=allTasks.filter((task) => task.completed === false)
                setFilteredTasks(currentTasks);
                break;
            default:
                break;
        }
        //page=1;
        viewListOnPage(currentTasks); 
        setNumberOfPages(Math.trunc((currentTasks.length-1)/numOfTasksOnPage)+1);
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
        setFilteredTasks([...filteredTasks]);
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
            setFilteredTasks([...filteredTasks]);
        }
    }

    const removeTask = (removeId,e) => {
        e.preventDefault();
        currentTasks=filteredTasks.filter(task => task.id !== removeId);
        setFilteredTasks(currentTasks);
        setAllTasks(allTasks.filter(task => task.id !== removeId));
        setNumberOfPages(Math.trunc((currentTasks.length-1)/numOfTasksOnPage)+1);
        viewListOnPage(currentTasks)
    }

    const sortTasksByUpDate = (e) => {
        e.preventDefault();
        filteredTasks.sort((task1, task2) => task2.id - task1.id);
        setFilteredTasks(filteredTasks);
        viewListOnPage(filteredTasks);
        setCurrentPage(1);
    }

    const sortTasksByDownDate = (e) => {
        e.preventDefault();
        filteredTasks.sort((task1, task2) => task1.id - task2.id);
        setFilteredTasks(filteredTasks);
        viewListOnPage(filteredTasks);
        setCurrentPage(1);
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
        page=1;
        setCurrentPage(1);
        filtering('Undone');
    }
  
    const showAllTasks = (e) => {
        e.preventDefault();
        setFilterName('All');
        setCurrentPage(1);
        page=1;
        filtering('All');
    }

    const changePage = (e, numOfPage) => {
        setCurrentPage(numOfPage);
        page = numOfPage;
    }

    const ignor = (e) => {
        e.preventDefault();
        viewListOnPage(filteredTasks);
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
                    onChange = {changePage}
                    onClick = {ignor} 
                />
            </Grid>
        </Grid>
    );
}