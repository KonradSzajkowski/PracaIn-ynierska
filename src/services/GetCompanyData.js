import React from 'react';

function GetCompanyData(type,logOut){
    let BaseUrl = 'http://localhost:8080/api/'
 
    return new Promise ((resolve,reject) => {
        fetch(BaseUrl+type,{
            mode: 'cors',
            method: 'Get',
            headers: {
                'Access-Control-Allow-Origin':'*',
                "Content-Type": "application/json",
                'token': localStorage.getItem("token"),
                'companyToken': localStorage.getItem("companyToken")
              },
        })
        .then((response) => { 
            const resoult = response.json()
            resoult.then((res) => {
                if(res.err) {
                    if(res.err === 'access Denied' || res.err === 'invalid Token') logOut()
                }
                else {
                    console.log(resoult)
                    resolve (resoult) 
                }
            })
            
        })
        .catch((err) => {
            console.log("xd")
            reject(err)
        })
    })
}

export default GetCompanyData;