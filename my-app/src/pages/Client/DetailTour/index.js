import { Link, useParams } from "react-router-dom";
import CategoryTitle from "../../../components/CategoryTitle";
import TourCarousel from "./TourCarousel";
import Schedule from "./Schedule";
import StartDatePriceTour from "./StartDatePriceTour";
import { useEffect, useState } from "react";
import { getRouteDetailById } from "../../../services/routeService";
function DetailTour() {
  const { id } = useParams();
  const [detailRoute, setDetailRoute] = useState({});
  const [title,setTitle]=useState("");
  useEffect(() => {
    const fetchDetailRoute = async () => {
      try {
        const data = await getRouteDetailById(id);
        setDetailRoute(data.result || {});
        setTitle(data.result.detailRouteName)
      } catch (error) {
        console.log(error);
      }
    };
    fetchDetailRoute();
  }, [id]);
  return (
    <div className="container">
      <div className="mt-4">
        <CategoryTitle title={title}/>
      </div>
      <div className="row">
        <div className="col-8">
          <TourCarousel />
        </div>
        <div className="col-4">
          <div className="border p-4">
            <div>
              <span>Mã Tour:</span>
              <span className="ms-2 fw-bold">TRDKAKSJS</span>
            </div>
            <div className="mt-2 d-flex justify-content-between">
              <Link to="" className="btn btn-primary fw-bold ">
                Liên Hệ Tư Vấn
              </Link>
              <Link to="" className="btn btn-primary fw-bold ">
                Đặt Tour Ngay
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-8">
          {Object.keys(detailRoute).length > 0 &&   <Schedule detailRoute={detailRoute} />}
          <StartDatePriceTour />
        </div>
        <div className="col-4"></div>
      </div>
    </div>
  );
}

export default DetailTour;
