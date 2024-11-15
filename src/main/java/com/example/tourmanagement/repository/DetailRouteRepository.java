package com.example.tourmanagement.repository;

import com.example.tourmanagement.dto.response.AvailableQuantityDetailRouteResponse;
import com.example.tourmanagement.entity.Detailroute;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface DetailRouteRepository extends JpaRepository<Detailroute, Integer> {
    @Query("SELECT new com.example.tourmanagement.dto.response.AvailableQuantityDetailRouteResponse(t.stock, t.bookInAdvance) " +
            "FROM Detailroute t WHERE t.id = :detailTourId")
    AvailableQuantityDetailRouteResponse findStockAndBookingAdvanceByTourId(@Param("detailTourId") Integer detailTourId);
}

