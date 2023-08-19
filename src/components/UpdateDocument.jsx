import React, {useEffect} from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useState} from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  const useAutors = () => {
    const [autors, setAutors] = useState([]);

    useEffect(() => {
        if (autors.length === 0) { // Check if autors array is empty
            axios.get("api/autors").then((odg) => {
                const extractedAutors = odg.data.autors; // Extract the array
                setAutors(extractedAutors);
            });
        }
    }, [autors]);
    // console.log(autors);
    return autors;
};


const useTypeDoc = () => {
    const [types, setTypes] = useState([]);

    useEffect(() => {
        if (types.length === 0) { // Check if autors array is empty
            axios.get("api/typedocuments").then((odg) => {
                const extractedTypes = odg.data.typedocuments; // Extract the array
                setTypes(extractedTypes);
            });
        }
    }, [types]);
    // console.log(autors);
    return types;
};

const UpdateDocument = ({ id }) => {

    const [docData,setDocData]=useState({
        
        naziv: "",
        autor_id: "",
        typedocument_id: "",
        sadrzaj: "",
        sistemupravljanja_id: 1,
        brojStrana: 20,
        id: id,
    });
    const [error, setError] = useState(null);
    const autors = useAutors();
    const types = useTypeDoc();
    console.log(id); 

    const handleAutorChange = (event) => {
      const selectedAutorId = event.target.value;
      setDocData((prevDocData) => ({
          ...prevDocData,
          autor_id: selectedAutorId // Update the selected author ID in docData
      }));
  };

  const handleTypeDocChange = (event) => {
      const selectedTypeId = event.target.value;
      setDocData((prevDocData) => ({
          ...prevDocData,
          typedocument_id: selectedTypeId // Update the selected author ID in docData
      }));
  };


    function handleInput(e){  
      e.preventDefault();
        let newDocData = docData;  
        
        newDocData[e.target.name]=e.target.value;
        
        setDocData(newDocData);
        console.log(docData);
       
    }
    let navigate = useNavigate();

    useEffect(() => {
        const getRandomLists2 = async () => {
          try {
            const res = await axios.get( "api/documents/"+id,
              {
                headers: {
                  token:
                    "Bearer " +
                    ( window.sessionStorage.getItem("auth_token")),
                },
              }
            );
            setDocData(res.data);
          } catch (error) {
            if (error.response) {
                // Request made and server responded
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
          }
        };
        getRandomLists2();
      }, [axiosInstance]);

      
      function updateDocument(e){
        e.preventDefault();   
        axios
            .put("api/documents/"+id, docData,{headers:{'Authorization': `Bearer ${ window.sessionStorage.getItem('auth_token')}`} } )
            .then((res)=>{  
                console.log(res.data);
                 alert("USPESNO")
                 navigate("/documents");
            })
            .catch(function (error) {
                if (error.response) {
                  // Request made and server responded
                  console.log(error.response.data);
                  
                  console.log(error.response.status);
                  console.log(error.response.headers);
                } else if (error.request) {
                  // The request was made but no response was received
                  console.log(error.request);
                } else {
                  // Something happened in setting up the request that triggered an Error
                  console.log('Error', error.message);
                }
            
              });
    }

  return (
    <div>
      <ToastContainer />
      <section
        className="vh-100"
        style={{
          paddingTop: 4.5 + "rem",
        }}
      >
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form onSubmit={updateDocument} style={{ marginTop: "50px" }}>
                <div className="form-outline mb-4">
                  <input
                    type="naziv"
                    id="form3Example4"
                    className="form-control form-control-lg"
                    name="naziv"
                    defaultValue={docData.naziv}
                    onInput={handleInput}
                  />
                  <label
                    className="form-label"
                    style={{ color: "whitesmoke" }}
                    htmlFor="form3Example4"
                  >
                    <b> Naziv </b>
                  </label>
                </div>

                <div className="form-outline mb-4">
                <select className="form-control form-control-lg" name="autor_id"
                                        defaultValue={
                                            docData.autor_id
                                        }
                                        onChange={handleAutorChange}
                                        // Handle autor dropdown change
                                    >
                                        {/* <option value="">{docData.autor.ime}</option> */}
                                        {
                                        autors.map((author) => (
                                            <option key={
                                                    author.id
                                                }
                                                value={
                                                    author.id
                                            }>
                                                {
                                                author.ime
                                            } </option>
                                        ))
                                    } </select>
                  <label
                    className="form-label"
                    style={{ color: "whitesmoke" }}
                    htmlFor="form3Example3"
                  >
                    <b>Autor</b>
                  </label>
                </div>

                <div className="form-outline mb-3">
                <select className="form-control form-control-lg" name="typedocument_id"
                                        defaultValue={
                                            docData.typedocument_id
                                        }
                                        onChange={handleTypeDocChange}
                                        // Handle autor dropdown change
                                    >
                                        {/* <option value="">{docData.typeDocument.title}</option> */}
                                        {
                                        types.map((type) => (
                                            <option key={
                                                    type.id
                                                }
                                                value={
                                                    type.id
                                            }>
                                                {
                                                type.naziv
                                            } </option>
                                        ))
                                    } </select>
                  <label
                    className="form-label"
                    style={{ color: "whitesmoke" }}
                    htmlFor="form3Example4"
                  >
                    <b>Tip dokumenta</b>
                  </label>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="sadrzaj"
                    id="form3Example3"
                    className="form-control form-control-lg"
                    name="sadrzaj"
                    defaultValue={docData.sadrzaj}
                    onInput={handleInput}
                  />
                  <label
                    className="form-label"
                    style={{ color: "whitesmoke" }}
                    htmlFor="form3Example3"
                  >
                    <b> Sadržaj</b>
                  </label>
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    style={{
                      backgroundColor: "#4682B4",
                      color: "white",
                      borderRadius: "10px",
                      fontSize: "15px",
                      border: "2px solid black",
                      paddingLeft: "2.5rem",
                      paddingRight: "2.5rem",

                    }}
                  >
                    <b>Sačuvaj</b>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default UpdateDocument