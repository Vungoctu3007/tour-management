package com.example.tourmanagement.repository;

import com.example.tourmanagement.entity.Arrival;
import com.example.tourmanagement.entity.Departure;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArrivalRepository extends JpaRepository<Arrival,Integer> {
}
