import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
    const handleLogout = () => {
        sessionStorage.removeItem('token'); 
        window.location.href = '/login'; 
    };

    const isAuthenticated = !!sessionStorage.getItem('token'); 

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container">
                <Link to="/">
                    <span className="navbar-brand mb-0 h1">React Boilerplate</span>
                </Link>
                <div className="ml-auto">
                    {isAuthenticated ? (
                        <button className="btn btn-danger" onClick={handleLogout}>
                            Cerrar Sesión
                        </button>
                    ) : (
                        <>
                            <Link to="/signup">
                                <button className="btn btn-primary">Registrar</button>
                            </Link>
                            <Link to="/login">
                                <button className="btn btn-primary">Iniciar Sesión</button>
                            </Link>
                        </>
                    )}
                    <Link to="/demo">
                        <button className="btn btn-secondary">Check the Context in action</button>
                    </Link>
                </div>
            </div>
        </nav>
    );
};
