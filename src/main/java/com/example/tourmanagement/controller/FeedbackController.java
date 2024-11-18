package com.example.tourmanagement.controller;

import com.example.tourmanagement.dto.request.ApiResponse;
import com.example.tourmanagement.dto.request.FeedbackRequest;
import com.example.tourmanagement.dto.response.FeedbackResponse;
import com.example.tourmanagement.dto.response.FeedbackResponseWrapper;
import com.example.tourmanagement.dto.response.UserResponse;
import com.example.tourmanagement.dto.response.UserResponseWrapper;
import com.example.tourmanagement.service.FeedbackService;
import com.example.tourmanagement.service.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/feedback")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class FeedbackController {
    @Autowired
    FeedbackService feedbackService;

    @GetMapping
    public ApiResponse<FeedbackResponseWrapper> getListFeedback(@RequestParam(defaultValue = "1") int page, @RequestParam int size,@RequestParam(required = false) int detailRouteId ) {
        Pageable pageable= PageRequest.of(page-1, size);
        return ApiResponse.<FeedbackResponseWrapper>builder()
                .result(feedbackService.getListFeedback(pageable, detailRouteId))
                .build();
    }

    @PostMapping("/comment")
    ApiResponse<FeedbackResponse> comment(@RequestBody FeedbackRequest request){
        return ApiResponse.<FeedbackResponse>builder()
                .result(feedbackService.comment(request))
                .build();
    }

    @GetMapping("/checkBooking")

    ApiResponse<Boolean> checkBooking(@RequestParam int userId , @RequestParam int detailRouteId) {
        return ApiResponse.<Boolean>builder()
               .result(feedbackService.checkBooking(userId, detailRouteId))
               .build();
    }
}
