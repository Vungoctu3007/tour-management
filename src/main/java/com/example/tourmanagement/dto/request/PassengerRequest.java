package com.example.tourmanagement.dto.request;
import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)

public class PassengerRequest {
    Integer passengerObjectId;
    @NotBlank(message = "Vui lòng nhập họ và tên của hành khách")
    String passengerName;
    String passengerGender;
    @NotNull(message = "Vui lòng chọn ngày sinh của hành khách")
    LocalDate passengerDateBirth;
}
