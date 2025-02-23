import React from "react";
import { useAuth } from "../../context/authContext";


const HomeUser = () => {
    const { user, isAuthenticated} = useAuth();
    return ( 
        
        <div className="layer">
            <h1>Productos disponibles</h1>
            <div>
                {isAuthenticated ? (
                    <p>Bienvenido, {user.username} {user.id}, {user.email}</p>
                ) : (
                    <p>Por favor, inicia sesión</p>
                )}
            </div>
        </div>

    );
};

export default HomeUser;
