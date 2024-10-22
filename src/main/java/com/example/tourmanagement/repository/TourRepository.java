package com.example.tourmanagement.repository;

import com.example.tourmanagement.entity.Tour;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TourRepository  extends JpaRepository<Tour, Integer> {

}
