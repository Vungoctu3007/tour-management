package com.example.tourmanagement.service;

import com.example.tourmanagement.dto.request.ApiResponse;
import com.example.tourmanagement.dto.response.DepartureResponse;
import com.example.tourmanagement.mapper.DepartureMapper;
import com.example.tourmanagement.repository.DepartureRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class DepartureService {
    DepartureRepository departureRepository;
    DepartureMapper departureMapper;
    public List<DepartureResponse> getAllDepartures() {
        log.info(departureRepository.findAll().stream().map(departureMapper::toDepartureResponse).toList().toString());
        return departureRepository.findAll().stream().map(departureMapper::toDepartureResponse).toList();
    }
}
