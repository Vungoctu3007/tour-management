package com.example.tourmanagement.dto.request;
import java.math.BigDecimal;
import java.util.List;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BookingRequest {
    Integer detailRouteId;
    BigDecimal total_price;
    String customerName;
    String customerEmail;
    String customerAddress;
    String customerPhone;
    Integer userId;
    List<PassengerRequest> passengerRequestList;
}
