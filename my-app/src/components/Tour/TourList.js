import { useState, useEffect } from "react";
import TourItem from "./TourItem";
import PaginationComponent from "../Pagination";
import { getAllRoutes } from "../../services/routeService";
function TourList({ isHorizontal, isInsideCol, isShowPagination }) {
  const [routes, setRoutes] = useState([]);
  const [pageSize] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const data = await getAllRoutes(currentPage, pageSize);
        setRoutes(data.result.routes);
        setTotalPages(data.result.totalPages);
        console.log(data.result.routes)
      } catch (error) {
        console.error("Error fetching routes", error);
      }
    };
    fetchRoute();
  }, [currentPage, pageSize]);
  return (
    <>
      <TourItem
        routes={routes}
        isHorizontal={isHorizontal}
        isInsideCol={isInsideCol}
      />
      {isShowPagination && (
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </>
  );
}

export default TourList;
