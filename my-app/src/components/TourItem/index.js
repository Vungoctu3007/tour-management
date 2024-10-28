import { Link } from "react-router-dom";
import Images from "../../assets/images/item.jpg";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import StarBorderPurple500Icon from "@mui/icons-material/StarBorderPurple500";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import styles from "./TourList.module.css"
const tour_lists = [
  {
    id: 1,
    title: "DU LỊCH SINGAPORE - MALAYSIA 6 NGÀY 5 ĐÊM",
    departure: "Hồ Chí Minh",
    views: 122,
    rating: 0,
    bookings: 0,
    departureDate: "21-10-2024",
    duration: "6 ngày 5 đêm",
    price: "12.990.000",
    availableSeats: 10,
    imageUrl: Images,
  },
  {
    id: 2,
    title: "DU LỊCH HÀ NỘI - HẠ LONG 3 NGÀY 2 ĐÊM",
    departure: "Hà Nội",
    views: 200,
    rating: 4,
    bookings: 15,
    departureDate: "05-11-2024",
    duration: "3 ngày 2 đêm",
    price: "6.500.000",
    availableSeats: 5,
    imageUrl: Images,
  },
  {
    id: 3,
    title: "DU LỊCH ĐÀ NẴNG - HỘI AN 4 NGÀY 3 ĐÊM",
    departure: "Đà Nẵng",
    views: 300,
    rating: 5,
    bookings: 10,
    departureDate: "12-12-2024",
    duration: "4 ngày 3 đêm",
    price: "7.800.000",
    availableSeats: 8,
    imageUrl: Images,
  },
  {
    id: 4,
    title: "DU LỊCH PHÚ QUỐC TAM ĐẢO 2 NGÀY 1 ĐÊM",
    departure: "Hồ Chí Minh",
    views: 180,
    rating: 4.5,
    bookings: 20,
    departureDate: "18-10-2024",
    duration: "2 ngày 1 đêm",
    price: "5.000.000",
    availableSeats: 3,
    imageUrl: Images,
  },
  {
    id: 5,
    title: "DU LỊCH PHÚ QUỐC TAM ĐẢO 2 NGÀY 1 ĐÊM",
    departure: "Hồ Chí Minh",
    views: 180,
    rating: 4.5,
    bookings: 20,
    departureDate: "18-10-2024",
    duration: "2 ngày 1 đêm",
    price: "5.000.000",
    availableSeats: 3,
    imageUrl: Images,
  },
  {
    id: 6,
    title: "DU LỊCH PHÚ QUỐC TAM ĐẢO 2 NGÀY 1 ĐÊM",
    departure: "Hồ Chí Minh",
    views: 180,
    rating: 4.5,
    bookings: 20,
    departureDate: "18-10-2024",
    duration: "2 ngày 1 đêm",
    price: "5.000.000",
    availableSeats: 3,
    imageUrl: Images,
  },
];
function TourItem({ isInsideCol, isHorizontal, selectedId }) {
  const colClass = isInsideCol ? "" : "col-md-4";
  const cardRowClass = isHorizontal ? "row" : "row flex-column";
  const filteredTours = selectedId
    ? tour_lists.filter((tour) => tour.id === selectedId)
    : tour_lists;
  return (
    <div className="row">
      {filteredTours.map((tour, index) => (
        <div key={index} className={colClass + " mb-4"}>
          <div className="card">
            <div className={cardRowClass}>
              <div className={isHorizontal ? "col-md-4" : "col-md-12"}>
                <div className="position-relative">
                  <img
                    src={tour.imageUrl}
                    className="img-fluid rounded w-100"
                    alt={tour.title}
                    style={{ height: "280px", objectFit: "cover" }}
                  />
                  <div
                    className={`position-absolute p-2 ${styles.discount}`}
                  >
                   <span className="text-white">Khuyễn mãi giảm 10%</span>
                  </div>
                </div>
              </div>
              <div className={isHorizontal ? "col-md-8" : "col-md-12"}>
                <div className="card-body mt-2">
                  <h5 className="card-title">{tour.title}</h5>
                  <ul className="list-unstyled mt-4">
                    <li className="d-flex align-items-center mb-2">
                      <AccessAlarmIcon className="me-2" />
                      <span>Thời Gian: {tour.duration}</span>
                    </li>
                    <li className="d-flex align-items-center mb-2">
                      <InsertInvitationIcon className="me-2" />
                      <span>Ngày ĐI: {tour.departureDate}</span>
                    </li>
                    <li className="d-flex align-items-center ">
                      <Link className="d-flex align-items-center text-decoration-none">
                        <StarBorderPurple500Icon className="me-2 text-dark" />
                        <span>Đánh Giá: {tour.rating}/5</span>
                      </Link>
                    </li>
                  </ul>

                  <div className="card-bottom" style={{ marginTop: "20px" }}>
                    <div className="d-flex align-items-center justify-content-between mb-1">
                      <div className="text-muted text-decoration-line-through">
                        <span className="fs-6 "> {tour.price}</span>
                        <span className="">VND</span>
                      </div>
                      <span>Còn lại {tour.availableSeats} chỗ</span>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="">
                        <span className="fs-4 fw-bold text-primary">
                          {" "}
                          {tour.price}
                        </span>
                        <span className="fw-bold">VND</span>
                      </div>

                      <Link to={`/tour/detail/${tour.id}`} className="btn btn-primary fw-bold ">
                        Xem Tour
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TourItem;
