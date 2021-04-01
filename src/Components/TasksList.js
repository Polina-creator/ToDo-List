import React from 'react';
import {Grid} from '@material-ui/core';
import Task from './Task';
import DateSortButtons from './DateSortButtons';

export default function TasksList({filteredTasks, changeCheckTask, removeTask}){
    return (
        <Grid container justify="center" alignItems="center">
            {filteredTasks.map((task, index) => (
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
