package com.example.tourmanagement.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ImageRequest {
    Integer detailRouteId;
    String textImage;
    Integer isPrimary;
}
