package com.example.tourmanagement.controller;

import com.example.tourmanagement.dto.request.ApiResponse;
import com.example.tourmanagement.dto.response.DepartureResponse;
import com.example.tourmanagement.service.DepartureService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/departure")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class DepartureController {
    DepartureService departureService;
    @GetMapping
    public ApiResponse<List<DepartureResponse>> getAllDepartures() {
        return ApiResponse.<List<DepartureResponse>>builder()
                .result(departureService.getAllDepartures())
                .build();
    }

}
