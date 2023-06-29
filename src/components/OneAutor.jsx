import React from 'react'

const OneAutor = ({ autor }) => {
  return (
<div class="card" style={{marginTop: "50px", marginBottom: "50px", marginRight: "900px", marginLeft: "70px" }}>
  <ul class="list-group list-group-flush">
    <li class="list-group-item" style = {{fontWeight: "bold", fontSize: "20px"}}>{autor.ime}</li>
    <li class="list-group-item">Struka: {autor.struka}</li>
    <li class="list-group-item">Broj dokumenata: {autor.brojDokumenata}</li>
  </ul>
</div>
  )
}

export default OneAutor
