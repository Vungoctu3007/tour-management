import { useEffect, useState } from "react";
import Slider from "../../../layouts/Slider";
import RouteHome from "./RouteHome";
import { Link } from "react-router-dom";
import {getAllRoutes} from "../../../services/routeService"
function Home() {
  const [routes, setRoutes] = useState([]);
  useEffect(() => {
    const fetItem = async () => {
      try {
        const data = await getAllRoutes(1,10,'asc');
        setRoutes(data.result.routes);
      } catch (error) {
        console.error(error);
      }
    };
    fetItem();
  }, []);
  return (
    <div className="">
      <Slider />
      <div className="container">
        <div className="row"></div>
        <div className="row mt-4 ">
          <span className="fs-4 fw-bold d-flex justify-content-center">
            Tour Du Lịch
          </span>
          <div className="mt-4">
            <RouteHome routes={routes}/>
          </div>
        </div>
        <div className="row">
          <div className="d-flex justify-content-center">
            <Link to={`/route/`} className="btn btn-primary fw-bold ">
              Xem Thêm Tour
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
