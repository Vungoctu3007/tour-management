import SwapVertIcon from "@mui/icons-material/SwapVert";
import CategoryTitle from "../../../components/CategoryTitle";
import { useState, useEffect } from "react";
import SearchInput from "../../../components/Search/searchInput";
import styles from "./Tour.module.css";
import SortForm from "./SortForm";
import PaginationComponent from "../../../components/Pagination";
import {
  getAllRoutes,
  getRouteByAllSearch,
} from "../../../services/routeService";
import TourItem from "../../../components/Tour/TourItem";
function Tour() {
  const [routes, setRoutes] = useState([]);
  const pageSize = 2;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const [searchParams, setSearchParams] = useState([]);
  // lấy ra danh sách route
  useEffect(() => {
    const fetchRoute = async () => {
      try {
        let data;
        if (isSearching) {
          const { arrivalName, departureName, timeToDeparture } = searchParams;
           data = await getRouteByAllSearch(
            arrivalName,
            departureName,
            timeToDeparture,
            currentPage,
            1
          );
        } else {
          data =await getAllRoutes(currentPage, pageSize);
        }
        setRoutes(data.result.routes);
        setTotalPages(data.result.totalPages);
      } catch (error) {
        console.error("Error fetching routes", error);
      }
    };
    fetchRoute();
  }, [currentPage, pageSize, isSearching,searchParams]);

  // lọc
  const onSearchResults = async (searchData) => {
    setSearchParams(searchData);
    setCurrentPage(1);
    setIsSearching(true);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container">
      <div>
        <div className="row">
          <SearchInput
            onSearchResults={onSearchResults}
            currentPage={currentPage}
            pageSize={pageSize}
          ></SearchInput>
        </div>
        <div className="row mt-4">
          <CategoryTitle />
        </div>
        <div className="row mt-4">
          <div className="col-md-3">
            <div className={`${styles.filte} card`}>
              <div className="card-header bg-light">
                <SwapVertIcon /> Sắp xếp
              </div>
              <div className="card-body">
                <SortForm />
              </div>
            </div>
            <div className={`${styles.filte} card`}>dgdsg</div>
          </div>
          <div className="col-md-9">
            <div
              className="rounded-pill d-flex justify-content-between align-items-center mb-3 p-2"
              style={{ background: "#f2f4f4" }}
            >
              <span>Tổng Cộng {routes.length} Tour</span>
            </div>
            <TourItem routes={routes} isHorizontal={true} isInsideCol={true} />
            <PaginationComponent
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tour;
