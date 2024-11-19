package com.example.tourmanagement.repository;

import com.example.tourmanagement.dto.response.BookingDetailResponse;
import com.example.tourmanagement.dto.response.OrdersResponse;
import com.example.tourmanagement.dto.response.UserBookingInformationResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.example.tourmanagement.entity.Booking;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Integer> {
    @Query("SELECT new com.example.tourmanagement.dto.response.OrdersResponse(" +
            "b.id, c.customerName, b.timeToOrder, b.totalPrice, s.id, s.statusName, p.paymentName) " +
            "FROM Booking b " +
            "JOIN b.customer c " +
            "JOIN b.paymentStatus s " +
            "JOIN b.payment p "
    )
    Page<OrdersResponse> getAllBookings(Pageable pageable);

    @Query("SELECT new com.example.tourmanagement.dto.response.UserBookingInformationResponse(" +
            "b.id, c.id, b.totalPrice, b.timeToOrder, ps.statusName, d.detailRouteName) " +
            "FROM Booking b " +
            "JOIN b.customer c " +
            "JOIN c.user u " +
            "JOIN b.paymentStatus ps " +
            "JOIN b.detailRoute d " +
            "WHERE u.id = :userId"
    )
    Page<UserBookingInformationResponse> getAllUserBookingInformationByUserId(@Param("userId") Integer userId, Pageable pageable);

    @Query("SELECT new com.example.tourmanagement.dto.response.BookingDetailResponse(" +
            "b.id, b.totalPrice,p.id, p.statusName, COUNT(passenger.id), b.timeToOrder, d.timeToDeparture, d.timeToFinish, " +
            "c.id, c.customerName, c.customerEmail, c.customerPhone, c.customerAddress) " +
            "FROM Booking b " +
            "JOIN b.customer c " +
            "JOIN b.paymentStatus p " +
            "JOIN Ticket t ON t.booking.id = b.id " +
            "JOIN Passenger passenger ON t.passenger.id = passenger.id " +
            "JOIN Detailroute d ON d.id = b.detailRoute.id " +
            "WHERE b.id = :bookingId " +
            "GROUP BY b.id, b.totalPrice, b.timeToOrder, d.timeToDeparture, d.timeToFinish, " +
            "c.id, c.customerName, c.customerEmail, c.customerPhone, c.customerAddress")
    BookingDetailResponse getBookingDetailByBookingId(@Param("bookingId") Integer bookingId);

    @Modifying
    @Query("UPDATE Booking b SET b.paymentStatus.id = :statusId WHERE b.id = :bookingId")
    int updateBookingStatus(Integer bookingId, Integer statusId);
}