import React from 'react';

function ValidPostData(type,userData,logOut){
    let BaseUrl = 'http://localhost:8080/api/'
 

    console.log(JSON.stringify( userData ))

    return new Promise ((resolve,reject) => {
        fetch(BaseUrl+type,{
            mode: 'cors',
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin':'*',
                "Content-Type": "application/json",
                'token': localStorage.getItem("token")
              },
            body: JSON.stringify( userData )
        })
        .then((response) => { 
            const resoult = response.json()
            resoult.then((res) => {
                if(res.err) {
                    if(res.err === 'access Denied' || res.err === 'invalid Token') logOut()
                    else reject(res.err)
                }
                else {
                    resolve (resoult) 
                }
            })
            
        })
        .catch((error) => {
            reject(error)
        })

    })
}

export default ValidPostData;