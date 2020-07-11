import React from 'react';
import './doubleHeaders.css';

function DoubleHeader(props){
    return (
        <div class="doubleHeader">
            <h2> {props.bigger} </h2>
            <p> {props.smaller} </p>
        </div>
    )
}

export default DoubleHeader;