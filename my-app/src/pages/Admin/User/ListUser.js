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
import Notification from "../../../components/Notification"; // Import your Notification component

function ListUser() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/user");
        setUsers(
          Array.isArray(response.data.result) ? response.data.result : []
        );
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleOpenDialog = (user) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
  };

  console.log("user id : ",selectedUser.id)
  const handleDelete = async () => {
    if (selectedUser) {
      try {
        await axios.delete(`http://localhost:8080/api/user/${selectedUser.id}`);
        setUsers(users.filter((user) => user.id !== selectedUser.id));
        setNotificationMessage(`User ${selectedUser.username} deleted successfully.`);
        setNotificationOpen(true);
        handleCloseDialog();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const handleNotificationClose = () => {
    setNotificationOpen(false);
  };

  const handleAddUser = () => {
    const newUser = {
      username: `user${Date.now()}`,
      email: `user${users.length + 1}@example.com`,
      role: 3,
    };
    setUsers([...users, newUser]);
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);

  return (
    <div>
      <Paper>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <TextField
            variant="outlined"
            placeholder="Search user"
            value={searchTerm}
            onChange={handleSearch}
            style={{ marginRight: 16 }}
          />
          <Button variant="contained" color="primary" onClick={handleAddUser}>
            <GroupAddIcon />
          </Button>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>UserId</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>RoleId</TableCell>
                <TableCell>Role name</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers
                .slice((page - 1) * rowsPerPage, page * rowsPerPage)
                .map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email || "N/A"}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.roleName}</TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => alert(`Edit ${user.username}`)}
                          style={{ marginRight: 8 }}
                        >
                          <EditIcon />
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleOpenDialog(user)}
                        >
                          <DeleteIcon />
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <PaginationComponent
          totalPages={totalPages}
          currentPage={page}
          onPageChange={handleChangePage}
          variant="outlined"
          color="primary"
          shape="rounded"
        />

        {/* Delete Confirmation Dialog */}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete user <strong>{selectedUser?.username}</strong>?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDelete} color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>

      {/* Notification Component */}
      <Notification
        open={notificationOpen}
        message={notificationMessage}
        onClose={handleNotificationClose}
      />
    </div>
  );
}

export default ListUser;
