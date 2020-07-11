import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { render } from '@testing-library/react'
import PageEntery from '../PageEntery/PageEntery'
import './UserPage.css'
import CompanysList from '../Company/CompanysList'
import StandardButton from '../Buttons/StandardButton'
import DoubleHeader from '../DoubleHeader/DoubleHeader'
import Task from '../Task/Task.js'
import Invitation from '../Invitation/Invitation'
import SentInvitation from '../SentInvitation/SentInvitation'
import InvitationList from '../Invitation/InvitationList'
import SentInvitationList from '../SentInvitation/SentInvitationList'
import TaskList from '../Task/TaskList'
import { Checkbox } from 'react-bootstrap'
import AddTaskModal from '../Task/AddTaskModal'
import AddSentInvitationModal from '../SentInvitation/AddSentInvitationModal'
import AddCompanyModal from '../Company/AddCompanyModal'
import GetData from '../../services/GetData'
import ValidPostData from '../../services/ValidPostData'


class UserPage extends React.Component {
  constructor(props){
      super(props)
      this.state = {
        companysInfo:[],
        invitations:[],
        sentInvitations:[],
        tasks:[],
        showModals:{
          addTask:false,
          AddSentInvitation:false,
          addCompany:false
        },
      }

      this.removeTask = this.removeTask.bind(this)
      this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
      this.editTask = this.editTask.bind(this)
      this.closeAddTaskModal = this.closeAddTaskModal.bind(this)
      this.showAddTaskModal = this.showAddTaskModal.bind(this)
      this.addTask = this.addTask.bind(this)
      this.acceptInvitation = this.acceptInvitation.bind(this)
      this.removeInvitation = this.removeInvitation.bind(this)
      this.removeSentInvitation = this.removeSentInvitation.bind(this)
      this.showAddSentInvitationModal = this.showAddSentInvitationModal.bind(this)
      this.closeAddSentInvitationModal =this.closeAddSentInvitationModal.bind(this)
      this.addSentInvitation = this.addSentInvitation.bind(this)
      this.closeAddCompanyModal = this.closeAddCompanyModal.bind(this)
      this.AddCompany = this.AddCompany.bind(this)
      this.showAddCompany = this.showAddCompany.bind(this)
      this.componentDidMount = this.componentDidMount.bind(this)
      this.getTasks = this.getTasks.bind(this)
      this.getCompanys = this.getCompanys.bind(this)
      this.getSentInvitations = this.getSentInvitations.bind(this)
      this.getInvitations = this.getInvitations.bind(this)
  }

  componentDidMount(){
    this.getTasks()
    this.getCompanys()
    this.getSentInvitations()
    this.getInvitations()
  }

  getTasks(){
    GetData('tasks/getAllTasks', this.props.LogOut ).then(
      result => {
        if(result.tasks)
        this.setState({
          tasks:result.tasks
        })
      }
    )
  }

  getCompanys(){
    GetData('companys/getAllCompanys',this.props.LogOut).then(
      result =>{
        if(result.res)
        this.setState({
          companysInfo:result.res
        })
      }
    )
  }

  getSentInvitations(){
    GetData('invitations/getSentInvitations',this.props.LogOut).then(
      result=>{
        console.log(result)
        if(result.res)
        this.setState({
          sentInvitations:result.res
        })
      }
    )
  }

  getInvitations(){
    GetData('invitations/getInvitations',this.props.LogOut).then(
      result=>{
        console.log(result)
        if(result.res)
        this.setState({
          invitations:result.res
        })
      }
    )
  }
  
  editTask(taskName,id){
    ValidPostData('tasks/changeTaskName',{id:id ,name:taskName},this.props.LogOut).then(
      result => {
        if(result.res == "ok"){
          let taskIndex = this.state.tasks.findIndex(item => item.id == id)
          let array = this.state.tasks;
          array[taskIndex].name = taskName
          this.setState({
            tasks:array
          })
        }
      }
    )

  }

  handleCheckboxChange(id){
    ValidPostData('tasks/changeTaskCheckBox',{id:id},this.props.LogOut).then(
      result=>{
        if(result.res == "ok"){
          let CheckBoxIndex = this.state.tasks.findIndex(item => item.id == id)
          let array = this.state.tasks;
          array[CheckBoxIndex].selected = !array[CheckBoxIndex].selected
          this.setState({
            tasks:array
          })
        }
      }
    )

  }

