package com.example.tourmanagement.service;
import com.example.tourmanagement.dto.request.TourRequest;
import com.example.tourmanagement.dto.response.TourResponse;
import com.example.tourmanagement.entity.Tour;
import com.example.tourmanagement.exception.AppException;
import com.example.tourmanagement.exception.ErrorCode;
import com.example.tourmanagement.mapper.TourMapper;
import com.example.tourmanagement.repository.TourRepository;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class TourService {
    private final TourRepository tourRepository;
    TourMapper tourMapper;
    public List<TourResponse> getAllTour(){
        List<Tour> listTour = tourRepository.findAll();
        return listTour.stream().
                map(tourMapper::toTourResponse).toList();
    }
    public TourResponse getTour(Integer id) {
        return tourMapper.toTourResponse(
                tourRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.TOUR_NOT_EXITED)));
    }
    public TourResponse updateTour(Integer tourId, TourRequest request) {
        Tour tour = tourRepository.findById(tourId).orElseThrow(() -> new AppException(ErrorCode.TOUR_NOT_EXITED));

        tourMapper.updateTour(tour, request);
        tour.setName(request.getName());
        tour.setDescription(request.getDescription());
        tour.setPrice(request.getPrice());
        tour.setStartDate(request.getStartDate());
        tour.setEndDate(request.getEndDate());

        return tourMapper.toTourResponse(tourRepository.save(tour));
    }

    public void deleteTour(Integer id) {
        tourRepository.deleteById(id);
    }
}
