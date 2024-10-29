package com.example.tourmanagement.service;
import com.example.tourmanagement.dto.request.TourRequest;
import com.example.tourmanagement.dto.response.TourResponse;
import com.example.tourmanagement.entity.Route;
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

}
