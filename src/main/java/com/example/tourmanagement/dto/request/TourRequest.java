package com.example.tourmanagement.dto.request;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TourRequest {
    Integer id;
    String name;
    String description;
    BigDecimal price;
    LocalDate startDate,endDate;
    Instant createdAt, updatedAt;

}
