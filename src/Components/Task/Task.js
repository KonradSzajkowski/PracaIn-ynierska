import React, { useState } from 'react';
import './task.css';
import Modal from 'react-bootstrap/Modal'
import ModalHeader from 'react-bootstrap/ModalHeader'
import ModalTitle from 'react-bootstrap/ModalTitle'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalFooter from 'react-bootstrap/ModalFooter'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash , faEdit  } from '@fortawesome/free-solid-svg-icons'
import { Checkbox } from 'react-bootstrap';

function Task(props){
    const [show, setShow] = useState(false);
    const [taskName, setTaskName] = useState(props.value.name);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true)

    function handleCheckboxChange(){
        props.handleCheckboxChange(props.value.id)
    }

    function onChange(e){
        setTaskName(e.target.value)
    }

    function edit(){
        setTaskName(props.value.name)
        handleShow()
    }

    function save(){
        props.editTask(taskName,props.value.id)
        handleClose()
    }
    
    return (
        <>
        <div class="Task">
                <input type="checkbox"  onChange={handleCheckboxChange} checked={props.value.selected} />
                <p> {props.value.name} </p>
            <div class="icons" >
                <FontAwesomeIcon icon={faEdit}  onClick={edit}/>              
                <FontAwesomeIcon icon={faTrash} onClick={() => {props.removeTask(props.value.id) }}/>
            </div>
        </div>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edytuj nazwę zadania</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Control maxlength="250" type="text" name="taskName" placeholder="Zadanie" value={taskName} onChange={onChange}  />
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Anuluj
          </Button>
          <Button variant="primary" onClick={save}>
            Zapisz
          </Button>
        </Modal.Footer>
      </Modal>

        </>
    )
}

export default Task;