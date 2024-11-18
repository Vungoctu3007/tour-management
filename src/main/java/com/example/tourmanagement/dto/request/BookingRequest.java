package com.example.tourmanagement.dto.request;
import java.math.BigDecimal;
import java.util.List;

import com.example.tourmanagement.validation.UniqueEmail;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
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
    @NotBlank(message = "Vui lòng nhập họ và tên")
    String customerName;
    @NotBlank(message = "Vui lòng nhập Email")
    @Email(message = "Email không đúng định dạng")
    @UniqueEmail(message = "Email đã tồn tại")
    String customerEmail;
    @NotBlank(message = "Vui lòng nhập địa chỉ")
    String customerAddress;
    @NotBlank(message = "Vui lòng nhập số điện thoại")
    @Pattern(regexp = "^(0[3|5|7|8|9])+([0-9]{8})$", message = "Số điện thoại không đúng định dạng")
    String customerPhone;
    @NotNull(message = "Vui lòng chọn phương thức thanh toán")
    Integer paymentMethod;
    Integer userId;
    @Valid
    @NotNull(message = "Passenger list cannot be null")
    List<PassengerRequest> passengerRequestList;
}
