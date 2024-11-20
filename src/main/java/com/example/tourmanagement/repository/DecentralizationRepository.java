package com.example.tourmanagement.repository;

import com.example.tourmanagement.entity.Operation;
import com.example.tourmanagement.entity.Permission;
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

    @Query("SELECT DISTINCT ro.permission FROM Roleoperation ro WHERE ro.role.id = :roleId")
    List<Permission> findDistinctPermissionsByRoleId(@Param("roleId") int roleId);

    // Lấy danh sách operations theo permissionId và roleId
    @Query("SELECT ro.operation FROM Roleoperation ro WHERE ro.permission.id = :permissionId AND ro.role.id = :roleId")
    List<Operation> findOperationsByPermissionIdAndRoleId(@Param("permissionId") int permissionId, @Param("roleId") int roleId);

    @Modifying
    @Query("DELETE FROM Roleoperation rp WHERE rp.role.id = :roleId")
    void deleteByRoleId(@Param("roleId") int roleId);


    @Query("SELECT DISTINCT ro.permission.permissionName FROM Roleoperation ro WHERE ro.role.id = :roleId")
    List<String> getListPermisionByRoleId(@Param("roleId") int roleId);

    //update decentrazilation
    @Modifying
    @Query(
            value = "INSERT INTO roleoperations (role_id, permission_id, operation_id, status_id) VALUES (:roleId, :permissionId, :operationId, :status)",
            nativeQuery = true
    )
    void addPermissionWithOperations(
            @Param("roleId") int roleId,
            @Param("permissionId") int permissionId,
            @Param("operationId") int operationId,
            @Param("status") int status
    );

    //get list permissions and oprerations not exist with role id

    @Query(value = """
    SELECT 
        p.permission_id AS permissionId, 
        p.permission_name AS permissionName, 
        o.operation_id AS operationId, 
        o.operation_name AS operationName 
    FROM 
        roleoperations ro
    JOIN 
        permissions p 
    ON ro.permission_id = p.permission_id
    
    JOIN  operations o
    ON ro.operation_id = o.operation_id
    WHERE 
        NOT EXISTS (
            SELECT 1 
            FROM roleoperations ro 
            WHERE ro.role_id = :roleId 
            AND ro.permission_id = p.permission_id 
            AND ro.operation_id = o.operation_id
        )
    """, nativeQuery = true)
    List<Object[]> findUnassignedPermissionsAndOperations(@Param("roleId") int roleId);


    @Query("SELECT CASE WHEN COUNT(ro) > 0 THEN TRUE ELSE FALSE END " +
            "FROM Roleoperation ro " +
            "WHERE ro.role.id = :roleId AND ro.permission.id = :permissionId AND ro.operation.id = :operationId")
    boolean existsByRoleIdAndPermissionIdAndOperationId(@Param("roleId") int roleId,
                                                        @Param("permissionId") int permissionId,
                                                        @Param("operationId") int operationId);

}
