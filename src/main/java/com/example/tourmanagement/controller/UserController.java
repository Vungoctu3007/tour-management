package com.example.tourmanagement.controller;

import com.example.tourmanagement.dto.request.ApiResponse;
import com.example.tourmanagement.dto.request.UserCreateRequest;
import com.example.tourmanagement.dto.request.UserRequest;
import com.example.tourmanagement.dto.response.UserCreateResponse;
import com.example.tourmanagement.dto.response.UserResponse;
import com.example.tourmanagement.entity.User;
import com.example.tourmanagement.repository.UserRepository;
import com.example.tourmanagement.service.UserService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/user")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping
    ApiResponse<List<UserCreateResponse>> getUsers() {
        return ApiResponse.<List<UserCreateResponse>>builder().result(userService.getUsers()).build();
    }

    @PostMapping("/register")
    ApiResponse<UserCreateResponse> createUser(@RequestBody UserCreateRequest request) {
        return ApiResponse.<UserCreateResponse>builder()
                .result(userService.createUser(request))
                .build();   
    }

    @DeleteMapping("/{userId}")
    ApiResponse<String> deleteUser(@PathVariable int userId) {
        userService.deleteUser(userId); 
        return ApiResponse.<String>builder()
                .code(HttpStatus.OK.value()) 
                .message("User with ID " + userId + " has been deleted successfully.") 
                .result(null) 
                .build();
    }
    
    
}
