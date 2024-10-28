import { Link, useParams } from "react-router-dom";
import CategoryTitle from "../../../components/CategoryTitle";
import TourCarousel from "./TourCarousel";
import Schedule from "./Schedule";
import StartDatePriceTour from "./StartDatePriceTour";
function DetailTour() {
  const { id } = useParams();
  return (
    <div className="container">
      <div className="mt-4">
        <CategoryTitle />
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
          <Schedule />
          <StartDatePriceTour />
        </div>
        <div className="col-4"></div>
      </div>
    </div>
  );
}

export default DetailTour;
