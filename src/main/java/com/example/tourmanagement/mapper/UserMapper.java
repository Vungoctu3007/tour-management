package com.example.tourmanagement.mapper;

import com.example.tourmanagement.dto.request.UserRequest;
import com.example.tourmanagement.dto.response.UserResponse;
import com.example.tourmanagement.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UserMapper {
//    User toUser(UserCreationRequest request);
    User toUser(UserRequest request);
    UserResponse toUserResponse(User user);

//    @Mapping(target = "roles", ignore = true)
//    void updateUser(@MappingTarget User user, UserUpdateRequest request);
}
