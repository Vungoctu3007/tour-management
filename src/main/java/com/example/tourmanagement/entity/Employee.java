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
@Table(name = "employees", schema = "tour_management")
public class Employee {
    @Id
    @Column(name = "employee_id", nullable = false)
    private String employeeId;

    @Column(name = "employee_email", nullable = false)
    private String employeeEmail;

}