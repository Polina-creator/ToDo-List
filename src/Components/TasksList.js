import React from 'react';
import {Grid} from '@material-ui/core';
import Task from './Task';

export default function TasksList({allTasks, changeCheckTask, removeTask}){
    return (
        <Grid container justify="center" alignItems="center">
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
