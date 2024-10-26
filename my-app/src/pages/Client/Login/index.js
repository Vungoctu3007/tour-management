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
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup form

    const handleCloseSnackBar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setSnackBarOpen(false);
    };

    const handleClick = () => {
        alert(
            "Please refer to Oauth2 series for this implementation guidelines. https://www.youtube.com/playlist?list=PL2xsxmVse9IbweCh6QKqZhousfEWabSeq"
        );
    };

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState(""); // Email field for signup form
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        const url = isLogin ? "http://localhost:8080/auth/login" : "http://localhost:8080/auth/signup"; // Change URL for signup

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                isLogin
                    ? { username, password }
                    : { username, email, password } // Add email to the signup form
            ),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.code !== 1000) {
                    throw new Error(data.message);
                }
                if (isLogin) {
                    localStorage.setItem("token", data.result?.token);
                    const roleId = data.result?.roleId;
                    if (roleId === 1) {
                        navigate("/admin");
                    } else if (roleId === 2 || roleId === 3) {
                        navigate("/");
                    }
                } else {
                    // Handle successful signup
                    setIsLogin(true); // After signup, switch back to login
                }
            })
            .catch((error) => {
                setSnackBarMessage(error.message);
                setSnackBarOpen(true);
            });
    };

    return (
        <>
            <Snackbar
                open={snackBarOpen}
                onClose={handleCloseSnackBar}
                autoHideDuration={6000}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert
                    onClose={handleCloseSnackBar}
                    severity="error"
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
                            {isLogin ? "Welcome" : "Create Account"}
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
                            {!isLogin && (
                                <TextField
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            )}
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
                                {isLogin ? "Login" : "Sign Up"}
                            </Button>
                            <Divider></Divider>
                        </Box>

                        <Box display="flex" flexDirection="column" width="100%" gap="25px">
                            <Button
                                type="button"
                                variant="contained"
                                color="secondary"
                                size="large"
                                onClick={handleClick}
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
                                onClick={() => setIsLogin(!isLogin)} // Toggle form on button click
                            >
                                {isLogin ? "Create an account" : "Back to login"}
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </>
    );
}
