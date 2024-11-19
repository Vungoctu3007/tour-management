package com.example.tourmanagement.mapper;

import com.example.tourmanagement.dto.response.PermissionResponse;
import com.example.tourmanagement.dto.response.RoleResponse;
import com.example.tourmanagement.entity.Permission;
import com.example.tourmanagement.entity.Role;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PermissionMapper {
    @Mapping(source = "permissionName", target = "name")
    PermissionResponse toPermissionResponse(Permission permission);
}
