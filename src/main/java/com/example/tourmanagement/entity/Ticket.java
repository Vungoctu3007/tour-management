package com.example.tourmanagement.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "tickets")
public class Ticket {
    @EmbeddedId
    private TicketId id;

    @MapsId("bookingId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "booking_id", nullable = false)
    private Booking booking;

    @MapsId("passengerId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "passenger_id", nullable = false)
    private Passenger passenger;

    public void setBookingId(Integer bookingId) {
        if (this.id == null) {
            this.id = new TicketId();  // Đảm bảo id được khởi tạo
        }
        this.id.setBookingId(bookingId);
        this.booking = new Booking();
        this.booking.setId(bookingId);
    }

    public void setPassengerId(Integer passengerId) {
        if (this.id == null) {
            this.id = new TicketId();  // Đảm bảo id được khởi tạo
        }
        this.id.setPassengerId(passengerId);
        this.passenger = new Passenger();
        this.passenger.setId(passengerId);
    }
}