package com.example.tourmanagement.repository;

import com.example.tourmanagement.entity.Departure;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartureRepository extends JpaRepository<Departure,Integer> {
}
