package com.example.tourmanagement.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "objects", schema = "tour_management")
public class Object {
    @Id
    @Column(name = "object_id", nullable = false)
    private Integer id;

    @Column(name = "object_name")
    private String objectName;

    @Lob
    @Column(name = "description")
    private String description;

}