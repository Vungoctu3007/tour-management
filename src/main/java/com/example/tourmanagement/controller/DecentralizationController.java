package com.example.tourmanagement.controller;

import com.example.tourmanagement.dto.request.ApiResponse;
import com.example.tourmanagement.dto.request.RolePermissionRequest;
import com.example.tourmanagement.dto.response.*;
import com.example.tourmanagement.service.DecentralizationService;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/decentralization")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class DecentralizationController {
    @Autowired
    DecentralizationService decentralizationService;


    @GetMapping
    public ApiResponse<DecentralizationResponseWrapper> getAllDecentralization(@RequestParam(defaultValue = "1") int page, @RequestParam int size) {
        Pageable pageable= PageRequest.of(page-1, size);
        return ApiResponse.<DecentralizationResponseWrapper>builder()
                .result(decentralizationService.getListDecentralization(pageable))
                .build();
    }
    @GetMapping("/getPermission")
    ApiResponse<List<PermissionResponse>> getListPermission(){
        return ApiResponse.<List<PermissionResponse>>builder()
                .result(decentralizationService.getListPermission())
                .build();
    }
    @GetMapping("/getPermissionById")
    public ApiResponse<RolePermissionResponse> getPermissionById(@RequestParam int roleId) {
        return ApiResponse.<RolePermissionResponse>builder()
                .result(decentralizationService.getListPermissionByRoleId(roleId))
                .build();
    }

    @PostMapping("/updatePermissions")
    public ApiResponse<DecentralizationResponse> updatePermissions(@RequestBody RolePermissionRequest request) {
        decentralizationService.updatePermissions(request.getRoleId(), request.getPermissionIds());
        return ApiResponse.<DecentralizationResponse>builder()
                .message("Permissions updated successfully!")
                .build();
    }

}
