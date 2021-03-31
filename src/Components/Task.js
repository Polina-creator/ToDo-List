import React from 'react';
import {Grid, TextField, Checkbox, IconButton} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

export default function Task ({task, index, changeCheckTask, removeTask}){
    return (
        <Grid container justify="center">
            <Checkbox 
                inputProps={{ 'aria-label': 'primary checkbox' }}
                onClick = {() => changeCheckTask(task)}
                checked = {task.completed}
            />
            <TextField
                size = "small"
                variant = "outlined"
                id = {String(index)}
                type = "text"
                value = {task.text} 
            />
            <TextField
                size = "small"
                variant = "outlined" 
                type = "text"
                disabled
                value = {task.date.toLocaleString()}
            />
            <IconButton onClick = {(event) => removeTask(task.id, event)} aria-label="delete">
                <DeleteIcon color="secondary"/>
            </IconButton>
        </Grid>    
    );
}