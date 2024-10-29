package com.example.tourmanagement.mapper;

import com.example.tourmanagement.dto.response.RouteResponse;
import com.example.tourmanagement.entity.Route;
import org.mapstruct.Mapper;
@Mapper(componentModel = "spring")
public interface RouteMapper {
//    @Mapper(source="")
    RouteResponse toRouteResponse(Route route);
}
