package com.example.tourmanagement.mapper;

import com.example.tourmanagement.dto.request.DetailRouteRequest;
import com.example.tourmanagement.entity.Detailroute;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface DetailRouteMapper {
    Detailroute toDetailRoute(DetailRouteRequest detailRouteRequest);
}
