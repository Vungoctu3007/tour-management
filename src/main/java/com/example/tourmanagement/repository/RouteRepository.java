package com.example.tourmanagement.repository;

import com.example.tourmanagement.dto.response.RouteResponse;
import com.example.tourmanagement.entity.Route;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
public interface RouteRepository extends JpaRepository<Route, Integer> {

    @Query("SELECT new com.example.tourmanagement.dto.response.RouteResponse(" +
            "de.id, de.route.id, de.detailRouteName, de.description, de.stock, " +
            "de.timeToDeparture, de.timeToFinish, fe.rating, " +
            "(SELECT img.id FROM Image img WHERE img.detailRoute.id = de.id AND img.isPrimary = 1) AS imageId, " +
            "(SELECT img.textImage FROM Image img WHERE img.detailRoute.id = de.id AND img.isPrimary = 1) AS textImage) " +
            "FROM Detailroute de " +
            "JOIN Image img ON de.id = img.id AND img.isPrimary= 1 " +
            "LEFT JOIN Feedback fe ON de.id = fe.id "
           )
    List<RouteResponse> getDetailRoute(Pageable pageable );

    @Query("SELECT COUNT(*) FROM Detailroute")
    long getCountRoute();

}
//@Query("SELECT new com.example.tourmanagement.dto.response.RouteResponse(" +
//        "de.id, de.route.id, de.detailRouteName, de.description, de.stock, " +
//        "de.timeToDeparture, de.timeToFinish, img.id, img.textImage, fe.rating) " +
//        "FROM Detailroute de " +
//        "JOIN Image img ON de.id = img.id AND img.isPrimary= 1 " +
//        "LEFT JOIN Feedback fe ON de.id = fe.id "
//)
//List<RouteResponse> getDetailRoute(Pageable pageable );
