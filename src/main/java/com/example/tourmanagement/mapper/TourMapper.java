package com.example.tourmanagement.mapper;

import com.example.tourmanagement.dto.request.TourRequest;
import com.example.tourmanagement.dto.response.TourResponse;
import com.example.tourmanagement.entity.Tour;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface TourMapper {
    TourResponse toTourResponse(Tour tour);
    Tour tourRequestToTour(TourRequest tourRequest);
    //@@MappingTarget có tác dụng để cập nhật mà không tạo mới
    void updateTour(@MappingTarget Tour tour, TourRequest request);
}


