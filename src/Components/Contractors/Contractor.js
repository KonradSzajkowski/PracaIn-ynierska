import React,{useState} from 'react';
import './contractors.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import FalseTrueSign from '../FalseTrueSign/FalseTrueSign'
import StandardButton from '../Buttons/StandardButton'
import ValidPostData from '../../services/ValidPostData';
import EditContractorModal from './EditContractorModal'
import SecondButton from '../Buttons/SecondButton'


function Contractor(props){
    const [showModal,setShowModal] = useState(false)
    
    function closeEditContractor(){
        setShowModal(false)
    }
    function showEditContractor(){
        setShowModal(true)
    }

    return (
        <>
        <div class="Contractor">
            <h4> {props.value.name} </h4>
            <div class="clear" ></div>
            <h6>Adres:</h6>  <p>{props.value.post+" "+props.value.postName} <br></br> {props.value.adres}</p>
            <div class="clear" ></div>
            <h6>NIP:</h6> <p>{props.value.nip}</p>
            <div class="clear" ></div>
            <StandardButton value="Edytuj" onClick={()=> {showEditContractor()}}/>
            <SecondButton value="Usuń" onClick={()=> {props.removeContractor(props.value.id)}}/>
        </div>
        <EditContractorModal editContractor={props.editContractor} show={showModal} contractor={props.value} closeEditContractor={closeEditContractor}/>
        </>
    )
}

export default Contractor;