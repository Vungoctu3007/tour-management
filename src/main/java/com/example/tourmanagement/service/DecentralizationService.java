package com.example.tourmanagement.service;

import com.example.tourmanagement.dto.request.RolePermissionRequest;
import com.example.tourmanagement.dto.response.*;
import com.example.tourmanagement.entity.Roleoperation;
import com.example.tourmanagement.entity.User;
import com.example.tourmanagement.mapper.DecentralizationMapper;
import com.example.tourmanagement.mapper.PermissionMapper;
import com.example.tourmanagement.repository.DecentralizationRepository;
import com.example.tourmanagement.repository.PermissionRepository;
import com.example.tourmanagement.repository.RoleRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
public class DecentralizationService {
    public final DecentralizationRepository decentralizationRepository;
    public final DecentralizationMapper decentralizationMapper;
    public final PermissionRepository permissionRepository;
    public final PermissionMapper permissionMapper;
    private final RoleRepository roleRepository;

    public DecentralizationService(DecentralizationRepository decentralizationRepository , DecentralizationMapper decentralizationMapper, PermissionRepository permissionRepository, PermissionMapper permissionMapper, RoleRepository roleRepository) {
        this.decentralizationRepository = decentralizationRepository;
        this.decentralizationMapper = decentralizationMapper;
        this.permissionRepository = permissionRepository;
        this.permissionMapper = permissionMapper;
        this.roleRepository = roleRepository;
    }
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

    public RolePermissionResponse getListPermissionByRoleId(int roleId) {
        List<String> permissions = decentralizationRepository.getPermissionsByRoleId(roleId);

        String roleName = roleRepository.findRoleNameById(roleId);

        RolePermissionResponse response = new RolePermissionResponse();
        response.setRoleId(roleId);
        response.setRoleName(roleName);
        response.setPermissions(permissions);

        return response;
    }

    @Transactional
    public void updatePermissions(int roleId, List<Integer> permissionIds) {
        decentralizationRepository.deleteById(roleId);

        permissionIds.forEach(permissionId -> {
            decentralizationRepository.addPermissionToRole(roleId, permissionId);
        });
    }
}
