import logo from "./logo.svg";
import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";
import Maps from "./components/Maps";
import Register from "./components/Register";
import NavBar from "./components/NavBar";
import Documents from "./components/Documents";
import { BrowserRouter, Route, Routes, Router } from "react-router-dom";
import React, { useState } from "react";
import Autors from "./components/Autors";
import AddDocument from "./components/AddDocument";
import axios from "axios";
import AddAutor from "./components/addAutor";
import { AuthProvider } from "./components/AuthContext";// Check the file path to AuthContext
import UpdateDocument from "./components/UpdateDocument";

function App() {
  // const [token, setToken] = useState(
  //   window.sessionStorage.getItem("auth_token")
  // );

  const storedToken = window.sessionStorage.getItem("auth_token");
  const [token, setToken] = useState(storedToken);
  const [id, setId] = useState(0);

  function handleLogout() {
    setToken(null);
    window.sessionStorage.removeItem("auth_token");
  }

  function addToken(auth_token) {
    setToken(auth_token);
    window.sessionStorage.setItem("auth_token", auth_token);
  }

  function deleteDocument(id) {
    axios
      .delete("api/documents/" + id, {
        headers: {
          Authorization: `Bearer ${window.sessionStorage.getItem(
            "auth_token"
          )}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        const token = window.sessionStorage.getItem("auth_token");
        window.location.reload();
        window.sessionStorage.set("auth_token", token);
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
          console.log("Error", error.message);
        }
      });
  }
  function deleteAutor(id) {
    axios
      .delete("api/autors/" + id, {
        headers: {
          Authorization: `Bearer ${window.sessionStorage.getItem(
            "auth_token"
          )}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        const token = window.sessionStorage.getItem("auth_token");
        window.location.reload();
        window.sessionStorage.set("auth_token", token);
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
          console.log("Error", error.message);
        }
      });
  }

  function updateDoc(id){
    setId(id);

}

  return (
    <AuthProvider>
    <BrowserRouter className="App">
      
      <NavBar token={token} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Login addToken={addToken} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        {token && (
          <>
            <Route
              path="/documents"
              element={<Documents onDelete={deleteDocument} onUpdate={updateDoc}/>}
            />
            <Route path="/autors" element={<Autors onDelete={deleteAutor} />} />
            <Route path="/adddocuments" element={<AddDocument />} />
            <Route path="/addautors" element={<AddAutor />} />
            <Route path="/updatedocuments" element = {<UpdateDocument  id={id} />}/>
            <Route path="/maps" element = {<Maps/>}/>
          </>
        )}
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
