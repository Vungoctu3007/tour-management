package com.example.tourmanagement.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Autowired
    private CustomJwtDecoder customJwtDecoder;
    @Autowired
    MyAuthorizationManager myAuthorizationManager;

    private final String[] PUBLIC_ENDPOINT = {"/api/auth/**", "/api/route/**", "/api/admin/feedback/client", "/api/customer/**"};
    private final String[] PRIVATE_ENDPOINT = {"/api/admin/user/**", "/api/admin/role/**", "/api/admin/decentralization/**", "/api/admin/feedback/admin"};
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity, MyAuthorizationManager myAuthorizationManager) throws Exception {
        httpSecurity
                .cors(cors -> cors.configurationSource(corsConfigurationSource())) // Thêm CORS vào HttpSecurity
                .authorizeHttpRequests(request -> request
                        .requestMatchers(HttpMethod.OPTIONS, PUBLIC_ENDPOINT).permitAll()
                        .requestMatchers(PUBLIC_ENDPOINT).permitAll()

                        .requestMatchers(HttpMethod.OPTIONS, PRIVATE_ENDPOINT).hasAnyRole("STAFF", "ADMIN")

                        .anyRequest().authenticated()
                )
                .oauth2ResourceServer(oauth2 -> oauth2.jwt(jwtConfigurer -> jwtConfigurer
                        .decoder(customJwtDecoder)
                        .jwtAuthenticationConverter(jwtAuthenticationConverter()))
                )

                .csrf(AbstractHttpConfigurer::disable); // Tắt CSRF vì sử dụng JWT

        return httpSecurity.build();
    }



    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.addAllowedOrigin("http://localhost:3000"); // Cho phép React truy cập
        corsConfiguration.addAllowedMethod("*"); // Cho phép tất cả các phương thức HTTP
        corsConfiguration.addAllowedHeader("*"); // Cho phép tất cả các header
        corsConfiguration.setAllowCredentials(true); // Cho phép gửi cookie hoặc credential

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);
        return source;
    }

    @Bean
    public JwtAuthenticationConverter jwtAuthenticationConverter() {
        JwtGrantedAuthoritiesConverter jwtGrantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();
        jwtGrantedAuthoritiesConverter.setAuthorityPrefix("ROLE_"); // Không thêm tiền tố
        jwtGrantedAuthoritiesConverter.setAuthoritiesClaimName("scope"); // Sử dụng trường "scope"

        jwtGrantedAuthoritiesConverter.setAuthoritiesClaimName("scope");

        JwtAuthenticationConverter jwtAuthenticationConverter = new JwtAuthenticationConverter();
        jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(jwt -> {
            // Lấy claim "scope"
            String rawScope = jwt.getClaim("scope");

            if (rawScope != null) {
                rawScope = rawScope.replace("\r", "").replace("\n", "").trim(); // Loại bỏ \r\n và khoảng trắng
                return List.of(new SimpleGrantedAuthority(rawScope));
            }

            return List.of();
        });

        return jwtAuthenticationConverter;
    }


    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(10);
    }
}