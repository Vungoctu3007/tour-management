package com.example.tourmanagement.config;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authorization.AuthorizationDecision;
import org.springframework.security.authorization.AuthorizationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.access.intercept.RequestAuthorizationContext;
import org.springframework.stereotype.Component;

import java.util.function.Supplier;
@Slf4j
@Component
public class MyAuthorizationManager implements AuthorizationManager<RequestAuthorizationContext> {

    @Override
    public AuthorizationDecision check(Supplier<Authentication> authentication, RequestAuthorizationContext context) {
        Authentication auth = authentication.get();

        log.info("Authentication: {}", auth);

        // Kiểm tra xem người dùng đã đăng nhập hay chưa
        if (auth == null || !auth.isAuthenticated()) {
            return new AuthorizationDecision(false); // Từ chối truy cập
        }

        HttpServletRequest request = context.getRequest();
        String endpoint = request.getRequestURI(); // Lấy URL endpoint
        String method = request.getMethod(); // Lấy HTTP method

        log.info("Authorities: {}", auth.getAuthorities());
        log.info("Endpoint: {}", endpoint);
        log.info("HTTP Method: {}", method);

        // Kiểm tra quyền dựa trên endpoint
        if (endpoint.contains("/api/admin/user")) {
            boolean hasPermission = auth.getAuthorities().stream()
                    .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("STAFF") ||
                            grantedAuthority.getAuthority().equals("ADMIN"));
            return new AuthorizationDecision(hasPermission);
        }

        if (endpoint.contains("/api/admin/role")) {
            boolean hasPermission = auth.getAuthorities().stream()
                    .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("STAFF") ||
                            grantedAuthority.getAuthority().equals("ADMIN"));
            return new AuthorizationDecision(hasPermission);
        }

        // Mặc định từ chối truy cập
        return new AuthorizationDecision(false);
    }
}
