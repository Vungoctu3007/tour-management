package com.example.tourmanagement.service;

import com.example.tourmanagement.dto.response.PaymentResponse;
import com.example.tourmanagement.entity.Payment;
import com.example.tourmanagement.repository.PaymentRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class PaymentService {
    PaymentRepository paymentRepository;

    public PaymentResponse getAllPayments() {
        PaymentResponse paymentResponse = new PaymentResponse();
        List<Payment> payments= paymentRepository.findAll();
        paymentResponse.setPayments(payments);
        return paymentResponse;
    }
}
