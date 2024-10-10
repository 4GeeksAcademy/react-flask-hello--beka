import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage(''); // Reinicia el mensaje de error

        try {
            const response = await fetch('https://fictional-space-lamp-7vv6qv7g64w5cprg7-3001.app.github.dev/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error al crear el usuario:', errorData); // Muestra más información en la consola
                setErrorMessage(errorData.message || 'Error al registrarse.');
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Error al registrarse.'); // Muestra un mensaje de error si lo hay
            }
        } catch (error) {
            setErrorMessage('Error en la conexión. Intenta nuevamente.'); // Muestra error de conexión
        }
    };

    return (
        <div className="container">
            <h2>Registro</h2>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>} {/* Mensaje de error */}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Correo Electrónico</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Registrar</button>
            </form>
        </div>
    );
};
