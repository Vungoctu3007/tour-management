package com.example.tourmanagement.controller;

import com.example.tourmanagement.dto.request.ApiResponse;
import com.example.tourmanagement.dto.response.ArrivalResponse;
import com.example.tourmanagement.service.ArrivalService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/arrival")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ArrivalController {
    ArrivalService arrivalService;
    @GetMapping
    public ApiResponse<List<ArrivalResponse>> getArrivals() {
        return ApiResponse.<List<ArrivalResponse>>builder()
                .result(arrivalService.getAllArrivals())
                .build();
    }
}
