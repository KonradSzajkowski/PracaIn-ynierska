import React from 'react';
import { useEffect ,useState} from 'react';
import './Register.css';
import {Button ,FormControl}from 'react-bootstrap';
import PostData from '../../services/PostData'


class Register extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            register:{
                login:"",
                password:"",
                repeat_password:"",
                name:"",
                surname:""
            },
            alert:""
        }
        this.errorAlert = this.errorAlert.bind(this)
        this.register = this.register.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    errorAlert(str){
        this.setState({alert : "nieznany błąd serwera"}) 
        if(str.includes("is not allowed to be empty"))  this.setState({alert : "uzupełnij wszystkie pola!"}) 
        if(str.includes( "\"repeat_password\"  must be [ref:password]")) this.setState({alert : "oba hasła muszą być takie same!"})
        if(str.includes( "User already exist")) this.setState({alert : "login zajęty!"})  
        if(str.includes( "\"repeat_password\" must be [ref:password]")) this.setState({alert : "oba hasła muszą być takie same!"})
        if(str.includes( "\"login\" length must be at least 3 characters long")) this.setState({alert : "login musi być przynajmniej 3 literowy!"}) 
        if(str.includes( "fails to match the required pattern"))  this.setState({alert : "hasło może zawierać tylko duże i małe litery oraz cyfry i musi mieć między 6 a 16 znaków !"})
        if(str.includes( "length must be less than or equal to 40 characters long")) this.setState({alert : "login , imię i nazwisko mogą posiadać maksymalnie 40 znaków!"})
        if(str.includes( "\"password\" is required")) this.setState({alert : "podaj hasło"})

        document.getElementById("alert").style.visibility = "visible"
    }

    register(){
        PostData('auth/register', this.state.register).then ( 
             result => {
                  if (result.res === "ok") { 
                      this.props.changePage('login');
                      console.log(result) 
                  }
                  else{ 
                    console.log(result.err)
                    this.errorAlert (result.err)
                 }
            },
        )
        document.getElementById("login").value=""
        document.getElementById("password").value=""
        document.getElementById("repeat_password").value=""
        document.getElementById("name").value=""
        document.getElementById("surname").value=""
        this.setState({login:"" , password: "", repeat_password:"", name:"", surname:""})
    }

    onChange(event){
        let registerCopy = JSON.parse(JSON.stringify(this.state.register))
        registerCopy[event.target.name] = event.target.value
        this.setState({register : registerCopy })
    }



    render(){
        return(
            <div >
                <div id="LoginContainer">
                    <h3>Rejestracja</h3>

                    <input type="text" name="login"  class="formGroupInput" placeholder="Login" id="login" onChange={this.onChange}/>
                    <input type="password" name="password"  class="formGroupInput" placeholder="Hasło" id = "password" onChange={this.onChange} />
                    <input type="password" name="repeat_password"  class="formGroupInput" placeholder="Powtórz Hasło" id = "repeat_password" onChange={this.onChange} />
                    <input type="text" name="name"  class="formGroupInput" placeholder="Imię" id="name" onChange={this.onChange}/>
                    <input type="text" name="surname"  class="formGroupInput" placeholder="Nazwisko" id="surname" onChange={this.onChange}/>
                    <div id="alert" > 
                        <p> {this.state.alert}</p>
                    </div>
                    <button type="submit" id="RegisterButton" class="btn btn-primary btn-lg btn-block"  value="Login" onClick= {this.register}>Zarejestruj</button>                        <h5 onClick= {() =>{this.props.changePage('login')}}>Posiadasz już konto ? Zaloguj się </h5>
                    
                </div>
            </div>
        )

        
    }
}

export default Register;