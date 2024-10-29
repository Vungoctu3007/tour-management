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



}
