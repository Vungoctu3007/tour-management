package com.example.tourmanagement.entity;

import jakarta.persistence.*;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class Hotel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int hotel_id;
    String hotel_address;
    String hotel_description;
    String hotel_name;
    String hotel_type;
    int rent;
    String status;
    @ManyToOne
    @JoinColumn(name = "package_id")
    Package package_id;

}
