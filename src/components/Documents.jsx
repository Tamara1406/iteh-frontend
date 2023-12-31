import React from "react";
import axios from "axios";
import OneDocument from "./OneDocument";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useAuth} from "./AuthContext";

const Documents = ({onDelete}) => {
    const navigate = useNavigate();
    const [docs, setDocs] = useState();
    const {userRole} = useAuth();
    const [searchQuery, setSearchQuery] = useState("");
    const [typeSearchQuery, setTypeSearchQuery] = useState("");

    useEffect(() => {
        if (docs == null) {
            axios.get("api/documents").then((odg) => {
                console.log(odg.data);
                setDocs(odg.data.documents);
            });
        }


    });


    return (
        <div>
            <div style={
                {
                    display: "flex",
                    alignItems: "center",
                    marginTop: "30px",
                    marginLeft: "240px"
                }
            }>
                {
                userRole === "admin" && (
                    <button className="text-50 fw-bold"
                        style={
                            {
                                backgroundColor: "#4682B4",
                                color: "white",
                                borderRadius: "10px",
                                fontSize: "15px",
                                marginLeft: "0"
                            }
                        }
                        onClick={
                            () => navigate("/adddocuments")
                    }>
                        Novi dokument
                    </button>
                // <a href="adddocuments" className="text-50 fw-bold">
                // Novi dokument
                // </a>
                )
            }
                {/* {token == "" ? (
          <></>
        ) : (
          <a href="adddocuments" className="text-50 fw-bold">
            Novi dokument
          </a>
        )} */}
                <input type="text" placeholder="Pretrazi dokumente"
                    value={searchQuery}
                    onChange={
                        (e) => setSearchQuery(e.target.value)
                    }
                    style={
                        {marginLeft: "20px"}
                    }/>
                <input type="text" placeholder="Pretrazi po temi"
                    value={typeSearchQuery}
                    onChange={
                        (e) => setTypeSearchQuery(e.target.value)
                    }
                    style={
                        {marginLeft: "20px"}
                    }/>
            </div>
            {
            docs == null ? (
                <></>
            ) : (docs.filter((doc) => doc.naziv.toLowerCase().includes(searchQuery.toLowerCase()) && doc.typeDocument.title.toLowerCase().includes(typeSearchQuery.toLowerCase()) // Filter by document type
            ).map((doc) => (
                <OneDocument doc={doc}
                    key={
                        doc.id
                    }
                    onDelete={onDelete}/>
            )))
        } </div>

    );
};

export default Documents;
