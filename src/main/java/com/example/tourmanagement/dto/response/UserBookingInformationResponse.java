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
public class UserBookingInformationResponse {
    Integer bookingId;
    Integer customerId;
    BigDecimal totalPrice;
    Instant timeToOrder;
    String statusName;
    String detailRouteName;
}
