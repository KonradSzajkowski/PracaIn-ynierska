import React from 'react';
import './sentInvitation.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash  } from '@fortawesome/free-solid-svg-icons'

function SentInvitation(props){
    return (
        <div class="SentInvitation">

                <h6>Firma:</h6> <p> {props.value.companyName} </p>
                <div class="clear" ></div>
                <h6>Użytkownik:</h6> <p> {props.value.login} </p>
                <div class="clear" ></div>
                <div class="icons" >
                <FontAwesomeIcon icon={faTrash} onClick={() => {props.removeSentInvitation(props.value.id)}} />
                </div>

        </div>
    )
}

export default SentInvitation;