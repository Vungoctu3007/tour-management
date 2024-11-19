package com.example.tourmanagement.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BookingDetailResponse {
    Integer bookingId;
    BigDecimal totalPrice;
    Integer statusId;
    String statusName;
    Long quantity;
    Instant timeToOrder;
    LocalDate timeToDeparture;
    LocalDate timeToFinish;
    Integer customerId;
    String customerName;
    String customerEmail;
    String customerPhone;
    String customerAddress;
    List<PassengerResponse> passengers;

    public BookingDetailResponse(
            Integer bookingId,
            BigDecimal totalPrice,
            Integer statusId,
            String statusName,
            Long quantity, // Sửa thành Long nếu COUNT trả về kiểu Long
            Instant timeToOrder,
            LocalDate timeToDeparture,
            LocalDate timeToFinish,
            Integer customerId,
            String customerName,
            String customerEmail,
            String customerPhone,
            String customerAddress
    ) {
        this.bookingId = bookingId;
        this.totalPrice = totalPrice;
        this.statusId = statusId;
        this.statusName = statusName;
        this.quantity = quantity; // Đảm bảo kiểu dữ liệu Long
        this.timeToOrder = timeToOrder;
        this.timeToDeparture = timeToDeparture;
        this.timeToFinish = timeToFinish;
        this.customerId = customerId;
        this.customerName = customerName;
        this.customerEmail = customerEmail;
        this.customerPhone = customerPhone;
        this.customerAddress = customerAddress;
    }

}

