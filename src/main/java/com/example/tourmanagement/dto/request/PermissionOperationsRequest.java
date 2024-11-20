package com.example.tourmanagement.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PermissionOperationsRequest {
    int permissionId;
    List<Integer> operationIds; // Danh sách operationIds được chọn cho permission này
}