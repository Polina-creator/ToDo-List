import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Grid from "@material-ui/core/Grid"

export default function TasksList({changeCheckTask, visibleTasks, editTask, pressKeyInEditMode, removeTask}){
    return (
        <Grid container justify="center" alignItems="center">
            {visibleTasks.map((task, index) => (
                <Grid container justify="center" key={task.id}>
                    <Checkbox 
                        onClick = {() => changeCheckTask(task)}
                        onChange = {() => {}}
                        checked = {task.completed}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                    <TextField
                        size = "small"
                        variant = "outlined"
                        id = {String(index)}
                        type = "text"
                        name = {task.text}
                        value = {task.text} 
                        onChange = {(e) => editTask(index, e)}
                        onKeyDown = {(e) => pressKeyInEditMode(index, e)}
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
            ))}
        </Grid>
    );
}
