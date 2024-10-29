package com.example.tourmanagement.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
@Builder
@NoArgsConstructor
@AllArgsConstructor
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
    @JoinColumn(name = "detail_tour_id", nullable = false)
    private Detailroute detailTour;

}