package com.example.tourmanagement.dto.response;

import com.example.tourmanagement.entity.Payment;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PaymentResponse {
    List<Payment> payments;
}
