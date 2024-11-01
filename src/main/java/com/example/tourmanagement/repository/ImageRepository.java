package com.example.tourmanagement.repository;

import com.example.tourmanagement.dto.response.ImageResponse;
import com.example.tourmanagement.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ImageRepository extends JpaRepository<Image, Integer> {
    //    get all image by detailId
    @Query("SELECT new com.example.tourmanagement.dto.response.ImageResponse(img.id, img.textImage) " +
            "FROM Image img " +
            "WHERE img.detailRoute.id = :detailRouteId")
    List<ImageResponse> getImagesByDetailRouteId(Integer detailRouteId);

}
