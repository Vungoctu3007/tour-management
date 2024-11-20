import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { getOperationByRoleId, updatePermissions } from "../../../services/decentralizationService";
import Notification from "../../../components/Notification";
function EditDecentralization({ open, onClose, decentralization, onSave }) {
  const [formData, setFormData] = useState({
    id: "",
    roleId: "",
    roleName: "",
  });
  const [permissions, setPermissions] = useState([]); // Danh sách permissions với operations
  const [notificationOpen, setNotificationOpen] = useState(false); // Trạng thái thông báo
  const [snackBarMessage, setSnackBarMessage] = useState("");

  useEffect(() => {
    if (open && decentralization?.roleId) {
      setFormData({
        id: decentralization.id,
        roleId: decentralization.roleId,
        roleName: decentralization.roleName,
      });
  
      // Lấy dữ liệu permissions và operations
      fetchPermissionsAndOperations(decentralization.roleId);
    }
  }, [open, decentralization]);
  

  const fetchPermissionsAndOperations = async (roleId) => {
    try {
      const response = await getOperationByRoleId(roleId);
  
      if (response && response.code === 1000) {
        const { permissions } = response.result || [];
        const permissionsWithOperations = permissions.map((permission) => ({
          ...permission,
          isGranted: true, // Mặc định permission được tích
          operations: permission.operations.map((operation) => ({
            ...operation,
            isGranted: true, // Mặc định operation được tích
          })),
        }));
  
        setPermissions(permissionsWithOperations);
      }
    } catch (error) {
      console.error("Error fetching permissions and operations:", error);
    }
  };
  
  
  

  const handlePermissionChange = (permissionId) => {
    setPermissions((prev) =>
      prev.map((permission) =>
        permission.id === permissionId
          ? {
              ...permission,
              isGranted: !permission.isGranted,
              operations: permission.operations.map((operation) => ({
                ...operation,
                isGranted: !permission.isGranted, // Đồng bộ trạng thái operations
              })),
            }
          : permission
      )
    );
  };

  const handleOperationChange = (permissionId, operationId) => {
    setPermissions((prev) =>
      prev.map((permission) =>
        permission.id === permissionId
          ? {
              ...permission,
              operations: permission.operations.map((operation) =>
                operation.id === operationId
                  ? { ...operation, isGranted: !operation.isGranted }
                  : operation
              ),
              isGranted: permission.operations.some(
                (operation) =>
                  operation.id === operationId
                    ? !operation.isGranted
                    : operation.isGranted
              ),
            }
          : permission
      )
    );
  };

  const handleSave = async () => {
    const payload = {
      roleId: formData.roleId,
      permissions: permissions.map((permission) => ({
        permissionId: permission.id,
        operationIds: permission.operations
          .filter((operation) => operation.isGranted) // Chỉ lấy các operations được cấp
          .map((operation) => operation.id),
      })),
    };

    try {
      await updatePermissions(payload.roleId, payload.permissions);
      console.log("Permissions updated successfully!");
      setNotificationOpen(true); // Hiển thị thông báo
      onSave(payload); // Gửi dữ liệu lên component cha
      onClose(); // Đóng dialog
    } catch (error) {
      console.error("Error saving permissions:", error);
    }
  };

  const handleNotificationClose = () => {
    setNotificationOpen(false); // Đóng thông báo
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit Decentralization</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={2}>
            <TextField
              label="Role ID"
              name="roleId"
              value={formData.roleId}
              fullWidth
              disabled
            />
            <TextField
              label="Role Name"
              name="roleName"
              value={formData.roleName}
              fullWidth
              disabled
            />
            <Typography variant="h6" mt={3}>
              Permissions & Operations
            </Typography>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {permissions.map((permission) => (
                <li key={permission.id}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={permission.isGranted} // Trạng thái của permission
                        onChange={() => handlePermissionChange(permission.id)} // Xử lý chọn/bỏ chọn permission
                      />
                    }
                    label={permission.name}
                  />
                  <ul style={{ listStyle: "none", paddingLeft: "20px" }}>
                    {permission.operations.map((operation) => (
                      <li key={operation.id}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={operation.isGranted} // Trạng thái đã được cấp
                              onChange={() =>
                                handleOperationChange(permission.id, operation.id)
                              } // Xử lý chọn/bỏ chọn operation
                            />
                          }
                          label={operation.operationName} // Tên operation
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

      {/* Notification Component */}
      <Notification
        open={notificationOpen}
        message="Permissions updated successfully!"
        onClose={handleNotificationClose}
        type="success"
      />
    </>
  );
}

export default EditDecentralization;
