package com.example.tourmanagement.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "departures")
public class Departure {
    @Id
    @Column(name = "departure_id", nullable = false)
    private Integer id;

    @Column(name = "departure_name")
    private String departureName;

}