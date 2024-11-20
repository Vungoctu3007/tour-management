package com.example.tourmanagement.repository;

import com.example.tourmanagement.entity.Permission;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PermissionRepository extends JpaRepository<Permission, Integer> {
}
