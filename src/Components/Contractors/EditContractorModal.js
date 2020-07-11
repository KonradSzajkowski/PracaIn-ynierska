import React, { useState , useEffect} from 'react';
import Modal from 'react-bootstrap/Modal'
import './contractors.css'
import ModalHeader from 'react-bootstrap/ModalHeader'
import ModalTitle from 'react-bootstrap/ModalTitle'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalFooter from 'react-bootstrap/ModalFooter'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { render } from '@testing-library/react';

function AddContractorModal (props){
    const [companyName,setCompanyName] = useState("")
    const [post,setPost] = useState("")
    const [postName,setPostName] = useState("")
    const [nip,setNip] = useState("")
    const [adres,setAdres] = useState("")
    
    useEffect(() => {
        setCompanyName(props.contractor.name)
        setPost(props.contractor.post)
        setPostName(props.contractor.postName)
        setNip(props.contractor.nip)
        setAdres(props.contractor.adres)
    },[props.show]);

    function hide(){
        props.closeEditContractor()
    }

    function accept(){
        
        const rePost=/^\d{2}-\d{3}$/
        const reNip =/^\d{10}$/

        if(
            companyName &&
            rePost.test(post) &&
            postName &&
            adres &&
            reNip.test(nip)
        ){
            props.editContractor(props.contractor.id,companyName,post,postName,adres,nip)
            hide()
            
        }else{
            companyName ? setCompanyName(props.contractor.name): setCompanyName("wymagana wartość")
            rePost.test(post) ? setPost(props.contractor.post) : setPost("błąd")
            postName ? setPostName(props.contractor.postName) : setPostName("wymagana wartość")
            reNip.test(nip) ? setNip(props.contractor.nip) : setNip("błąd")
            adres ? setAdres(props.contractor.adres):setAdres("wymagana wartość")
        }
    }


    function changeCompanyName(e) { setCompanyName(e.target.value) }
    function changePost(e) { setPost(e.target.value) }
    function changePostName(e) { setPostName(e.target.value) }
    function changeNip(e) { setNip(e.target.value) }
    function changeAdres(e) { setAdres(e.target.value) }
    return(
        <Modal show={props.show} onHide={hide} >
            <Modal.Header closeButton>
                <Modal.Title>Edytuj Dane Kontrahenta</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Label>Nazwa Firmy</Form.Label>
                    <Form.Control value={companyName}  onChange={changeCompanyName} maxlength="200"/>
                    <Form.Label>Kod Pocztowy</Form.Label>
                    <Form.Control value={post} maxlength="6" onChange={changePost}/>
                    <Form.Label>Lokalizacja Poczty</Form.Label>
                    <Form.Control value={postName} onChange={changePostName} maxlength="200" />
                    <Form.Label>Adres</Form.Label>
                    <Form.Control value={adres}  onChange={changeAdres} maxlength="200" />
                    <Form.Label>NIP(tylko cyfry)</Form.Label>
                    <Form.Control value={nip} maxlength="10" onChange={changeNip} />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={hide}>Anuluj</Button>
                <Button variant="primary" onClick={accept}>Zapisz</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddContractorModal