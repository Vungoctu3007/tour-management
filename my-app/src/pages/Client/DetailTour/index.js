import { Link, useParams } from "react-router-dom";
import CategoryTitle from "../../../components/CategoryTitle";
import TourCarousel from "./TourCarousel";
import Schedule from "./Schedule";
import { useEffect, useState } from "react";
import { getRouteDetailById } from "../../../services/routeService";
import styles from "./DetailTour.module.css";
import FeedbackTour from "../Feedback/FeedbackTour";

function DetailTour() {
  const { id } = useParams();
  const [detailRoute, setDetailRoute] = useState({});
  const [title, setTitle] = useState("");

  useEffect(() => {
    const fetchDetailRoute = async () => {
      try {
        const data = await getRouteDetailById(id);
        setDetailRoute(data.result || {});
        setTitle(data.result.detailRouteName);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDetailRoute();
  }, [id]);

  return (
    <div className="container">
      <div className="mt-4">
        <CategoryTitle title={title} />
      </div>
      <div className="row">
        <div className="col-8">
          <h5 className={`${styles.title}`}>{detailRoute.detailRouteName}</h5>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-8">
          {Object.keys(detailRoute).length > 0 && (
            <TourCarousel detailRoute={detailRoute} />
          )}
        </div>
        <div className="col-4">
          <div className="border p-4">
            <div>
              <div className="d-flex align-items-center">
                <span>Khởi Hành Từ:</span>
                <span className="ms-2 fs-5 fw-bold">
                  {detailRoute.departureName}
                </span>
              </div>
              <span>Mã Tour:</span>
              <span className="ms-2 fw-bold fs-5">
                {detailRoute.detailRouteId}
              </span>
            </div>
            <div className="mt-2 ">
              <div className="row">
                <div className="col-6">
                  <Link to="" className="btn btn-primary fw-bold w-100 ">
                    Liên Hệ Tư Vấn
                  </Link>
                </div>
                <div className="col-6">
                  <Link to="" className="btn btn-primary fw-bold w-100">
                    Đặt Tour Ngay
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-8">
          {Object.keys(detailRoute).length > 0 && (
            <>
              <Schedule detailRoute={detailRoute} />
              <FeedbackTour detailRouteId={detailRoute.detailRouteId} />
            </>
          )}
        </div>
        <div className="col-4"></div>
      </div>
    </div>
  );
}

export default DetailTour;
