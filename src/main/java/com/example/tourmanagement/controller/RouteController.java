package com.example.tourmanagement.controller;

import com.example.tourmanagement.dto.request.ApiResponse;
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

import java.util.List;

@RestController
@RequestMapping("/api/route")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RouteController {
    RouteService routeService;

    //    get all routes
    @GetMapping
    public ApiResponse<RouteResponseWrapper> getAllRoutes(@RequestParam(defaultValue = "1") int page, @RequestParam int size) {
        Pageable pageable= PageRequest.of(page-1, size);
        return ApiResponse.<RouteResponseWrapper>builder()
                .result(routeService.getAllRoutes(pageable))
                .build();
    }
    //    get route by id
    @GetMapping("/detail/{id}")
    public ApiResponse<RouteResponseDetail> getRouteById(@PathVariable Integer id) {
        return ApiResponse.<RouteResponseDetail>builder()
                .result(routeService.getRouteById(id))
                .build();
    }
}
