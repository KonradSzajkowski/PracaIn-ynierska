import React from 'react';
import './company.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes , faCheck  } from '@fortawesome/free-solid-svg-icons'
import FalseTrueSign from '../FalseTrueSign/FalseTrueSign'
import StandardButton from '../Buttons/StandardButton'
import ValidPostData from '../../services/ValidPostData';


function Company(props){
    function loginCompany(){
        console.log('xd')
        ValidPostData('companys/LoginCompany',{id:props.id},props.LogOut).then(
            result=>{
                console.log(result)
                if(result.res){
                    
                    localStorage.setItem('companyToken',result.res)
                    props.companyLogIn()
                }
                else{
                    console.log(result.err)
                }
            }
        )
    }

    return (
        <div class="Company">
            <h4> {props.companyName} </h4>
            <div class="clear" ></div>
            <h6>Adres:</h6>  <p>{props.post+" "+props.postName}  <br></br> {props.adres}</p>
            <div class="clear" ></div>
            <h6>NIP:</h6> <p>{props.nip}</p>
            <div class="clear" ></div>
            <h6>KPIR:</h6> <FalseTrueSign value={props.kpir} />
            <StandardButton value="Załaduj" onClick={()=> {loginCompany()}}/>
        </div>
    )
}

export default Company;