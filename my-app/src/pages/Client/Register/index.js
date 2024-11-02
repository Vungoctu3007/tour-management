import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    Typography,
    Snackbar,
    Alert,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate to navigate between routes

export default function Register() {
    const navigate = useNavigate(); // Initialize the useNavigate hook
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState("");
    const [snackBarSeverity, setSnackBarSeverity] = useState("success");

    const handleCloseSnackBar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setSnackBarOpen(false);
    };

    const validateForm = () => {
        if (!username.trim()) {
            setSnackBarMessage('Username không được để trống');
            setSnackBarSeverity('error');
            setSnackBarOpen(true);
            return false;
        }
        if (!password.trim()) {
            setSnackBarMessage('Password không được để trống');
            setSnackBarSeverity('error');
            setSnackBarOpen(true);
            return false;
        }
        if (password.length < 6) {
            setSnackBarMessage('Password phải có ít nhất 6 ký tự');
            setSnackBarSeverity('error');
            setSnackBarOpen(true);
            return false;
        }
        return true;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validateForm()) return;

        fetch("http://localhost:8080/api/user/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, email, password }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.code !== 1000) {
                    throw new Error(data.message);
                }
                setSnackBarMessage("Đăng ký thành công! Bạn có thể đăng nhập.");
                setSnackBarSeverity("success");
                setSnackBarOpen(true);
                // Reset form fields
                setUsername("");
                setEmail("");
                setPassword("");
            })
            .catch((error) => {
                setSnackBarMessage(error.message);
                setSnackBarSeverity("error");
                setSnackBarOpen(true);
            });
    };

    return (
        <>
            <Snackbar
                open={snackBarOpen}
                onClose={handleCloseSnackBar}
                autoHideDuration={3000}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert onClose={handleCloseSnackBar} severity={snackBarSeverity} variant="filled" sx={{ width: "100%" }}>
                    {snackBarMessage}
                </Alert>
            </Snackbar>

            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                height="100vh"
                bgcolor={"#f0f2f5"}
            >
                <Card
                    sx={{
                        minWidth: 400,
                        maxWidth: 500,
                        boxShadow: 4,
                        borderRadius: 4,
                        padding: 4,
                    }}
                >
                    <CardContent>
                        <Typography variant="h5" component="h1" gutterBottom>
                            Create Account
                        </Typography>
                        <Box
                            component="form"
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                            justifyContent="center"
                            width="100%"
                            onSubmit={handleSubmit}
                        >
                            <TextField
                                label="Username"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <TextField
                                label="Email"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                label="Password"
                                type="password"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                size="large"
                                fullWidth
                                sx={{
                                    mt: "15px",
                                    mb: "25px",
                                }}
                            >
                                Sign Up
                            </Button>
                        </Box>

                        {/* Link to Login page */}
                        <Typography variant="body2" align="center">
                            Nếu bạn đã có tài khoản . <Button onClick={() => navigate("/login")} color="primary">Đăng Nhập</Button>
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </>
    );
}
