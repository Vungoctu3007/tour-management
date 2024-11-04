package com.example.tourmanagement.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BookingResponse {
    Integer detailRouteId;
    String detailRouteName;
    LocalDate timeToDeparture;
    LocalDate timeToFinish;
    Double price;
}
