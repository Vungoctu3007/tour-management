import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  Box,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography
} from "@mui/material";
import PaginationComponent from "../../../components/Pagination";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Notification from "../../../components/Notification";
import BlockIcon from "@mui/icons-material/Block";
import AddUser from "./AddUser";
import UpdateUser from "./UpdateUser"; // Import the UpdateUser component
import { getAllRole, getListUser, getUserByAllSearch } from "../../../services/userService";

function ListUser() {
  const [users, setUsers] = useState([]);
  const pageSize = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchUser, setSearchUser] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [updateUserOpen, setUpdateUserOpen] = useState(false); // State for the update dialog
  const [selectedUser, setSelectedUser] = useState(null);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [roles, setRoles] = useState([]);
  
  // Debounced search state
  const [debouncedSearchUser, setDebouncedSearchUser] = useState(searchUser);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchUser(searchUser);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchUser]);
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let response;
        if (debouncedSearchUser) {
          response = await getUserByAllSearch(debouncedSearchUser);
        } else {
          response = await getListUser(currentPage, pageSize);
        }

        if (response && response.code === 1000) {
          setUsers(response.result.users || []);
          setTotalPages(response.result.totalPages || 1);
        } else {
          setUsers([]);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const fetchRoles = async () => {
      try {
        const response = await getAllRole();
        setRoles(response.result || []);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    fetchUsers();
    fetchRoles();
  }, [currentPage, debouncedSearchUser]);

  const handleSearchChange = (event) => {
    setSearchUser(event.target.value);
    setCurrentPage(1);
  };

  const handleOpenUpdateDialog = (user) => {
    setSelectedUser(user);
    setUpdateUserOpen(true); // Open the update dialog
  };

  const handleCloseUpdateDialog = () => {
    setUpdateUserOpen(false);
    setSelectedUser(null);
  };

  const handleAddUserSave = async (newUser) => {
    try {
      const response = await axios.post("http://localhost:8080/api/user", newUser);
      setUsers((prevUsers) => [...prevUsers, response.data]);
      setNotificationMessage(`User ${newUser.username} added successfully.`);
      setNotificationOpen(true);
    } catch (error) {
      console.error("Error adding user:", error);
      setNotificationMessage("Failed to add user.");
      setNotificationOpen(true);
    }
  };


  const handleUpdateUser = async (updatedUser) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/user/${updatedUser.id}`, updatedUser);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        )
      );
      setNotificationMessage(`User ${updatedUser.username} updated successfully.`);
      setNotificationOpen(true);
    } catch (error) {
      console.error("Error updating user:", error);
      setNotificationMessage("Failed to update user.");
      setNotificationOpen(true);  
    }
  };

  const handleBlockUser = async () => {
    if (selectedUser) {
      try {
        await axios.put(`http://localhost:8080/api/user/${selectedUser.id}?status=0`);
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === selectedUser.id ? { ...user, status: 0 } : user
          )
        );
        setNotificationMessage(`User ${selectedUser.username} is blocked.`);
        setNotificationOpen(true);
        handleCloseDialog();
      } catch (error) {
        console.error("Error updating user status:", error);
      }
    }
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
  };


  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleNotificationClose = () => {
    setNotificationOpen(false);
  };


  const handleAddUserOpen = () => {
    setAddUserOpen(true);
  };
  
  
  const handleOpenDialog = (user) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };


  const handleAddUserClose = () => {
    setAddUserOpen(false);
  };
  return (
    <div>
      <Paper>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h2" style={{ fontSize: "24px", fontWeight: "bold", marginLeft: "16px" }}>
            LIST USER
          </Typography>
          <Box display="flex" justifyContent="center" flexGrow={1}>
            <TextField
              variant="outlined"
              placeholder="Search users"
              value={searchUser}
              onChange={handleSearchChange}
              style={{ width: "300px", marginRight: "150px" }}
            />
          <div onClick={handleAddUserOpen} style={{ cursor: "pointer", marginLeft: "8px", textAlign: "center" }}>
            <GroupAddIcon />
          </div>
          </Box>
          <Box style={{ width: "24px" }} />
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>RoleID</TableCell>
                <TableCell>Role name</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email || "default"}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.roleName || "default"}</TableCell>
                  <TableCell>
                  <Box display="flex" alignItems="center">
                  <div
                      onClick={() => handleOpenUpdateDialog(user)}
                      style={{
                        marginRight: 8,
                        cursor: "pointer",
                        padding: "8px",
                        textAlign: "center",
                      }}
                    >
                      <EditIcon />
                    </div>

                      <div onClick={() => handleOpenDialog(user)} style={{ cursor: "pointer", padding: "8px", textAlign: "center" }}>
                        <BlockIcon />
                      </div>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </Paper>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Confirm Block</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to block user <strong>{selectedUser?.username}</strong>?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
            <Button onClick={handleBlockUser} color="error">Block</Button>
          </DialogActions>
        </Dialog>
      <AddUser
          open={addUserOpen}
          onClose={handleAddUserClose}
          onSave={handleAddUserSave}
          roles={roles}
        />

      <UpdateUser
        open={updateUserOpen}
        onClose={handleCloseUpdateDialog}
        user={selectedUser}
        roles={roles}
        onUpdate={handleUpdateUser}
      />

      <Notification open={notificationOpen} message={notificationMessage} onClose={handleNotificationClose} />
    </div>
  );
}

export default ListUser;
