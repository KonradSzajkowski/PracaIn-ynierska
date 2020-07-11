import React from 'react';
import './invitation.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes , faCheck  } from '@fortawesome/free-solid-svg-icons'

function Invitation(props){
    return (
        <div class="Invitation">
                <p> {props.value.companyName} </p>

            <div class="icons" >
                <FontAwesomeIcon icon={faTimes} onClick={() => {props.removeInvitation(props.value.id)}} />              
                <FontAwesomeIcon icon={faCheck } onClick={() => {props.acceptInvitation(props.value.id)}}/>
            </div>
        </div>
        
    )
}

export default Invitation;

// ={props.acceptInvitation(props.value.id)}