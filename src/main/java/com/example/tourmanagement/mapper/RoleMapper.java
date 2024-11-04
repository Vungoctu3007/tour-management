package com.example.tourmanagement.mapper;

import com.example.tourmanagement.dto.response.RoleResponse;
import com.example.tourmanagement.dto.response.UserCreateResponse;
import com.example.tourmanagement.entity.Role;
import com.example.tourmanagement.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface RoleMapper {
    @Mapping(source = "roleName", target = "name")
    RoleResponse toRoleResponse(Role role);
}
