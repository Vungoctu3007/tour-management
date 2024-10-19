import { Link } from "react-router-dom";
import Images from "../../assets/images/item.jpg"
const tour_lists = [
  {
    id:1,
    title: "DU LỊCH SINGAPORE - MALAYSIA 6 NGÀY 5 ĐÊM",
    departure: "Hồ Chí Minh",
    views: 122,
    rating: 0,
    bookings: 0,
    departureDate: "21-10-2024",
    duration: "6 ngày 5 đêm",
    price: "12.990.000 đ / Khách",
    availableSeats: 10,
    imageUrl: Images,
  },
  {
    id:2,
    title: "DU LỊCH HÀ NỘI - HẠ LONG 3 NGÀY 2 ĐÊM",
    departure: "Hà Nội",
    views: 200,
    rating: 4,
    bookings: 15,
    departureDate: "05-11-2024",
    duration: "3 ngày 2 đêm",
    price: "6.500.000 đ / Khách",
    availableSeats: 5,
    imageUrl: Images,
  },
  {
    id:3,
    title: "DU LỊCH ĐÀ NẴNG - HỘI AN 4 NGÀY 3 ĐÊM",
    departure: "Đà Nẵng",
    views: 300,
    rating: 5,
    bookings: 10,
    departureDate: "12-12-2024",
    duration: "4 ngày 3 đêm",
    price: "7.800.000 đ / Khách",
    availableSeats: 8,
    imageUrl: Images,
  },
  {
    id:4,
    title: "DU LỊCH PHÚ QUỐC TAM ĐẢO 2 NGÀY 1 ĐÊM",
    departure: "Hồ Chí Minh",
    views: 180,
    rating: 4.5,
    bookings: 20,
    departureDate: "18-10-2024",
    duration: "2 ngày 1 đêm",
    price: "5.000.000 đ / Khách",
    availableSeats: 3,
    imageUrl: Images,
  },
  {
    id:5,
    title: "DU LỊCH PHÚ QUỐC TAM ĐẢO 2 NGÀY 1 ĐÊM",
    departure: "Hồ Chí Minh",
    views: 180,
    rating: 4.5,
    bookings: 20,
    departureDate: "18-10-2024",
    duration: "2 ngày 1 đêm",
    price: "5.000.000 đ / Khách",
    availableSeats: 3,
    imageUrl: Images,
  },
  {
    id:6,
    title: "DU LỊCH PHÚ QUỐC TAM ĐẢO 2 NGÀY 1 ĐÊM",
    departure: "Hồ Chí Minh",
    views: 180,
    rating: 4.5,
    bookings: 20,
    departureDate: "18-10-2024",
    duration: "2 ngày 1 đêm",
    price: "5.000.000 đ / Khách",
    availableSeats: 3,
    imageUrl: Images,
  },
];

function TourList({ isInsideCol,selectedId }) {
  const colClass = isInsideCol ? "col-md-6" : "col-md-4";
  const filteredTours=selectedId ? tour_lists.filter((tour) => tour.id === selectedId) : tour_lists
  console.log(filteredTours);
  return (
    <div className="row">
      {filteredTours.map((tour, index) => (
        <div key={index} className={colClass + " mb-4"}>
          <div className="card">
            <img
              src={tour.imageUrl}
              className="card-img-top"
              alt={tour.title}
              style={{ height:"270px"}}
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
