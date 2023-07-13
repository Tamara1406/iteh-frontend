import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import OneAutor from "./OneAutor";

const Autors = () => {
  const [autors, setAutors] = useState();
  useEffect(() => {
    if (autors == null) {
      axios.get("api/autors").then((odg) => {
        console.log(odg.data);
        setAutors(odg.data.autors);
      });
    }
  });

  const sortAutors = () => {
    const sortedAutors = [...autors]; // Create a copy of the autors array
    sortedAutors.sort((a, b) => b.brojDokumenata - a.brojDokumenata); // Sort the array based on brojDokumenata in descending order
    setAutors(sortedAutors); // Update the autors state with the sorted array
  };

  return (
    <div>
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
        autors.map((autor) => <OneAutor autor={autor} key={autor.id} />)
      )}
    </div>
  );
};

export default Autors;
