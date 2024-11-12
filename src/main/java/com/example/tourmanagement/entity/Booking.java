package com.example.tourmanagement.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.math.BigDecimal;
import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "bookings")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "booking_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @Column(name = "total_price", precision = 10, scale = 2)
    private BigDecimal totalPrice;

    @Column(name = "time_to_order")
    private Instant timeToOrder;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "payment_id")
    private Payment payment;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "payment_status_id")
    private Paymentstatus paymentStatus;

    @Column(name = "status_booking", nullable = false)
    private Integer statusBooking;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "detail_route_id")
    private Detailroute detailRoute;

    public void setCustomerId(Integer customerId) {
        if (this.customer == null) {
            this.customer = new Customer();
        }
        this.customer.setId(customerId);  
    }

    public void setPaymentId(Integer paymentId) {
        if (this.payment == null) {
            this.payment = new Payment();
        }
        this.payment.setId(paymentId);  
    }

    public void setPaymentStatusId(Integer paymentStatusId) {
        if (this.paymentStatus == null) {
            this.paymentStatus = new Paymentstatus();
        }
        this.paymentStatus.setId(paymentStatusId);
    }

    public void setDetailRouteId(Integer detailRouteId) {
        if (this.detailRoute == null) {
            this.detailRoute = new Detailroute();
        }
        this.detailRoute.setId(detailRouteId);
    }

    public void setTimeToOrder() {
        this.timeToOrder = Instant.now();  // Sets the current date and time (UTC)
    }
}