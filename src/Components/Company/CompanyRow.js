import React from 'react';
import './company.css';
import Company from './Company'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes , faCheck  } from '@fortawesome/free-solid-svg-icons'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function CompanyRow(props){
    if(props.company2){
      return (
        <Row>
          <Col md={6} >
              <Company  
                  id={props.company1.id}
                  companyName={props.company1.name}
                  post={props.company1.post}
                  postName={props.company1.postName}
                  adres={props.company1.adres}
                  nip={props.company1.nip}
                  kpir={props.company1.kpir}
                  companyLogIn={props.companyLogIn}
                  LogOut={props.LogOut}
              />
          </Col>
          <Col md={6} >
            <Company
                  id={props.company2.id}
                  companyName={props.company2.name}
                  post={props.company2.post}
                  postName={props.company2.postName}
                  adres={props.company2.adres}
                  nip={props.company2.nip}
                  kpir={props.company2.kpir}
                  companyLogIn={props.companyLogIn}
                  LogOut={props.LogOut}
            />      
          </Col>  
        </Row>
      )
    }
    else{
      return (
        <Row>
          <Col md={6} >
              <Company  
                  id={props.company1.id}
                  companyName={props.company1.name}
                  post={props.company1.post}
                  postName={props.company1.postName}
                  adres={props.company1.adres}
                  nip={props.company1.nip}
                  kpir={props.company1.kpir}
                  companyLogIn={props.companyLogIn}
                  LogOut={props.LogOut}
              />
          </Col>
          <Col md={6} >

          </Col>  
        </Row>
      )
    }
}

export default CompanyRow;