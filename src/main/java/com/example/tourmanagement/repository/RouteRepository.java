package com.example.tourmanagement.repository;

import com.example.tourmanagement.dto.response.ImageResponse;
import com.example.tourmanagement.dto.response.RouteResponse;
import com.example.tourmanagement.dto.response.RouteResponseDetail;
import com.example.tourmanagement.entity.Route;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface RouteRepository extends JpaRepository<Route, Integer> {

    // get all detail route
    @Query("SELECT new com.example.tourmanagement.dto.response.RouteResponse(" +
            "de.id, de.route.id, de.detailRouteName, de.description, de.stock, " +
            "de.timeToDeparture, de.timeToFinish, img.id, img.textImage, AVG(fe.rating)) " +
            "FROM Detailroute de " +
            "JOIN Image img ON de.id = img.detailRoute.id " +
            "LEFT JOIN Feedback fe ON de.id = fe.detailRoute.id " +
            "WHERE img.isPrimary =1" +
            "GROUP BY de.id"
    )
    Page<RouteResponse> getDetailRoute(Pageable pageable);

    // get quantity detail route
    @Query("SELECT COUNT(*) FROM Detailroute")
    long getCountRoute();

    // get detail route by id
    @Query("SELECT new com.example.tourmanagement.dto.response.RouteResponseDetail(" +
            "de.id, de.route.id, de.detailRouteName, de.description, de.stock, " +
            "de.timeToDeparture, de.timeToFinish, AVG(fe.rating)) " +
            "FROM Detailroute de " +
            "JOIN Image img ON de.id = img.detailRoute.id " +
            "LEFT JOIN Feedback fe ON de.id = fe.detailRoute.id " +
            "WHERE de.id = :id "
    )
    RouteResponseDetail getDetailRouteById(Integer id);

    // get route by search
    @Query("SELECT new com.example.tourmanagement.dto.response.RouteResponse(" +
            "detail.id, detail.route.id, detail.detailRouteName, detail.description, detail.stock, " +
            "detail.timeToDeparture, detail.timeToFinish, img.id, img.textImage, AVG(fe.rating), arrival.id, arrival.arrivalName)" +
            "FROM Detailroute detail " +
            "JOIN Image img ON detail.id = img.detailRoute.id " +
            "JOIN Route route ON route.id = detail.route.id " +
            "JOIN Arrival arrival ON arrival.id = route.arrival.id " +
            "LEFT JOIN Feedback fe ON fe.detailRoute.id = detail.id " +
            "LEFT JOIN Departure departure ON route.departure.id = departure.id " +
            "WHERE arrival.arrivalName = :arrivalName AND departure.departureName = :departureName " +
            "AND detail.timeToDeparture >= :timeToDeparture AND detail.timeToDeparture > CURRENT DATE " +
            "GROUP BY detail.id "
    )
    // ngày trong tour phải lớn hơn ngày tìm kiếm
    Page<RouteResponse> findRoutesByArrivalDepartureAndDate(String arrivalName,
                                                            String departureName,
                                                            LocalDate timeToDeparture,
                                                            Pageable pageable);

}


