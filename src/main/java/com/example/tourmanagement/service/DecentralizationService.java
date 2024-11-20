package com.example.tourmanagement.service;

import com.example.tourmanagement.dto.request.PermissionOperationsRequest;
import com.example.tourmanagement.dto.request.RolePermissionRequest;
import com.example.tourmanagement.dto.response.*;
import com.example.tourmanagement.entity.Operation;
import com.example.tourmanagement.entity.Permission;
import com.example.tourmanagement.entity.Roleoperation;
import com.example.tourmanagement.entity.User;
import com.example.tourmanagement.mapper.DecentralizationMapper;
import com.example.tourmanagement.mapper.OperationMapper;
import com.example.tourmanagement.mapper.PermissionMapper;
import com.example.tourmanagement.repository.DecentralizationRepository;
import com.example.tourmanagement.repository.OperationRepository;
import com.example.tourmanagement.repository.PermissionRepository;
import com.example.tourmanagement.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class DecentralizationService {
    public final DecentralizationRepository decentralizationRepository;
    public final DecentralizationMapper decentralizationMapper;
    public final PermissionRepository permissionRepository;
    public final PermissionMapper permissionMapper;
    private final RoleRepository roleRepository;
    private final OperationRepository operationRepository;
    private final OperationMapper operationMapper;
    public DecentralizationResponseWrapper getListDecentralization(Pageable pageable) {
        Page<Roleoperation> page = decentralizationRepository.findAllByDecentralization(1, pageable);
        Page<DecentralizationResponse> decentralizationResponsePage = page.map(decentralizationMapper::toDecentralizationResponse);
        return new DecentralizationResponseWrapper(decentralizationResponsePage.getTotalPages(), decentralizationResponsePage.getTotalElements(),
                decentralizationResponsePage.getContent());
    }

    public List<PermissionResponse> getListPermission(){
        return permissionRepository.findAll()
                .stream()
                .map(permissionMapper::toPermissionResponse)
                .toList();
    }

    public List<OperationResponse> getListOperation(){
        return operationRepository.findAll()
                .stream()
                .map(operationMapper::toOperationResponse)
                .toList();
    }

    public RolePermissionResponse getListPermissionByRoleId(int roleId) {
        List<String> permissions = decentralizationRepository.getListPermisionByRoleId(roleId);

        String roleName = roleRepository.findRoleNameById(roleId);

        RolePermissionResponse response = new RolePermissionResponse();
        response.setRoleId(roleId);
        response.setRoleName(roleName);
        response.setPermissions(permissions);

        return response;
    }

    public RoleOperationResponse getListOperationByRoleId(int roleId) {
        String roleName = roleRepository.findRoleNameById(roleId);

        List<Permission> permissions = decentralizationRepository.findDistinctPermissionsByRoleId(roleId);

        List<PermissionResponse> permissionResponses = permissions.stream().map(permission -> {
            List<Operation> operations = decentralizationRepository.findOperationsByPermissionIdAndRoleId(permission.getId(), roleId);

            List<OperationResponse> operationResponses = operations.stream()
                    .map(operation -> new OperationResponse(operation.getId(), operation.getOperationName()))
                    .collect(Collectors.toList());

            return new PermissionResponse(permission.getId(), permission.getPermissionName(), operationResponses);
        }).collect(Collectors.toList());

        RoleOperationResponse response = new RoleOperationResponse();
        response.setRoleId(roleId);
        response.setRoleName(roleName);
        response.setPermissions(permissionResponses);

        return response;
    }
    //update
    @Transactional
    public void updatePermissions(int roleId, List<PermissionOperationsRequest> permissions) {
        decentralizationRepository.deleteByRoleId(roleId);

        for (PermissionOperationsRequest permission : permissions) {
            int permissionId = permission.getPermissionId();
            List<Integer> operationIds = permission.getOperationIds();

            if (operationIds != null && !operationIds.isEmpty()) {
                operationIds.forEach(operationId -> {
                    decentralizationRepository.addPermissionWithOperations(roleId, permissionId, operationId,1);
                });
            }
        }
    }

    //add
    @Transactional
    public void addNewPermissions(int roleId, List<PermissionOperationsRequest> permissions) {
        for (PermissionOperationsRequest permission : permissions) {
            int permissionId = permission.getPermissionId();
            List<Integer> operationIds = permission.getOperationIds();

            if (operationIds != null && !operationIds.isEmpty()) {
                operationIds.forEach(operationId -> {
                    // Kiểm tra xem quyền và thao tác đã tồn tại hay chưa
                    boolean exists = decentralizationRepository.existsByRoleIdAndPermissionIdAndOperationId(
                            roleId, permissionId, operationId
                    );

                    // Chỉ thêm nếu chưa tồn tại
                    if (!exists) {
                        decentralizationRepository.addPermissionWithOperations(roleId, permissionId, operationId, 1);
                    }
                });
            }
        }
    }


    public List<PermissionOperationResponse> getUnassignedPermissionsAndOperations(int roleId) {
        List<Object[]> results = decentralizationRepository.findUnassignedPermissionsAndOperations(roleId);
        Map<Integer, PermissionOperationResponse> permissionMap = new HashMap<>();

        for (Object[] row : results) {
            int permissionId = (int) row[0];
            String permissionName = (String) row[1];
            int operationId = (int) row[2];
            String operationName = (String) row[3];

            permissionMap
                    .computeIfAbsent(permissionId, id -> new PermissionOperationResponse(permissionId, permissionName))
                    .addOperation(new OperationResponse(operationId, operationName));
        }

        return new ArrayList<>(permissionMap.values());
    }

}
