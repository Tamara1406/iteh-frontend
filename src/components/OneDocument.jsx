import React from "react";
import axios from "axios";
import "../css/OneDocument.css";

const OneDocument = ({ doc, onDelete }) => {
  return (
    <div
      className="card"
      style={{
        width: "1000px",
        height: "250px",
        margin: "100px auto",
      }}
    >
      <div className="card-header">
        <b>{doc.typeDocument.title}</b>
      </div>
      <div className="card-body">
        <h5 className="card-title">{doc.naziv}</h5>
        <p className="card-text">{doc.sadrzaj}</p>
      </div>
      <div className="card-footer">
        <div className="card-footer-text">{doc.autor.ime}</div>
        <button
          style={{
            backgroundColor: "#4682B4",
            color: "white",
            borderRadius: "10px",
            fontSize: "15px",
            position: "absolute",
            bottom: "10px",
            right: "10px",
          }}
          className="card-text"
          onClick={() => {
            onDelete(doc.id);
            alert("Brisanje");
          }}
        >
          Obriši dokument
        </button>
      </div>
    </div>
  );
};

export default OneDocument;