  removeTask(id){
    ValidPostData('tasks/removeTask',{id:id},this.props.LogOut).then(
      result=>{
        if(result.res === 'ok') {
          this.setState({
            tasks:this.state.tasks.filter(item => item.id !== id )
          })
        }
      }
    )
  }

  showAddTaskModal(){
    let temp = this.state.showModals
    temp.addTask=true
    this.setState({
      showModals:temp
    })
  }

  closeAddTaskModal(){
    let temp = this.state.showModals
    temp.addTask=false
    this.setState({
      showModals:temp
    })
  }
  
  addTask(val){
    let TaskId = ""
    ValidPostData('tasks/AddTask',{name:val}, this.props.LogOut).then(
      result => {
        if(result.id)
        TaskId=result.id

        let temp = {
          id:TaskId,
          name:val,
          selected:false
        }

        this.setState({
          tasks: this.state.tasks.concat(temp)
        })
      }
    )
  }

  removeInvitation(id){
    ValidPostData('invitations/removeInvitation',{id:id},this.props.LogOut).then(
      result=>{
        if(result.res === 'ok'){
          this.setState({
            invitations:this.state.invitations.filter(item => item.id !== id)
          })
        }
      }
    ) 
  }

  acceptInvitation(id){
    ValidPostData('invitations/AcceptInvitation',{id:id},this.props.LogOut).then(
      result=>{
        if(result.res === 'ok'){
          this.setState({
            invitations:this.state.invitations.filter(item => item.id !== id)
          })
          this.getCompanys()
        }
      }
    ) 
  }

  removeSentInvitation(id){
    ValidPostData('invitations/removeInvitation',{id:id},this.props.LogOut).then(
      result=>{
        if(result.res === 'ok'){
          console.log(result.res)
          this.setState({
            sentInvitations:this.state.sentInvitations.filter(item => item.id !== id)
          })
        }
      }
    )
  }

  showAddSentInvitationModal(){
    let temp = this.state.showModals
    temp.AddSentInvitation=true

    this.setState({
        showModals:temp
    })
  }

  closeAddSentInvitationModal(){
    let temp = this.state.showModals
    temp.AddSentInvitation=false

    this.setState({
        showModals:temp
    })
  }

  async addSentInvitation(companyId,login){
    let unexistingUser=false
    let userAlreadyInvited=false
    let userInCompany=false
    await ValidPostData('invitations/addInvitation', {login:login , companyId:companyId} , this.props.LogOut).then(
      result=>{
        if(result.res){
          let temp = {
            id:result.res,
            companyName:this.state.companysInfo.filter(item => item.id === companyId)[0].name,
            login:login
          }
          this.setState({
            sentInvitations: this.state.sentInvitations.concat(temp)
          })
          this.closeAddSentInvitationModal()
        }
      },
      error=>{
        console.log(error)
        if(error === 'login not found') unexistingUser=true
        if(error === 'user already get invitation') userAlreadyInvited=true
        if(error === 'user already is in company') userInCompany=true
      }
    )
      console.log(unexistingUser)
      return {
        unexistingUser:unexistingUser , 
        userAlreadyInvited:userAlreadyInvited,
        userInCompany:userInCompany
      }
  }
  
  closeAddCompanyModal(){
    let temp = this.state.showModals
    temp.addCompany=false

    this.setState({
        showModals:temp
    })
  }

  AddCompany(companyName,post,postName,adres,nip,kpir){
    ValidPostData('companys/AddCompany',{
      name:companyName,
      post:post,
      postName:postName,
      adres:adres,
      nip:nip,
      kpir:kpir
    },this.props.LogOut).then(
      result=>{
        if(result.res){
          let temp = {
            id:result.res,
            name:companyName,
            post:post+" "+postName,
            adres:adres,
            nip:nip,
            kpir:kpir
          }
      
          this.setState({
            companysInfo: this.state.companysInfo.concat(temp)
          })
          this.closeAddCompanyModal()
        }
        
      }
    )
    

  }

  showAddCompany(){
    let temp = this.state.showModals
    temp.addCompany=true

    this.setState({
        showModals:temp
    })
  }
  
