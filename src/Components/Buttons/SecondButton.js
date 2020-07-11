import React from 'react';
import './buttons.css';

function SecondButton(props){
    return (
        <button class="secondButton" onClick={props.onClick}> {props.value} </button>
    )
}

export default SecondButton;