import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {
    const [username, setUsername] = useState("lytruong");
    const [password, setPassword] = useState("password123");
    const navigate = useNavigate();
    const handleLogin = async () => {
        try {
            const response = await axios.post("http://localhost:8080/auth/login", {
                username,
                password,
            });

            console.log(response)
            const { token, roleId } = response.data.result;
            localStorage.setItem("token", token);
            if (roleId === 1) {
                navigate("/admin");
            } else if (roleId === 2 || roleId === 3) {
                navigate("/home");
            }
        } catch (error) {
            console.error("Login failed", error);
        }
    };
    return (
        <div >
            <div>
                <label>Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button onClick={()=>handleLogin()}>Login</button>
        </div>
    );
};

export default Login;
