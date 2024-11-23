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
    Snackbar,
    Alert,
} from "@mui/material";
import { getAllRole, updateUser } from "../../../services/userService";
const UpdateUser = ({ open, onClose, user, onUserUpdated }) => {
    const [roles, setRoles] = useState([]);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [roleId, setRoleId] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    // Fetch roles when component mounts
    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const rolesData = await getAllRole();
                setRoles(rolesData.result)
            } catch (error) {
                console.error("Error fetching roles:", error);
            }
        };

        fetchRoles();
    }, []);

    // Set initial values from the user prop when it changes
    useEffect(() => {
        if (user) {
           console.log("User role:", user.role);  
            setUsername(user.username || ""); 
            setEmail(user.email || "");
            setRoleId(user.role || "");
        }
    }, [user]);

 

    const validateForm = () => {
        if (!username || !email || !roleId) {
            setErrorMessage("All fields are required.");
            return false;
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setErrorMessage("Invalid email format.");
            return false;
        }
        return true;
    };

    const handleUpdateUser = async () => {
        setErrorMessage(""); // Clear previous errors before validation
        if (!validateForm()) {
            setSnackbarOpen(true);
            return;
        }

        try {
            const updatedUser = { id: user.id, username, email, roleId };
            await updateUser(user.id , updatedUser)
            onUserUpdated(updatedUser); // Notify parent component about update
            onClose();
        } catch (error) {
            console.error("Error updating user:", error);
            setErrorMessage("Error updating user. Please try again.");
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
                <DialogTitle>Update User</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Username"
                        fullWidth
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                        onChange={(e) => setRoleId(e.target.value)}
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
                    <Button onClick={handleUpdateUser} color="primary">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert onClose={handleSnackbarClose} severity="error">
                    {errorMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default UpdateUser;
