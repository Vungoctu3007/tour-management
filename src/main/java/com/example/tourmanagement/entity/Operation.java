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
@Table(name = "operations", schema = "tour_management")
public class Operation {
    @Id
    @Column(name = "operation_id", nullable = false)
    private Integer id;

    @Column(name = "operation_name", nullable = false)
    private String operationName;

}