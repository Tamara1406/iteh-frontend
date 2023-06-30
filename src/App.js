import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import NavBar from './components/NavBar';
import Documents from './components/Documents';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Autors from './components/Autors';

function App() {
const [token, setToken] = useState();

function addToken( auth_token ){
  setToken(auth_token);
}

  return (
    <BrowserRouter className="App">
      <Routes>
      
        <Route path = "/" element = {<NavBar token = { token } />} >
          <Route path = "login" element = {<Login addToken = { addToken } />} />
          <Route path = "register" element = {<Register/>} />
          <Route path = "documents" element = {<Documents/>} />
          <Route path = "autors" element = {<Autors/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
