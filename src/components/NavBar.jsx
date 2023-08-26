import React from "react";
import axios from "axios";
import {Outlet} from "react-router-dom";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";

const NavBar = ({token, handleLogout}) => {
    const navigate = useNavigate();

    function handleLogoutClick(e) {
        e.preventDefault();
        axios.post("api/logout", null, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            console.log(JSON.stringify(response.data));
            handleLogout();
            navigate("/");
        }).catch((error) => {
            console.log(error);
        });

        // setToken(null);
    }
    console.log("token: " + token);
    return ( <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          {token ? (
            <Link className="navbar-brand" to="/home">
              DMS
            </Link>
          ) : (
            <span className="navbar-brand">DMS</span>
          )}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
                <div className="collapse navbar-collapse show" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        {
                        token && (<>
                            <a className="nav-link active" aria-current="page" href="/documents">
                                Dokumenta
                            </a>
                            <a className="nav-link" href="/autors">
                                Autori
                            </a>
                            <a className="nav-link" href="/maps">
                                Kontakt
                            </a>
                            <a className="nav-link" href="/"
                                onClick={handleLogoutClick}>
                                Logout
                            </a>
                            
                            </>
                        // )
                        // : (
                        //   <a className="nav-link" href="/login">
                        //     Login
                        //   </a>
                        )}
                            {/* {
                            token == null ? (
                                <a className="nav-link" href="/login">
                                    Login
                                </a>
                            ) : (
                                <a className="nav-link" href="/"
                                    onClick={handleLogout}>
                                    Logout
                                </a>
                            )
                        } </div> */}
                    </div>
                </div>
                    </div>
                </nav>
                <Outlet/>
            </div>
        );
    };
    
    export default NavBar;
