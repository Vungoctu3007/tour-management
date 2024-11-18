package com.example.tourmanagement.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrdersResponse {
    Integer bookingId;
    String customerName;
    Instant timeToOrder;
    BigDecimal totalPrice;
    Integer paymentStatusId;
    String statusName;
    String paymentName;
}
