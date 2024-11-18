package com.example.tourmanagement.service;

import com.example.tourmanagement.dto.response.ArrivalResponse;
import com.example.tourmanagement.mapper.ArrivalMapper;
import com.example.tourmanagement.repository.ArrivalRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ArrivalService {
    ArrivalRepository arrivalRepository;
//    ArrivalMapper arrivalMapper;
    public List<ArrivalResponse> getAllArrivals() {
        return arrivalRepository.getAllArrivals();
    }
}
