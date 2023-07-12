import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddDocument = () => {

    const[docData, setDocData] = useState({
        id: "",
        naziv: "",
        autor_id : "",
        typedocument_id : "",
        sadrzaj : "",
        sistemupravljanja_id : 1,
        brojStrana : 20,
    });

    let navigate = useNavigate();

    function handleInput(e){
        e.preventDefault();
        let newDocData = docData;
        newDocData[e.target.name] = e.target.value;
        setDocData(newDocData);
        console.log(docData);
    }
     
    function handleDocument(e){
        e.preventDefault(); 
        axios
        .post("api/documents", docData, {headers: { 'Authorization': `Bearer ${ window.sessionStorage.getItem('auth_token')}`}})
        .then((odg) => {
            console.log(odg.data);
            navigate("/documents");
        })
        .catch((e) => {
            console.log(e);
        });
    }

  return (
    <div>
      <section
      className="vh-100"
      style={{
        paddingTop: 4.5 + "rem",
      }}
    >
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form onSubmit={handleDocument}>

            <div className="form-outline mb-4">
                <input
                  type="naziv"
                  id="form3Example4"
                  className="form-control form-control-lg"
                  name="naziv"
                  onInput={handleInput}
                />
                <label className="form-label" htmlFor="form3Example4">
                  Naziv
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
                <label className="form-label" htmlFor="form3Example3">
                  Autor
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
                <label className="form-label" htmlFor="form3Example4">
                  Tip dokumenta
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
                <label className="form-label" htmlFor="form3Example3">
                  Sadržaj
                </label>
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  style={{
                    paddingLeft: 2.5 + "rem",
                    paddingRight: 2.5 + "rem",
                  }}
                >
                  Sačuvaj
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

export default AddDocument
