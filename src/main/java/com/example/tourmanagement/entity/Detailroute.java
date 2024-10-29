package com.example.tourmanagement.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "detailroutes")
public class Detailroute {
    @Id
    @Column(name = "detail_route_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "route_id")
    private Route route;

    @Column(name = "detail_route_name")
    private String detailRouteName;

    @Lob
    @Column(name = "description")
    private String description;

    @Column(name = "time_to_departure")
    private LocalDate timeToDeparture;

    @Column(name = "time_to_finish")
    private LocalDate timeToFinish;

    @Column(name = "stock")
    private Integer stock;

}