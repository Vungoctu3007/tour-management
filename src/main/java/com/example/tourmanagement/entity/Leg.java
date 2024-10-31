package com.example.tourmanagement.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "legs", schema = "tour_management")
public class Leg {
    @Id
    @Column(name = "leg_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "detail_route_id")
    private Detailroute detailRoute;

    @Column(name = "title")
    private String title;

    @Lob
    @Column(name = "description")
    private String description;

    @Column(name = "sequence", nullable = false)
    private Integer sequence;

}