import React, { useState, useEffect } from "react";
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
  Typography,
} from "@mui/material";
import PaginationComponent from "../../../components/Pagination";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Notification from "../../../components/Notification";
import { getListDecentralization } from "../../../services/decentralizationService";
import EditDecentralization from "./EditDecentralization";
import { getAllRole } from "../../../services/userService";
function Decentralization() {
  const [decentralization, setDecentralization] = useState([]);
  const pageSize = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchRole, setSearchRole] = useState("");
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");


  useEffect(() => {
    const fetchDecentralization = async () => {
      try {
        const response = await getAllRole();
        if (response && response.code === 1000) {
          setDecentralization(response.result || []);
          setTotalPages(response.result.totalPages || 1);
        }
      } catch (error) {
        console.error("Error fetching decentralization data:", error);
      }
    };

    fetchDecentralization();
  }, [currentPage, searchRole]);

  const handleSearchChange = (event) => {
    setSearchRole(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEdit = (item) => {
    setSelectedItem(item); // Lưu decentralization được chọn
    setUpdateDialogOpen(true); // Mở dialog chỉnh sửa
  };

  const handleUpdateSave = (updatedData) => {
    setDecentralization((prev) =>
      prev.map((item) =>
        item.id === updatedData.id ? { ...item, ...updatedData } : item
      )
    );
    setNotificationMessage("Decentralization updated successfully!");
    setNotificationOpen(true);
    setUpdateDialogOpen(false); // Đóng form chỉnh sửa
  };

  const handleNotificationClose = () => {
    setNotificationOpen(false);
  };

  return (
    <div>
      <Paper>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h2" style={{ fontSize: "24px", fontWeight: "bold", marginLeft: "16px" }}>
            DECENTRALIZATION
          </Typography>
          <Box display="flex" justifyContent="center" flexGrow={1}>
            <TextField
              variant="outlined"
              placeholder="Search roles"
              value={searchRole}
              onChange={handleSearchChange}
              style={{ width: "300px", marginRight: "150px" }}
            />
          </Box>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">STT</TableCell>
                <TableCell align="center">Role ID</TableCell>
                <TableCell align="center">Role Name</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {decentralization.map((item) => (
                <TableRow key={item.id}>
                  <TableCell align="center">{item.id}</TableCell>
                  <TableCell align="center">{item.id}</TableCell>
                  <TableCell align="center">{item.name}</TableCell>
                  
                  <TableCell align="center">
                    <Box display="flex" justifyContent="center">
                      <Button
                        onClick={() => handleEdit(item)}
                        variant="text"
                        color="primary"
                        startIcon={<EditIcon />}
                      >
                        Edit
                      </Button>
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

      <EditDecentralization
        open={updateDialogOpen}
        onClose={() => setUpdateDialogOpen(false)}
        decentralization={selectedItem}
        onSave={handleUpdateSave}
      />

      <Notification open={notificationOpen} message={notificationMessage} onClose={handleNotificationClose} />
    </div>
  );
}

export default Decentralization;
