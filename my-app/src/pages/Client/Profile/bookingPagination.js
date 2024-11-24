import React, { useState, useEffect } from "react";
import axios from "axios";
import {getAllBookingsInformationByUserId} from "../../../services/bookingService";
import {getBookingDetailById} from "../../../services/bookingService";
import "./modalDetailBooking.css";
import {Link, useLocation} from "react-router-dom";
import Notification from "../../../components/Notification";

const BookingPagination = ({ userId, itemsPerPage }) => {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("success");

  const [data, setData] = useState({
    bookings: [],
    totalPages: 0,
    currentPage: 1,
  });

  const [selectedBooking, setSelectedBooking] = useState(null); // Dữ liệu chi tiết của booking
  const [showModal, setShowModal] = useState(false);

  const fetchBookings = async (page = 0) => {
    try {
      const response = await getAllBookingsInformationByUserId(userId, page, itemsPerPage, "timeToOrder,desc");
      setData({
        bookings: response.result.content,
        totalPages: response.result.totalPages,
        currentPage: page + 1, // API trả về trang bắt đầu từ 0
      });
    } catch (e) {
      console.error("Error fetching booking", e);
    }
  };

  const fetchBookingDetail = async (bookingId) => {
    try {
      const response = await getBookingDetailById(bookingId);
      setSelectedBooking(response.result); // Lưu thông tin chi tiết vào state
      setShowModal(true); // Hiển thị modal
    } catch (e) {
      console.error("Error fetching booking detail", e);
    }
  };

  const handlePaymentNow = async (amount, bookingId) => {
    try {
      // Gửi yêu cầu đến API để tạo URL thanh toán
      const response = await axios.post(
        "http://localhost:8080/api/vnpay/payment",
        null,
        {
          params: {
            amount,
            bookingId,
          },
        }
      );
      // Lấy URL thanh toán từ API
      const paymentUrl = response.data.url;
      // Chuyển hướng người dùng tới URL thanh toán
      window.location.href = paymentUrl;
    } catch (error) {
      console.error("Error during payment creation:", error);
    }
  };

  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const status = queryParams.get("status");
    const message = queryParams.get("message");

    if (status === "success") {
      setNotificationMessage(
        "Thanh toán thành công!"
      );
      setNotificationType("success"); // Set to "error" if the user hasn't booked the tour
      setNotificationOpen(true);
    } else if (status === "failed") {
      setNotificationMessage(
        "Đã có lỗi xảy ra"
      );
      setNotificationType("error"); // Set to "error" if the user hasn't booked the tour
      setNotificationOpen(true);
    } else if (status === "error") {
      setNotificationMessage(
        "Đã có lỗi xảy ra"
      );
      setNotificationType("error"); // Set to "error" if the user hasn't booked the tour
      setNotificationOpen(true);
    }
  }, [location]);


  useEffect(() => {
    fetchBookings(0); // Lấy dữ liệu khi component được render lần đầu
  }, [userId, itemsPerPage]);

  const handlePageChange = (page) => {
    fetchBookings(page - 1);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedBooking(null);
  };
  const handleCloseNotification = () => setNotificationOpen(false);
  return (
    <div className="container">
      <h5 className="mt-2">Lịch Sử Đặt Chỗ</h5>
      {data.bookings.map((booking) => (
        <div key={booking.bookingId} className="card mb-4 shadow-sm border-0">
          <div className="card-header bg-light d-flex justify-content-between align-items-center">
            <span className="text-primary fw-bold">Mã đơn hàng: {booking.bookingId}</span>
            <span className={`badge text-bg-${booking.statusName.trim() === 'Chờ thanh toán' ? 'danger' : 'success'}`}>
              Trạng thái: {booking.statusName.trim()}
            </span>
          </div>
          <div className="card-body">
            <div className="d-flex justify-content-between">
              {/* Thông tin đặt tour */}
              <div>
                <h5 className="text-dark fw-semibold">{booking.detailRouteName}</h5>
                <p className="text-muted mb-1">
                  Ngày đặt: <strong>{new Date(booking.timeToOrder).toLocaleDateString()}</strong>
                </p>
                <p className="text-muted">
                  Tổng tiền:{" "}
                  <strong>
                    {booking.totalPrice.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </strong>
                </p>
              </div>
              {/* Hành động */}
              <div className="d-flex flex-column align-items-end">
                {/* Nút "Thanh toán ngay" nếu trạng thái là "chờ thanh toán" */}
                {booking.statusName.trim() === "chờ thanh toán" && (
                  <button className="btn btn-warning btn-sm mb-2">
                    Thanh toán ngay
                  </button>
                )}
                <button className="btn btn-outline-primary btn-sm" onClick={() => fetchBookingDetail(booking.bookingId)}>
                  Xem chi tiết
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}


      {/* Phân trang */}
      <div className="pagination-container d-flex justify-content-between align-items-center p-3 bg-light rounded shadow-sm mt-4">
        <button
          className="btn btn-primary btn-sm px-4"
          disabled={data.currentPage === 1}
          onClick={() => handlePageChange(data.currentPage - 1)}
        >
          <i className="fas fa-chevron-left me-2"></i>Trang trước
        </button>
        <span className="fw-bold">
          Trang {data.currentPage} / {data.totalPages}
        </span>
        <button
          className="btn btn-primary btn-sm px-4"
          disabled={data.currentPage === data.totalPages}
          onClick={() => handlePageChange(data.currentPage + 1)}
        >
          Trang sau<i className="fas fa-chevron-right ms-2"></i>
        </button>
      </div>

      {/* Modal */}
      {showModal && selectedBooking && (
        <div className="modal fade show" style={{ display: "block" }} role="dialog">
          <div className="modal-dialog modal-dialog-scrollable modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Thông tin đặt chỗ</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                {/* Thông tin người liên hệ */}
                <div className="mb-4">
                  <h6 className="fw-bold">Thông tin người liên hệ</h6>
                  <div className="border p-3 rounded">
                    <p><strong>Họ và tên:</strong> {selectedBooking.customerName}</p>
                    <p><strong>Email:</strong> {selectedBooking.customerEmail}</p>
                    <p><strong>Số điện thoại:</strong> {selectedBooking.customerPhone}</p>
                    <p><strong>Địa chỉ:</strong> {selectedBooking.customerAddress}</p>
                  </div>
                </div>

                {/* Thông tin khác */}
                <div className="mb-4">
                  <h6 className="fw-bold">Thông tin chuyến đi</h6>
                  <div className="border p-3 rounded">
                    <p>
                      <strong>Ngày khởi hành:</strong>{" "}
                      <span className="badge bg-danger">{selectedBooking.timeToDeparture}</span>
                    </p>
                    <p>
                      <strong>Ngày kết thúc:</strong>{" "}
                      <span className="badge bg-danger">{selectedBooking.timeToFinish}</span>
                    </p>
                    <p><strong>Số lượng:</strong> {selectedBooking.quantity}</p>
                    <p>
                      <strong>Tổng tiền:</strong>{" "}
                      {selectedBooking.totalPrice.toLocaleString("vi-VN", {style: "currency", currency: "VND"})}
                    </p>
                    <p>
                      <strong>Ngày đặt:</strong>{" "}
                      {selectedBooking.timeToOrder}
                    </p>
                    <p>
                      <strong>Trạng thái thanh toán:</strong>{" "}
                      <span
                        className={`badge ${selectedBooking.statusId === 1 ? "bg-danger" : "bg-success"}`}>
                  {selectedBooking.statusName}
                </span>
                    </p>
                  </div>
                </div>

                {/* Danh sách đặt tour */}
                <div>
                  <h6 className="fw-bold">Danh sách hành khách</h6>
                  {selectedBooking.passengers.map((passenger, index) => (
                    <div key={index} className="border p-3 rounded mb-2">
                      <p><strong>Họ và tên:</strong> {passenger.passengerName}</p>
                      <p><strong>Loại vé:</strong> {passenger.objectName}</p>
                      <p><strong>Giới tính:</strong> {passenger.passengerGender}</p>
                      <p><strong>Ngày sinh:</strong> {new Date(passenger.passengerDateBirth).toLocaleDateString()}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline-success" onClick={closeModal}>
                  Trở về
                </button>
                {selectedBooking.statusId === 1 && (
                  <button
                    className="btn btn-success btn-sm mb-2"
                    onClick={() => handlePaymentNow(selectedBooking.totalPrice, selectedBooking.bookingId)}
                  >
                    Thanh toán ngay
                  </button>
                )}

              </div>
            </div>
          </div>
        </div>

      )}

      <Notification
        open={notificationOpen}
        message={notificationMessage}
        onClose={handleCloseNotification}
        type={notificationType} // Passing notification type (error or success)
      />
    </div>
  );
};

export default BookingPagination;