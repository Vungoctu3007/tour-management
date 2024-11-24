package com.example.tourmanagement.repository;

import com.example.tourmanagement.dto.request.UserCreateRequest;
import com.example.tourmanagement.dto.response.UserCreateResponse;
import com.example.tourmanagement.dto.response.UserResponse;
import com.example.tourmanagement.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
        boolean existsByUsername(String username);

        @EntityGraph(attributePaths = "role")
        Optional<User> findByUsername(String username);

        @Modifying
        @Query("UPDATE User u SET u.status = :status WHERE u.id = :userId")
        void updateUserStatus(int userId, int status);

        @Query("SELECT u FROM User u where u.status = :status")
        Page<User> findAllByStatus(int status, Pageable pageable);

        // Updated search method to exclude roleName
        @Query("SELECT u FROM User u WHERE (:username IS NULL OR u.username LIKE %:username%)")
        Page<User> searchUsers(@Param("username") String username, Pageable pageable);

        Optional<User> findByEmail(String email);
        boolean existsByEmail(String email);

}
