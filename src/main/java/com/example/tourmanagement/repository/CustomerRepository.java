package com.example.tourmanagement.repository;

import com.example.tourmanagement.dto.request.BookingRequest;
import com.example.tourmanagement.entity.Customer;
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
    @Modifying
    @Query("DELETE FROM Customer c WHERE c.user.id = :userId") // Thay 'user' nếu cần
    void deleteCustomerByUserId(@Param("userId") Integer userId);

    @Transactional
    @Modifying
    @Query(value = "INSERT INTO customers (customer_name, customer_email, customer_address, user_id, customer_phone) VALUES (:customerName, :customerEmail, :customerAddress, :userId, :customerPhone)", nativeQuery = true)
    int insertCustomer(@Param("customerName") String customerName,
                       @Param("customerEmail") String customerEmail,
                       @Param("customerAddress") String customerAddress,
                       @Param("customerPhone") String customerPhone,
                       @Param("userId") int userId);
}
