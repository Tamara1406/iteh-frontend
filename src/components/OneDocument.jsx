import React from 'react'

const OneDocument = ({ doc }) => {
  return (
<div className="card" style={{marginTop: "70px", marginBottom: "100px", marginRight: "150px", marginLeft: "80px" }}>
  <div className="card-header">
    {doc.typeDocument.title}
  </div>
  <div className="card-body">
    <h5 className="card-title">{doc.naziv}</h5>
    <p className="card-text">{doc.sadrzaj}</p>
    <a href="#" className="btn btn-primary">Go somewhere</a>
  </div>
  <div className="card-footer">
    {doc.autor.ime}
  </div>
</div>
  )
}

export default OneDocument
