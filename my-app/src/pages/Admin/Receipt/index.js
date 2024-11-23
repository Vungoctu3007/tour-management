import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Receipt.module.css';
import './modal.module.css';
import Notification from "../../../components/Notification";

const Receipt = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });

    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [paymentStatuses, setPaymentStatuses] = useState([]);
    const [newStatusId, setNewStatusId] = useState(null);

    const [notificationOpen, setNotificationOpen] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");
    const [notificationType, setNotificationType] = useState("success");

    // Fetch orders with pagination
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:8080/api/booking/get-all-booking-orders?page=${page}&size=10`);
                const data = await response.json();
                setOrders(data.result.content);
                setFilteredOrders(data.result.content);
                setTotalPages(data.result.totalPages);
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [page]);

    // Fetch payment statuses
    useEffect(() => {
        const fetchPaymentStatuses = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/payment-status/get-payment-statuses`);
                const data = await response.json();
                if (data.code === 1000) {
                    setPaymentStatuses(data.result);
                }
            } catch (error) {
                console.error("Error fetching payment statuses:", error);
            }
        };
        fetchPaymentStatuses();
    }, []);

    // Fetch order details and open modal
    const handleEdit = async (bookingId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/booking/get-detail-booking/${bookingId}`);
            const data = await response.json();
            if (data.code === 1000) {
                setSelectedOrder(data.result);
                setNewStatusId(data.result.statusId);
                setShowModal(true);
            } else {
                console.error("Error fetching booking details:", data.message);
            }
        } catch (error) {
            console.error("Error fetching booking details:", error);
        }
    };

    // Close modal
    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedOrder(null);
    };

    // Update payment status
    const handleUpdateStatus = async () => {
        if (!selectedOrder || newStatusId === null) return;

        try {
            const response = await fetch(`http://localhost:8080/api/booking/update-status?bookingId=${selectedOrder.bookingId}&statusId=${newStatusId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({

                }),
            });

            const data = await response.json();
            if (data.code === 1000) {
                setNotificationMessage(
                  "Cập nhật trạng thái thanh toán thành công!"
                );
                setNotificationType("success"); // Set to "error" if the user hasn't booked the tour
                setNotificationOpen(true);
                setShowModal(false);
                setPage(0);
            } else {
                setNotificationMessage(
                  "Đã có lỗi xảy ra khi cập nhật."
                );
                setNotificationType("error"); // Set to "error" if the user hasn't booked the tour
                setNotificationOpen(true);
            }
        } catch (error) {
            console.error("Error updating payment status:", error);
        }
    };

    // Handle search
    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);

        const filtered = orders.filter(order =>
          order.customerName.toLowerCase().includes(term) ||
          order.statusName?.toLowerCase().includes(term) ||
          order.bookingId.toString().includes(term)
        );
        setFilteredOrders(filtered);
    };

    // Handle sorting
    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }

        const sortedData = [...filteredOrders].sort((a, b) => {
            if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
            if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
            return 0;
        });

        setSortConfig({ key, direction });
        setFilteredOrders(sortedData);
    };

    // Handle pagination
    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setPage(newPage);
        }
    };

    if (loading) {
        return <div className="container mt-5">Loading...</div>;
    }

    const handleCloseNotification = () => setNotificationOpen(false);

    return (
      <div className="container mt-5">
          <h4 className="mb-4">Quản lý đơn hàng</h4>
          <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Tìm kiếm theo tên, trạng thái hoặc ID"
                value={searchTerm}
                onChange={handleSearch}
              />
          </div>
          <div className="table-responsive">
              <table className="table table-striped table-bordered">
                  <thead className="table-light">
                  <tr>
                      <th onClick={() => handleSort('bookingId')} style={{ cursor: 'pointer' }}>
                          # {sortConfig.key === 'bookingId' ? (sortConfig.direction === 'asc' ? '🔼' : '🔽') : ''}
                      </th>
                      <th onClick={() => handleSort('customerName')} style={{ cursor: 'pointer' }}>
                          Customer Name {sortConfig.key === 'customerName' ? (sortConfig.direction === 'asc' ? '🔼' : '🔽') : ''}
                      </th>
                      <th onClick={() => handleSort('timeToOrder')} style={{ cursor: 'pointer' }}>
                          Date {sortConfig.key === 'timeToOrder' ? (sortConfig.direction === 'asc' ? '🔼' : '🔽') : ''}
                      </th>
                      <th onClick={() => handleSort('totalPrice')} style={{ cursor: 'pointer' }}>
                          Total {sortConfig.key === 'totalPrice' ? (sortConfig.direction === 'asc' ? '🔼' : '🔽') : ''}
                      </th>
                      <th onClick={() => handleSort('statusName')} style={{ cursor: 'pointer' }}>
                          Payment Status {sortConfig.key === 'statusName' ? (sortConfig.direction === 'asc' ? '🔼' : '🔽') : ''}
                      </th>
                      <th>Actions</th>
                  </tr>
                  </thead>
                  <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.bookingId}>
                        <td>{order.bookingId}</td>
                        <td>{order.customerName}</td>
                        <td>{new Date(order.timeToOrder).toLocaleDateString()}</td>
                        <td>{order.totalPrice.toLocaleString()} VND</td>
                        <td>{order.statusName}</td>
                        <td>
                            <button
                              className="btn btn-warning btn-sm"
                              onClick={() => handleEdit(order.bookingId)}
                            >
                                Edit
                            </button>
                        </td>
                    </tr>
                  ))}
                  </tbody>
              </table>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-3">
              <button
                className="btn btn-outline-primary btn-sm"
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 0}
              >
                  Previous
              </button>
              <span>Page {page + 1} of {totalPages}</span>
              <button
                className="btn btn-outline-primary btn-sm"
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages - 1}
              >
                  Next
              </button>
          </div>

          {showModal && selectedOrder && (
            <div className="modal show d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Chi tiết đơn hàng #{selectedOrder.bookingId}</h5>
                            <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                        </div>
                        <div className="modal-body">
                            <h6 className="text-primary">Thông tin đơn hàng</h6>
                            <p><strong>Tổng tiền:</strong> {selectedOrder.totalPrice.toLocaleString()} VND</p>
                            <p><strong>Trạng thái:</strong>
                                <select
                                  className="form-select mt-2"
                                  value={newStatusId}
                                  onChange={(e) => setNewStatusId(parseInt(e.target.value))}
                                >
                                    {paymentStatuses.map((status) => (
                                      <option key={status.paymentStatusId} value={status.paymentStatusId}>
                                          {status.paymentStatusName}
                                      </option>
                                    ))}
                                </select>
                            </p>
                            <p><strong>Số lượng vé:</strong> {selectedOrder.quantity}</p>
                            <p><strong>Thời gian đặt:</strong> {new Date(selectedOrder.timeToOrder).toLocaleString()}</p>
                            <p><strong>Ngày khởi hành:</strong> {selectedOrder.timeToDeparture}</p>
                            <p><strong>Ngày kết thúc:</strong> {selectedOrder.timeToFinish}</p>
                            <hr />
                            <h6 className="text-primary">Thông tin khách hàng</h6>
                            <p><strong>Tên khách hàng:</strong> {selectedOrder.customerName}</p>
                            <p><strong>Email:</strong> {selectedOrder.customerEmail}</p>
                            <p><strong>Phone:</strong> {selectedOrder.customerPhone}</p>
                            <p><strong>Địa chỉ:</strong> {selectedOrder.customerAddress}</p>
                            <hr />
                            <h6 className="text-primary">Danh sách hành khách</h6>
                            {selectedOrder.passengers.map((passenger) => (
                              <div key={passenger.passengerId}>
                                  <p><strong>Họ tên:</strong> {passenger.passengerName}</p>
                                  <p><strong>Đối tượng:</strong> {passenger.objectName}</p>
                                  <p><strong>Giới tính:</strong> {passenger.passengerGender}</p>
                                  <p><strong>Ngày sinh:</strong> {passenger.passengerDateBirth}</p>
                                  <hr />
                              </div>
                            ))}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-success" onClick={handleUpdateStatus}>
                                Cập nhật
                            </button>
                            <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                                Đóng
                            </button>
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

export default Receipt;
