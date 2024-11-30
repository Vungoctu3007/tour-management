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
import image from '../../../assets/images/login.png'; // Đường dẫn ảnh nền
import Notification from '../../../components/Notification'; // Component thông báo

export default function Register() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // State cho thông báo
    const [notificationOpen, setNotificationOpen] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [notificationType, setNotificationType] = useState('success'); // 'success' hoặc 'error'

    const handleCloseNotification = () => setNotificationOpen(false);

    const validateForm = () => {
        if (!username.trim()) {
            setNotificationMessage('Username không được để trống');
            setNotificationType('error');
            setNotificationOpen(true);
            return false;
        }

        // Kiểm tra định dạng email
        const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        if (!email.trim()) {
            setNotificationMessage('Email không được để trống');
            setNotificationType('error');
            setNotificationOpen(true);
            return false;
        } else if (!emailRegex.test(email)) {
            setNotificationMessage('Email không đúng định dạng');
            setNotificationType('error');
            setNotificationOpen(true);
            return false;
        }

        if (!password.trim()) {
            setNotificationMessage('Password không được để trống');
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
        if (password !== confirmPassword) {
            setNotificationMessage('Mật khẩu xác nhận không khớp');
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
            const data = await registerUser({ username, email, password });

            // Kiểm tra mã thành công
            if (data.code === 1000) {
                // Đăng ký thành công
                setNotificationMessage('Đăng ký thành công! Vui lòng kiểm tra gmail để xác thực.');
                setNotificationType('success');
                setNotificationOpen(true);

                // Reset form và chuyển hướng sau 500ms
                setTimeout(() => navigate('/login'), 2000);
                setUsername('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
            } else {
                // Hiển thị thông báo lỗi từ server
                setNotificationMessage(data.message || 'Đã xảy ra lỗi!');
                setNotificationType('error');
                setNotificationOpen(true);
            }
        } catch (error) {
            // Hiển thị thông báo lỗi từ server trong trường hợp ném ngoại lệ
            const errorMessage = error.message || 'Đã xảy ra lỗi!';
            setNotificationMessage(errorMessage);
            setNotificationType('error');
            setNotificationOpen(true);
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
            {/* Component Notification */}
            <Notification
                open={notificationOpen}
                message={notificationMessage}
                onClose={handleCloseNotification}
                type={notificationType}
            />

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
