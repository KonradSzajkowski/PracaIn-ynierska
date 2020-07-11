import React from 'react'
import './company.css'
import Company from './Company'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes , faCheck  } from '@fortawesome/free-solid-svg-icons'
import CompanyRow from './CompanyRow'
import Container from 'react-bootstrap/Container'


function CompanysList(props){
    let doubledCompanys = [];

    for( let i=0; i < props.companys.length ; i+=2) {
      if(props.companys.length>i+1) {
        doubledCompanys[i/2]={
          company1:props.companys[i],
          company2:props.companys[i+1]
        }
      }
      else{
        doubledCompanys[i/2]={
          company1:props.companys[i]
        }
      }
    }

     let rows = doubledCompanys.map( item => <CompanyRow company1={item.company1} company2={item.company2} companyLogIn={props.companyLogIn} LogOut={props.LogOut}/> )
    return (
      <Container name="companysContainer" fluid={true} >
          {rows}
      </Container>
    )
}

export default CompanysList;