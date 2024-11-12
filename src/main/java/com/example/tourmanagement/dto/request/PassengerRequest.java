package com.example.tourmanagement.dto.request;
import java.time.LocalDate;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)

public class PassengerRequest {
    Integer passengerObjectId;
    String passengerName;
    String passengerGender;
    LocalDate passengerDateBirth;
}
