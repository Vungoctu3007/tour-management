package com.example.tourmanagement.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DecentralizationResponseWrapper {
    long totalPages;
    long totalElements;
    List<DecentralizationResponse> decentralization;
}