import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter className="App">
      <Routes>
        <Route path = "/login" element = {<Login/>} />
        <Route path = "/register" element = {<Register/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
