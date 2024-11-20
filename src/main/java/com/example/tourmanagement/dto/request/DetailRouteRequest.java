package com.example.tourmanagement.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DetailRouteRequest {
    String detailRouteName;
    Double price;
    Integer routeId;
    Integer stock;
    LocalDate timeToDeparture;
    LocalDate timeToFinish;
    String description;
    List<ImageRequest> images;
    List<LegRequest> legs;
}
