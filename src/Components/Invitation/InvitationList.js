import React from 'react';
import './invitation.css';
import Invitation from './Invitation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes , faCheck  } from '@fortawesome/free-solid-svg-icons'


function InvitationList(props){


     let rows = props.invitations.map( item => <Invitation value={item} acceptInvitation={props.acceptInvitation}  removeInvitation={props.removeInvitation} /> )
    return (
          <div>{rows}</div>
    )
}

export default InvitationList;