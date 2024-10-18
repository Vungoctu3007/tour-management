import { Link } from "react-router-dom";
const tour_lists = [
  {
    title: "DU LỊCH SINGAPORE - MALAYSIA 6 NGÀY 5 ĐÊM",
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

function TourList({ isInsideCol }) {
  const colClass = isInsideCol ? "col-md-6" : "col-md-4";
  return (
    <div className="row">
      {tour_lists.map((tour, index) => (
        <div key={index} className={colClass + " mb-4"}>
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
                Lượt xem: {tour.views} | Đánh giá: {tour.rating}/5 | Đặt chỗ:{" "}
                {tour.bookings}
                <br />
                Khởi hành: {tour.departureDate}
                <br />
                Thời gian: {tour.duration}
                <br />
                Giá từ: <span className="text-danger">{tour.price}</span>
                <br />
                Còn lại {tour.availableSeats} chỗ
              </p>
              <Link to="#" className="btn btn-primary w-100">
                Đặt ngay
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TourList;
