import React from "react";
import {useState, useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

const UpdateDocument = ({id}) => {
    const [docData, setDocData] = useState({
        id: id,
        naziv: "",
        autor_id: "",
        typedocument_id: "",
        sadrzaj: "",
        sistemupravljanja_id: 1,
        brojStrana: 20
    });
    const [error, setError] = useState(null);
    // console.log(autorData[0]);
    const autors = useAutors();
    const types = useTypeDoc();
    console.log(types);

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
                  console.log(res.data);
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
      

    function handleReturn() {
        navigate("/documents");
    }

    // Handle dropdown change event
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

    function handleInput(e) {
        e.preventDefault();
        console.log(docData)
        let newDocData = docData;
        newDocData[e.target.name] = e.target.value;
        setDocData(newDocData);
        console.log(newDocData);
    }

    const handleReload = () => {
        window.location.reload();
    };

    function handleDocument(e) {
        e.preventDefault();
        console.log(docData);
        if (!docData.naziv || !docData.autor_id || !docData.typedocument_id || !docData.sadrzaj) {
            toast.error("Molimo popunite sva polja za unos!");
            return;
        }
        setError(null);
        axios.put("api/documents" + id, docData, {
            headers: {
                Authorization: `Bearer ${
                    window.sessionStorage.getItem("auth_token")
                }`
            }
        }).then((odg) => {
            console.log("odg " + odg.status);
            if (odg.status === 200) {
                toast.success("Sacuvano!");
                // Display success notification
                // navigate("/documents");
            } else {
                toast.error("Greška: Neispravno uneti podaci.");
            }
            // window.location.reload();
            // navigate("/documents");
        }).catch((e) => {
            console.log(e);
            // setError("Došlo je do greške prilikom čuvanja dokumenta.");
            toast.error("Greška neispravno uneti podaci ");
        });
    }

    return (
        <div>
            <ToastContainer/>
            <section className="vh-100"
                style={
                    {
                        paddingTop: 4.5 + "rem"
                    }
            }>
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <form onSubmit={handleDocument}
                                style={
                                    {marginTop: "50px"}
                            }>
                                <div className="form-outline mb-4">
                                    <input type="naziv" id="form3Example4" className="form-control form-control-lg" name="naziv"
                                    defaultValue={docData.naziv}
                                        onInput={handleInput}/>
                                    <label className="form-label"
                                        style={
                                            {color: "whitesmoke"}
                                        }
                                        htmlFor="form3Example4">
                                        <b>
                                            Naziv
                                        </b>
                                    </label>
                                </div>

                                <div className="form-outline mb-4">
                                    <select className="form-control form-control-lg" name="autor_id"
                                        value={
                                            docData.autor_id
                                        }
                                        onChange={handleAutorChange}
                                        // Handle autor dropdown change
                                    >
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
                                    <label className="form-label"
                                        style={
                                            {color: "whitesmoke"}
                                    }>
                                        <b>Autor</b>
                                    </label>
                                </div>

                                <div className="form-outline mb-3">
                                <select className="form-control form-control-lg" name="typedocument_id"
                                        value={
                                            docData.typedocument_id
                                        }
                                        onChange={handleTypeDocChange}
                                        // Handle autor dropdown change
                                    >
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
                                    <label className="form-label"
                                        style={
                                            {color: "whitesmoke"}
                                    }>
                                        <b>Type of document</b>
                                    </label>
                                </div>

                                <div className="form-outline mb-4">
                                    <input type="sadrzaj" id="form3Example3" className="form-control form-control-lg" name="sadrzaj"
                                        defaultValue={docData.sadrzaj}
                                        onInput={handleInput}/>
                                    <label className="form-label"
                                        style={
                                            {color: "whitesmoke"}
                                        }
                                        htmlFor="form3Example3">
                                        <b>
                                        Sadrzaj</b>
                                    </label>
                                </div>

                                <div className="text-center text-lg-start mt-4 pt-2">
                                    <button type="submit" className="btn btn-primary btn-lg"
                                        style={
                                            {
                                                backgroundColor: "#4682B4",
                                                color: "white",
                                                borderRadius: "10px",
                                                fontSize: "15px",
                                                border: "2px solid black",
                                                paddingLeft: "2.5rem",
                                                paddingRight: "2.5rem"
                                            }
                                    }>
                                        <b>Sačuvaj</b>
                                    </button>
                                </div>
                            </form>
                            <button onClick={handleReturn}
                                style={
                                    {
                                        backgroundColor: "#191970",
                                        color: "white",
                                        borderRadius: "10px",
                                        fontSize: "15px",
                                        border: "2px solid black",
                                        paddingLeft: "2.5rem",
                                        paddingRight: "2.5rem",
                                        position: "fixed",
                                        bottom: "20px",
                                        left: "20px"
                                    }
                            }>
                                Povratak
                            </button>
                            <button onClick={handleReload}
                                style={
                                    {
                                        backgroundColor: "#191970",
                                        color: "white",
                                        borderRadius: "10px",
                                        fontSize: "15px",
                                        border: "2px solid black",
                                        paddingLeft: "2.5rem",
                                        paddingRight: "2.5rem",
                                        position: "fixed",
                                        bottom: "20px",
                                        right: "20px"
                                    }
                            }>
                                Dodaj jos
                            </button>
                        </div>
                    </div>
                </div>
                {
                error && <div style={
                    {color: "red"}
                }>
                    {error}</div>
            } </section>
            <ToastContainer />
        </div>
    );
};

export default UpdateDocument;




