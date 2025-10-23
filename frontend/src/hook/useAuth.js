import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



export const useAuth = (shouldRedirect) => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("token"));
    console.log(isAuthenticated);

    useEffect(() => {
        if (shouldRedirect && !isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated]);


    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("nombre");
        setIsAuthenticated(false);
        navigate("/");
    }


    return {
        isAuthenticated,
        logout,

    }
}
