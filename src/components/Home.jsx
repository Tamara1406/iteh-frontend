import React from "react";
import { useAuth } from "./AuthContext"; 
import "../css/Home.css"; 

function Home() {
    const { userRole } = useAuth();

    console.log("User Role in Home:", userRole);

    return (
        <section className="home-container">
            <div className="content-box">
                <div className="welcome-text">
                    Dobrodošli na sajt za upravljanje dokumentima (DMS)
                </div>
                <br/>
                <div className="welcome-text2">Korisnički status {userRole} Vam omogućava pristup raznim funkcionalnostima koje će Vam omogućiti efikasan rad sa velikom količinom dokumenata!</div>
            </div>
        </section>
    );
}

export default Home;
