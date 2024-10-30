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
@Table(name = "passengers")
public class Passenger {
    @Id
    @Column(name = "passenger_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "object_id")
    private Object object;

    @Column(name = "passenger_name", nullable = false)
    private String passengerName;

    @Column(name = "gender", nullable = false)
    private String gender;

    @Column(name = "date_birth", nullable = false)
    private LocalDate dateBirth;

}