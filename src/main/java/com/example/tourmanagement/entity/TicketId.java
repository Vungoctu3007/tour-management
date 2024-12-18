package com.example.tourmanagement.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.Hibernate;

import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@Embeddable
public class TicketId implements Serializable {
    private static final long serialVersionUID = 2637434328953449496L;
    @Column(name = "booking_id", nullable = false)
    private Integer bookingId;

    @Column(name = "passenger_id", nullable = false)
    private Integer passengerId;

    // @Override
    // public boolean equals(Object o) {
    //     if (this == o) return true;
    //     if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
    //     TicketId entity = (TicketId) o;
    //     return Objects.equals(this.passengerId, entity.passengerId) &&
    //             Objects.equals(this.bookingId, entity.bookingId);
    // }

    @Override
    public int hashCode() {
        return Objects.hash(passengerId, bookingId);
    }

}