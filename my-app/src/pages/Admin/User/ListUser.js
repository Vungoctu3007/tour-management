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
} from "@mui/material";
import PaginationComponent from "../../../components/Pagination";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Notification from "../../../components/Notification";
import BlockIcon from "@mui/icons-material/Block";
import AddUser from "./AddUser";
import { getAllRole, getListUser, getUserByAllSearch } from "../../../services/userService";

function ListUser() {
  const [users, setUsers] = useState([]); // This is already correct in your code
  const pageSize = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchUser, setSearchUser] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [roles, setRoles] = useState([]);

  // Debounced search state
  const [debouncedSearchUser, setDebouncedSearchUser] = useState(searchUser);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchUser(searchUser);
    }, 300); // Adjust the debounce delay (300ms)

    return () => {
      clearTimeout(handler);
    };
  }, [searchUser]);
  
  useEffect(() => {
    const fetchUsers = async () => {
      try { 
        let response;
  
        if (debouncedSearchUser) {
          // Search API
          response = await getUserByAllSearch(debouncedSearchUser);
          console.log(response);
        } else {
          // Fetch paginated users if no search term
          response = await getListUser(currentPage, pageSize);
        }
  
        // Ensure the response is valid before accessing its properties
        if (response && response.code === 1000) {
          setUsers(response.result.users || []); // Update this line to correctly access users
          setTotalPages(response.result.totalPages || 1);
        } else {
          setUsers([]); // If not successful, set users to an empty array
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
  
    const fetchRoles = async () => {
      try {
        const response = await getAllRole();
        setRoles(response.data.result || []);
      } catch (error) { 
        console.error("Error fetching roles:", error);
      }
    };
  
    fetchUsers();
    fetchRoles();
  }, [currentPage, debouncedSearchUser]);
    

  const handleSearchChange = (event) => {
    setSearchUser(event.target.value);
    setCurrentPage(1); // Reset to the first page when a new search is initiated
  };

  const handleOpenDialog = (user) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
  };

  const handleAddUserOpen = () => {
    setAddUserOpen(true);
  };

  const handleAddUserClose = () => {
    setAddUserOpen(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
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

  const handleNotificationClose = () => {
    setNotificationOpen(false);
  };

  return (
    <div>
      <Paper>
        <Box display="flex" justifyContent="center" alignItems="center" mb={2} gap={2}>
          <TextField
            variant="outlined"
            placeholder="Search user"
            value={searchUser}
            onChange={handleSearchChange}
            style={{ width: "300px" }}
          />
          <div onClick={handleAddUserOpen} style={{ cursor: "pointer", marginLeft: "8px", textAlign: "center" }}>
            <GroupAddIcon />
          </div>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Password</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>RoleId</TableCell>
                <TableCell>Role name</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.password}</TableCell>
                  <TableCell>{user.email || "default"}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.roleName || "default"}</TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <div onClick={() => alert(`Edit ${user.username}`)} style={{ marginRight: 8, cursor: "pointer", padding: "8px", textAlign: "center" }}>
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
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          variant="outlined"
          color="primary"
          shape="rounded"
        />
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
      </Paper>
      <Notification open={notificationOpen} message={notificationMessage} onClose={handleNotificationClose} />
    </div>
  );
}

export default ListUser;
