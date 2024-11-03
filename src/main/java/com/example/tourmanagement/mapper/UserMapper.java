package com.example.tourmanagement.mapper;

import com.example.tourmanagement.dto.request.UserCreateRequest;
import com.example.tourmanagement.dto.response.UserCreateResponse;
import com.example.tourmanagement.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "role", ignore = true) // Bỏ qua role khi ánh xạ từ request sang entity
    User toUser(UserCreateRequest request);

    @Mapping(source = "role.id", target = "role") // Ánh xạ roleId từ Role sang UserCreateResponse
    @Mapping(source = "role.roleName", target = "roleName") // Ánh xạ roleName từ Role sang UserCreateResponse
    UserCreateResponse toUserResponse(User user);
}
