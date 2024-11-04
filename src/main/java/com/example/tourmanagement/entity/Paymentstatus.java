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
@Table(name = "paymentstatus")
public class Paymentstatus {
    @Id
    @Column(name = "payment_status_id", nullable = false)
    private Integer id;

    @Column(name = "status_name", nullable = false)
    private String statusName;

}