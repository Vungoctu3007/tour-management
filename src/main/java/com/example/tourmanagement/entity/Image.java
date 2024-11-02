package com.example.tourmanagement.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Getter
@Setter
@Entity
@Table(name = "images")
public class Image {
    @Id
    @Column(name = "image_id", nullable = false)
    private Integer id;

    @Lob
    @Column(name = "text_image")
    private String textImage;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "detail_route_id", nullable = false)
    private Detailroute detailRoute;

    @Column(name = "is_primary")
    private Integer isPrimary;

}