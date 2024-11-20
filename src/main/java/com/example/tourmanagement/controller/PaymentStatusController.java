package com.example.tourmanagement.controller;

import com.example.tourmanagement.dto.request.ApiResponse;
import com.example.tourmanagement.dto.response.PaymentStatusResponse;
import com.example.tourmanagement.service.PaymentStatusService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/payment-status")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PaymentStatusController {
    PaymentStatusService paymentStatusService;

    @GetMapping("/get-payment-statuses")
    public ApiResponse<List<PaymentStatusResponse>> getPaymentStatuses() {
        return ApiResponse.<List<PaymentStatusResponse>>builder()
                .result(paymentStatusService.getAllPaymentStatuses())
                .build();
    }

}
