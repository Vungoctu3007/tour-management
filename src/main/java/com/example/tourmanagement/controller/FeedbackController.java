package com.example.tourmanagement.controller;

import com.example.tourmanagement.dto.request.ApiResponse;
import com.example.tourmanagement.dto.request.FeedbackRequest;
import com.example.tourmanagement.dto.response.FeedbackResponse;
import com.example.tourmanagement.dto.response.FeedbackResponseWrapper;
import com.example.tourmanagement.dto.response.UserResponseWrapper;
import com.example.tourmanagement.service.FeedbackService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.logging.LoggingRebinder;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@Slf4j
@RequestMapping("/api/admin/feedback")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class FeedbackController {
    @Autowired
    FeedbackService feedbackService;
    @Autowired
    private LoggingRebinder loggingRebinder;


    @GetMapping("/admin")
    public ApiResponse<FeedbackResponseWrapper> getListFeedbackAdmin(@RequestParam(defaultValue = "1") int page,
            @RequestParam int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        return ApiResponse.<FeedbackResponseWrapper>builder()
                .result(feedbackService.getListFeedbackAdmin(pageable))
                .build();
    }

    @GetMapping("/client")
    public ApiResponse<FeedbackResponseWrapper> getListFeedbackClient(@RequestParam(defaultValue = "1") int page,
            @RequestParam int size, @RequestParam(required = false) int detailRouteId) {

        var authentication = SecurityContextHolder.getContext().getAuthentication();
        log.info("username : {}", authentication.getName());
        for (GrantedAuthority authority : authentication.getAuthorities()) {
            log.info(authority.getAuthority());
        }
        Pageable pageable = PageRequest.of(page - 1, size);
        return ApiResponse.<FeedbackResponseWrapper>builder()
                .result(feedbackService.getListFeedback(pageable, detailRouteId))
                .build();
    }

    @PostMapping("/comment")
    ApiResponse<FeedbackResponse> comment(@RequestBody FeedbackRequest request) {
        return ApiResponse.<FeedbackResponse>builder()
                .result(feedbackService.comment(request))
                .build();
    }

    @GetMapping("/checkBooking")

    ApiResponse<Boolean> checkBooking(@RequestParam int userId, @RequestParam int detailRouteId) {
        return ApiResponse.<Boolean>builder()
                .result(feedbackService.checkBooking(userId, detailRouteId))
                .build();
    }

    @PostMapping("/update")
    ApiResponse<FeedbackResponse> updateFeedback(@RequestBody FeedbackRequest request) {

        return ApiResponse.<FeedbackResponse>builder()
                .result(feedbackService.update(request))
                .build();
    }


    @GetMapping("/search")
    ApiResponse<FeedbackResponseWrapper> searchFeedback(@RequestParam String detailRouteName, @RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        FeedbackResponseWrapper userResponses = feedbackService.searchUserByDetailRouteName(detailRouteName, pageable);
        return ApiResponse.<FeedbackResponseWrapper>builder()
                .result(userResponses)
                .build();
    }

}
