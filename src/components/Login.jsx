import React from "react";
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Import useAuth from AuthContext



const Login = ({addToken}) => {
        const [userData, setUserData] = useState({email: "", lozinka: ""});
        const { setUserRole } = useAuth();

        let navigate = useNavigate();

        function handleInput(e) {
            let newUserData = userData;
            newUserData[e.target.name] = e.target.value;
            setUserData(newUserData);
            console.log(userData);
        }

        function handleLogin(e) {
            e.preventDefault();
            
            axios.post("api/login", userData).then((odg) => {
                console.log("a"+odg.data);
                if (odg.data.success === true) {
                    window.sessionStorage.setItem("auth_token", odg.data.access_token);
                    window.sessionStorage.setItem("user_role", odg.data.role);
                    //setUserRole(odg.data.role);

                    addToken(odg.data.access_token);
                    navigate("/home");
                }
            }).catch((e) => {
                console.log(e);
            });
        }

        return (<section className="vh-100"
            style={
                {backgroundColor: "#508bfc"}
        }>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card shadow-2-strong"
                            style={
                                {borderRadius: "1rem"}
                        }>
                            <div className="card-body p-5 text-center">
                                <form onSubmit={handleLogin}>
                                    <h3 className="mb-5">Prijava</h3>

                                    <div className="form-outline mb-4">
                                        <input type="email" id="typeEmailX-2" className="form-control form-control-lg" name="email"
                                            onInput={handleInput}/>
                                        <label className="form-label" htmlFor="typeEmailX-2">
                                            Email
                                        </label>
                                    </div>

                                    <div className="form-outline mb-4">
                                        <input type="password" id="typePasswordX-2" className="form-control form-control-lg" name="password"
                                            onInput={handleInput}/>
                                        <label className="form-label" htmlFor="typePasswordX-2">
                                            Lozinka
                                        </label>
                                    </div>

                                    <button className="btn btn-primary btn-lg btn-block" type="submit">
                                        Prijavi se
                                    </button>

                                    <div style={
                                        {marginTop: "30px"}
                                    }>
                                        <Link to="/register" className="text-50 fw-bold">
                                            Registruj se
                                        </Link>
                                    
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    );
};

export default Login;
