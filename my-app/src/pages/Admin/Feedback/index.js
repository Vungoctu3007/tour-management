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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Notification from "../../../components/Notification";
import { searchFeedbackByDetailName, getFeedbackListAdmin } from "../../../services/feedbackService";
function ListFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const pageSize = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchFeedback, setSearchFeedback] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  // Debounced search state
  const [debouncedSearchFeedback, setDebouncedSearchFeedback] = useState(searchFeedback);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchFeedback(searchFeedback);
    }, 300); // Adjust the debounce delay (300ms)

    return () => {
      clearTimeout(handler);
    };
  }, [searchFeedback]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        let response;

        if (debouncedSearchFeedback) {
            response = await searchFeedbackByDetailName(debouncedSearchFeedback);
        } else {
          response = await getFeedbackListAdmin(currentPage, pageSize);
        }

        if (response && response.code === 1000) {
          setFeedbacks(response.result.feedbacks || []);
          setTotalPages(response.result.totalPages || 1);
        } else {
          setFeedbacks([]); // If not successful, set feedbacks to an empty array
        }
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };

    fetchFeedbacks();
  }, [currentPage, debouncedSearchFeedback]);

  const handleSearchChange = (event) => {
    setSearchFeedback(event.target.value);
    setCurrentPage(1); 
  };

  const handleOpenDialog = (feedback) => {
    setSelectedFeedback(feedback);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedFeedback(null);
  };

  const handlePageChange = (page) => {  
    setCurrentPage(page);
  };

  const handleDeleteFeedback = async () => {
    if (selectedFeedback) {
      try {
        await axios.delete(`http://localhost:8080/api/feedback/${selectedFeedback.id}`);
        setFeedbacks((prevFeedbacks) =>
          prevFeedbacks.filter((feedback) => feedback.id !== selectedFeedback.id)
        );
        setNotificationMessage(`Feedback with ID ${selectedFeedback.id} deleted.`);
        setNotificationOpen(true);
        handleCloseDialog();
      } catch (error) {
        console.error("Error deleting feedback:", error); 
      }
    }
  };

  const handleNotificationClose = () => {
    setNotificationOpen(false);
  };

  return (
    <div>

      <Paper>      
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        {/* Bên trái: Tiêu đề */}
        <Typography variant="h2" style={{ fontSize: "24px", fontWeight: "bold" , marginLeft : "16px"}}>
          LIST FEEDBACK
        </Typography>

        {/* Ở giữa: Ô tìm kiếm */}
        <Box display="flex" justifyContent="center" flexGrow={1}>
          <TextField
            variant="outlined"
            placeholder="Search feedback"
            value={searchFeedback}
            onChange={handleSearchChange}
            style={{ width: "300px" , marginRight : "150px" }}
          />
        </Box>

        {/* Bên phải: Phần trống */}
        <Box style={{ width: "24px" }} />
      </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>FeedbackID</TableCell>
                <TableCell>BookingId</TableCell>
                <TableCell>CustomerName</TableCell>
                <TableCell>DetailRouteId</TableCell>
                <TableCell>DetailRouteName</TableCell>
                <TableCell>Text</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {feedbacks.map((feedback) => (
                <TableRow key={feedback.feedbackId}>
                  <TableCell>{feedback.feedbackId}</TableCell>
                  <TableCell>{feedback.bookingId}</TableCell>
                  <TableCell>{feedback.customerName}</TableCell>
                  <TableCell>{feedback.detailRouteId}</TableCell>
                  <TableCell>{feedback.detailRouteName}</TableCell>
                  <TableCell>{feedback.text}</TableCell>
                  <TableCell>{feedback.rating}</TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <div onClick={() => alert(`Edit feedback with ID: ${feedback.id}`)} style={{ marginRight: 8, cursor: "pointer", padding: "8px", textAlign: "center" }}>
                        <EditIcon />
                      </div>
                      <div onClick={() => handleOpenDialog(feedback)} style={{ cursor: "pointer", padding: "8px", textAlign: "center" }}>
                        <DeleteIcon />
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
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete feedback with ID <strong>{selectedFeedback?.id}</strong>?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
            <Button onClick={handleDeleteFeedback} color="error">Delete</Button>
          </DialogActions>
        </Dialog>
      </Paper>
      <Notification open={notificationOpen} message={notificationMessage} onClose={handleNotificationClose} />
    </div>
  );
}

export default ListFeedback;
