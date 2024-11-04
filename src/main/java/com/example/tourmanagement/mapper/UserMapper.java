package com.example.tourmanagement.mapper;

import com.example.tourmanagement.dto.request.UserCreateRequest;
import com.example.tourmanagement.dto.response.UserCreateResponse;
import com.example.tourmanagement.dto.response.UserResponse;
import com.example.tourmanagement.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "role", ignore = true) // Bỏ qua role khi ánh xạ từ request sang entity
    User toUser(UserCreateRequest request);

    @Mapping(source = "role.id", target = "role", defaultExpression = "java(user.getRole() != null ? user.getRole().getId() : 0)")
    @Mapping(source = "role.roleName", target = "roleName", defaultExpression = "java(user.getRole() != null ? user.getRole().getRoleName() : null)")
    UserResponse toUserResponse(User user);
}

