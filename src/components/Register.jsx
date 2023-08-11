import React from "react";
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Link} from "react-router-dom";

function Register() {
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: "",
        firstname: "",
        lastname: "",
        role: "standard"

    });
    const [error, setError] = useState(null);

    let navigate = useNavigate();

    function handleInput(e) {
        e.preventDefault();
        let newUserData = userData;
        newUserData[e.target.name] = e.target.value;
        setUserData(newUserData);
        console.log(userData);
    }

    function handleRegister(e) {
        e.preventDefault();
        setError(null);
        axios.post("api/register", userData).then((odg) => {
            console.log(odg.data);
            // console.log("odg"+ odg.status);
            console.log(typeof userData.email);

            if (userData.email && userData.username && userData.password) {
                toast.success("Dodato!");
                // Display success notification
                // navigate("/documents");
                setTimeout(() => {
                    navigate("/");
                }, 3000);

            } else {
                toast.error("Greška: Neispravno uneti podaci.");
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }

        }).catch((e) => {
            console.log(e);
            console.log(e.message);
        });
    }

    return (
        <section className="vh-100"
            style={
                {
                    paddingTop: 4.5 + "rem"
                }
        }>
            <div className="container-fluid h-custom">
                <ToastContainer/>
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <form onSubmit={handleRegister}>
                            <div className="form-outline mb-4">
                                <input type="firstname" id="form3Example3" className="form-control form-control-lg" placeholder="Unesite ime" name="firstname"
                                    onInput={handleInput}/>
                                <label className="form-label" htmlFor="form3Example3">
                                    Ime
                                </label>
                            </div>

                            <div className="form-outline mb-4">
                                <input type="lastname" id="form3Example3" className="form-control form-control-lg" placeholder="Unesite prezime" name="lastname"
                                    onInput={handleInput}/>
                                <label className="form-label" htmlFor="form3Example3">
                                    Prezime
                                </label>
                            </div>

                            <div className="form-outline mb-4">
                                <input type="username" id="form3Example4" className="form-control form-control-lg" placeholder="Unesite korisničko ime" name="username"
                                    onInput={handleInput}/>
                                <label className="form-label" htmlFor="form3Example4">
                                    Korisničko ime
                                </label>
                            </div>

                            <div className="form-outline mb-4">
                                <input type="email" id="form3Example3" className="form-control form-control-lg" placeholder="Unesite email adresu" name="email"
                                    onInput={handleInput}/>
                                <label className="form-label" htmlFor="form3Example3">
                                    Email adresa
                                </label>
                            </div>

                            <div className="form-outline mb-3">
                                <input type="password" id="form3Example4" className="form-control form-control-lg" placeholder="Unesite lozinku" name="password"
                                    onInput={handleInput}/>
                                <label className="form-label" htmlFor="form3Example4">
                                    password
                                </label>
                            </div>

                            <div className="text-center text-lg-start mt-4 pt-2">
                                <button type="submit" className="btn btn-primary btn-lg"
                                    style={
                                        {
                                            paddingLeft: 2.5 + "rem",
                                            paddingRight: 2.5 + "rem"
                                        }
                                }>
                                    Registruj se
                                </button>
                                <div className="position-absolute bottom-0 start-0 mb-3 ms-3"
                                    style={
                                        {zIndex: 999}
                                }>
                                    <Link to="/" className="btn btn-link"
                                        style={
                                            {
                                                fontSize: "18px",
                                                color: "#002f6c"
                                            }
                                    }>
                                        Nazad
                                    </Link>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Register;
