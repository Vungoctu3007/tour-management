import React, { useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    Typography,
    IconButton,
    InputAdornment,
    Divider,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Notification from '../../../components/Notification';
import { decodeToken, loginUser } from '../../../services/authenticationService';
import { FacebookConfig, OAuthConfig } from '../../../config/configuration';
import image from '../../../assets/images/login.png';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // Notification State
    const [notificationOpen, setNotificationOpen] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [notificationType, setNotificationType] = useState('success');

    const validateForm = () => {
        if (!username.trim() || !password.trim()) {
            setNotificationMessage('Username và Password không được để trống');
            setNotificationType('error');
            setNotificationOpen(true);
            return false;
        }
        if (password.length < 6) {
            setNotificationMessage('Password phải có ít nhất 6 ký tự');
            setNotificationType('error');
            setNotificationOpen(true);
            return false;
        }
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) return;

        try {
            const data = await loginUser({ username, password });
            const token = data.token;

            localStorage.setItem('userId', data.userId);
            localStorage.setItem('token', token);
            localStorage.setItem('username', data.userName);

            setNotificationMessage('Đăng nhập thành công!');
            setNotificationType('success');
            setNotificationOpen(true);

            decodeToken(token).then((decoded) => {
                const role = decoded.result?.role_name;
                setTimeout(() => {
                    if (role === 'ROLE_STAFF' || role === 'ROLE_ADMIN') navigate('/admin/dashboard');
                    else navigate('/');
                }, 1000);
            });
        } catch (error) {
            setNotificationMessage(error.message || 'Đăng nhập thất bại!');
            setNotificationType('error');
            setNotificationOpen(true);
        }
    };

    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

    const handleGoogleLogin = () => {
        const { clientId, authUri } = OAuthConfig;
        const targetUrl = `${authUri}?redirect_uri=http://localhost:3000/oauth2/redirect&response_type=code&client_id=${clientId}&scope=openid%20email%20profile`;
        window.location.href = targetUrl;
    };

    const handleFacebookLogin = () => {
        const { appId } = FacebookConfig;
        const redirectUri = 'http://localhost:3000/oauth2/callback/facebook';
        const facebookLoginUrl = `https://www.facebook.com/v12.0/dialog/oauth?client_id=${appId}&redirect_uri=${redirectUri}&response_type=code&scope=public_profile,email`;
        window.location.href = facebookLoginUrl;
    };

    return (
        <>
            {/* Notification Component */}
            <Notification
                open={notificationOpen}
                message={notificationMessage}
                onClose={() => setNotificationOpen(false)}
                type={notificationType}
            />

            <Box
                sx={{
                    width: '100vw',
                    height: '100vh',
                    backgroundImage: `url(${image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundBlendMode: 'overlay',
                    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Hiệu ứng mờ nền
                }}
            >
                <Card
                    sx={{
                        maxWidth: 420,
                        width: '100%',
                        borderRadius: 4,
                        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)', // Tạo bóng mềm mại
                        background: 'linear-gradient(to bottom right, #ffffffcc, #f0f0f0cc)', // Màu gradient mờ
                        padding: 4,
                    }}
                >
                    <CardContent>
                        <Typography
                            variant="h5"
                            align="center"
                            fontWeight="bold"
                            mb={2}
                            color="primary"
                            sx={{ fontFamily: 'Roboto, sans-serif' }}
                        >
                            Welcome to Travel! 👋
                        </Typography>

                        <Box component="form" onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                label="Username"
                                variant="outlined"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                margin="normal"
                                sx={{ borderRadius: 1 }}
                            />
                            <TextField
                                fullWidth
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                variant="outlined"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                margin="normal"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={togglePasswordVisibility}>
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{ borderRadius: 1 }}
                            />
                            <Box display="flex" justifyContent="center" alignItems="center" mt={1} mb={2}>
                                <Typography
                                    variant="body2"
                                    color="primary"
                                    sx={{ cursor: 'pointer' }}
                                    onClick={() => navigate('/forgot-password')}
                                >
                                    Forgot Password?
                                </Typography>
                            </Box>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                sx={{
                                    mb: 2,
                                    fontWeight: 'bold',
                                    borderRadius: 2,
                                    padding: '10px 0',
                                    background: 'linear-gradient(to right, #0066ff, #0033cc)',
                                    '&:hover': {
                                        background: 'linear-gradient(to right, #0052cc, #002b99)',
                                    },
                                }}
                            >
                                Sign In
                            </Button>
                        </Box>

                        <Divider sx={{ mb: 2 }}>OR</Divider>

                        <Box display="flex" justifyContent="space-between" gap={1}>
                            <Button
                                onClick={handleGoogleLogin}
                                fullWidth
                                variant="outlined"
                                sx={{
                                    color: '#DB4437',
                                    borderColor: '#DB4437',
                                    fontWeight: 'bold',
                                    '&:hover': { backgroundColor: '#FEECEB' },
                                    borderRadius: 2,
                                }}
                                startIcon={<FaGoogle />}
                            >
                                Google
                            </Button>
                            <Button
                                onClick={handleFacebookLogin}
                                fullWidth
                                variant="outlined"
                                sx={{
                                    color: '#4267B2',
                                    borderColor: '#4267B2',
                                    fontWeight: 'bold',
                                    '&:hover': { backgroundColor: '#E7F3FF' },
                                    borderRadius: 2,
                                }}
                                startIcon={<FaFacebook />}
                            >
                                Facebook
                            </Button>
                        </Box>

                        <Typography variant="body2" align="center" mt={3} sx={{ color: '#666', fontSize: '14px' }}>
                            New on our platform?{' '}
                            <Typography
                                variant="body2"
                                color="primary"
                                sx={{
                                    cursor: 'pointer',
                                    display: 'inline-block',
                                    textDecoration: 'underline',
                                    fontWeight: 'bold',
                                }}
                                onClick={() => navigate('/register')}
                            >
                                Create an account
                            </Typography>
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </>
    );
};

export default Login;
