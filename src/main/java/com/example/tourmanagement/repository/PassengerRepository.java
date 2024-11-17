package com.example.tourmanagement.repository;

import com.example.tourmanagement.dto.response.PassengerResponse;
import feign.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.tourmanagement.entity.Passenger;

import java.util.List;

@Repository
public interface PassengerRepository  extends JpaRepository<Passenger, Integer>{
    @Query("SELECT new com.example.tourmanagement.dto.response.PassengerResponse(" +
            "p.id, " +
            "o.objectName, " +
            "p.passengerName, " +
            "p.gender, " +
            "p.dateBirth) " +
            "FROM Passenger p " +
            "JOIN Ticket t ON p.id = t.passenger.id " +
            "JOIN Booking b ON t.booking.id = b.id " +
            "JOIN Object o ON p.object.id = o.id " +
            "WHERE b.id = :bookingId")
    List<PassengerResponse> findPassengersByBookingId(@Param("bookingId") Integer bookingId);

}
