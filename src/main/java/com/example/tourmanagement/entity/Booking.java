package com.example.tourmanagement.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int booking_id;
    String booking_title, booking_type;
    LocalDateTime date;
    String description;
    String status;

    @ManyToOne
    @JoinColumn(name = "user_id")
    User user_id;
    @ManyToOne
    @JoinColumn(name = "ticket_id")
    Ticket ticket_id;

}
