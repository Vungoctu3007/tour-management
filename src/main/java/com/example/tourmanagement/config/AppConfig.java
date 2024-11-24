package com.example.tourmanagement.config;

import java.util.HashSet;

import com.example.tourmanagement.constant.PredefinedRole;
import com.example.tourmanagement.entity.Role;
import com.example.tourmanagement.entity.User;
import com.example.tourmanagement.repository.RoleRepository;
import com.example.tourmanagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;


import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;

@Configuration
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class AppConfig {
    @Autowired
    PasswordEncoder passwordEncoder;

    @NonFinal
    static final String ADMIN_USER_NAME = "admin";

    @NonFinal
    static final String ADMIN_PASSWORD = "admin123";

    @Bean
    @ConditionalOnProperty(
            prefix = "spring",
            value = "datasource.driverClassName",
            havingValue = "com.mysql.cj.jdbc.Driver")
    ApplicationRunner applicationRunner(UserRepository userRepository, RoleRepository roleRepository) {
        log.info("Initializing application.....");
        return args -> {
            if (userRepository.findByUsername(ADMIN_USER_NAME).isEmpty()) {
                // Lấy vai trò ROLE_ADMIN từ database
                com.example.tourmanagement.entity.Role adminRole = roleRepository.findByRoleId(1)
                        .orElseThrow(() -> new IllegalStateException("Role ROLE_ADMIN does not exist in the database"));

                // Tạo tài khoản ADMIN
                User user = User.builder()
                        .username(ADMIN_USER_NAME)
                        .password(passwordEncoder.encode(ADMIN_PASSWORD))
                        .role(adminRole) // Gán vai trò đã tìm thấy từ DB
                        .email("admin@gmail.com")
                        .status(1)
                        .build();

                // Lưu tài khoản ADMIN
                userRepository.save(user);

                log.warn("Admin user has been created with default password: admin123, please change it");
            } else {
                log.info("Admin user already exists. Skipping initialization.");
            }
        };
    }

}
