import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddDocument = () => {
  const [docData, setDocData] = useState({
    id: "",
    naziv: "",
    autor_id: "",
    typedocument_id: "",
    sadrzaj: "",
    sistemupravljanja_id: 1,
    brojStrana: 20,
  });
  const [error, setError] = useState(null);

  let navigate = useNavigate();
  function handleReturn() {
    navigate("/documents");
  }

  function handleInput(e) {
    e.preventDefault();
    let newDocData = docData;
    newDocData[e.target.name] = e.target.value;
    setDocData(newDocData);
    console.log(docData);
  }

  const handleReload = () => {
    window.location.reload();
  };

  function handleDocument(e) {
    e.preventDefault();
    setError(null);
    axios
      .post("api/documents", docData, {
        headers: {
          Authorization: `Bearer ${window.sessionStorage.getItem(
            "auth_token"
          )}`,
        },
      })
      .then((odg) => {
        console.log("odg " + odg.status);
        if (odg.status === 200) {
          toast.success("Dodato!"); // Display success notification
          //navigate("/documents");
        } else {
          toast.error("Greška: Neispravno uneti podaci.");
        }
        // window.location.reload();
        //navigate("/documents");
      })
      .catch((e) => {
        console.log(e);
        //setError("Došlo je do greške prilikom čuvanja dokumenta.");
        toast.error("Greška neispravno uneti podaci ");
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
              <form onSubmit={handleDocument} style={{ marginTop: "50px" }}>
                <div className="form-outline mb-4">
                  <input
                    type="naziv"
                    id="form3Example4"
                    className="form-control form-control-lg"
                    name="naziv"
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
                  <input
                    type="autor_id"
                    id="form3Example3"
                    className="form-control form-control-lg"
                    name="autor_id"
                    onInput={handleInput}
                  />
                  <label
                    className="form-label"
                    style={{ color: "whitesmoke" }}
                    htmlFor="form3Example3"
                  >
                    <b>Autor</b>
                  </label>
                </div>

                <div className="form-outline mb-3">
                  <input
                    type="typedocument_id"
                    id="form3Example4"
                    className="form-control form-control-lg"
                    name="typedocument_id"
                    onInput={handleInput}
                  />
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
              <button
                onClick={handleReturn}
                style={{
                  backgroundColor: "#191970",
                  color: "white",
                  borderRadius: "10px",
                  fontSize: "15px",
                  border: "2px solid black",
                  paddingLeft: "2.5rem",
                  paddingRight: "2.5rem",
                  position: "fixed",
                  bottom: "20px",
                  left: "20px",
                }}
              >
                Return to Documents
              </button>
              <button
                onClick={handleReload}
                style={{
                  backgroundColor: "#191970",
                  color: "white",
                  borderRadius: "10px",
                  fontSize: "15px",
                  border: "2px solid black",
                  paddingLeft: "2.5rem",
                  paddingRight: "2.5rem",
                  position: "fixed",
                  bottom: "20px",
                  right: "20px",
                }}
              >
                Dodaj jos
              </button>
            </div>
          </div>
        </div>
        {error && <div style={{ color: "red" }}>{error}</div>}
      </section>
    </div>
  );
};

export default AddDocument;
