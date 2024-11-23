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
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../../services/userService';
import image from '../../../assets/images/login.png'; // Thay đường dẫn bằng ảnh bạn muốn

export default function Register() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState('');
    const [snackBarSeverity, setSnackBarSeverity] = useState('success');

    const handleCloseSnackBar = () => setSnackBarOpen(false);

    const validateForm = () => {
        if (!username.trim()) {
            setSnackBarMessage('Username không được để trống');
            setSnackBarSeverity('error');
            setSnackBarOpen(true);
            return false;
        }
        if (!email.trim()) {
            setSnackBarMessage('Email không được để trống');
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
        if (password !== confirmPassword) {
            setSnackBarMessage('Mật khẩu xác nhận không khớp');
            setSnackBarSeverity('error');
            setSnackBarOpen(true);
            return false;
        }
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) return;

        try {
            const data = await registerUser({ username, email, password });

            if (data.code !== 1000) {
                throw new Error(data.message);
            }

            setSnackBarMessage('Đăng ký thành công! Bạn có thể đăng nhập.');
            setSnackBarSeverity('success');
            setSnackBarOpen(true);

            setTimeout(() => navigate('/login'), 500);

            setUsername('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        } catch (error) {
            setSnackBarMessage(error.message || 'Đã xảy ra lỗi!');
            setSnackBarSeverity('error');
            setSnackBarOpen(true);
        }
    };

    return (
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
                        Create Account
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit}>
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
                            type={showPassword ? 'text' : 'password'}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            label="Confirm Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="large"
                            fullWidth
                            sx={{
                                mt: '15px',
                                mb: '25px',
                                fontWeight: 'bold',
                                borderRadius: 2,
                                padding: '10px 0',
                                background: 'linear-gradient(to right, #0066ff, #0033cc)',
                                '&:hover': {
                                    background: 'linear-gradient(to right, #0052cc, #002b99)',
                                },
                            }}
                        >
                            Sign Up
                        </Button>
                    </Box>

                    <Typography variant="body2" align="center" sx={{ color: '#666', fontSize: '14px' }}>
                        Nếu bạn đã có tài khoản.{' '}
                        <Typography
                            variant="body2"
                            color="primary"
                            sx={{
                                cursor: 'pointer',
                                display: 'inline-block',
                                textDecoration: 'underline',
                                fontWeight: 'bold',
                            }}
                            onClick={() => navigate('/login')}
                        >
                            Đăng Nhập
                        </Typography>
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
}
