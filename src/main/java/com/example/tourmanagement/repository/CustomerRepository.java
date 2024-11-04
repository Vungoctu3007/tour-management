package com.example.tourmanagement.repository;

import com.example.tourmanagement.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {
    @Query("SELECT c FROM Customer c WHERE c.user.id = :userId")
    Optional<Customer> findByCustomerId(@Param("userId") Integer userId);
    @Modifying
    @Query("DELETE FROM Customer c WHERE c.user.id = :userId") // Thay 'user' nếu cần
    void deleteCustomerByUserId(@Param("userId") Integer userId);
  
}
