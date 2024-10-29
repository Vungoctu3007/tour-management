package com.example.tourmanagement.entity;

import jakarta.persistence.*;
import lombok.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "feedback")
public class Feedback {
    @Id
    @Column(name = "feedback_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "booking_id")
    private Booking booking;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "detail_route_id")
    private Detailroute detailRoute;

    @Column(name = "text", nullable = false)
    private String text;

    @Column(name = "rating", nullable = false)
    private Float rating;

}