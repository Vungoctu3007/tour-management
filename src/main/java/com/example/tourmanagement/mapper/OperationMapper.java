package com.example.tourmanagement.mapper;

import com.example.tourmanagement.dto.response.OperationResponse;
import com.example.tourmanagement.dto.response.PermissionResponse;
import com.example.tourmanagement.entity.Operation;
import com.example.tourmanagement.entity.Permission;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface OperationMapper {
    @Mapping(source = "operationName", target = "operationName")
    OperationResponse toOperationResponse(Operation operation);
}
