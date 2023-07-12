import logo from "./logo.svg";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import NavBar from "./components/NavBar";
import Documents from "./components/Documents";
import { BrowserRouter, Route, Routes, Router } from "react-router-dom";
import React, { useState } from "react";
import Autors from "./components/Autors";
import AddDocument from "./components/AddDocument";
import axios from "axios";

function App() {
  // const [token, setToken] = useState(
  //   window.sessionStorage.getItem("auth_token")
  // );

  const storedToken = window.sessionStorage.getItem("auth_token");
  const [token, setToken] = useState(storedToken);

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

  return (
    <BrowserRouter className="App">
      <Routes>
        <Route
          path="/"
          element={<NavBar token={token} handleLogout={handleLogout} />}
        >
          <Route path="login" element={<Login addToken={addToken} />} />
          <Route path="register" element={<Register />} />
          <Route
            path="documents"
            element={<Documents token={token} onDelete={deleteDocument} />}
          />
          <Route path="autors" element={<Autors />} />

          <Route path="adddocuments" element={<AddDocument token={token} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
