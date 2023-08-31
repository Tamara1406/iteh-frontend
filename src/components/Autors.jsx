import React from "react";
import axios from "axios";
import {useState, useEffect} from "react";
import OneAutor from "./OneAutor";
import {useNavigate} from "react-router-dom";
import {useAuth} from "./AuthContext";

const Autors = ({onDelete}) => {
    const [autors, setAutors] = useState();
    const {userRole} = useAuth();
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        if (autors == null) {
            axios.get("api/autors").then((odg) => {
                console.log(odg.data);
                setAutors(odg.data.autors);
            });
        }
    });

    const navigate = useNavigate({onDelete});

    const sortAutors = () => {
        const sortedAutors = [...autors]; 
        sortedAutors.sort((a, b) => b.brojDokumenata - a.brojDokumenata); 
        setAutors(sortedAutors); 
    };

    return (
        <div> {
            userRole === "admin" && (
                <button className="text-50 fw-bold"
                    style={
                        {
                            backgroundColor: "#4682B4",
                            color: "white",
                            borderRadius: "10px",
                            fontSize: "15px",
                            marginLeft: "370px"
                        }
                    }
                    onClick={
                        () => navigate("/addautors")
                }>
                    Novi autor
                </button>
            )
        }

            <input type="text" placeholder="Pretrazi autore"
                value={searchQuery}
                onChange={
                    (e) => setSearchQuery(e.target.value)
                }
                
            />

            <button onClick={sortAutors}
                style={
                    {
                        backgroundColor: "#4682B4",
                        color: "white",
                        borderRadius: "10px",
                        fontSize: "15px",
                        marginLeft: "1300px",
                        marginTop: "100px"
                    }
            }>
                Sort by brojDokumenata
            </button>
            {
            autors == null ? (
                <></>
            ) : ( autors
                .filter((autor) =>
                    autor.ime.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((autor) => (
                    <OneAutor autor={autor} key={autor.id} onDelete={onDelete} />
                ))
        )} </div>
    );
};

export default Autors;
