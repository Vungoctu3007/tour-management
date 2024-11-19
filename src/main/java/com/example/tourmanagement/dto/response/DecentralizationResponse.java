package com.example.tourmanagement.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DecentralizationResponse {
    public int id;
    public int roleId;
    public String roleName;
    public int permissionId;
    public String permissionName;
    public int operationId;
    public String operationName;
}
