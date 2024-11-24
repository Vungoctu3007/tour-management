package com.example.tourmanagement.entity;

import jakarta.persistence.*;
import lombok.*;
@Builder
@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id", nullable = false)
    private Integer id;

    @Column(name = "username", nullable = false)
    private String username;

    @Column(name = "password", nullable = false)
    private String password;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "role_id")
    private Role role;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "status", nullable = false)
    private Integer status;

    @Column(name = "verify_token", length = 512)
    private String verificationToken;


    public User(Integer id, String username, Role role, String email, Integer status, String verificationToken) {
        this.id = id;
        this.username = username;
        this.role = role;
        this.email = email;
        this.status = status;
        this.verificationToken = verificationToken;
    }

}