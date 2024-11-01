package com.example.tourmanagement.repository;

import com.example.tourmanagement.dto.response.ImageResponse;
import com.example.tourmanagement.dto.response.LegResponse;
import com.example.tourmanagement.entity.Leg;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LegRepository extends JpaRepository<Leg, Integer> {
    //    get all leg by detailId
    @Query("SELECT new com.example.tourmanagement.dto.response.LegResponse(leg.id,leg.title,leg.description,leg.sequence,image.textImage) " +
            "FROM Leg leg " +
            "JOIN Image image ON leg.sequence=image.id " +
            "WHERE leg.detailRoute.id = :detailRouteId")
    List<LegResponse> getAllLegByDetailId(Integer detailRouteId);
}
