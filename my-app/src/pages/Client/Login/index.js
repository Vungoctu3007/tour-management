import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // Thêm state để lưu thông báo lỗi
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(""); // Reset lỗi trước khi gửi yêu cầu

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
            if (error.response) {
                // Lỗi do server trả về
                setError("Login failed: " + error.response.data.message);
            } else if (error.request) {
                // Lỗi do không nhận được phản hồi từ server
                setError("Login failed: No response from server");
            } else {
                // Lỗi khác
                setError("Login failed: " + error.message);
            }
            console.error("Login failed", error);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            {error && <div style={{ color: 'red' }}>{error}</div>} {/* Hiển thị thông báo lỗi */}
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
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
