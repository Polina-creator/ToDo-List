import React from 'react';
import Input from '@material-ui/core/Input';
 
export default function NewTask ({addTaskInList}){
    const creatNewTaskText = (e) => {
        if (e.key === 'Enter' && e.target.value!==''){
            addTaskInList(e.target.value);
            e.target.value='';
        }
    }
    return (
        <Input
            name = "title"
            placeholder = "New task"
            onKeyDown = {(e) => creatNewTaskText(e)}
        />
    );
}
