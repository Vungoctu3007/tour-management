package com.example.tourmanagement.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "statusroleoperation")
public class Statusroleoperation {
    @Id
    @Column(name = "status_id", nullable = false)
    private Integer id;

    @Column(name = "description", nullable = false)
    private String description;

}