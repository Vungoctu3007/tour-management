package com.example.tourmanagement.service;

import com.example.tourmanagement.dto.response.PaymentStatusResponse;
import com.example.tourmanagement.repository.PaymentStatusRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class PaymentStatusService {
    PaymentStatusRepository paymentStatusRepository;

    public List<PaymentStatusResponse> getAllPaymentStatuses() {
        return paymentStatusRepository.findAll().stream()
                .map(paymentStatus -> new PaymentStatusResponse(
                        paymentStatus.getId(),
                        paymentStatus.getStatusName()
                ))
                .collect(Collectors.toList());
    }
}
