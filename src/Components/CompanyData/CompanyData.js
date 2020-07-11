import React, { useState } from 'react';
import './companyData.css'
import StandardButton from '../Buttons/StandardButton'
import DoubleHeader from '../DoubleHeader/DoubleHeader'
import CompanyDataModal from './CompanyDataModal' 
import ValidPostCompanyData from '../../services/ValidPostCompanyData'


function CompanyData(props){
    const [showModal,setShowModal] = useState(false)

    function closeEditCompanyModal(){
        setShowModal(false)
    }
    function showEditCompanyModal(){
        setShowModal(true)
    }
    function EditCompany(name,post,postName,adres,nip){
        ValidPostCompanyData('companys/EditCompany',{
            name:name,
            post:post,
            postName:postName,
            adres:adres,
            nip:nip},
        props.LogOut).then(
            result=>{
                if(result.res === 'ok'){
                    console.log('ok')
                    props.getCompany()
                    closeEditCompanyModal()
                }
            }
        )
    }


    return(
        <>
            <div id="CompanyData">
                <div id="padd">
                    <DoubleHeader bigger={"Dane firmy"} smaller={"Podstawowe informacje o wybranej firmie"}/>
                    <h4>Nazwa:</h4>
                    <p>{props.companyInfo.name}</p>
                    <div class="clear"></div>
                    <h4>Poczta:</h4>
                    <p>{props.companyInfo.post + " "+props.companyInfo.postName}</p>
                    <div class="clear"></div>
                    <h4>Adres:</h4>
                    <p>{props.companyInfo.adres}</p>
                    <div class="clear"></div>
                    <h4>Nip:</h4>
                    <p>{props.companyInfo.nip}</p>
                    <StandardButton value="Edytuj" onClick={showEditCompanyModal}/>
                </div>
            </div>
            <CompanyDataModal companyInfo={props.companyInfo}  show={showModal} EditCompany={EditCompany} closeEditCompanyModal={closeEditCompanyModal} />
        </>
    )
}

export default CompanyData