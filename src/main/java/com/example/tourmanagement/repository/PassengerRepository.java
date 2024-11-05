package com.example.tourmanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.tourmanagement.entity.Passenger;

@Repository
public interface PassengerRepository  extends JpaRepository<Passenger, Integer>{
    
}
