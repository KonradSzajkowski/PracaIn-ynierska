import React, { useState } from 'react';
import './task.css';
import Modal from 'react-bootstrap/Modal'
import ModalHeader from 'react-bootstrap/ModalHeader'
import ModalTitle from 'react-bootstrap/ModalTitle'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalFooter from 'react-bootstrap/ModalFooter'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'


function AddTaskModal(props){
    
    const [task,setTask] = useState("")

    function add(){
        props.addTask(task)
        hide()
    }

    function onChange(e){
        setTask(e.target.value)
    }

    function hide(){
        setTask("")
        props.closeAddTaskModal()
    }

    return(
        <Modal show={props.show} onHide={hide} >
            <Modal.Header closeButton>
                <Modal.Title>Dodaj zadanie</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control maxlength="250"  type="text" name="taskModal" placeholder="zadanie" value={task} onChange={onChange}/> 
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={hide}>Anuluj </Button>
                <Button variant="primary" onClick={add}>Zapisz</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddTaskModal;