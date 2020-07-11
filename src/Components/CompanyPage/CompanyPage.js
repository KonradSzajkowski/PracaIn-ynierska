import React from 'react';
import './companyPage.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Dropdown from 'react-bootstrap/Dropdown'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars,faHome ,faUser,faBookOpen} from '@fortawesome/free-solid-svg-icons'
import GetCompanyData from '../../services/GetCompanyData'
import CompanyData from '../CompanyData/CompanyData'
import Contractors from '../Contractors/Contractors'
import ValidPostCompanyData from '../../services/ValidPostCompanyData'
import Kpir from '../KPIR/Kpir'
import Re from '../RE/Re'


export default class CompanyPage extends React.Component{
    constructor(props){
        super(props)
        this.state={
            companyInfo:{},
            contractors:[],
            kpirPositions:[],
            rePositions:[],
            page:'CompanyData',
            showAddContractorModal:false,
            showAddKpirPositionModal:false,
            showAddRePositionModal:false,
            accountingYear:new Date().getFullYear(),
            accountingMonth:new Date().getMonth()
        }
        this.getCompany = this.getCompany.bind(this)
        this.setPage = this.setPage.bind(this)
        this.addContractor=this.addContractor.bind(this)
        this.showAddContractor= this.showAddContractor.bind(this)
        this.closeAddContractor= this.closeAddContractor.bind(this)
        this.getContractors=this.getContractors.bind(this)
        this.editContractor=this.editContractor.bind(this)
        this.removeContractor=this.removeContractor.bind(this)
        this.getKpirPositions=this.getKpirPositions.bind(this)
        this.removeKpirPosition=this.removeKpirPosition.bind(this)
        this.showAddKpirPosition=this.showAddKpirPosition.bind(this)
        this.closeAddKpirPosition=this.closeAddKpirPosition.bind(this)
        this.AddKpirPosition=this.AddKpirPosition.bind(this)
        this.setAccountingPeriodMonth=this.setAccountingPeriodMonth.bind(this)
        this.setAccountingPeriodYear=this.setAccountingPeriodYear.bind(this)

        this.getRePositions=this.getRePositions.bind(this)
        this.removeRePosition = this.removeRePosition.bind(this)
        this.showAddRePosition = this.showAddRePosition.bind(this)
        this.closeAddRePosition = this.closeAddRePosition.bind(this)
        this.AddRePosition=this.AddRePosition.bind(this)

    }
    componentDidMount(){
        this.getCompany()
        this.getContractors()
        this.getKpirPositions()
        this.getRePositions()
    }

    getCompany(){
        GetCompanyData('companys/getCompany',this.props.LogOut).then(
            result => {
                if(result.res) {
                    this.setState({
                        companyInfo:result.res
                    })
                }
            }
        )
    }

    setAccountingPeriodMonth(month){
        this.setState({
            accountingMonth:month
        })
    }

    async setAccountingPeriodYear(year){
        await this.setState({
            accountingYear:year
        })
    }

    getContractors(){
        GetCompanyData('contractors/getAllContractors',this.props.LogOut).then(
            result => {
                if(result.res) {
                    this.setState({
                        contractors:result.res
                    })
                }
            }
        )
    }
    
    getKpirPositions(){
        GetCompanyData('kpirPositions/getAllKpirPositions',this.props.LogOut).then(
            result => {
                if(result.res) {
                    this.setState({
                        kpirPositions:result.res
                    })
                }
            }
        )
    }

    getRePositions(){
        GetCompanyData('rePositions/getAllRePositions',this.props.LogOut).then(
            result => {
                if(result.res) {
                    this.setState({
                        rePositions:result.res
                    })
                }
            }
        )
    }

    setPage(page){
        this.setState({
            page:page
        })
    }

    showAddContractor(){
        this.setState({
            showAddContractorModal:true
        })
    }

    closeAddContractor(){
        this.setState({
            showAddContractorModal:false
        })
    }

    showAddKpirPosition(){
        this.setState({
            showAddKpirPositionModal:true
        })
    }
    
    showAddRePosition(){
        this.setState({
            showAddRePositionModal:true
        })
    }

    closeAddKpirPosition(){
        this.setState({
            showAddKpirPositionModal:false
        })
    }

    closeAddRePosition(){
        this.setState({
            showAddRePositionModal:false
        })
    }

    addContractor(name,post,postName,adres,nip){
        ValidPostCompanyData('contractors/AddContractor',{
            name:name,
            post:post,
            postName:postName,
            adres:adres,
            nip:nip
        },this.props.LogOut).then(
            result=>{
                if(result.res){
                    let temp={
                        id:result.res,
                        name:name,
                        post:post,
                        postName:postName,
                        adres:adres,
                        nip:nip
                    }
                    this.setState({
                        contractors:this.state.contractors.concat(temp)
                    })
                    this.closeAddContractor()
                }
            }
        )
    }

    AddKpirPosition(document,date,description,contractorName,contractorPost,contractorPostName,contractorAdres,contractorNip,salesIncome,otherIncomes,materialsCosts,sideCosts,salaryCosts,otherCosts,other,researchDescription,researchValue,comments){
        ValidPostCompanyData('kpirPositions/AddKpirposition',{
            document:document,
            date:date,
            description:description,
            contractorName:contractorName,
            contractorPost:contractorPost,
            contractorPostName:contractorPostName,
            contractorAdres:contractorAdres,
            contractorNip:contractorNip,
            salesIncome:salesIncome,
            otherIncomes:otherIncomes,
            materialsCosts:materialsCosts,
            sideCosts:sideCosts,
            salaryCosts:salaryCosts,
            otherCosts:otherCosts,
            other:other,
            researchDescription:researchDescription,
            researchValue:researchValue,
            comments:comments
        },this.props.LogOut).then(
            result=>{
                if(result.res){
                    let temp={
                        id:result.res,
                        document:document,
                        date:date,
                        description:description,
                        contractorName:contractorName,
                        contractorPost:contractorPost,
                        contractorPostName:contractorPostName,
                        contractorAdres:contractorAdres,
                        contractorNip:contractorNip,
                        salesIncome:salesIncome,
                        otherIncomes:otherIncomes,
                        materialsCosts:materialsCosts,
                        sideCosts:sideCosts,
                        salaryCosts:salaryCosts,
                        otherCosts:otherCosts,
                        other:other,
                        researchDescription:researchDescription,
                        researchValue:researchValue,
                        comments:comments
                    }
                    this.setState({
                        kpirPositions:this.state.kpirPositions.concat(temp)
                    })
                    this.closeAddKpirPosition()
                }
            }
        )
    }

    AddRePosition(salesDate,documentDate,document,tax20,tax17,tax8_5,tax5_5,tax3,tax10,comments){
        ValidPostCompanyData('rePositions/AddRePosition',{
            salesDate:salesDate,
            documentDate:documentDate,
            document:document,
            tax20:tax20,
            tax17:tax17,
            tax8_5:tax8_5,
            tax5_5:tax5_5,
            tax3:tax3,
            tax10:tax10,
            comments:comments
        },this.props.LogOut).then(
            result=>{
                if(result.res){
                    let temp={
                        id:result.res,
                        salesDate:salesDate,
                        documentDate:documentDate,
                        document:document,
                        tax20:tax20,
                        tax17:tax17,
                        tax8_5:tax8_5,
                        tax5_5:tax5_5,
                        tax3:tax3,
                        tax10:tax10,
                        comments:comments            
                    }
                    this.setState({
                        rePositions:this.state.rePositions.concat(temp)
                    })
                    this.closeAddRePosition()
                }
            }
        )
    }

    editContractor(id,name,post,postName,adres,nip){
        ValidPostCompanyData('contractors/EditContractor',{
            id:id,
            name:name,
            post:post,
            postName:postName,
            adres:adres,
            nip:nip
        },this.props.LogOut).then(
            result=>{
                if(result.res==='ok'){
                    let temp={
                        id:id,
                        name:name,
                        post:post,
                        postName:postName,
                        adres:adres,
                        nip:nip
                    }

                    let index =this.state.contractors.findIndex(item => item.id===id)
                    let tempContractors= this.state.contractors
                    tempContractors[index] = temp
                    this.setState({
                        contractors:tempContractors
                    })
                    this.closeAddContractor()
                }
            }
        )
    }

    removeContractor(id){
        ValidPostCompanyData('contractors/RemoveContractor',{id:id,},this.props.LogOut).then(
            result=>{
                if(result.res==='ok'){
                    this.setState({
                        contractors:this.state.contractors.filter(item => item.id !== id)
                    })
                }
            }
        )
    }

    removeKpirPosition(id){
        ValidPostCompanyData('kpirPositions/RemoveKpirPosition',{id:id,},this.props.LogOut).then(
            result=>{
                if(result.res==='ok'){
                    this.setState({
                        kpirPositions:this.state.kpirPositions.filter(item => item.id !== id)
                    })
                }
            }
        )
    }

    removeRePosition(id){
        ValidPostCompanyData('rePositions/RemoveRePosition',{id:id,},this.props.LogOut).then(
            result=>{
                if(result.res==='ok'){
                    this.setState({
                        rePositions:this.state.rePositions.filter(item => item.id !== id)
                    })
                }
            }
        )
    }


