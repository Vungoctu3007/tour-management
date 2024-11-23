import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    TextField,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    InputAdornment,
    IconButton,
    Snackbar,
    Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { addAccount , getA, getAllRole } from "../../../services/userService";
const AddUser = ({ open, onClose }) => {
    const [roles, setRoles] = useState([]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [roleId, setSelectedRole] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await getAllRole();
                if (Array.isArray(response.result)) {
                    setRoles(response.result);
                }
            } catch (error) {
                console.error("Error fetching roles:", error);
            }
        };

        fetchRoles();
    }, []);

    const validateForm = () => {
        if (!isNaN(username)) {
            setErrorMessage("Username cannot be a number.");
            return false;
        }

        if (!username || !password || !confirmPassword || !email || !roleId) {
            setErrorMessage("All fields are required.");
            return false;
        }

        if (password.length < 6) {
            setErrorMessage("Password must be at least 6 characters long.");
            return false;
        }
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return false;
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setErrorMessage("Invalid email format.");
            return false;
        }
        return true;
    };

    const handleAddUser = async () => {
        setErrorMessage(""); // Clear previous errors before validation
        if (!validateForm()) {
            setSnackbarOpen(true);
            return;
        }

        try {
            const newUser = { username, password, email, roleId};
            await  addAccount(newUser);
            // Clear form fields
            setUsername("");
            setPassword("");
            setConfirmPassword("");
            setEmail("");
            setSelectedRole("");
            onClose();
        } catch (error) {
            console.error("Error adding user:", error);
            setErrorMessage("Error adding user. Please try again.");
            setSnackbarOpen(true);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
        setErrorMessage("");
    };

    return (
        <>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>Add New User</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Username"
                        fullWidth
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        margin="dense"
                        label="Confirm Password"
                        type={showPassword ? "text" : "password"}
                        fullWidth
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Email"
                        type="email"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        select
                        label="Role"
                        fullWidth
                        value={roleId}
                        onChange={(e) => setSelectedRole(e.target.value)}
                        margin="dense"
                    >
                        {roles.map((role) => (
                            <MenuItem key={role.id} value={role.id}>
                                {role.id}-{role.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddUser} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Thay đổi vị trí ở đây
            >
                <Alert onClose={handleSnackbarClose} severity="error">
                    {errorMessage}
                </Alert>
            </Snackbar>

        </>
    );
};

export default AddUser;
