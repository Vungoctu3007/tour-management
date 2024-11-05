package com.example.tourmanagement.service;
import org.springframework.stereotype.Service;

import com.example.tourmanagement.dto.request.BookingRequest;
import com.example.tourmanagement.dto.response.BookingResponse;
import com.example.tourmanagement.repository.CustomerRepository;
import com.example.tourmanagement.repository.PassengerRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class BookingService {
    PassengerRepository passengerRepository;
    CustomerRepository customerRepository;

    public int createCustomer(BookingRequest request) {
        return customerRepository.insertCustomer(request.getCustomerName(),
                                             request.getCustomerEmail(),
                                             request.getCustomerAddress(),
                                             request.getCustomerPhone());
    }
}
