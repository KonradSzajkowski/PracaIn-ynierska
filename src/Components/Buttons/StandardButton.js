import React from 'react';
import './buttons.css';

function StandardButton(props){
    return (
        <button class="standardButton" onClick={props.onClick}> {props.value} </button>
    )
}

export default StandardButton;