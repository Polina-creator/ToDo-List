import React from 'react';

export default function DateSortButtons({sortTasksByUpDate, sortTasksByDownDate}){
    return( 
        <>
            Sort by Date
            <button onClick = {sortTasksByUpDate}>Up</button>
            <button onClick = {sortTasksByDownDate}>Down</button>
        </>
    );
}