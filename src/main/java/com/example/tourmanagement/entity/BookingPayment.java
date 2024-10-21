package com.example.tourmanagement.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.math.BigDecimal;
import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "booking_payments")
public class BookingPayment {
    @Id
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "booking_id", nullable = false)
    private com.example.tourmanagement.Booking booking;

    @Lob
    @Column(name = "payment_method", nullable = false)
    private String paymentMethod;

    @ColumnDefault("'pending'")
    @Lob
    @Column(name = "payment_status")
    private String paymentStatus;

    @Column(name = "amount", nullable = false, precision = 10, scale = 2)
    private BigDecimal amount;

    @ColumnDefault("current_timestamp()")
    @Column(name = "payment_date", nullable = false)
    private Instant paymentDate;

}