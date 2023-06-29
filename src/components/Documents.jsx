import React from 'react'
import axios from 'axios';
import OneDocument from './OneDocument';
import { useState, useEffect } from 'react';

const Documents = () => {
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
      {docs == null ? <></> : docs.map((doc) => (
        <OneDocument doc = { doc } key = { doc.id } />
      ))}
    </div>
  )
}

export default Documents
