import React, {createContext, useContext, useState, useEffect} from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({children}) {
    const storedToken = window.sessionStorage.getItem("auth_token");
    const storedUserRole = window.sessionStorage.getItem("user_role");
    const [token, setToken] = useState(storedToken);
    const [userRole, setUserRole] = useState(storedUserRole);

    useEffect(() => { // Update the userRole whenever storedUserRole changes
        setUserRole(storedUserRole);
    }, [storedUserRole]);


    // function fetchUserRole(userId) {
    // axios
    //     .get(`api/users/${userId}`)
    //     .then((res) => {
    //       setUserRole(res.data.role);
    //     })
    //     .catch((error) => {
    //       console.error("Error fetching user role:", error);
    //     });
    // }

    return (<AuthContext.Provider value={
        {userRole, setUserRole}
    }> {children} </AuthContext.Provider>);
}
