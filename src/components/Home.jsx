import React from "react";
import {useAuth} from "./AuthContext"; // Adjust the import path

function Home() {
    const {userRole} = useAuth(); // Access the userRole value from the context

    console.log("User Role in Home:", userRole);


    return (<section>
        <div className="welcome-text">
           Hello, Welcome to Document Management System
        </div>
        <br />
        <div>User role: {userRole}</div>
    </section>);
}

export default Home;
