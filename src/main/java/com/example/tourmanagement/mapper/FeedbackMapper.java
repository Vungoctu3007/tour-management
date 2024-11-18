package com.example.tourmanagement.mapper;

import com.example.tourmanagement.dto.response.FeedbackResponse;
import com.example.tourmanagement.entity.Feedback;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface FeedbackMapper {
    @Mapping(source = "id", target = "feedbackId")
    @Mapping(source = "booking.id", target = "bookingId")
    @Mapping(source = "booking.customer.customerName", target = "customerName")
    @Mapping(source = "detailRoute.id", target = "detailRouteId")
    @Mapping(source = "detailRoute.detailRouteName", target = "detailRouteName")
    @Mapping(source = "dateCreate", target = "date")
    FeedbackResponse toFeedbackResponse(Feedback feedback);

}

