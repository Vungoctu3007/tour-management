package com.example.tourmanagement.repository;

import com.example.tourmanagement.entity.Operation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OperationRepository extends JpaRepository<Operation, Integer> {
}
