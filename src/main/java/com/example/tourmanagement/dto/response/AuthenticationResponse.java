package com.example.tourmanagement.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AuthenticationResponse {
    Integer userId;
    String token;
    Date expiryTime;
    Integer roleId;
    String roleName;
    String userName;
    boolean authenticated;
}
