import React from 'react';
import {Grid, TextField} from '@material-ui/core';

export default function Task ({task, index}){
    return (
        <Grid container justify="center">
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
        </Grid>    
    );
}