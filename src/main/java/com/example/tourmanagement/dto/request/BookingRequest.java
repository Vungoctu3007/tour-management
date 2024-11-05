package com.example.tourmanagement.dto.request;
import java.util.List;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BookingRequest {
    String customerName;
    String customerEmail;
    String customerAddress;
    String customerPhone;
    List<PassengerRequest> passengerRequestList;
}
