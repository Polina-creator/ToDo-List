import React from 'react';
import {Grid} from '@material-ui/core';
import Task from './Task';
import DateSortButtons from './DateSortButtons';

export default function TasksList({allTasks, changeCheckTask, removeTask, handleFilter}){
    return (
        <Grid container justify="center" alignItems="center">
            <Grid container direction="row" justify="center" alignItems="center">
                <DateSortButtons 
                    handleFilter={handleFilter} 
                />          
            </Grid>
            {allTasks.map((task, index) => (
                <Task
                    key = {task.id} 
                    task = {task} 
                    index = {index}
                    changeCheckTask = {changeCheckTask}
                    removeTask = {removeTask}
                />
            ))}
        </Grid>
    );
}
