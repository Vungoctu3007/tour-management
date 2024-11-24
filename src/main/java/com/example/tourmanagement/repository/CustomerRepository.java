package com.example.tourmanagement.repository;

import com.example.tourmanagement.dto.request.BookingRequest;
import com.example.tourmanagement.entity.Customer;
import com.example.tourmanagement.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Optional;
@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {
    @Query("SELECT c FROM Customer c WHERE c.user.id = :userId")
    Optional<Customer> findByCustomerId(@Param("userId") Integer userId);

    @Query("SELECT c FROM Customer c WHERE c.user.id = :userId")
    Optional<Customer> findByUserId(@Param("userId") Integer userId);


    @Modifying
    @Query("DELETE FROM Customer c WHERE c.user.id = :userId")
        // Thay 'user' nếu cần
    void deleteCustomerByUserId(@Param("userId") Integer userId);
    boolean existsCustomerByCustomerEmail(String email);


    @Query("SELECT c FROM Customer c")
    Page<Customer> findAllCustomer(Pageable pageable);


    @Query("SELECT c FROM Customer c WHERE (:username IS NULL OR c.customerName LIKE %:username%)")
    Page<Customer> searchCustomers(@Param("username") String username, Pageable pageable);

}
