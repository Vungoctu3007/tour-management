package com.example.tourmanagement.repository;

import com.example.tourmanagement.entity.Route;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TourRepository  extends JpaRepository<Route, Integer> {

}
