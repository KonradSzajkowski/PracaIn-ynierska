import React from 'react';
import './sentInvitation.css';
import SentInvitation from './SentInvitation'

function SentInvitationList(props){

     let rows = props.invitations.map( item => <SentInvitation value={item} removeSentInvitation={props.removeSentInvitation}/> )
    return (
          <div>{rows}</div>
    )
}

export default SentInvitationList;