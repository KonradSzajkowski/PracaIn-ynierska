import React from 'react';
import './falsetrue.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes , faCheck  } from '@fortawesome/free-solid-svg-icons'

function FalseTrueSign  (props){
    if( props.value === true) return ( <div class="FalseTrueSign"> <FontAwesomeIcon icon={faCheck } /> </div> )
    else return ( <div class="FalseTrueSign"> <FontAwesomeIcon icon={faTimes} />  </div> )
}

export default FalseTrueSign;

             
