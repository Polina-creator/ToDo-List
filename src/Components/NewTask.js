import React from 'react';
 
export default function NewTask ({newTaskText, changeNewTaskText, addTaskInList}){
    return (
            <input
                name = "title"
                placeholder = "New task"
                value = {newTaskText || ''}
                onChange = {(e) => changeNewTaskText(e)}
                onKeyDown = {(e) => addTaskInList(e)}
            />
    );
}

