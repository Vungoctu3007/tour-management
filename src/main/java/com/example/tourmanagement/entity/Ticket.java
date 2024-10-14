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
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int ticket_id;
    String ticket_description;
    Boolean ticket_status;
    @ManyToOne
    @JoinColumn(name = "bus_id")
    Bus bus_id;
    @ManyToOne
    @JoinColumn(name = "package_id")
    Package package_id;
}