  render(){
    return (
          <>
            <div id="userPageContainer" > 
              <div id="userPanel">
                <div id="topBar">
                    <h2 >Twoje Firmy </h2>
                    <p onClick={() => {this.props.LogOut() }}>Wyloguj</p>
                </div>
                
                <Container name="mainContent" fluid={true} >
                  <div id="scrolBar"></div>
                  <Row>
                    <Col xl={3} sm={6}>
                      <div class="userSumary" >
                       <img  src = {require("../../img/building.png")} />  
                       <div class="rightText">
                        <p class="userSumaryName">Liczba firm</p>
                        <div class="clear"></div>
                        <p class="userSumaryNumber">{this.state.companysInfo.length}</p>
                       </div>
                      </div>
                    </Col>
                    <Col xl={3} sm={6}>
                      <div class="userSumary" >
                         <img  src = {require("../../img/invitation.png")} />
                         <div class="rightText">
                          <p class="userSumaryName">Zaproszenia do firm</p>
                          <div class="clear"></div>
                          <p class="userSumaryNumber">{this.state.invitations.length}</p>
                         </div>
                      </div>
                    </Col>
                    <Col xl={3} sm={6}>
                      <div class="userSumary" >
                         <img  src = {require("../../img/note.png")} />
                         <div class="rightText">
                          <p class="userSumaryName">Wysłane zaproszenia</p>
                          <div class="clear"></div>
                          <p class="userSumaryNumber">{this.state.sentInvitations.length}</p>
                        </div>
                      </div>
                    </Col>
                    <Col xl={3} sm={6}>
                      <div class="userSumary" >
                         <img  src = {require("../../img/clipboard.png")} />
                         <div class="rightText">
                          <p class="userSumaryName">Zadania</p>
                          <div class="clear"></div>
                          <p class="userSumaryNumber">{this.state.tasks.length}</p>
                         </div>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col xl={8} >
                    <div id="userCompanys" >
                        <DoubleHeader bigger="Firmy" smaller = "Do tych firm możesz się zalogować"  />
                        <CompanysList companys={this.state.companysInfo} companyLogIn={this.props.companyLogIn} LogOut={this.props.LogOut}/>
                        <StandardButton value="Utwórz" onClick={() => {this.showAddCompany()}} />
                      </div>
                    </Col>
                    <Col xl={4} >
                    <div id="userTasks" >
                      <DoubleHeader bigger="Zadania" smaller = "Zarządzaj swoimi zadaniami"  />
                      <TaskList removeTask={this.removeTask} editTask={this.editTask} handleCheckboxChange={this.handleCheckboxChange} tasks={this.state.tasks} />
                      <StandardButton value="dodaj" onClick={() => this.showAddTaskModal()}/>
                         </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col xl={6} >
                    <div id="Invitations" >
                      <DoubleHeader bigger="Zaproszenia do firm" smaller = "Tutaj możesz dołączyć do firmy z zaproszenia"  />
                      <InvitationList invitations={this.state.invitations} removeInvitation={this.removeInvitation} acceptInvitation={this.acceptInvitation}> </InvitationList>
                      </div>
                    </Col>
                    <Col xl={6} >
                    <div id="SentInvitations" >
                      <DoubleHeader bigger="Wysłane zaproszenia" smaller = "Wyślij zaproszenie do dołączenia do jednej z twoich firm"  />
                      <SentInvitationList invitations={this.state.sentInvitations} removeSentInvitation={this.removeSentInvitation} > </SentInvitationList>
                      <StandardButton value="Wyślij" onClick={ () => {this.showAddSentInvitationModal()}}/>
                         </div>
                    </Col>
                  </Row>
                </Container>
              </div>
              
          </div>
          <AddTaskModal show={this.state.showModals.addTask} addTask={this.addTask} showAddTaskModal={this.showAddTaskModal} closeAddTaskModal={this.closeAddTaskModal} iterateAddedTask={this.iterateAddedTask}/>
          <AddSentInvitationModal show={this.state.showModals.AddSentInvitation} closeAddSentInvitationModal={this.closeAddSentInvitationModal} companys={this.state.companysInfo} addSentInvitation={this.addSentInvitation} />
          <AddCompanyModal show={this.state.showModals.addCompany} closeAddCompanyModal={this.closeAddCompanyModal} AddCompany={this.AddCompany} />
        </>
    )
  }
}

export default UserPage;