    render(){
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <p
      ref={ref}
        onClick={(e) => {
        e.preventDefault();
        onClick(e);
        }}
    >
      {children}
    </p>
    ));
   

    const Page=(type)=>{
        if(type === 'CompanyData') return( <CompanyData LogOut={this.props.LogOut} companyInfo={this.state.companyInfo} getCompany={this.getCompany}/>)
        if(type === 'Contractors') return( <Contractors removeContractor={this.removeContractor} editContractor={this.editContractor} showAddContractorModal={this.state.showAddContractorModal} closeAddContractor={this.closeAddContractor} showAddContractor={this.showAddContractor} LogOut={this.props.LogOut} contractors={this.state.contractors} addContractor={this.addContractor}/> )
        if(type === 'kpir') return( <Kpir companyInfo={this.state.companyInfo} contractors={this.state.contractors} showAddKpirPositionModal={this.state.showAddKpirPositionModal} LogOut={this.props.LogOut} kpirPositions={this.state.kpirPositions} accountingYear={this.state.accountingYear} accountingMonth={this.state.accountingMonth} removeKpirPosition={this.removeKpirPosition} showAddKpirPosition={this.showAddKpirPosition} closeAddKpirPosition={this.closeAddKpirPosition} AddKpirPosition={this.AddKpirPosition} setAccountingPeriodMonth={this.setAccountingPeriodMonth} setAccountingPeriodYear={this.setAccountingPeriodYear}/>)
        if(type === 're') return <Re companyInfo={this.state.companyInfo} LogOut={this.props.LogOut} accountingYear={this.state.accountingYear} accountingMonth={this.state.accountingMonth} setAccountingPeriodMonth={this.setAccountingPeriodMonth} setAccountingPeriodYear={this.setAccountingPeriodYear} removeRePosition={this.removeRePosition} showAddRePosition={this.showAddRePosition} closeAddRePosition={this.closeAddRePosition} AddRePosition={this.AddRePosition} showAddRePositionModal={this.state.showAddRePositionModal} rePositions={this.state.rePositions}/>
    }

    const Accouning=(type)=>{
        if(type) return (<Dropdown.Item onClick={() => {this.setPage('kpir') }}>KPIR</Dropdown.Item>)
        else return (<Dropdown.Item onClick={() => {this.setPage('re') }}>RE</Dropdown.Item>)
    }
    const AccountingButton=(type)=>{
        if(type) return (<button onClick={() => {this.setPage('kpir') }} class="sideBarButton"><FontAwesomeIcon icon={faBookOpen}/> KPIR</button>)
        else return (<button onClick={() => {this.setPage('re') }} class="sideBarButton"><FontAwesomeIcon icon={faBookOpen}/> RE</button>)
    }

    const header=(type)=>{
        if(type === 'CompanyData') return("Dane firmy")
        if(type === 'Contractors') return("Kontrahenci")
        if(type === 'kpir') return("KPIR")
        if(type === 're') return ("Ewidencja przychodów")
    }

        return(
            <>
                <div id="companyPageContainer">
                    <div id="companyPanel">
                        <Container id="mainContent" fluid={true}>
                            <Row>
                                <Col id="sideBarCol" md={12}  className="d-none d-lg-block">
                                    <div id="sideBar">
                                        <div id="sideTopBar">
                                        </div>
                                        <button onClick={() => {this.setPage('CompanyData') }} class="sideBarButton"><FontAwesomeIcon icon={faHome}/> Firma</button>
                                        <button onClick={() => {this.setPage('Contractors') }} class="sideBarButton"><FontAwesomeIcon icon={faUser}/> Kontrahenci</button>
                                        {AccountingButton(this.state.companyInfo.kpir)}
                                    </div>
                                    <div id="rightPanel">
                                        <div id="topBar">
                                            <h2 >{header(this.state.page)} </h2>
                                            <p onClick={() => {this.props.LogOut() }}>Wyloguj</p>
                                            <p onClick={() => {this.props.companyLogOut() }}>Zmień Firmę</p>
                                        </div>
                                        {Page(this.state.page)}
                                   </div>
                                </Col>
                                <Col md={12} className="d-lg-none" >
                                    <div id="singlePanel">
                                        <div id="topBar">
                                            <h2 >{header(this.state.page)} </h2>  
                                            <Dropdown>
                                                <Dropdown.Toggle  as={CustomToggle} id="dropdown-custom-components">
                                                    <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu >
                                                    <Dropdown.Item onClick={() => {this.setPage('CompanyData') }}>Firma</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => {this.setPage('Contractors') }}>Kontrahenci</Dropdown.Item>
                                                    {Accouning(this.state.companyInfo.kpir)}
                                                    <Dropdown.Divider />
                                                    <Dropdown.Item onClick={() => {this.props.LogOut() }} > Wyloguj</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => {this.props.companyLogOut() }}>Zmień Firmę</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown> 
                                        </div>
                                        {Page(this.state.page)}
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
            </>
        )
    }

    
}