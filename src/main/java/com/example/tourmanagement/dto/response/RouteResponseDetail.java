package com.example.tourmanagement.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RouteResponseDetail {
    Integer detailRouteId;
    Integer routeId;
    String detailRouteName;
    String description;
    Integer stock;
    LocalDate timeToDeparture;
    LocalDate timeToFinish;
    List<ImageResponse> textImageList;
    List<LegResponse> legs;
    Double rating;
    Double price;
    public RouteResponseDetail(Integer detailRouteId, Integer routeId, String detailRouteName,
                               String description, Integer stock, LocalDate timeToDeparture,
                               LocalDate timeToFinish, Double rating, Double price) {
        this.detailRouteId = detailRouteId;
        this.routeId = routeId;
        this.detailRouteName = detailRouteName;
        this.description = description;
        this.stock = stock;
        this.timeToDeparture = timeToDeparture;
        this.timeToFinish = timeToFinish;
        this.rating = rating;
        this.textImageList = new ArrayList<>();
        this.legs = new ArrayList<>();
        this.price = price;
    }
}
