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
@RequestMapping("/api/admin/decentralization")
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

    @GetMapping("/getOperationById")
    public ApiResponse<RoleOperationResponse> getOperationById(@RequestParam int roleId) {
        // Gọi service để lấy dữ liệu permissions và operations theo roleId
        RoleOperationResponse response = decentralizationService.getListOperationByRoleId(roleId);
        return ApiResponse.<RoleOperationResponse>builder()
                .result(response)
                .build();
    }

    @PostMapping("/updatePermissions")
    public ApiResponse<DecentralizationResponse> updatePermissions(@RequestBody RolePermissionRequest request) {
        decentralizationService.updatePermissions(request.getRoleId(), request.getPermissions());
        return ApiResponse.<DecentralizationResponse>builder()
                .message("Permissions updated successfully!")
                .build();
    }

    @PostMapping("/addPermissions")
    public ApiResponse<Void> addPermissions(@RequestBody RolePermissionRequest request) {
        decentralizationService.addNewPermissions(request.getRoleId(), request.getPermissions());
        return ApiResponse.<Void>builder()
                .message("Permissions added successfully!")
                .build();
    }



    @GetMapping("/getAllOperations")
    ApiResponse<List<OperationResponse>> getListOperation(){
        return ApiResponse.<List<OperationResponse>>builder()
                .result(decentralizationService.getListOperation())
                .build();
    }

    @GetMapping("/unassigned-permissions")
    public ApiResponse<List<PermissionOperationResponse>> getUnassignedPermissions(
            @RequestParam int roleId
    ) {
        List<PermissionOperationResponse> unassignedPermissions = decentralizationService.getUnassignedPermissionsAndOperations(roleId);
        return ApiResponse.<List<PermissionOperationResponse>>builder()
                .result(unassignedPermissions)
                .build();
    }

}
