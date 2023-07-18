import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import OneAutor from "./OneAutor";
import { useNavigate } from "react-router-dom";

const Autors = ({ token, onDelete }) => {
  const [autors, setAutors] = useState();
  useEffect(() => {
    if (autors == null) {
      axios.get("api/autors").then((odg) => {
        console.log(odg.data);
        setAutors(odg.data.autors);
      });
    }
  });

  const navigate = useNavigate({ onDelete });

  const sortAutors = () => {
    const sortedAutors = [...autors]; // Create a copy of the autors array
    sortedAutors.sort((a, b) => b.brojDokumenata - a.brojDokumenata); // Sort the array based on brojDokumenata in descending order
    setAutors(sortedAutors); // Update the autors state with the sorted array
  };

  return (
    <div>
     
          <button
            className="text-50 fw-bold"
            style={{
              backgroundColor: "#4682B4",
              color: "white",
              borderRadius: "10px",
              fontSize: "15px",
              marginLeft: "370px",
            }}
            onClick={() => navigate("/addautor")}
          >
            Novi autor
          </button>
        

      <button
        onClick={sortAutors}
        style={{
          backgroundColor: "#4682B4",
          color: "white",
          borderRadius: "10px",
          fontSize: "15px",
          marginLeft: "1300px",
          marginTop: "100px",
        }}
      >
        Sort by brojDokumenata
      </button>
      {autors == null ? (
        <></>
      ) : (
        autors.map((autor) => <OneAutor autor={autor} key={autor.id} onDelete = {onDelete} />)
      )}
    </div>
  );
};

export default Autors;
