import React, { useState } from 'react';
import './sentInvitation.css';
import Modal from 'react-bootstrap/Modal'
import ModalHeader from 'react-bootstrap/ModalHeader'
import ModalTitle from 'react-bootstrap/ModalTitle'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalFooter from 'react-bootstrap/ModalFooter'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { render } from '@testing-library/react';

function AddSentInvitationModal(props){
    const [sentInvitationName,setSentInvitationName] = useState("")
    const [companyId,setCompanyId] = useState("")

    function hide(){
        props.closeAddSentInvitationModal()
        setSentInvitationName("")
        setCompanyId("")
    } 

    function onChange(e){
        setSentInvitationName(e.target.value)
    }


    function companyChange(e){
        setCompanyId(e.target.value)
    }

    async function accept()
    {
        console.log(companyId)
        if(companyId && sentInvitationName){
            let x =await props.addSentInvitation(companyId,sentInvitationName)
            console.log(x)
            if(x.unexistingUser){
                setSentInvitationName("taki login nie istnieje")
            }else if(x.userAlreadyInvited){
                setSentInvitationName("ten użytkownik otrzymał już zaproszenie")
            }else if (x.userInCompany){
                setSentInvitationName("ten użytkownik należy już do tej firmy")
            }
            else{
                setCompanyId("")
                setSentInvitationName("")
            }
        }
    }
    let rows = props.companys.map( item => <option value={item.id}>{item.name}</option>  )
    return(
        <Modal show={props.show} onHide={hide}>
            <Modal.Header closeButton>
                <Modal.Title>Wyślij Zaproszenie </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Label>Nazwa użytkownika</Form.Label>
                    <Form.Control value = {sentInvitationName} placeholder="nazwa użytkownika" onChange={onChange}/>
                    <Form.Label>Nazwa firmy</Form.Label>
                    <Form.Control as="select" onChange={companyChange}>
                        <option></option>
                        {rows}
                    </Form.Control>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={hide}>Anuluj</Button>
                <Button variant="primary" onClick={accept} >Zapisz</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default  AddSentInvitationModal