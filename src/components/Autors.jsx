import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import OneAutor from './OneAutor';

const Autors = () => {

    const [autors, setAutors] = useState();
    useEffect(() =>{
        if(autors == null){
            axios.get("api/autors")
            .then((odg) => {
                console.log(odg.data);
                setAutors(odg.data.autors)
            });
        }
    })

  return (

    <div>
       {autors == null ? <></> : autors.map((autor) => (
        <OneAutor autor = { autor } key = { autor.id } />
      ))}
    </div>
  )
}

export default Autors

