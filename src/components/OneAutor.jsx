import React from "react";

const OneAutor = ({ autor }) => {
  return (
    <div
      className="card"
      style={{
        marginTop: "50px",
        marginBottom: "50px",
        marginRight: "900px",
        marginLeft: "70px",
      }}
    >
      <ul className="list-group list-group-flush">
        <li
          className="list-group-item"
          style={{
            backgroundColor: "#4682B4",
            color: "antiquewhite",
            fontWeight: "10px",
          }}
        >
          <b>{autor.ime}</b>
        </li>
        <li className="list-group-item">
          {" "}
          <b> Struka: {autor.struka}</b>
        </li>
        <li className="list-group-item">
          Broj dokumenata: {autor.brojDokumenata}
        </li>
      </ul>
    </div>
  );
};

export default OneAutor;
