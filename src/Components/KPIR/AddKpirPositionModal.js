import React, { useState , useEffect} from 'react';
import Modal from 'react-bootstrap/Modal'
import './kpir.css'
import ModalHeader from 'react-bootstrap/ModalHeader'
import ModalTitle from 'react-bootstrap/ModalTitle'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalFooter from 'react-bootstrap/ModalFooter'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { render } from '@testing-library/react';

function AddKpirPositionModal (props){
    const [document,setDocument] = useState("")
    const [day,setDay] = useState(1)
    const [description,setDescription] = useState("")
    const [contractor,setContractor] =useState("")
    const [column,setColumn] = useState("")
    const [comments,setComments] = useState("")
    const [value,setValue] = useState(parseFloat(0).toFixed(2))
    
    
    function hide(){
        props.closeAddKpirPosition()
        setDocument("")
        setDescription("")
        setContractor("")
        setColumn("")
        setComments("")
        setValue(parseFloat(0).toFixed(2))
    }

    function accept(){    
        if(
            document &&
            description &&
            column &&
            value !== 0
        ){
            let date=new Date(props.accountingYear,props.accountingMonth,day)
            let index = props.contractors.findIndex(item => item.id == contractor)
            let salesIncome=null
            let otherIncomes=null
            let materialsCosts=null
            let sideCosts=null
            let salaryCosts=null
            let otherCosts=null
            let other=null
            switch(column){
                case "Wartość sprzedanych towarów i usług": salesIncome=value
                break
                case "Pozostałe przychody":otherIncomes=value
                break
                case "Zakup towarów handlowych i materiałów": materialsCosts=value
                break
                case "Koszty uboczne zakupu": sideCosts=value
                break
                case "Wynagrodzenia w gotówce i w naturze": salaryCosts=value 
                break
                case "Pozostałe wydatki": otherCosts= value
                break
                case "Inne": other=value
                break
            }
            let researchDescription=""
            let researchValue=null
            
            if(contractor)props.AddKpirPosition(document,date,description,props.contractors[index].name,props.contractors[index].post,props.contractors[index].postName,props.contractors[index].adres,props.contractors[index].nip,salesIncome,otherIncomes,materialsCosts,sideCosts,salaryCosts,otherCosts,other,researchDescription,researchValue,comments)
            else props.AddKpirPosition(document,date,description,"","","","","",salesIncome,otherIncomes,materialsCosts,sideCosts,salaryCosts,otherCosts,other,researchDescription,researchValue,comments)
            
            setDocument("")
            setDescription("")
            setContractor("")
            setColumn("")
            setColumn("")
            setComments("")
            setValue(parseFloat(0).toFixed(2))
        }else{
            document ? setDocument(""): setDocument("wymagana wartość")
            description ? setDescription(""): setDescription("wymagana wartość")
        }
    }

    
    function changeDocument(e) { setDocument(e.target.value) }
    function changeDay(e) { setDay(e.target.value)}   
    function changeDescription(e) { setDescription(e.target.value)}  
    function changeContractor(e) { setContractor(e.target.value)}  
    function changeColumn(e) { setColumn(e.target.value)}  
    function changeComments(e) { setComments(e.target.value)}  
    function changeValue(e) { 
        let num=parseFloat(e.target.value).toFixed(2)
        setValue(num)
    }  
    
        let monthLength = 0
        switch(props.accountingMonth){
            case 0: monthLength= 31
            break
            case 1:
            if(props.accountingYear % 4 === 0)monthLength=29
            else monthLength=28
            break
            case 2: monthLength= 31
            break
            case 3: monthLength= 30
            break
            case 4: monthLength= 31 
            break
            case 5: monthLength= 30
            break
            case 6: monthLength= 31
            break
            case 7: monthLength= 31
            break
            case 8: monthLength= 30
            break
            case 9: monthLength= 31
            break
            case 10: monthLength= 30
            break
            case 11: monthLength= 31
            break
        }
        let options =[]
        for(let i = 1 ; i<monthLength+1;i++){
            options.push(<option >{i}</option>)
        }
        let contractors=[]
        for(let i =0 ; i<props.contractors.length;i++){
            contractors.push(<option value={props.contractors[i].id}>{props.contractors[i].name}</option>)
        }
        
        
    return(
        <Modal show={props.show} onHide={hide} >
            <Modal.Header closeButton>
                <Modal.Title>Dodaj pozycję kpir</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Label>Nr dowodu księgowego</Form.Label>
                    <Form.Control value={document}  onChange={changeDocument} maxlength="50"/>
                    <Form.Label>Wybierz dzień</Form.Label>
                    <Form.Control  as="select" onChange={changeDay} defaultValue={1}>
                        {options}
                    </Form.Control>
                    <Form.Label>Opis operacji</Form.Label>
                    <Form.Control value={description}  onChange={changeDescription} maxlength="50"/>
                    <Form.Label>Wybierz kontrahenta</Form.Label>
                    <Form.Control  as="select" onChange={changeContractor}>
                        <option></option>
                        {contractors}
                    </Form.Control>
                    <Form.Label>Wybierz kolumnę księgi</Form.Label>
                    <Form.Control  as="select" onChange={changeColumn}>
                        <option></option>
                        <option>Wartość sprzedanych towarów i usług</option>
                        <option>Pozostałe przychody</option>
                        <option>Zakup towarów handlowych i materiałów</option>
                        <option>Koszty uboczne zakupu</option>
                        <option>Wynagrodzenia w gotówce i w naturze</option>
                        <option>Pozostałe wydatki</option>
                        <option>Inne</option>
                    </Form.Control>
                    <Form.Label>Wartość</Form.Label>
                    <Form.Control value={value} type="number" onChange={changeValue} maxlength="255"/>
                    <Form.Label>Uwagi</Form.Label>
                    <Form.Control value={comments}  onChange={changeComments} maxlength="255"/>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={hide}>Anuluj</Button>
                <Button variant="primary" onClick={accept}>Zapisz</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddKpirPositionModal