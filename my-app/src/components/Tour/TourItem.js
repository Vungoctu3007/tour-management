import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Images from "../../assets/images/item.jpg";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import StarBorderPurple500Icon from "@mui/icons-material/StarBorderPurple500";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import styles from "./TourList.module.css";
function TourItem({ isInsideCol, isHorizontal, selectedId ,routes}) {
  const colClass = isInsideCol ? "" : "col-md-4";
  const cardRowClass = isHorizontal ? "row" : "row flex-column";
  const filterRoute = selectedId
    ? routes.filter((route) => route.id === selectedId)
    : routes;
  return (
    <div className="row">
      {routes.map((route, index) => (
        <div key={index} className={colClass + " mb-4"}>
          <div className="card">
            <div className={cardRowClass}>
              <div className={isHorizontal ? "col-md-4" : "col-md-12"}>
                <div className="position-relative">
                  <img
                    src={require(`../../assets/images/Tour/${route.textImage}`)}
                    className="img-fluid rounded w-100"
                    alt={route.textImage}
                    style={{ height: "280px", objectFit: "cover" }}
                  />
                  <div className={`position-absolute p-2 ${styles.discount}`}>
                    <span className="text-white">Khuyễn mãi giảm 10%</span>
                  </div>
                </div>
              </div>
              <div className={isHorizontal ? "col-md-8" : "col-md-12"}>
                <div className="card-body mt-2">
                  <h5
                    className="card-title"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "normal",
                    }}
                  >
                    {route.detailRouteName}
                  </h5>
                  <ul className="list-unstyled mt-4">
                    <li className="d-flex align-items-center mb-2">
                      <AccessAlarmIcon className="me-2" />
                      <span>Thời Gian: </span>
                    </li>
                    <li className="d-flex align-items-center mb-2">
                      <InsertInvitationIcon className="me-2" />
                      <span>Ngày ĐI: {route.timeToDeparture}</span>
                    </li>
                    <li className="d-flex align-items-center ">
                      <Link className="d-flex align-items-center text-decoration-none">
                        <StarBorderPurple500Icon className="me-2 text-dark" />
                        <span>Đánh Giá: {route.rating}</span>
                      </Link>
                    </li>
                  </ul>

                  <div className="card-bottom" style={{ marginTop: "20px" }}>
                    <div className="d-flex align-items-center justify-content-between mb-1">
                      <div className="text-muted text-decoration-line-through">
                        <span className="fs-6 "> {}</span>
                        <span className="">VND</span>
                      </div>
                      <span>Còn lại {route.stock} chỗ</span>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="">
                        <span className="fs-4 fw-bold text-primary">
                          {" "}
                          {/* {tour.price} */}
                          giá
                        </span>
                        <span className="fw-bold">VND</span>
                      </div>

                      <Link
                        to={`/tour/detail/${route.detailRouteId}`}
                        className="btn btn-primary fw-bold "
                      >
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
