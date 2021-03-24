import React, { useState } from 'react'; 
import NewTask from './Components/NewTask';
import TasksList from './Components/TasksList.js';
import Head from './Components/Head';
import FilterButtons from './Components/FilterButtons';
import DateSortButtons from './Components/DateSortButtons';

var i=0;

export default function App (){
    const [newTaskText, setNewTaskText] = useState('');
    const [todoId, setTodoId] = useState(0);
    const [allTasks, setAllTasks] = useState([]);
    const [startEditing, setStartEditing]=useState(true);
    const [initialTask, setInitialTask]=useState('');
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [filterName, setFilterName] = useState('All');
 
    function filtering (filterName) {
        switch (filterName) {
            case 'All':
                setFilteredTasks(allTasks);
                break;
            case 'Done':
                setFilteredTasks(allTasks.filter((task) => task.completed === true));
                break;
            case 'Undone':
                setFilteredTasks(allTasks.filter((task) => task.completed === false));
                break;
            default:
                break;
        }
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
        <main>
            <Head />
            <NewTask 
                newTaskText = {newTaskText || ''}
                changeNewTaskText = {changeNewTaskText}
                addTaskInList = {addTaskInList}
            />
            <div>
                <FilterButtons 
                    showDoneTasks = {showDoneTasks}
                    showAllTasks = {showAllTasks}
                    showUndoneTasks = {showUndoneTasks}
                />
                <DateSortButtons 
                    sortTasksByUpDate = {sortTasksByUpDate}
                    sortTasksByDownDate = {sortTasksByDownDate}
                />
            </div>
            <TasksList 
                changeCheckTask = {changeCheckTask}
                filteredTasks = {filteredTasks}
                editTask = {editTask}
                pressKeyInEditMode = {pressKeyInEditMode}
                removeTask = {removeTask}
            />
        </main>
    );
}

