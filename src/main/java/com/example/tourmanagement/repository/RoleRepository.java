package com.example.tourmanagement.repository;

import com.example.tourmanagement.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {
    @Query("SELECT r.roleName FROM Role r WHERE r.id = :roleId")
    String findRoleNameById(@Param("roleId") int roleId);

    @Query("SELECT r FROM Role r WHERE r.id = :roleId")
    Optional<Role> findByRoleName(@Param("roleId") int roleId);


}
