package com.example.tourmanagement.repository;

import com.example.tourmanagement.entity.Roleoperation;
import com.example.tourmanagement.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DecentralizationRepository extends JpaRepository<Roleoperation, Integer> {
    @EntityGraph(attributePaths = {"role", "permission", "operation"})
    @Query("SELECT u FROM Roleoperation u WHERE u.statusId = :status")
    Page<Roleoperation> findAllByDecentralization(int status, Pageable pageable);
    //get list permission by roleId

    @Query("SELECT DISTINCT ro.permission.permissionName " +
            "FROM Roleoperation ro " +
            "WHERE ro.role.id = :roleId")
    List<String> getPermissionsByRoleId(@Param("roleId") int roleId);

    @Modifying
    @Query("DELETE FROM Roleoperation rp WHERE rp.role.id = :roleId")
    void deleteByRoleId(@Param("roleId") int roleId);

    @Modifying
    @Query(value = "INSERT INTO roleoperations (role_id, permission_id) VALUES (:roleId, :permissionId)", nativeQuery = true)
    void addPermissionToRole(@Param("roleId") int roleId, @Param("permissionId") int permissionId);
}
