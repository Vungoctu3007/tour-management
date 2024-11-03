package com.example.tourmanagement.repository;

import com.example.tourmanagement.entity.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    boolean existsByUsername(String username);
    @EntityGraph(attributePaths = "role")
    Optional<User> findByUsername(String username);
}
