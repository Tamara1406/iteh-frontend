import React from 'react'
import axios from 'axios';
import OneDocument from './OneDocument';
import { useState, useEffect } from 'react';


const Documents = ( {token} ) => {
    const [docs, setDocs] = useState();
    useEffect(() =>{
        if(docs == null){
            axios.get("api/documents")
            .then((odg) => {
                console.log(odg.data);
                setDocs(odg.data.documents)
            });
        }
    })

    

  return (
    <div>
      <div style={{marginTop: "30px", marginLeft: "80px"}}>
         
        
        {token == ""  ?   <></> :
        <a href="adddocuments" className="text-50 fw-bold">Novi dokument</a>
        }    
       </div>
      {docs == null ? <></> : docs.map((doc) => (
        <OneDocument doc = { doc } key = { doc.id } />
      ))}
    </div>
  )
}

export default Documents
