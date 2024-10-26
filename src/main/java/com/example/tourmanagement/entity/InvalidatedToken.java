package com.example.tourmanagement.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "invalidated_token")
public class InvalidatedToken {
    @Id
    @Column(name = "id", nullable = false)
    private String id;

    @Column(name = "expiry_time")
    private Instant expiryTime;

}