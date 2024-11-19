package com.example.tourmanagement.dto.response;

import java.util.Set;

import com.example.tourmanagement.entity.Role;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserResponse {
    int id;
    String username;
    String password;
    String email;
    int role;
    String roleName;
    int status;
    String token;


    public UserResponse(int id, String username, String password, String email, int role, int status, String token) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.role = role;
        this.status = status;
        this.token = token;
    }
}
