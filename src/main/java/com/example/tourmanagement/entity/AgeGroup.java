package com.example.tourmanagement.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name = "age_groups")
public class AgeGroup {
    @Id
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "age_group", nullable = false)
    private String ageGroup;

    @Column(name = "price_factor", nullable = false, precision = 5, scale = 2)
    private BigDecimal priceFactor;

    @Lob
    @Column(name = "description")
    private String description;

}