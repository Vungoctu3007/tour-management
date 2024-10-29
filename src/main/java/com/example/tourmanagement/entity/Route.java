package com.example.tourmanagement.entity;

import jakarta.persistence.*;
import lombok.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "routes")
public class Route {
    @Id
    @Column(name = "route_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "arrival_id")
    private Arrival arrival;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "departure_id")
    private Departure departure;

}