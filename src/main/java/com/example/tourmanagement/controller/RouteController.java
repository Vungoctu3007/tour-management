package com.example.tourmanagement.controller;

import com.example.tourmanagement.dto.request.ApiResponse;
import com.example.tourmanagement.dto.response.DepartureAndArrivalResponse;
import com.example.tourmanagement.dto.response.RouteResponse;
import com.example.tourmanagement.dto.response.RouteResponseDetail;
import com.example.tourmanagement.dto.response.RouteResponseWrapper;
import com.example.tourmanagement.service.RouteService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/route")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RouteController {
    RouteService routeService;

    //    get all routes
    @GetMapping
    public ApiResponse<RouteResponseWrapper> getAllRoutes(@RequestParam(defaultValue = "1") int page, @RequestParam int size, @RequestParam(required = false) String sort) {
        Pageable pageable = PageRequest.of(page - 1, size);
        return ApiResponse.<RouteResponseWrapper>builder()
                .result(routeService.getAllRoutes(pageable, sort))
                .build();
    }

    //    get route by id
    @GetMapping("/detail/{id}")
    public ApiResponse<RouteResponseDetail> getRouteById(@PathVariable Integer id) {
        return ApiResponse.<RouteResponseDetail>builder()
                .result(routeService.getRouteById(id))
                .build();
    }

    // find Routes By Arrival Departure And Date
    @GetMapping("/search")
    public ApiResponse<RouteResponseWrapper> searchRouteByArrivalDepartureDate(@RequestParam String arrivalName,
                                                                               @RequestParam(defaultValue = "") String departureName,
                                                                               @RequestParam LocalDate timeToDeparture,
                                                                               @RequestParam(defaultValue = "1") int page,
                                                                               @RequestParam int size,
                                                                               @RequestParam(required = false) String sort) {
        Pageable pageable = PageRequest.of(page - 1, size);
        return ApiResponse.<RouteResponseWrapper>builder()
                .result(routeService.findRoutesByArrivalDepartureAndDate(arrivalName, departureName, timeToDeparture, pageable,sort))
                .build();
    }
    // find tour filter-arrivalName
    @GetMapping("/filter-arrivalName")
    public ApiResponse<RouteResponseWrapper> searchRouteByArrivalName(@RequestParam String arrivalName,
                                                                      @RequestParam(defaultValue = "1") int page,
                                                                      @RequestParam int size,
                                                                      @RequestParam(required = false) String sort) {
        Pageable pageable = PageRequest.of(page - 1, size);
        return ApiResponse.<RouteResponseWrapper>builder()
                .result(routeService.findRouteByArrivalName(arrivalName, pageable,sort))
                .build();
    }

    @GetMapping("/road")
    public ApiResponse<List<DepartureAndArrivalResponse>> getAllDepartureAndArrivals(){
        return ApiResponse.<List<DepartureAndArrivalResponse>>builder()
                .result(routeService.getAllDepartureAndArrivals())
                .build();
    }
}