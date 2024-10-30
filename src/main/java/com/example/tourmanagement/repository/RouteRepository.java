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
            "de.timeToDeparture, de.timeToFinish, img.id, img.textImage, fe.rating) " +
            "FROM Detailroute de " +
            "left JOIN Image img ON img.id = de.id " +
            "LEFT JOIN Feedback fe ON de.id = fe.id "
           )
    List<RouteResponse> getDetailRoute(Pageable pageable );

    @Query("SELECT COUNT(*) FROM Detailroute")
    long getCountRoute();

}
//  "JOIN Route ro ON de.id = ro.id " +



//    @Query(value = "SELECT detail.id, detail.detailRouteName, detail.description, detail.stock, " +
//            "detail.timeToDeparture, detail.timeToFinish, detail.route, image.id, image.textImage " +
//            "FROM Detailroute detail " +
//            "JOIN Image image ON detail.id = image.id " )
//    List<RouteResponse> getDetailRoute();
