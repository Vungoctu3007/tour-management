package com.example.tourmanagement.dto.response;



import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OperationResponse {
    Integer id;
    String operationName;

}
