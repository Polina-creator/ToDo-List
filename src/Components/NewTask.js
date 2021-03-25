import React from 'react';
import Input from '@material-ui/core/Input';
 
export default function NewTask ({newTaskText, changeNewTaskText, addTaskInList}){
    return (
        <Input
            name = "title"
            placeholder = "New task"
            value = {newTaskText || ''}
            onChange = {(e) => changeNewTaskText(e)}
            onKeyDown = {(e) => addTaskInList(e)}
        />
    );
}
