import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Private = () => {
    const navegate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            navegate.push('/login'); 
        }
    }, [navegate]);

    return <h1>Esta es una página privada</h1>;
};
