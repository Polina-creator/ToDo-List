import React, {useState} from 'react';
import Input from '@material-ui/core/Input';
 
export default function NewTask (){

    const [newTaskText, setNewTaskText] = useState('');
    
    const creating = (e) => {
        if (e.key==='Enter' && e.target.value!==''){
            console.log(e.target.value);
        }
        
        //console.log(e.key);
    }

    // must handle task creation by Enter & input validation
    
    return (
        <Input
            name = "title"
            placeholder = "New task"
            onKeyDown = {(e) => creating(e)}
        />
    );
}
