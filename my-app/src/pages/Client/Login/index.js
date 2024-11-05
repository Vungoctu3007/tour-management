import {
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    TextField,
    Typography,
    Snackbar,
    Alert,
    InputAdornment,
    IconButton,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // State to control password visibility
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState("");
    const [snackBarSeverity, setSnackBarSeverity] = useState("success");
    const [errorMessage, setErrorMessage] = useState('');

    const handleCloseSnackBar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setSnackBarOpen(false);
    };

    const validateForm = () => {
        if (!username.trim()) {
            setErrorMessage('Username không được để trống');
            return false;
        }
        if (!password.trim()) {
            setErrorMessage('Password không được để trống');
            return false;
        }
        if (password.length < 6) {
            setErrorMessage('Password phải có ít nhất 6 ký tự');
            return false;
        }
        return true;
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const roleId = localStorage.getItem('roleId');
            if (roleId === '1' || roleId === '2') {
                navigate("/admin/dashboard");
            } else if (roleId === '3') {
                navigate("/");
            }
        }
    }, [navigate]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const url = "http://localhost:8080/api/login";

        if (!validateForm()) return;

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.code !== 1000) {
                    throw new Error(data.message);
                }
                localStorage.setItem("userId", data.result?.userId)
                localStorage.setItem("token", data.result?.token);
                localStorage.setItem("username", data.result?.userName);
                localStorage.setItem("roleId", data.result?.roleId);

                const roleId = data.result?.roleId;
                setSnackBarMessage("Đăng nhập thành công!");
                setSnackBarSeverity("success");
                setSnackBarOpen(true);
                setTimeout(() => {
                    if (roleId === 1 || roleId === 2) {
                        navigate("/admin/dashboard");
                    } else if (roleId === 3) {
                        navigate("/");
                    }
                }, 3000);
            })
            .catch((error) => {
                setSnackBarMessage(error.message);
                setSnackBarSeverity("error");
                setSnackBarOpen(true);
            });
    };

    const handleGoogleLogin = () => {
        // Logic for Google login integration
    };

    const handleNavigateToRegister = () => {
        navigate("/register"); // Navigate to the registration page
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    return (
        <>
            <Snackbar
                open={snackBarOpen}
                onClose={handleCloseSnackBar}
                autoHideDuration={3000}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert
                    onClose={handleCloseSnackBar}
                    severity={snackBarSeverity}
                    variant="filled"
                    sx={{ width: "100%" }}
                >
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
                            Welcome
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
                                label="Password"
                                type={showPassword ? "text" : "password"}
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={togglePasswordVisibility} edge="end">
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
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
                                Login
                            </Button>
                            <Divider />
                        </Box>

                        <Box display="flex" flexDirection="column" width="100%" gap="25px">
                            <Button
                                type="button"
                                variant="contained"
                                color="secondary"
                                size="large"
                                onClick={handleGoogleLogin}
                                fullWidth
                                sx={{ gap: "10px" }}
                            >
                                <GoogleIcon />
                                Continue with Google
                            </Button>
                            <Button
                                type="button"
                                variant="contained"
                                color="success"
                                size="large"
                                onClick={handleNavigateToRegister} // Navigate to Register page
                            >
                                Create an account
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </>
    );
}
