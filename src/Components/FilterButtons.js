import React from 'react';
import Button from '@material-ui/core/Button';

export default function FilterButtons({showAllTasks, showDoneTasks, showUndoneTasks}){
    return( 
        <>
            <Button size="large" color="secondary" variant = "outlined" onClick = {(e) => showDoneTasks(e)}>
                Done
            </Button>
            <Button size="large" color="secondary" variant = "outlined" onClick = {(e) => showAllTasks(e)}>
                All
            </Button>
            <Button size="large" color="secondary" variant = "outlined" onClick = {(e) => showUndoneTasks(e)}>
                Undone
            </Button>
        </>
    );
}