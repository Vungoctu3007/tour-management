import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Typography, Button } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import {getUserById , verifyEmailToken} from "../../../services/userService";

const VerifyEmail = () => {
    const [searchParams] = useSearchParams(); // Lấy userId từ URL
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const userId = searchParams.get("userId"); // Lấy userId từ URL
        console.log(userId)
        if (!userId) {
            setMessage("Invalid or missing user ID.");
            setLoading(false);
            return;
        }

        getUserById(userId)
            .then((user) => {
                const token = user.result.token; // Lấy token từ user
                console.log(token)

                if (!token) {
                    throw new Error("Verification token is missing.");
                }

                return verifyEmailToken(token);
            })
            .then((response) => {
                console.log("response " ,response)

            })
            .then(() => {
                setMessage("Email verification successful! Your account is now active.");
                setSuccess(true);
            })
            .finally(() => setLoading(false));
    }, [searchParams]);

    const handleNavigate = () => {
        navigate(success ? "/login" : "/");
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100vh"
            bgcolor="#f0f2f5"
        >
            {loading ? (
                <Box textAlign="center">
                    <CircularProgress />
                    <Typography variant="h6" mt={2}>
                        Verifying your email, please wait...
                    </Typography>
                </Box>
            ) : (
                <Box
                    p={4}
                    bgcolor="white"
                    boxShadow={3}
                    borderRadius={4}
                    textAlign="center"
                    maxWidth={400}
                >
                    <Typography
                        variant="h5"
                        color={success ? "success.main" : "error.main"}
                        gutterBottom
                    >
                        {success ? "Verification Successful" : "Verification Failed"}
                    </Typography>
                    <Typography variant="body1" mb={3}>
                        {message}
                    </Typography>
                    <Button
                        variant="contained"
                        color={success ? "success" : "error"}
                        onClick={handleNavigate}
                    >
                        {success ? "Go to Login" : "Go to Home"}
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default VerifyEmail;
