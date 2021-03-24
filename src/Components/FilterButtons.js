import React from 'react';

export default function FilterButtons({showAllTasks, showDoneTasks, showUndoneTasks}){
    return( 
        <>
            <button onClick = {(e) => showDoneTasks(e)}>Done</button>
            <button onClick = {(e) => showAllTasks(e)}>All</button>
            <button onClick = {(e) => showUndoneTasks(e)}>Undone</button>
        </>
    );
}