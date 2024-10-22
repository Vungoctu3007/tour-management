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
@Table(name = "bookings")
public class Booking {
    @Id
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "tour_id", nullable = false)
    private Tour tour;

    @ColumnDefault("0")
    @Column(name = "total_adults")
    private Integer totalAdults;

    @ColumnDefault("0")
    @Column(name = "total_children")
    private Integer totalChildren;

    @ColumnDefault("0")
    @Column(name = "total_seniors")
    private Integer totalSeniors;

    @ColumnDefault("`total_adults` + `total_children` + `total_seniors`")
    @Column(name = "total_passengers")
    private Integer totalPassengers;

    @Column(name = "total_price", precision = 10, scale = 2)
    private BigDecimal totalPrice;

    @ColumnDefault("'pending'")
    @Lob
    @Column(name = "status")
    private String status;

    @ColumnDefault("current_timestamp()")
    @Column(name = "created_at", nullable = false)
    private Instant createdAt;

    @ColumnDefault("current_timestamp()")
    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

}