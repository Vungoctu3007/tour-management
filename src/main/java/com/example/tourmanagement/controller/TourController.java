package com.example.tourmanagement.controller;

import com.example.tourmanagement.dto.request.DetailRouteRequest;
import com.example.tourmanagement.service.TourService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/tour")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class TourController {
    TourService tourService;
    @PostMapping
    public ResponseEntity<String> createDetailRoute(@RequestBody DetailRouteRequest detailRouteRequest) {
        try {
            tourService.insertTour(detailRouteRequest);
            return ResponseEntity.ok("Detail Route created successfully.");
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        } catch (Exception ex) {
            return ResponseEntity.internalServerError().body("An error occurred: " + ex.getMessage());
        }
    }
}
