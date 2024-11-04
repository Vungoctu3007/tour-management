package com.example.tourmanagement.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.tourmanagement.dto.request.ApiResponse;
import com.example.tourmanagement.dto.response.BookingResponse;
import com.example.tourmanagement.dto.response.RouteResponseDetail;
import com.example.tourmanagement.service.RouteService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/booking")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BookingController {
    RouteService routeService;
    @GetMapping("/{id}")
    public ApiResponse<RouteResponseDetail> getDetailRoute(@PathVariable Integer id) {
        return ApiResponse.<RouteResponseDetail>builder().result(routeService.getRouteById(id)).build();
    }
    
    
}
