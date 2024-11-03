package com.example.tourmanagement.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RouteResponseWrapper {
    long totalPages;
    long totalElements;
    List<RouteResponse> routes;
}
