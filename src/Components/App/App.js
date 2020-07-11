import React from 'react';
import './App.css';
import { render } from '@testing-library/react';
import PageEntery from '../PageEntery/PageEntery'
import { useState} from 'react';
import UserPage from '../UserPage/UserPage.js';
import CompanyPage from '../CompanyPage/CompanyPage'

class App extends React.Component {
  constructor(){
      super()
      this.state = {
        logedIn:false,
        logedToCompany:false
      }
      this.LogOut = this.LogOut.bind(this)
      this.LogIn = this.LogIn.bind(this)
      this.companyLogIn= this.companyLogIn.bind(this)
      this.companyLogOut = this.companyLogOut.bind(this)
      this.componentDidMount = this.componentDidMount.bind(this)
  }

  

  componentDidMount() {
    if(localStorage.hasOwnProperty("token") && localStorage.getItem("token"))   this.setState({logedIn : true})
    else this.setState({logedIn : false})  

    if(localStorage.hasOwnProperty("companyToken") && localStorage.getItem("companyToken"))   this.setState({logedToCompany : true})
    else this.setState({logedToCompany : false})  


    window.addEventListener( 'storage', function(e) {  
      window.location.reload()
     })
  }

  companyLogIn(){
    this.setState({ logedToCompany : true})
  }

  companyLogOut(){
    this.setState({ logedToCompany : false})
    localStorage.setItem("companyToken","")
  }
  LogIn()
  {
    this.setState({ logedIn : true})
  }
  LogOut()
  {
    this.setState({ logedIn : false})
    localStorage.setItem("token","")
    this.setState({ logedToCompany : false})
    localStorage.setItem("companyToken","")
  }

  render(){
    if(this.state.logedToCompany === true && this.state.logedIn === true) return(<CompanyPage companyLogOut={this.companyLogOut} LogOut = {this.LogOut}/>)
    if(this.state.logedIn === true) return (<UserPage  LogOut = {this.LogOut} companyLogIn={this.companyLogIn}/>)
    else return <PageEntery LogIn = {this.LogIn} />
  }
}

export default App
