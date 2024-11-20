package com.example.tourmanagement.repository;

import com.example.tourmanagement.dto.response.DepartureAndArrivalResponse;
import com.example.tourmanagement.dto.response.ImageResponse;
import com.example.tourmanagement.dto.response.RouteResponse;
import com.example.tourmanagement.dto.response.RouteResponseDetail;
import com.example.tourmanagement.entity.Route;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface RouteRepository extends JpaRepository<Route, Integer> {
    // get all route
    @Query("SELECT new com.example.tourmanagement.dto.response.RouteResponse(" +
            "de.id, de.route.id, de.detailRouteName, de.description, de.stock, " +
            "de.timeToDeparture, de.timeToFinish, img.id, img.textImage, AVG(fe.rating), de.price) " +
            "FROM Detailroute de " +
            "JOIN Image img ON de.id = img.detailRoute.id " +
            "LEFT JOIN Feedback fe ON de.id = fe.detailRoute.id " +
            "WHERE img.isPrimary =1 AND de.timeToDeparture > CURRENT DATE " +
            "GROUP BY de.id " +
            "ORDER BY CASE " +
            "WHEN :sort = 'asc' THEN de.price END ASC, " +
            "CASE " +
            "WHEN :sort = 'desc' THEN de.price END DESC, " +
            "CASE " +
            "WHEN :sort = 'rating' THEN AVG(fe.rating) END DESC"
    )
    Page<RouteResponse> getDetailRoute(Pageable pageable, String sort);


    // get detail route by id

    @Query("SELECT new com.example.tourmanagement.dto.response.RouteResponseDetail(" +
            "de.id, de.route.id, de.detailRouteName, de.description, de.stock, " +
            "de.timeToDeparture, de.timeToFinish, AVG(fe.rating), de.price, departure.departureName) " +
            "FROM Detailroute de " +
            "JOIN Route route ON de.route.id = route.id " +
            "JOIN Departure departure ON route.departure.id = departure.id " +
            "JOIN Image img ON de.id = img.detailRoute.id " +
            "LEFT JOIN Feedback fe ON de.id = fe.detailRoute.id " +
//            "WHERE img.isPrimary = 1 AND de.id = :id " +
            "WHERE de.id = :id " +
            "GROUP BY de.id")
    RouteResponseDetail getDetailRouteById(@Param("id") Integer id);

    // get route by search đủ 3 tham số
    @Query("SELECT new com.example.tourmanagement.dto.response.RouteResponse(" +
            "detail.id, detail.route.id, detail.detailRouteName, detail.description, detail.stock, " +
            "detail.timeToDeparture, detail.timeToFinish, img.id, img.textImage, AVG(fe.rating), arrival.id, arrival.arrivalName, detail.price)" +
            "FROM Detailroute detail " +
            "JOIN Image img ON detail.id = img.detailRoute.id " +
            "JOIN Route route ON route.id = detail.route.id " +
            "JOIN Arrival arrival ON arrival.id = route.arrival.id " +
            "LEFT JOIN Feedback fe ON fe.detailRoute.id = detail.id " +
            "LEFT JOIN Departure departure ON route.departure.id = departure.id " +
            "WHERE img.isPrimary=1 AND arrival.arrivalName = :arrivalName AND departure.departureName = :departureName " +
            "AND detail.timeToDeparture >= :timeToDeparture AND detail.timeToDeparture > CURRENT DATE " +
            "GROUP BY detail.id "+
            "ORDER BY CASE " +
            "WHEN :sort = 'asc' THEN detail.price END ASC, " +
            "CASE " +
            "WHEN :sort = 'desc' THEN detail.price END DESC, " +
            "CASE " +
            "WHEN :sort = 'rating' THEN AVG(fe.rating) END DESC"
    )
    // ngày trong tour phải lớn hơn ngày tìm kiếm
    Page<RouteResponse> findRoutesByArrivalDepartureAndDate(String arrivalName,
                                                            String departureName,
                                                            LocalDate timeToDeparture,
                                                            Pageable pageable, String sort);

    //    search by arrivalName
    @Query("SELECT new com.example.tourmanagement.dto.response.RouteResponse(" +
            "detail.id, detail.route.id, detail.detailRouteName, detail.description, detail.stock, " +
            "detail.timeToDeparture, detail.timeToFinish, img.id, img.textImage, AVG(fe.rating), arrival.id, arrival.arrivalName, detail.price)" +
            "FROM Detailroute detail " +
            "JOIN Image img ON detail.id = img.detailRoute.id " +
            "JOIN Route route ON route.id = detail.route.id " +
            "JOIN Arrival arrival ON arrival.id = route.arrival.id " +
            "LEFT JOIN Feedback fe ON fe.detailRoute.id = detail.id " +
            "LEFT JOIN Departure departure ON route.departure.id = departure.id " +
            "WHERE img.isPrimary=1 AND arrival.arrivalName = :arrivalName " +
            "AND detail.timeToDeparture > CURRENT DATE  " +
            "GROUP BY detail.id "+
            "ORDER BY CASE " +
            "WHEN :sort = 'asc' THEN detail.price END ASC, " +
            "CASE " +
            "WHEN :sort = 'desc' THEN detail.price END DESC, " +
            "CASE " +
            "WHEN :sort = 'rating' THEN AVG(fe.rating) END DESC"
    )
    // ngày trong tour phải lớn hơn ngày tìm kiếm
    Page<RouteResponse> findRoutesByArrival(String arrivalName,
                                            Pageable pageable,String sort);


    @Query("select new com.example.tourmanagement.dto.response.DepartureAndArrivalResponse(" +
            "route.id, de.departureName, ar.arrivalName ) " +
            "from Route route " +
            "join  Arrival ar on route.arrival.id = ar.id " +
            "join  Departure  de on route.departure.id = de.id "
    )
    List<DepartureAndArrivalResponse> getAllDepartureAndArrivals();
}