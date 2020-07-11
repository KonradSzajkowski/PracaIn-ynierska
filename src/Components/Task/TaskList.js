import React from 'react';
import './task.css';
import Task from './Task'

function TaskList(props){

    let rows = props.tasks.map( item => <Task value={item} removeTask={props.removeTask} handleCheckboxChange={props.handleCheckboxChange} editTask={props.editTask} /> )
    return (
        <div>{rows}</div>
    )
   }
   

export default TaskList;