import React from 'react';
import { useEffect ,useState} from 'react';
import './Login.css';
import Container from 'react-bootstrap/Container'
import PostData from '../../services/PostData'


class Login extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            loginData:{
                login:"",
                password:""
            },
            alert:""
        }
       
        this.login = this.login.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    login(){
        PostData('auth/login', this.state.loginData).then ( 
             result => {
                  if (result.token) { 
                      localStorage.setItem('token',result.token) 
                      this.props.LogIn()
                      console.log(result) 
                  }else{
                     this.setState({alert : "niepoprawny login lub hasło!"}) 
                     document.getElementById("alert").style.visibility = "visible"
                  }
                 }
        )
        document.getElementById("login").value=""
        document.getElementById("password").value=""
        this.setState({ login:"" , password: "" })
    }

    onChange(event){
        let loginDataCopy = JSON.parse(JSON.stringify(this.state.loginData));
        loginDataCopy[event.target.name] = event.target.value;
        this.setState({ loginData : loginDataCopy });
    }



    render(){
        return(
            <div >
                <div id="LoginContainer">
                    <h3>Logowanie</h3>
                    <input type="text" name="login"  class="formGroupInput" placeholder="Login" id="login" onChange={this.onChange}/>
                    <input type="password" name="password"  class="formGroupInput" placeholder="Hasło" id = "password" onChange={this.onChange} />
                    <button type="submit" id="LoginButton" class="btn btn-primary btn-lg btn-block"  value="Login" onClick= {this.login}>Zaloguj</button>
                    <div id="alert" > 
                    <p> {this.state.alert} </p>
                    </div>
                    <h5 onClick= {() =>{this.props.changePage('register')}} >Stwórz nowe konto</h5>
                            
                </div>
            </div>
        )     
    }
}

export default Login;