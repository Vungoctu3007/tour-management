package com.example.tourmanagement.mapper;

import com.example.tourmanagement.dto.response.DecentralizationResponse;
import com.example.tourmanagement.dto.response.UserResponse;
import com.example.tourmanagement.entity.Roleoperation;
import com.example.tourmanagement.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
@Mapper(componentModel = "spring")
public interface DecentralizationMapper {
    @Mapping(source = "role.id", target = "roleId")
    @Mapping(source = "role.roleName", target = "roleName")
    @Mapping(source = "permission.id", target = "permissionId")
    @Mapping(source = "permission.permissionName", target = "permissionName")
    @Mapping(source = "operation.id", target = "operationId")
    @Mapping(source = "operation.operationName", target = "operationName")
    DecentralizationResponse toDecentralizationResponse(Roleoperation roleoperation);
}
