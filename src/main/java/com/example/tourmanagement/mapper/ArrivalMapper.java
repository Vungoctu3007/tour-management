package com.example.tourmanagement.mapper;

import com.example.tourmanagement.dto.response.ArrivalResponse;
import com.example.tourmanagement.entity.Arrival;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ArrivalMapper {
    ArrivalResponse toArrivalResponse(Arrival arrival);
}
