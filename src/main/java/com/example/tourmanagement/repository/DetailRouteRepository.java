package com.example.tourmanagement.repository;

import com.example.tourmanagement.dto.response.AvailableQuantityDetailRouteResponse;
import com.example.tourmanagement.entity.Detailroute;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface DetailRouteRepository extends JpaRepository<Detailroute, Integer> {
    @Query("SELECT new com.example.tourmanagement.dto.response.AvailableQuantityDetailRouteResponse(t.stock, t.bookInAdvance) " +
            "FROM Detailroute t WHERE t.id = :detailTourId")
    AvailableQuantityDetailRouteResponse findStockAndBookingAdvanceByTourId(@Param("detailTourId") Integer detailTourId);
    @Modifying
    @Transactional
    @Query("UPDATE Detailroute t SET t.bookInAdvance = t.bookInAdvance + :countPassenger " +
        "WHERE t.id = :detailRouteId")
    int updateBookingInAdvance(@Param("detailRouteId") Integer detailRouteId,
        @Param("countPassenger") int countPassenger);


}

