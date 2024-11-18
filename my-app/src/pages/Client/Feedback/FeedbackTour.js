import React, { useState, useEffect } from "react";
import { Card, Row, Col, Badge, Button, Modal, Form } from "react-bootstrap";
import moment from "moment";
import {
  getFeedbackList,
  checkCustomerOrderTour,
} from "../../../services/feedbackService";
import MapsUgcIcon from "@mui/icons-material/MapsUgc";
import { Rating } from "@mui/material"; // Importing Material-UI Rating component
import axios from "axios";
import Notification from "../../../components/Notification";
function FeedbackTour({ detailRouteId, customerId }) {
  const [feedbackData, setFeedbackData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [averageRating, setAverageRating] = useState(0);
  const [newFeedback, setNewFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("error");

  // Function to check if the customer has booked the tour
  const handleShowModal = async () => {
    try {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        alert("User ID không tồn tại. Vui lòng đăng nhập lại.");
        return;
      }

      const hasBooked = await checkCustomerOrderTour(userId, detailRouteId);
      if (hasBooked.result === true) {
        setShowModal(true);
      } else {
        setNotificationMessage(
          "Bạn chưa đặt tour này, vui lòng đặt tour để đánh giá."
        );
        setNotificationType("error"); // Set to "error" if the user hasn't booked the tour
        setNotificationOpen(true);
      }
    } catch (error) {
      console.error("Error checking booking status:", error);
    }
  };

  const loadFeedback = async (page, reset = false) => {
    try {
      const data = await getFeedbackList(page, 3, detailRouteId);
      const newFeedbacks = data.result.feedbacks;

      if (reset) {
        setFeedbackData(newFeedbacks);
      } else {
        setFeedbackData((prevData) => [...prevData, ...newFeedbacks]);
      }

      setTotalPages(data.result.totalPages);

      const totalRating = feedbackData
        .concat(newFeedbacks)
        .reduce((acc, feedback) => acc + feedback.rating, 0);
      const totalFeedbackCount = feedbackData.concat(newFeedbacks).length;

      setAverageRating(
        totalFeedbackCount > 0 ? totalRating / totalFeedbackCount : 0
      );
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };

  useEffect(() => {
    if (detailRouteId) {
      setPage(1);
      loadFeedback(1, true);
    }
  }, [detailRouteId]);

  useEffect(() => {
    if (page > 1) {
      loadFeedback(page);
    }
  }, [page]);

  const handleLoadMore = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleFeedbackChange = (event) => {
    setNewFeedback(event.target.value);
  };

  const handleSubmitFeedback = async (event) => {
    event.preventDefault();

    if (newFeedback.trim() && rating > 0) {
      const newComment = {
        rating,
        text: newFeedback,
        detailRouteId,
        bookingId: 1,
      };

      try {
        await axios.post(
          "http://localhost:8080/api/feedback/comment",
          newComment
        );
        setNewFeedback("");
        setRating(0);
        setShowModal(false);
        setNotificationMessage("Đánh giá của bạn đã được thêm thành công!");
        setNotificationType("success"); // Set to "success" after successful feedback submission
        setNotificationOpen(true);
      } catch (error) {
        console.error("Error submitting feedback:", error);
        alert("Error submitting feedback. Please try again.");
      }
    } else {
      console.log("Please provide feedback and rating.");
    }
  };

  const handleCloseModal = () => setShowModal(false);
  const handleCloseNotification = () => setNotificationOpen(false);

  return (
    <div className="border rounded p-4">
      <h5 className="mb-4">Đánh Giá Khách Hàng</h5>
      <div className="mb-4 d-flex justify-content-between">
        <div>
          <Badge bg="success" className="fs-6">
            {averageRating.toFixed(1)}/5
          </Badge>
          <span style={{ margin: "0 8px" }}>|</span>
          {feedbackData.length} đánh giá
        </div>

        <MapsUgcIcon
          variant="primary"
          onClick={handleShowModal}
          style={{ fontSize: "30px", cursor: "pointer" }}
        >
          Thêm Bình Luận
        </MapsUgcIcon>
      </div>

      {feedbackData.map((feedback) => (
        <Card className="mb-3" key={feedback.feedbackId}>
          <Card.Body>
            <Row className="align-items-center">
              <Col xs="auto">
                <Rating
                  name="read-only"
                  value={feedback.rating}
                  precision={0.1}
                  readOnly
                  size="small"
                />
              </Col>
              <Col>
                <Row className="d-flex align-items-center">
                  <Col xs="auto">
                    <h6 className="mb-0">{feedback.customerName}</h6>
                  </Col>
                  <Col className="text-muted">
                    <small>{moment(feedback.date).fromNow()}</small>
                  </Col>
                </Row>
              </Col>
            </Row>
            <p className="mt-2">{feedback.text}</p>
            <p className="text-muted">{feedback.detailRouteName}</p>
          </Card.Body>
        </Card>
      ))}

      {page < totalPages && (
        <Button
          variant="outline-primary"
          className="mt-3 w-100"
          onClick={handleLoadMore}
        >
          Xem thêm nhận xét
        </Button>
      )}

      {/* Modal for adding feedback */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm Bình Luận</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <Rating
              name="simple-controlled"
              value={rating}
              onChange={(event, newValue) => setRating(newValue)}
              precision={0.5}
              size="large"
            />
          </div>
          <Form onSubmit={handleSubmitFeedback}>
            <Form.Group controlId="feedbackText">
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Nhập bình luận của bạn"
                value={newFeedback}
                onChange={handleFeedbackChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleSubmitFeedback}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Notification component */}
      <Notification
        open={notificationOpen}
        message={notificationMessage}
        onClose={handleCloseNotification}
        type={notificationType} // Passing notification type (error or success)
      />
    </div>
  );
}

export default FeedbackTour;
