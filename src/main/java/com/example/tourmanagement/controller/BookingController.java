package com.example.tourmanagement.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.tourmanagement.dto.request.ApiResponse;
import com.example.tourmanagement.dto.request.BookingRequest;
import com.example.tourmanagement.dto.response.BookingResponse;
import com.example.tourmanagement.dto.response.RouteResponseDetail;
import com.example.tourmanagement.service.BookingService;
import com.example.tourmanagement.service.RouteService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/booking")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BookingController {
    RouteService routeService;
    BookingService bookingService;

    @GetMapping("/{id}")
    public ApiResponse<RouteResponseDetail> getDetailRoute(@PathVariable Integer id) {
        return ApiResponse.<RouteResponseDetail>builder().result(routeService.getRouteById(id)).build();
    }

    @PostMapping("/handle-booking")
    public ApiResponse<BookingResponse> handleBooking(@RequestBody BookingRequest request) {
        int customerId = bookingService.createCustomer(request);
        List<Integer> passengerIds = bookingService.createPassengers(request);
        int bookingId = bookingService.createBooking(request, customerId);
        boolean status = bookingService.createTickets(passengerIds, bookingId);
        // Prepare the ApiResponse based on the status
        if (status == true) {
            return ApiResponse.<BookingResponse>builder()
                    .message("Booking successful")
                    .build();
        } else {
            return ApiResponse.<BookingResponse>builder()
                    .message("Booking failed")
                    .build();
        }
    }

}
