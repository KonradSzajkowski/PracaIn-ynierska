import React,{useEffect} from 'react'
import Container from 'react-bootstrap/Container'
import './contractors.css'
import { render } from '@testing-library/react'
import StandardButton from '../Buttons/StandardButton'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Contractor from './Contractor'
import AddContractorModal from './AddContractorModal'


class Contractors extends React.Component{
    constructor(props){
        super(props)
        this.state ={
        }
        
    }
    
    
    render(){      
        const cols=this.props.contractors.map(item=><Col xl={4} md={6} > <Contractor editContractor={this.props.editContractor} value={item} removeContractor={this.props.removeContractor}/> </Col>)

        return(
            <>
                <div id="mainContainer">
                    <Container id="contractors" fluid={true} >
                        <Row>{cols}</Row>
                    </Container>
                    <StandardButton value="dodaj" onClick={this.props.showAddContractor}/>
                </div>
                <AddContractorModal show={this.props.showAddContractorModal} closeAddContractor={this.props.closeAddContractor} addContractor={this.props.addContractor}/>
            </>
        )
    }
}

export default Contractors;