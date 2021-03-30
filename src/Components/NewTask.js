import React from 'react';
import Input from '@material-ui/core/Input';
 
export default function NewTask ({newTaskText, changeNewTaskText, addTaskInList}){

    const [newTaskText, setNewTaskText] = useState("");
    
    
    // must handle task creation by Enter & input validation

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
