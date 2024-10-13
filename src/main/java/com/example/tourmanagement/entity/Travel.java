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
public class Travel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int travel_id;
    String city,pincode,state,agent_name,contact,travel_name;
    @ManyToOne
    @JoinColumn(name = "route_id")
    Route route_id;
}
