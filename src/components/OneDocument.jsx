import React from 'react'
import axios from 'axios';


const OneDocument = ({ doc, onDelete }) => {

  



  return (
<div className="card" style={{marginTop: "70px", marginBottom: "100px", marginRight: "150px", marginLeft: "80px" }}>
  <div className="card-header">
    {doc.typeDocument.title}
  </div>
  <div className="card-body">
    <h5 className="card-title">{doc.naziv}</h5>
    <p className="card-text">{doc.sadrzaj}</p>
    <button className="card-text" onClick={() => {onDelete( doc.id); alert("Dokument je obrisan iz korpe!");}}>Obriši dokument</button>
  </div>
  <div className="card-footer">
    {doc.autor.ime}
  </div>
</div>
  )
}

export default OneDocument
