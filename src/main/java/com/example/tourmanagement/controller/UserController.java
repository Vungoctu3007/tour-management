package com.example.tourmanagement.controller;

import com.example.tourmanagement.dto.request.ApiResponse;
import com.example.tourmanagement.dto.request.UserCreateRequest;
import com.example.tourmanagement.dto.request.UserUpdateRequest;
import com.example.tourmanagement.dto.response.UserCreateResponse;
import com.example.tourmanagement.dto.response.UserResponse;
import com.example.tourmanagement.dto.response.UserResponseWrapper;
import com.example.tourmanagement.exception.AppException;
import com.example.tourmanagement.exception.ErrorCode;
import com.example.tourmanagement.service.UserService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.util.List;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;

import org.springframework.web.bind.annotation.*;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/admin/user")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping
    public ApiResponse<UserResponseWrapper> getAllUsers(@RequestParam(defaultValue = "1") int page, @RequestParam int size) {
        Pageable pageable= PageRequest.of(page-1, size);
        return ApiResponse.<UserResponseWrapper>builder()
                .result(userService.getUsers(pageable))
                .build();
    }

    //create-user
    @PostMapping("/create")
    ApiResponse<UserResponse> createUser(@RequestBody UserCreateRequest request) {
        if (userService.existsByEmail(request.getEmail())) {
            throw new AppException(ErrorCode.EMAIL_IS_EXISTED);
        }
        return ApiResponse.<UserResponse>builder()
                .result(userService.newUser(request))
                .build();
    }

    @PutMapping("/{userId}")
    ApiResponse<UserResponse> updateStatus(@PathVariable int userId, @RequestParam int status) {
        userService.updateUserStatus(userId, status);
        return ApiResponse.<UserResponse>builder()
                .code(HttpStatus.OK.value())
                .result(null)
                .build();
    }

    @GetMapping("/search")
    ApiResponse<UserResponseWrapper> searchUser(@RequestParam String username, @RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        UserResponseWrapper userResponses = userService.searchUserByUsername(username, pageable);
        return ApiResponse.<UserResponseWrapper>builder()
                .result(userResponses)
                .build();
    }
    @PutMapping("/update/{id}")
    ApiResponse<UserResponse> updateUser(@RequestBody UserUpdateRequest request , @PathVariable  int id) {
        log.info("request update :", request.toString());
        return ApiResponse.<UserResponse>builder()
                .result(userService.updateUser(request , id))
                .build();
    }

    @GetMapping("/{userId}")
    public ApiResponse<UserResponse> getUserById(@PathVariable int userId) {
        UserResponse userResponse = userService.getUserById(userId);
        return ApiResponse.<UserResponse>builder()
                .result(userResponse)
                .build();
    }


}
