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
    Float rating;
}
