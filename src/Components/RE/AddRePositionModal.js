import React, { useState , useEffect} from 'react';
import Modal from 'react-bootstrap/Modal'
import './re.css'
import ModalHeader from 'react-bootstrap/ModalHeader'
import ModalTitle from 'react-bootstrap/ModalTitle'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalFooter from 'react-bootstrap/ModalFooter'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { render } from '@testing-library/react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function AddRePositionModal (props){
    const [document,setDocument] = useState("")
    const [salesDay,setSalesDay] = useState(1)
    const [documentDay,setDocumentDay] = useState(1) 

    const [documentDayMonth,setDocumentDayMonth]= useState(props.accountingMonth)

    const [comments,setComments] = useState("")
    const [tax20,setTax20] = useState(parseFloat(0).toFixed(2))
    const [tax17,setTax17] = useState(parseFloat(0).toFixed(2))
    const [tax8_5,setTax8_5] = useState(parseFloat(0).toFixed(2))
    const [tax5_5,setTax5_5] = useState(parseFloat(0).toFixed(2))
    const [tax3,setTax3] = useState(parseFloat(0).toFixed(2))
    const [tax10,setTax10] = useState(parseFloat(0).toFixed(2))

    function hide(){
        props.closeAddRePosition()
        setDocument("")
        setComments("")
        setTax20(parseFloat(0).toFixed(2))
        setTax17(parseFloat(0).toFixed(2))
        setTax8_5(parseFloat(0).toFixed(2))
        setTax5_5(parseFloat(0).toFixed(2))
        setTax3(parseFloat(0).toFixed(2))
        setTax10(parseFloat(0).toFixed(2))
        setSalesDay(1)
        setDocumentDay(1)
        setDocumentDayMonth(props.accountingMonth)
    }

    function accept(){    
        if(
            document &&
            (tax20!=0||tax17!=0||tax8_5!=0||tax5_5!=0||tax3!=0||tax10!=0)
        ){
            let salesDate=new Date(props.accountingYear,props.accountingMonth,salesDay)
            let documentDate=new Date(props.accountingYear,documentDayMonth,documentDay)
            
            props.AddRePosition(salesDate,documentDate,document,tax20,tax17,tax8_5,tax5_5,tax3,tax10,comments)
             
            setDocument("")
            setComments("")
            setTax20(parseFloat(0).toFixed(2))
            setTax17(parseFloat(0).toFixed(2))
            setTax8_5(parseFloat(0).toFixed(2))
            setTax5_5(parseFloat(0).toFixed(2))
            setTax3(parseFloat(0).toFixed(2))
            setTax10(parseFloat(0).toFixed(2))
            setSalesDay(1)
            setDocumentDay(1)
            setDocumentDayMonth(props.accountingMonth)
        }else{
            document ? setDocument(""): setDocument("wymagana wartość")
        }
    }

    
    function changeDocument(e) { setDocument(e.target.value) }
    function changeSalesDay(e) {
         setSalesDay(e.target.value)
         if( documentDayMonth==props.accountingMonth && (Number(e.target.value)>Number(documentDay))) {
            setDocumentDay(e.target.value)
         }
        }   
    function changeDocumentDay(e) { setDocumentDay(e.target.value) }   
    function changeComments(e) { setComments(e.target.value)}  
    function changeTax20(e) { 
        let num=parseFloat(e.target.value).toFixed(2)
        setTax20(num)
    }
    function changeTax17(e) { 
        let num=parseFloat(e.target.value).toFixed(2)
        setTax17(num)
    }  
    function changeTax8_5(e) { 
        let num=parseFloat(e.target.value).toFixed(2)
        setTax8_5(num)
    }  
    function changeTax5_5(e) { 
        let num=parseFloat(e.target.value).toFixed(2)
        setTax5_5(num)
    }  
    function changeTax3(e) { 
        let num=parseFloat(e.target.value).toFixed(2)
        setTax3(num)
    }  
    function changeTax10(e) { 
        let num=parseFloat(e.target.value).toFixed(2)
        setTax10(num)
    }    
    function changeDocumentDayMonth(e){
         setDocumentDayMonth(e.target.value)
         if(Number(e.target.value) > Number(props.accountingMonth) && Number(documentDay) >15)
         {
             setDocumentDay(1)
         }
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

        let optionsDocument=[]
        if(documentDayMonth==props.accountingMonth){
            for(let i = salesDay ; i<monthLength+1;i++){
                if(documentDay==i) optionsDocument.push(<option selected="selected" >{i}</option>)
                else optionsDocument.push(<option >{i}</option>)
                
            }
        }
        else{
            for(let i = 1 ; i<16;i++){
                if(documentDay==i) optionsDocument.push(<option selected="selected" >{i}</option>)
                else optionsDocument.push(<option >{i}</option>)
            }
        }
        
        
    return(
        <Modal show={props.show} onHide={hide} >
            <Modal.Header closeButton>
                <Modal.Title>Dodaj pozycję przychodu</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Label>Nr dowodu księgowego</Form.Label>
                    <Form.Control value={document}  onChange={changeDocument} maxlength="50"/>
                    <Form.Label>Wybierz dzień uzyskania przychodu</Form.Label>
                    <Form.Control  as="select" onChange={changeSalesDay} defaultValue={documentDay}>
                        {options}
                    </Form.Control>
                    <Form.Label>Wybierz datę wpisu</Form.Label>
                    <Form.Row>
                            <Form.Group as={Col} xs="6"  >
                                <Form.Label>Miesiąc</Form.Label>
                                <Form.Control  as="select" onChange={changeDocumentDayMonth} defaultValue={props.accountingMonth}>
                                    <option value={props.accountingMonth}>{props.accountingMonth+1}</option>
                                    <option value={props.accountingMonth+1}>{props.accountingMonth+2}</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} xs="6" >
                                <Form.Label>Dzień</Form.Label>
                                <Form.Control  as="select" onChange={changeDocumentDay} >
                                {optionsDocument}
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>

                    <Form.Label>Stawka 20%</Form.Label>
                    <Form.Control value={tax20} type="number" onChange={changeTax20} maxlength="10"/>
                    <Form.Label>Stawka 17%</Form.Label>
                    <Form.Control value={tax17} type="number" onChange={changeTax17} maxlength="10"/>
                    <Form.Label>Stawka 8,5%</Form.Label>
                    <Form.Control value={tax8_5} type="number" onChange={changeTax8_5} maxlength="10"/>
                    <Form.Label>Stawka 5,5%</Form.Label>
                    <Form.Control value={tax5_5} type="number" onChange={changeTax5_5} maxlength="10"/>
                    <Form.Label>Stawka 3%</Form.Label>
                    <Form.Control value={tax3} type="number" onChange={changeTax3} maxlength="10"/>
                    <Form.Label>Stawka 10%</Form.Label>
                    <Form.Control value={tax10} type="number" onChange={changeTax10} maxlength="10"/>
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

export default AddRePositionModal