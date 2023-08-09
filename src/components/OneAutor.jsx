import React from "react";
import {useAuth} from "./AuthContext";

const OneAutor = ({autor, onDelete}) => {
    const {userRole} = useAuth();
    return (<div className="card"
        style={
            {
                marginTop: "50px",
                marginBottom: "50px",
                marginRight: "900px",
                marginLeft: "70px"
            }
    }>
        <ul className="list-group list-group-flush">
            <li className="list-group-item"
                style={
                    {
                        backgroundColor: "#4682B4",
                        color: "antiquewhite",
                        fontWeight: "10px"
                    }
            }>
                <b> {
                    autor.ime
                }</b>
            </li>
            <li className="list-group-item"> {" "}
                <b>
                    Struka: {
                    autor.struka
                }</b>
            </li>
            <li className="list-group-item">
                Broj dokumenata: {
                autor.brojDokumenata
            } </li>
        </ul>
        <div className="card-footer">
            <div className="card-footer-text"> {
                autor.ime
            }</div>
            {
            userRole === "admin" && (<>
                <button style={
                        {
                            backgroundColor: "#4682B4",
                            color: "white",
                            borderRadius: "10px",
                            fontSize: "15px",
                            position: "absolute",
                            bottom: "10px",
                            right: "10px"
                        }
                    }
                    className="card-text"
                    onClick={
                        () => {
                            onDelete(autor.id);
                            alert("Brisanje");
                        }
                }>
                    Obriši autora
                </button>
            </>)
        } </div>
    </div>);
};

export default OneAutor;
