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
@Table(name = "activity")
public class Activity {
    @Id
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "action", nullable = false)
    private String action;

}