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
import { getAllPermission, getPermissionByRoleId, updatePermissions } from "../../../services/decentralizationService";

function EditDecentralization({ open, onClose, decentralization, onSave }) {
  const [formData, setFormData] = useState({
    id: "",
    roleId: "",
    roleName: "",
  });
  const [permissions, setPermissions] = useState([]); // Danh sách tất cả permissions với operations
  const [selectedOperations, setSelectedOperations] = useState([]); // Danh sách operationId được chọn

  useEffect(() => {
    if (decentralization) {
      setFormData({
        id: decentralization.id,
        roleId: decentralization.roleId,
        roleName: decentralization.roleName,
      });

      // Tải tất cả permissions và permissions của role
      fetchPermissions(decentralization.roleId);
    }
  }, [decentralization]);

  const fetchPermissions = async (roleId) => {
    try {
      const allPermissionsResponse = await getAllPermission();
      const rolePermissionsResponse = await getPermissionByRoleId(roleId);

      if (
        allPermissionsResponse &&
        allPermissionsResponse.code === 1000 &&
        rolePermissionsResponse &&
        rolePermissionsResponse.code === 1000
      ) {
        const allPermissions = allPermissionsResponse.result || [];
        const roleOperations = rolePermissionsResponse.result.decentralization || [];

        // Đánh dấu operation nào đã được cấp
        const permissionsWithOperations = allPermissions.map((permission) => ({
          ...permission,
          operations: permission.operations.map((operation) => ({
            ...operation,
            isGranted: roleOperations.some(
              (ro) => ro.permissionId === permission.id && ro.operationId === operation.id
            ),
          })),
        }));

        setPermissions(permissionsWithOperations);

        // Thiết lập dữ liệu ban đầu cho các operations được chọn
        const initialSelectedOperations = roleOperations.map((ro) => ro.operationId);
        setSelectedOperations(initialSelectedOperations);
      }
    } catch (error) {
      console.error("Error fetching permissions:", error);
    }
  };

  const handleOperationChange = (permissionId, operationId) => {
    setSelectedOperations((prev) =>
      prev.includes(operationId)
        ? prev.filter((id) => id !== operationId) // Bỏ chọn operation
        : [...prev, operationId] // Thêm operation vào danh sách
    );
  };

  const handleSave = async () => {
    const payload = {
      roleId: formData.roleId,
      permissions: permissions.map((permission) => ({
        permissionId: permission.id,
        operationIds: permission.operations
          .filter((operation) => selectedOperations.includes(operation.id))
          .map((operation) => operation.id),
      })),
    };

    try {
      await updatePermissions(payload.roleId, payload.permissions);
      console.log("Permissions updated successfully!");
      onSave(payload); // Truyền dữ liệu lên component cha
      onClose(); // Đóng dialog
    } catch (error) {
      console.error("Error saving permissions:", error);
    }
  };

  return (
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
          {permissions.map((permission) => (
            <Box key={permission.id} mb={2}>
              <Typography variant="subtitle1">{permission.name}</Typography>
              {permission.operations.map((operation) => (
                <FormControlLabel
                  key={operation.id}
                  control={
                    <Checkbox
                      checked={selectedOperations.includes(operation.id)} // Kiểm tra operation có được chọn không
                      onChange={() => handleOperationChange(permission.id, operation.id)} // Xử lý chọn/bỏ chọn operation
                    />
                  }
                  label={operation.name} // Hiển thị tên operation
                />
              ))}
            </Box>
          ))}
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
  );
}

export default EditDecentralization;
