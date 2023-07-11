import React from 'react'
import axios from 'axios';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';

const NavBar = ({ token }) => {

    function handleLogout(e) {
       let config = {
        method: 'post',
        url: 'api/logout',
        headers: { 
          'Authorization': 'Bearer ' + window.sessionStorage.getItem("auth_token"),
        }
      };
      
      window.sessionStorage.setItem("auth_token", null);

      axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
      
      
    }

  return (
<div>
<nav className ="navbar navbar-expand-lg navbar-light bg-light">
  <div className = "container-fluid">
    <a className = "navbar-brand" 
        href="#">
            DMS
    </a>
    <button className = "navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNavAltMarkup" 
            aria-controls="navbarNavAltMarkup" 
            aria-expanded="false" 
            aria-label="Toggle navigation">
      <span className = "navbar-toggler-icon"></span>
    </button>
    <div className = "collapse navbar-collapse show" 
            id="navbarNavAltMarkup">
      <div className = "navbar-nav">
        <a className = "nav-link active" 
            aria-current="page" 
            href="/documents">
                Dokumenta
        </a>
        <a className = "nav-link" 
            href="/autors">
                Autori
        </a>
        { token == null ? 
        (<a className = "nav-link" href="/login">
                Login
        </a>) : 
        (<a className = "nav-link" href="/" onClick={handleLogout}>
                Logout
        </a>)
        }
        
      </div>
    </div>
  </div>
</nav>
<Outlet/>
</div>


)
}

export default NavBar
