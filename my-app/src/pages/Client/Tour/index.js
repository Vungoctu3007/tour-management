import CategoryTitle from "../../../components/CategoryTitle";
import { useState, useEffect } from "react";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import SearchInput from "../../../components/Search/searchInput";
import SearchSideBar from "./SearchSideBar";
import PaginationComponent from "../../../components/Pagination";
import TourItem from "../../../components/Tour/TourItem";
import sort_options from "../../../constants/sort_options";
import styles from "./Tour.module.css";
import {
  getAllRoutes,
  getRouteByAllSearch,
  getRouteFilter,
} from "../../../services/routeService";

function Tour() {
  const [routes, setRoutes] = useState([]);
  const pageSize = 1;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchParams, setSearchParams] = useState({});
  const [totalElements, setTotalElements] = useState(0);
  // search sidebar
  const [selectArrivalName, setSelectArrivalName] = useState("");
  const [selectedSortOption, setSelectedSortOption] = useState("Mặc Định");
  const [selectedSortTitle, setSelectedSortTitle] = useState("Mặc Định");
  const [isReset, setIsReset] = useState(false);
  // lấy ra danh sách route
  useEffect(() => {
    const fetchRoute = async () => {
      try {
        let data;
        const hasSearchParamsData =
          searchParams.arrivalName ||
          searchParams.departureName ||
          searchParams.timeToDeparture;
        if (hasSearchParamsData) {
          setIsReset(true);
          const { arrivalName, departureName, timeToDeparture } = searchParams;
          data = await getRouteByAllSearch(
            arrivalName,
            departureName,
            timeToDeparture,
            currentPage,
            pageSize,
            selectedSortOption
          );
        } else if (selectArrivalName) {
          data = await getRouteFilter(
            selectArrivalName,
            currentPage,
            pageSize,
            selectedSortOption
          );
        } else {
          data = await getAllRoutes(currentPage, pageSize, selectedSortOption);
        }
        setRoutes(data.result.routes);
        setTotalPages(data.result.totalPages);
        setTotalElements(data.result.totalElements);
      } catch (error) {
        console.error("Error fetching routes", error);
      }
    };
    fetchRoute();
  }, [currentPage, searchParams, selectArrivalName, selectedSortOption]);
  //  lọc chỉ the tên bên side bar
  const handleArrivalSelect = (arrival) => {
    setSelectArrivalName(arrival);
    setCurrentPage(1);
    setSearchParams({});
  };
  // lọc theo tìm kiếm có đủ 3 tham số
  const onSearchResults = async (searchData) => {
    setSearchParams(searchData);
    setSelectArrivalName("");
    setCurrentPage(1);
    setIsReset(false);
  };
  const onSortOptionSelect = (option) => {
    setSelectedSortOption(option.value);
    setSelectedSortTitle(option.title);
    setCurrentPage(1);
    // Trigger sorting logic based on `option.value` if needed
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
          <CategoryTitle title="Danh-Sách-Tour" />
        </div>
        <div className="row mt-4">
          <div className="col-md-3">
            <SearchSideBar selectArrivalName={handleArrivalSelect}   isReset={isReset}/>
          </div>
          <div className="col-md-9">
            <div
              className="rounded d-flex justify-content-between align-items-center mb-3 p-2"
              style={{ background: "#f2f4f4" }}
            >
              <div className="d-flex">
                Tổng Cộng:{" "}
                <span className="fs-6 fw-bold ms-2">{totalElements}</span>-Tour
                {searchParams.departureName && searchParams.arrivalName && (
                  <div className="ms-2">
                    Từ{" "}
                    <span className="fs-6 fw-bold ms-1">
                      {searchParams.departureName}
                    </span>
                    <ArrowRightAltIcon />
                    <span className="fs-6 fw-bold ">
                      {searchParams.arrivalName}
                    </span>
                  </div>
                )}
              </div>
            </div>
            {/* filter */}
            <div className="dropdown border rounded col-4 mb-2">
              <div
                className={`dropdown-toggle p-2 ${styles.pointer}`}
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <SwapVertIcon />{" "}
                <span>
                  Sắp xếp theo:
                  <span className="text-success ms-2 fw-bold">
                    {selectedSortTitle}
                  </span>{" "}
                </span>
              </div>
              <ul
                className={`dropdown-menu ${styles.pointer}`}
                aria-labelledby="dropdownMenuButton"
              >
                {sort_options.map((option, index) => (
                  <li
                    className="dropdown-item "
                    key={index}
                    onClick={() => onSortOptionSelect(option)}
                  >
                    {option.title}
                  </li>
                ))}
              </ul>
            </div>
            <TourItem routes={routes} isHorizontal={true} isInsideCol={true} />
            <PaginationComponent
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tour;
