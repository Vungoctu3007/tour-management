package com.example.tourmanagement.repository;

import com.example.tourmanagement.entity.Customer;
import com.example.tourmanagement.entity.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, String> {
  @Query("SELECT e FROM Employee e")
  Page<Employee> findAllEmployee(Pageable pageable);

  @Query("SELECT c FROM Employee c WHERE (:email IS NULL OR c.employeeEmail LIKE %:email%)")
  Page<Employee> searchEmployeeByEmail(@Param("email") String email, Pageable pageable);
}
