package com.example.tourmanagement.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RouteResponse {
    Integer detailRouteId;
    Integer routeId;
    String detailRouteName;
    String description;
    Integer stock;
    LocalDate timeToDeparture;
    LocalDate timeToFinish;
    Integer imageId;
    String textImage;
    Double rating;
    Integer arrivalId;
    String arrivalName;

    public RouteResponse(Integer detailRouteId, Integer routeId, String detailRouteName, String description, Integer stock, LocalDate timeToDeparture, LocalDate timeToFinish, Integer imageId, String textImage, Double rating) {
        this.detailRouteId = detailRouteId;
        this.routeId = routeId;
        this.detailRouteName = detailRouteName;
        this.description = description;
        this.stock = stock;
        this.timeToDeparture = timeToDeparture;
        this.timeToFinish = timeToFinish;
        this.imageId = imageId;
        this.textImage = textImage;
        this.rating = rating;
    }
}
