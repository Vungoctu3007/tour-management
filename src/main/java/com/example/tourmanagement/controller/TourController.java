package com.example.tourmanagement.controller;

import com.example.tourmanagement.dto.request.ApiResponse;
import com.example.tourmanagement.dto.request.TourRequest;
import com.example.tourmanagement.dto.response.TourResponse;
import com.example.tourmanagement.service.TourService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

@RestController
@RequestMapping("/api/tour")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class TourController {
    TourService tourService;
    //get all list
    @GetMapping()
    ApiResponse<List<TourResponse>> getListTour(){
        return  ApiResponse.<List<TourResponse>>builder()
                .result(tourService.getAllTour())
                .build();
    }
    //get tour by id
    @GetMapping("/{tourId}")
    ApiResponse<TourResponse> getTour(@PathVariable("tourId") Integer tourId) {
        return ApiResponse.<TourResponse>builder()
                .result(tourService.getTour(tourId))
                .build();
    }
    //update tour by id
    @PutMapping("/tourId")
    ApiResponse<TourResponse> updateUser(@PathVariable Integer tourId, @RequestBody TourRequest request) {
        return ApiResponse.<TourResponse>builder()
                .result(tourService.updateTour(tourId, request))
                .build();
    }
    //delete tour by id
    @DeleteMapping("/{tourId}")
    ApiResponse<String> deleteUser(@PathVariable Integer tourId) {
        tourService.deleteTour(tourId);
        return ApiResponse.<String>builder()
                .result("Tour has been deleted").build();
    }
}
