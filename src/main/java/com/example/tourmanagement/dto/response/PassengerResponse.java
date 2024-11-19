package com.example.tourmanagement.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PassengerResponse {
    Integer passengerId;
    String objectName;
    String passengerName;
    String passengerGender;
    LocalDate passengerDateBirth;
}
