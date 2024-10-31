package com.example.tourmanagement.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "arrivals", schema = "tour_management")
public class Arrival {
    @Id
    @Column(name = "arrival_id", nullable = false)
    private Integer id;

    @Column(name = "arrival_name")
    private String arrivalName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "status_id")
    private Statusroleoperation status;

}