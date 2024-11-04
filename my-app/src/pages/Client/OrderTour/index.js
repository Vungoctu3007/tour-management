import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getRouteDetailById } from '../../../services/bookingService';

function BookingTour() {
    // load page
    const { id } = useParams(); // Lấy ID từ URL
    const [tour, setTour] = useState(null); // State lưu thông tin tour
    const [loading, setLoading] = useState(true);

    // State for storing form data
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        email: '',
        address: '',
        adults: 1,
        children: 0,
        infants: 0,
        passengerName: '',
        gender: 'Nam',
        birthDate: '',
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    useEffect(() => {
        const fetchTourData = async () => {
            try {
                const response = await getRouteDetailById(id);
                console.log(response)
                setTour(response); // Lưu dữ liệu tour vào state
                setLoading(false); // Đánh dấu là đã hoàn tất loading
            } catch (error) {
                console.error('Error fetching tour data:', error);
                setLoading(false); // Đánh dấu là đã hoàn tất loading
            }
        };

        fetchTourData(); // Gọi hàm fetch
    }, [id]); // Chạy effect mỗi khi ID thay đổi

    // Nếu đang loading, hiển thị thông báo
    if (loading) {
        return <div>Loading...</div>;
    }

    // Nếu không có tour, hiển thị thông báo
    if (!tour) {
        return <div>No tour found!</div>;
    }


    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://your-api-endpoint.com/book-tour', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData), // Chuyển đổi dữ liệu thành JSON
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json(); // Nhận phản hồi từ server
            console.log('Form submitted successfully:', data);
            // Xử lý thêm nếu cần, như hiển thị thông báo thành công
        } catch (error) {
            console.error('Error submitting form:', error);
            // Xử lý lỗi, như hiển thị thông báo lỗi
        }
    };

    // Calculate total price
    const totalPrice = () => {
        const adultPrice = 12990000;
        const childPrice = 8000000;
        const infantPrice = 3000000;
        return (formData.adults * adultPrice) + (formData.children * childPrice) + (formData.infants * infantPrice);
    };

    return (
        <div className="container py-4">
            {/* Left Section - Contact Information */}
            <div className="row">
                <div className="card p-4 mb-4 col-md-8">
                    <h5>Thông tin liên hệ</h5>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="fullName" className="form-label">Họ tên *</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nhập họ tên"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="phone" className="form-label">Số điện thoại *</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nhập số điện thoại"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email *</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="name@example.com"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="address" className="form-label">Địa chỉ</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nhập địa chỉ"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    <h5>Hành khách</h5>
                    <div className="row mb-3">
                        <div className="col-md-4">
                            <PassengerCounter
                                label="Người lớn"
                                count={formData.adults}
                                onIncrement={() => setFormData({ ...formData, adults: formData.adults + 1 })}
                                onDecrement={() => setFormData({ ...formData, adults: Math.max(0, formData.adults - 1) })}
                            />
                        </div>
                        <div className="col-md-4">
                            <PassengerCounter
                                label="Trẻ em"
                                count={formData.children}
                                onIncrement={() => setFormData({ ...formData, children: formData.children + 1 })}
                                onDecrement={() => setFormData({ ...formData, children: Math.max(0, formData.children - 1) })}
                            />
                        </div>
                        <div className="col-md-4">
                            <PassengerCounter
                                label="Em bé"
                                count={formData.infants}
                                onIncrement={() => setFormData({ ...formData, infants: formData.infants + 1 })}
                                onDecrement={() => setFormData({ ...formData, infants: Math.max(0, formData.infants - 1) })}
                            />
                        </div>
                    </div>

                    <h5>Thông tin hành khách</h5>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="passengerName" className="form-label">Họ tên *</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nhập họ tên"
                                    name="passengerName"
                                    value={formData.passengerName}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="mb-3">
                                <label htmlFor="gender" className="form-label">Giới tính *</label>
                                <select
                                    name="gender"
                                    className="form-select"
                                    value={formData.gender}
                                    onChange={handleChange}
                                >
                                    <option>Nam</option>
                                    <option>Nữ</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="mb-3">
                                <label htmlFor="birthDate" className="form-label">Ngày sinh *</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="birthDate"
                                    value={formData.birthDate}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* Right Section - Tour Summary */}
                <div className="col-md-4">
                    <div className="card p-4">
                        <img src="tour-image.jpg" className="card-img-top" alt="Tour" />
                        <div className="card-body">
                            <h5 className="card-title">{tour.result.detailRouteName}</h5>
                            <ul className="list-unstyled">
                                <li>Mã tour: {tour.result.detailRouteId}</li>
                                <li>Ngày khởi hành: {tour.result.timeToDeparture}</li>
                                <li>Ngày kết thúc: {tour.result.timeToFinish}</li>
                                <li>Đánh giá: {tour.result.rating}</li>
                            </ul>

                            <h6>KHÁCH HÀNG + PHỤ THU</h6>
                            <ul className="list-unstyled">
                                <li>Người lớn {formData.adults} x 12,990,000 ₫</li>
                                <li>Trẻ em {formData.children} x 8,000,000 ₫</li>
                                <li>Em bé {formData.infants} x 3,000,000 ₫</li>
                            </ul>

                            <div className="text-end fw-bold text-danger fs-4">
                                TỔNG TIỀN: {totalPrice().toLocaleString()} ₫
                            </div>
                        </div>
                        <button type="button" className="btn btn-primary mt-4" onClick={handleSubmit}>
                            Đặt tour
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Passenger Counter Component
const PassengerCounter = ({ label, count, onIncrement, onDecrement }) => (
    <div className="d-flex align-items-center justify-content-between border rounded p-2">
        <span>{label}</span>
        <button className="btn btn-outline-secondary btn-sm" onClick={onDecrement}>-</button>
        <span>{count}</span>
        <button className="btn btn-outline-secondary btn-sm" onClick={onIncrement}>+</button>
    </div>
);

export default BookingTour;

