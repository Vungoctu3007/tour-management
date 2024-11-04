package com.example.tourmanagement.controller;

import com.example.tourmanagement.dto.request.ApiResponse;
import com.example.tourmanagement.dto.response.RoleResponse;
import com.example.tourmanagement.dto.response.UserCreateResponse;
import com.example.tourmanagement.service.RoleService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/role")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RoleController {

    @Autowired
    RoleService roleService;

    @GetMapping
    ApiResponse<List<RoleResponse>> getUsers() {
        return ApiResponse.<List<RoleResponse>>builder()
                .result(roleService.getListRole())
                .build();
    }
}
