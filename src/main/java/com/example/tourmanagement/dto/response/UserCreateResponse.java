package com.example.tourmanagement.dto.response;
import java.util.Set;

import com.example.tourmanagement.entity.Role;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserCreateResponse {
    int id;
    String username;
    String password;
    String email;
    int role;
    String roleName;

}
