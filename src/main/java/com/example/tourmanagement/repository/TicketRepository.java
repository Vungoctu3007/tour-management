package com.example.tourmanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.tourmanagement.entity.Ticket;
import com.example.tourmanagement.entity.TicketId;

public interface TicketRepository extends JpaRepository<Ticket, TicketId> {
    
}
