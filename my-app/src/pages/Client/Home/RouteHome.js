import { Link } from "react-router-dom";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import StarBorderPurple500Icon from "@mui/icons-material/StarBorderPurple500";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import styles from "./Home.module.css";

function RouteHome({ routes }) {
  return (
    <div className="container">
      <div className="row">
        {routes.map((route, index) => (
          <div key={index} className="col-md-6 mb-4">
            {" "}
         
            <div className="card" style={{ width: "100%" }}>
              <div className="row">
                <div className="col-md-5">
                  <div className="position-relative">
                    <img
                      src={require(`../../../assets/images/Tour/${route.textImage}`)}
                      className={`img-fluid rounded w-100 ${styles.imageroute}`}
                      alt={route.textImage}
                    />
                    <div className={`position-absolute p-2 ${styles.discount}`}>
                      <span className="text-white">Khuyễn mãi giảm 10%</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-7 ">
                  <div className="card-body mt-2">
                    <h5 className={`card-title ${styles.title}`}>
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
                          {route.rating && (
                            <div>
                              <StarBorderPurple500Icon className="me-2 text-dark" />
                              <span>Đánh Giá: {route.rating}</span>
                            </div>
                          )}
                        </Link>
                      </li>
                    </ul>

                    <div className="card-bottom ">
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <div className="text-muted text-decoration-line-through">
                          <span className="fs-6 ">{}</span>
                          <span className="">5000000000VND</span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <span className="fs-4 fw-bold text-primary">
                            {route.price.toLocaleString("vi-VN")}
                          </span>
                          <span className="fw-bold">VND</span>
                        </div>

                        <Link
                          to={`/route/detail/${route.detailRouteId}`}
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
    </div>
  );
}

export default RouteHome;
