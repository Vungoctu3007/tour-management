package com.example.tourmanagement.service;

import com.example.tourmanagement.dto.request.FeedbackRequest;
import com.example.tourmanagement.dto.response.FeedbackResponse;
import com.example.tourmanagement.dto.response.FeedbackResponseWrapper;
import com.example.tourmanagement.dto.response.UserResponse;
import com.example.tourmanagement.dto.response.UserResponseWrapper;
import com.example.tourmanagement.entity.Booking;
import com.example.tourmanagement.entity.Detailroute;
import com.example.tourmanagement.entity.Feedback;
import com.example.tourmanagement.entity.User;
import com.example.tourmanagement.mapper.FeedbackMapper;
import com.example.tourmanagement.repository.BookingRepository;
import com.example.tourmanagement.repository.DetailRouteRepository;
import com.example.tourmanagement.repository.FeedbackRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Slf4j
@Service
public class FeedbackService {
    private  final FeedbackRepository feedbackRepository;
    private  final FeedbackMapper feedbackMapper;
    private  final BookingRepository bookingRepository;
    private  final DetailRouteRepository detailRouteRepository;

    public FeedbackService(FeedbackRepository feedbackRepository, FeedbackMapper feedbackMapper, BookingRepository bookingRepository, DetailRouteRepository detailRouteRepository) {
        this.feedbackRepository = feedbackRepository;
        this.feedbackMapper = feedbackMapper;
        this.bookingRepository = bookingRepository;
        this.detailRouteRepository = detailRouteRepository;
    }

    @Transactional(readOnly = true)
    public FeedbackResponseWrapper getListFeedback(Pageable pageable, int detailRouteId) {

        Page<Feedback> feedbackPage = feedbackRepository.getListFeedback(detailRouteId, pageable);


        Page<FeedbackResponse> feedbackResponsesPage = feedbackPage.map(feedbackMapper::toFeedbackResponse);
        return new FeedbackResponseWrapper(
                feedbackResponsesPage.getTotalPages(),
                feedbackResponsesPage.getTotalElements(),
                feedbackResponsesPage.getContent()
        );
    }

    public FeedbackResponse comment(FeedbackRequest feedbackRequest) {
        Feedback feedback = new Feedback();

        feedback.setRating((float) feedbackRequest.getRating());
        feedback.setText(feedbackRequest.getText());

        Booking booking = bookingRepository.findById(feedbackRequest.getBookingId())
                .orElseThrow(() -> new IllegalArgumentException("Booking not found"));
        feedback.setBooking(booking);

        Detailroute detailRoute = detailRouteRepository.findById(feedbackRequest.getDetailRouteId())
                .orElseThrow(() -> new IllegalArgumentException("DetailRoute not found"));
        feedback.setDetailRoute(detailRoute);

        feedback.setDateCreate(new Date());

        feedbackRepository.save(feedback);

        FeedbackResponse feedbackResponse = new FeedbackResponse();
        feedbackResponse.setFeedbackId(feedback.getId());
        return feedbackResponse;
    }

    public boolean checkBooking(int userId, int detailRouteId) {
        return feedbackRepository.existsByUserIdAndDetailRouteId(userId, detailRouteId);
    }


}
