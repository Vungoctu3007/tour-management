import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getRouteDetailById } from '../../../services/bookingService';
import { handleBooking } from '../../../services/bookingService';

function BookingTour() {
    const { id } = useParams();
    const [tour, setTour] = useState(null);
    const [loading, setLoading] = useState(true);
    const userId = localStorage.getItem('userId');

    const [formData, setFormData] = useState({
        total_price: 0,
        detailRouteId: id,
        userId: userId || '',
        customerName: '',
        customerEmail: '',
        customerAddress: '',
        customerPhone: '',
        adults: 1,
        children: '0',
        infants: '0'
    });

    const totalPrice = () => {
        const adultPrice = tour.result.price;
        const childPrice = tour.result.price * 0.8;
        const infantPrice = tour.result.price * 0.5;
        return (formData.adults * adultPrice) + (formData.children * childPrice) + (formData.infants * infantPrice);
    };

    const [passengerRequestList, setPassengers] = useState([{ passengerName: '', passengerGender: 'Nam', passengerDateBirth: '', passengerObjectId: 1 }]);

    const payload = {
        ...formData,
        passengerRequestList,
    }

    useEffect(() => {
        if (tour) {
            const calculatedTotalPrice = totalPrice();  // Calculate total price based on formData
            setFormData(prevState => ({
                ...prevState,
                total_price: calculatedTotalPrice  // Update the total_price in formData
            }));
        }
    }, [formData.adults, formData.children, formData.infants, tour]);  // Recalculate when any of these values change
    
    
    // Update passenger array when the counts change

    const updatePassengerCount = (type, count) => {
        console.log(payload)
        const newCount = Math.max(0, count);
        setFormData((prev) => ({ ...prev, [type]: newCount }));
    
        let updatedPassengers = [...passengerRequestList];
        const totalPassengers = formData.adults + formData.children + formData.infants;
        const difference = newCount - formData[type];
    
        if (difference > 0) {
            // Thêm hành khách mới
            for (let i = 0; i < difference; i++) {
                const objectId = getPassengerType(type); // Lấy loại vé
                updatedPassengers.push({ passengerName: '', passengerGender: 'Nam', passengerDateBirth: '', passengerObjectId: objectId });
            }
        } else if (difference < 0) {
            // Xóa hành khách
            updatedPassengers.splice(totalPassengers + difference, -difference);
        }
    
        setPassengers(updatedPassengers);
    };
    
    // Hàm để xác định loại vé
    const getPassengerType = (type) => {
        switch (type) {
            case 'adults':
                return 1; // Người lớn
            case 'children':
                return 2; // Trẻ em
            case 'infants':
                return 3; // Trẻ sơ sinh
            default:
                return null;
        }
    };
    
    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Update individual passenger info
    const handlePassengerChange = (index, event) => {
        const { name, value } = event.target;
    
        setPassengers((prevPassengers) => {
            const updatedPassengers = [...prevPassengers];
            updatedPassengers[index] = { ...updatedPassengers[index], [name]: value };
            return updatedPassengers;
        });
    };

    useEffect(() => {
        const fetchTourData = async () => {
            try {
                const response = await getRouteDetailById(id);
                setTour(response); 
                setLoading(false); 
            } catch (error) {
                console.error('Error fetching tour data:', error);
                setLoading(false);
            }
        };

        fetchTourData();
    }, [id]); 

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!tour) {
        return <div>No tour found!</div>;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch('http://localhost:8080/api/booking/handle-booking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
            console.log('Booking successful:', data);
            // Handle success, e.g., show a success message or navigate
        } catch (error) {
            console.error('Error submitting form:', error);
            // Handle error, e.g., show an error message to the user
        }
    };
    

    // Calculate total price


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
                                    name="customerName"
                                    value={formData.customerName}
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
                                    name="customerPhone"
                                    value={formData.customerPhone}
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
                                    name="customerEmail"
                                    value={formData.customerEmail}
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
                                    name="customerAddress"
                                    value={formData.customerAddress}
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
                                onIncrement={() => updatePassengerCount('adults', formData.adults + 1)} 
                                onDecrement={() => updatePassengerCount('adults', formData.adults - 1)} 
                            />
                        </div>

                        <div className="col-md-4">
                            <PassengerCounter
                                label="Trẻ em"
                                count={formData.children}
                                onIncrement={() => updatePassengerCount('children', formData.children + 1)}
                                onDecrement={() => updatePassengerCount('children', formData.children - 1)}
                            />
                        </div>
                        <div className="col-md-4">
                            <PassengerCounter
                                label="Trẻ sơ sinh"
                                count={formData.infants}
                                onIncrement={() => updatePassengerCount('infants', formData.infants + 1)}
                                onDecrement={() => updatePassengerCount('infants', formData.infants - 1)}
                            />
                        </div>
                    </div>

                    <h5>Thông tin hành khách</h5>
                    {passengerRequestList.map((passenger, index) => (
                        <div key={index} className="row">
                            <div className="col-md-4">
                                <div className="mb-3">
                                    <label htmlFor={`passengerName${index}`} className="form-label">Họ tên *</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Nhập họ tên"
                                        name="passengerName"
                                        value={passenger.passengerName}
                                        onChange={(e) => handlePassengerChange(index, e)}
                                    />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="mb-3">
                                    <label htmlFor={`gender${index}`} className="form-label">Giới tính *</label>
                                    <select
                                        name="passengerGender"
                                        className="form-select"
                                        value={passenger.passengerGender}
                                        onChange={(e) => handlePassengerChange(index, e)}
                                    >
                                        <option value="Nam">Nam</option>
                                        <option value="Nữ">Nữ</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="mb-3">
                                    <label htmlFor={`birthDate${index}`} className="form-label">Ngày sinh *</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="passengerDateBirth"
                                        value={passenger.passengerDateBirth}
                                        onChange={(e) => handlePassengerChange(index, e)}
                                    />
                                </div>
                            </div>
                            {/* Nếu bạn muốn hiển thị object_id */}
                            <div className="col-md-2">
                                <div className="mb-3">
                                    <label className="form-label">Loại vé *</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={passenger.passengerObjectId === 1 ? "Người lớn" : passenger.passengerObjectId === 2 ? "Trẻ em" : "Trẻ sơ sinh"}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <hr></hr>
                        </div>

                    ))}
                </div>

                {/* Right Section - Tour Summary */}
                <div className="col-md-4">
                    <div className="card p-4">
                        <img src={require(`../../../assets/images/Tour/${tour.result.textImageList[0].textImage}`)} className="card-img-top" alt="Tour" />
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
                                <li>Người lớn {formData.adults} x {tour.result.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</li>
                                <li>Trẻ em {formData.children} x {(tour.result.price * 0.8).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</li>
                                <li>Em bé {formData.infants} x {(tour.result.price * 0.5).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</li>
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
