import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    Typography,
    Checkbox,
    FormControlLabel,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
} from '@mui/material';
import Notification from '../../../components/Notification';
import {
    getAssignedPermissions,
    updatePermissions,
    getAllPermission,
    getAllOperation,
    addPermission,
} from '../../../services/decentralizationService';
import { getAllRole } from '../../../services/userService';

function AddDecentralization({ open, onClose, onSave }) {
    const [formData, setFormData] = useState({
        roleId: '',
        roleName: '',
    });
    const [permissions, setPermissions] = useState([]);
    const [roles, setRoles] = useState([]);
    const [notificationOpen, setNotificationOpen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState('');

    // Fetch roles when the component mounts
    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await getAllRole();
                if (response && response.code === 1000) {
                    setRoles(response.result || []);
                }
            } catch (error) {
                console.error('Error fetching roles:', error);
            }
        };

        fetchRoles();
    }, []);
    const fetchPermissionsAndOperations = async (roleId) => {
        try {
            const allPermissionsResponse = await getAllPermission();
            const allOperationsResponse = await getAllOperation();
            const assignedPermissionsResponse = await getAssignedPermissions(roleId);
         
    
            if (
                allPermissionsResponse.code === 1000 &&
                allOperationsResponse.code === 1000 &&
                assignedPermissionsResponse.code === 1000
            ) {
                const allPermissions = allPermissionsResponse.result || [];
                const allOperations = allOperationsResponse.result || [];
                const assignedPermissions = assignedPermissionsResponse.result || [];
    
                const permissionsWithOperations = allPermissions.map((permission) => {
                    const assignedPermission = assignedPermissions.find((ap) => ap.id === permission.id);
    
                    const unassignedOperations = allOperations.filter(
                        (operation) =>
                            !assignedPermission ||
                            !Array.isArray(assignedPermission.operations) ||
                            !assignedPermission.operations.some((ao) => ao.id === operation.id),
                    );
    

                    return {
                        ...permission,
                        operations: unassignedOperations,
                    };
                });
    
                const unassignedPermissions = permissionsWithOperations.filter(
                    (permission) => permission.operations.length > 0,
                );
    
                setPermissions(unassignedPermissions);
            }
        } catch (error) {
            console.error('Error fetching permissions and operations:', error);
        }
    };
    
    // Handle role selection
    const handleRoleChange = async (event) => {
        const selectedRole = roles.find((role) => role.id === event.target.value);
        if (selectedRole) {
            setFormData({
                roleId: selectedRole.id,
                roleName: selectedRole.name,
            });

            await fetchPermissionsAndOperations(selectedRole.id);
        }
    };

    // Handle saving permissions and operations
    const handleSave = async () => {
        try {
            const payload = {
                roleId: formData.roleId,
                permissions: permissions.map((permission) => ({
                    permissionId: permission.id,
                    operationIds: permission.operations
                        .filter((operation) => operation.isChecked)
                        .map((operation) => operation.id),
                })),
            };

            await addPermission(payload.roleId, payload.permissions);
            setNotificationOpen(true);

            onSave(payload);
            onClose();
        } catch (error) {
            console.error('Error saving permissions:', error);
        }
    };

    // Handle operation checkbox change
    const handleOperationChange = (permissionId, operationId, isChecked) => {
        setPermissions((prev) =>
            prev.map((permission) =>
                permission.id === permissionId
                    ? {
                          ...permission,
                          operations: permission.operations.map((operation) =>
                              operation.id === operationId ? { ...operation, isChecked } : operation,
                          ),
                      }
                    : permission,
            ),
        );
    };

    const handleNotificationClose = () => {
        setNotificationOpen(false);
    };

    return (
        <>
            <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
                <DialogTitle>Add Decentralization</DialogTitle>
                <DialogContent>
                    <Box display="flex" flexDirection="column" gap={2} mt={2}>
                        <FormControl fullWidth>
                            <InputLabel id="role-select-label">Select Role</InputLabel>
                            <Select labelId="role-select-label" value={formData.roleId} onChange={handleRoleChange}>
                                {roles.map((role) => (
                                    <MenuItem key={role.id} value={role.id}>
                                        {role.id} - {role.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Typography variant="h6" mt={3}>
                            Permissions & Operations
                        </Typography>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {permissions.map((permission) => (
                                <li key={permission.id}>
                                    <Typography variant="subtitle1">{permission.name}</Typography>
                                    <ul style={{ listStyle: 'none', paddingLeft: '20px' }}>
                                        {permission.operations
                                            .filter((operation) => !operation.isAssigned) // Show only unassigned operations
                                            .map((operation) => (
                                                <li key={operation.id}>
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                value={operation.id}
                                                                onChange={(e) =>
                                                                    handleOperationChange(
                                                                        permission.id,
                                                                        operation.id,
                                                                        e.target.checked,
                                                                    )
                                                                }
                                                            />
                                                        }
                                                        label={operation.operationName}
                                                    />
                                                </li>
                                            ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} variant="contained" color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            <Notification
                open={notificationOpen}
                message={snackBarMessage}
                onClose={handleNotificationClose}
                type="success"
            />
        </>
    );
}

export default AddDecentralization;
