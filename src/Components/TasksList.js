import React from 'react';
 
export default function TasksList({changeCheckTask, filteredTasks, editTask, pressKeyInEditMode, removeTask}){
    return (
        <div>
            {filteredTasks.map((task, index) => (
                <div key={task.id}>
                    <input 
                        type="checkbox"
                        onClick = {() => changeCheckTask(task)}
                        onChange = {() => {}}
                        checked = {task.completed}
                    />
                    <input 
                        id = {index}
                        type = "text"
                        name = {task.text}
                        value = {task.text} 
                        onChange = {(e) => editTask(index, e)}
                        onKeyDown = {(e) => pressKeyInEditMode(index, e)}
                    />
                    <input 
                        type = "text"
                        disabled
                        value = {task.date.toLocaleString()}
                    />
                    <button onClick = {(event) => removeTask(task.id, event)}>Delete</button>
                </div>
            ))}
        </div>
    );
}

