import React from 'react';

function PostData(type,userData){
    let BaseUrl = 'http://localhost:8080/api/'
 

    console.log(JSON.stringify( userData ))

    return new Promise ((resolve,reject) => {
        fetch(BaseUrl+type,{
            mode: 'cors',
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin':'*',
                "Content-Type": "application/json"
              },
            body: JSON.stringify( userData )
        })
        .then((response) => { 
            resolve (response.json())
        })
        .catch((error) => {
            reject(error)
        })

    })
}

export default PostData;
