package com.example.tourmanagement.repository;
import com.example.tourmanagement.entity.Paymentstatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentStatusRepository extends JpaRepository<Paymentstatus, Integer> {
    // No additional methods are needed for now
}