import Search from "../../../components/Search";
import CategoryTitle from "../../../components/CategoryTitle";
import { Link } from "react-router-dom";

const tour_list = [
  {
    title: "DU LỊCH SINGAPORE - INDONESIA - MALAYSIA 6 NGÀY 5 ĐÊM",
    departure: "Hồ Chí Minh",
    views: 122,
    rating: 0,
    bookings: 0,
    departureDate: "21-10-2024",
    duration: "6 ngày 5 đêm",
    price: "12.990.000 đ / Khách",
    availableSeats: 10,
    imageUrl: "https://via.placeholder.com/300x200",
  },
  {
    title: "DU LỊCH HÀ NỘI - HẠ LONG 3 NGÀY 2 ĐÊM",
    departure: "Hà Nội",
    views: 200,
    rating: 4,
    bookings: 15,
    departureDate: "05-11-2024",
    duration: "3 ngày 2 đêm",
    price: "6.500.000 đ / Khách",
    availableSeats: 5,
    imageUrl: "https://via.placeholder.com/300x200",
  },
  {
    title: "DU LỊCH ĐÀ NẴNG - HỘI AN 4 NGÀY 3 ĐÊM",
    departure: "Đà Nẵng",
    views: 300,
    rating: 5,
    bookings: 10,
    departureDate: "12-12-2024",
    duration: "4 ngày 3 đêm",
    price: "7.800.000 đ / Khách",
    availableSeats: 8,
    imageUrl: "https://via.placeholder.com/300x200",
  },
  {
    title: "DU LỊCH PHÚ QUỐC TAM ĐẢO 2 NGÀY 1 ĐÊM",
    departure: "Hồ Chí Minh",
    views: 180,
    rating: 4.5,
    bookings: 20,
    departureDate: "18-10-2024",
    duration: "2 ngày 1 đêm",
    price: "5.000.000 đ / Khách",
    availableSeats: 3,
    imageUrl: "https://via.placeholder.com/300x200",
  },
];

function Tour() {
  return (
    <div className="container">
      <CategoryTitle />
      <div>
        {/* Header  */}
        <div className="row">
          <div className="col-md-3">
            <h3>Tours</h3>
            <p>Khám phá trải nghiệm, tour du lịch và hơn thế nữa</p>
          </div>
          <div className="col-md-9">
            <Search></Search>
          </div>
        </div>
        <div className="row">
          {/* <!-- Sidebar Filters --> */}
          <div className="col-md-3">
            <div
              className="p-2"
              style={{ background: "#f2f4f4", borderRadius: "16px" }}
            >
              <div className="mb-4">
                <label for="departure" className="form-label">
                  Điểm Khởi Hành
                </label>
                <select id="departure" className="form-select">
                  <option selected>----------</option>
                  <option value="1">Hồ Chí Minh</option>
                  <option value="2">Hà Nội</option>
                </select>
              </div>
              <div className="mb-4">
                <label for="destination" className="form-label">
                  Điểm Đến
                </label>
                <select id="destination" className="form-select">
                  <option selected>----------</option>
                  <option value="1">Singapore</option>
                  <option value="2">Trung Quốc</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="form-label">Khoảng Thời Gian</label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="duration"
                    id="1day"
                    value="1day"
                  />
                  <label className="form-check-label" for="1day">
                    1 ngày
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="duration"
                    id="1to3days"
                    value="1to3days"
                  />
                  <label className="form-check-label" for="1to3days">
                    1 đến 3 ngày
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="duration"
                    id="over3days"
                    value="over3days"
                  />
                  <label className="form-check-label" for="over3days">
                    Trên 3 ngày
                  </label>
                </div>
              </div>
              <div className="mb-4">
                <label className="form-label">Loại Tour</label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="inbound"
                  />
                  <label className="form-check-label" for="inbound">
                    InBound
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="outbound"
                  />
                  <label className="form-check-label" for="outbound">
                    OutBound
                  </label>
                </div>
              </div>
              <div className="">
                <button className="btn btn-primary w-100">Tìm Tour</button>
              </div>
            </div>
          </div>
          {/* <!-- Tour List --> */}
          <div className="col-md-9">
            <div
              className="rounded-pill d-flex justify-content-between align-items-center mb-3 p-2"
              style={{ background: "#f2f4f4" }}
            >
              <span>Showing 1-10 of 36 results</span>
            </div>
            <div className="row">
              {tour_list.map((tour, index) => (
                <div key={index} className="col-md-6 mb-4">
                  <div className="card">
                    <img
                      src={tour.imageUrl}
                      className="card-img-top"
                      alt={tour.title}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{tour.title}</h5>
                      <p className="card-text">
                        <small>KH từ: {tour.departure}</small>
                        <br />
                        Lượt xem: {tour.views} | Đánh giá: {tour.rating}/5 | Đặt
                        chỗ: {tour.bookings}
                        <br />
                        Khởi hành: {tour.departureDate}
                        <br />
                        Thời gian: {tour.duration}
                        <br />
                        Giá từ:{" "}
                        <span className="text-danger">{tour.price}</span>
                        <br />
                        Còn lại {tour.availableSeats} chỗ
                      </p>
                      {/* <!-- Nút "Đặt ngay" --> */}
                      <Link href="#" className="btn btn-primary w-100">
                        Đặt ngay
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tour;
