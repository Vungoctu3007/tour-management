package com.example.tourmanagement.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FeedbackResponse {
    Integer feedbackId;
    int bookingId;
    String customerName;
    int detailRouteId;
    String detailRouteName;
    String text;
    float rating;
    Date date;
}
