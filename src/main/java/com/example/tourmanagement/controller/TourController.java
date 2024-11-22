package com.example.tourmanagement.controller;

import com.example.tourmanagement.dto.request.ApiResponse;
import com.example.tourmanagement.dto.request.DetailRouteRequest;
import com.example.tourmanagement.dto.response.RouteResponseDetail;
import com.example.tourmanagement.dto.response.RouteResponseWrapper;
import com.example.tourmanagement.entity.Detailroute;
import com.example.tourmanagement.service.RouteService;
import com.example.tourmanagement.service.TourService;
import jakarta.persistence.EntityNotFoundException;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tour")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class TourController {
    TourService tourService;
    RouteService routeService;
    @PostMapping
    public ResponseEntity<String> createDetailRoute(@RequestBody DetailRouteRequest detailRouteRequest) {
        try {
           boolean create= tourService.insertTour(detailRouteRequest);
           if(create){
               return ResponseEntity.ok("Thêm tour thành công.");
           }else {
               return ResponseEntity.ok("Thêm tour thất bại.");
           }

        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        } catch (Exception ex) {
            return ResponseEntity.internalServerError().body("An error occurred: " + ex.getMessage());
        }
    }

    @GetMapping("/detail/{detailRouteId}")
    public ApiResponse<RouteResponseDetail> getRouteById(@PathVariable Integer detailRouteId) {
        return ApiResponse.<RouteResponseDetail>builder()
                .result(routeService.getRouteById(detailRouteId))
                .build();
    }
    @PutMapping("/{detailRouteId}")
    public ResponseEntity<String> updateDetailRoute(
            @PathVariable Integer detailRouteId,
            @RequestBody DetailRouteRequest detailRouteRequest) {
        try {
            boolean isUpdated = tourService.updateTour(detailRouteId, detailRouteRequest);
            if (isUpdated) {
                return ResponseEntity.ok("Cập nhật tour thành công.");
            } else {
                return ResponseEntity.badRequest().body("Không thể cập nhật tour.");
            }
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        } catch (Exception ex) {
            return ResponseEntity.internalServerError().body("An error occurred: " + ex.getMessage());
        }
    }
    @GetMapping("/check-booking/{detailRouteId}")
    public ResponseEntity<String> checkBooking(@PathVariable Integer detailRouteId) {
        boolean isBooked = tourService.checkBooking(detailRouteId);
        if (isBooked) {
            return ResponseEntity.ok("không thể sửa hoặc xóa tour này: ");
        }
        return ResponseEntity.ok("");
    }
    @DeleteMapping("/{detailRouteId}")
    public ResponseEntity<String> deleteDetailRoute(@PathVariable Integer detailRouteId) {
        try {
            tourService.deleteTour(detailRouteId);
            return ResponseEntity.ok("Xóa tour thành công với ID: " + detailRouteId);
        }catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }
    @GetMapping("/search")
    public ApiResponse<RouteResponseWrapper> searchByDetailRouteId(@RequestParam(defaultValue = "1") int page, @RequestParam int size, @RequestParam(required = false) String sort,@RequestParam Integer detailRouteId) {
        Pageable pageable = PageRequest.of(page - 1, size);
        return ApiResponse.<RouteResponseWrapper>builder()
                .result(tourService.searchByDetailRouteId(pageable, sort, detailRouteId))
                .build();
    }

}
