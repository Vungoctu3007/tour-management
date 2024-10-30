package com.example.tourmanagement.mapper;

import com.example.tourmanagement.dto.response.DepartureResponse;
import com.example.tourmanagement.entity.Departure;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface DepartureMapper {
    DepartureResponse toDepartureResponse(Departure departure);
}
