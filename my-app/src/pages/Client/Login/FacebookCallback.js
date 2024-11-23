import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { decodeToken } from '../../../services/authenticationService';

const FacebookCallback = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
        console.log('Facebook OAuth2 code received:', code);

        if (code) {
            setLoading(true);
            console.log('abc');
            axios
                .post(
                    'http://localhost:8080/api/auth/oauth2/callback/facebook',
                    { code },
                    { headers: { 'Content-Type': 'application/json' } },
                )
                .then((response) => {
                    const { token, name, email } = response.data;
                    localStorage.setItem('token', token);
                    localStorage.setItem('username', name);
                    localStorage.setItem('email', email);

                    return decodeToken(token); 
                })
                .then((decodedData) => {
                    const role = decodedData.result?.role_name;
                    localStorage.setItem("userId", decodedData.result.user_id)
                    if (role === 'ROLE_CUSTOMER') {
                        navigate('/');
                    } else {
                        throw new Error(`Unhandled role: ${role}`);
                    }
                })
                .catch((error) => {
                    console.error('Error during Facebook callback:', error.message);
                    alert('Login failed. Please try again.');
                    navigate('/login');
                })
                .finally(() => setLoading(false));
        } else {
            console.error('No code found in URL');
            alert('Invalid login attempt. Please try again.');
            navigate('/login');
        }
    }, [location, navigate]);

 
};

export default FacebookCallback;
