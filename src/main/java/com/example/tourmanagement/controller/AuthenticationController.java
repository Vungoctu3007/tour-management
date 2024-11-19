package com.example.tourmanagement.controller;

import com.example.tourmanagement.dto.request.*;
import com.example.tourmanagement.dto.response.AuthenticationResponse;
import com.example.tourmanagement.dto.response.IntrospectResponse;
import com.example.tourmanagement.dto.response.RefreshResponse;
import com.example.tourmanagement.exception.AppException;
import com.example.tourmanagement.service.AuthenticationService;
import com.example.tourmanagement.service.UserService;
import com.fasterxml.jackson.core.io.JsonEOFException;
import com.nimbusds.jose.JOSEException;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.util.Map;

import lombok.extern.slf4j.Slf4j;
import org.apache.el.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
@Slf4j
@RestController
@RequestMapping("/api")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class AuthenticationController {

    private final  AuthenticationService authenticationService;
    private final UserService userService;


    @PostMapping("/login")
    public ApiResponse<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
        var result = authenticationService.authenticate(request);
        return ApiResponse.<AuthenticationResponse>builder()
                .result(result)
                .build();
    }

    @PostMapping("/outbound/authentication")
    public ApiResponse<AuthenticationResponse> outboundAuthenticate(@RequestParam("code") String code) {
        var result = authenticationService.outboundAuthenticate(code);
        return ApiResponse.<AuthenticationResponse>builder()
                .result(result)
                .build();
    }

    @PostMapping("/introspect")
    ApiResponse<IntrospectResponse> authenticate(@RequestBody IntrospectRequest request)
            throws ParseException, JOSEException, JsonEOFException {
        var result = authenticationService.introspect(request);
        return ApiResponse.<IntrospectResponse>builder().result(result).build();
    }

    @PostMapping("/decode-token")
    public ApiResponse<Map<String, Object>> decodeToken(@RequestHeader("Authorization") String authorizationHeader) {
        try {
            String token = authorizationHeader.replace("Bearer ", "");

            var decodedToken = authenticationService.decodeToken(token);
            return ApiResponse.<Map<String, Object>>builder()
                    .result(decodedToken)
                    .build();
        } catch (Exception e) {
            return ApiResponse.<Map<String, Object>>builder()
                    .message("Invalid token: " + e.getMessage())
                    .build();
        }
    }

    @PostMapping("/verify")
    public ApiResponse<String> verifyAccount(@RequestBody Map<String, String> payload) {
        String token = payload.get("token");
        log.info("token verify : {}", token);
        try {
            userService.verifyEmail(token);
            return ApiResponse.<String>builder()
                    .code(HttpStatus.OK.value())
                    .result("Account verified successfully! You can now log in.")
                    .build();
        } catch (AppException e) {
            log.error("Error during email verification: {}", e.getMessage());
            return ApiResponse.<String>builder()
                    .code(HttpStatus.BAD_REQUEST.value())
                    .message(e.getMessage())
                    .build();
        } catch (Exception e) {
            log.error("Unexpected error during email verification", e);
            return ApiResponse.<String>builder()
                    .code(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .message("An unexpected error occurred during email verification.")
                    .build();
        }
    }


    @PostMapping("/refresh")
    public ApiResponse<RefreshResponse> refreshToken(@RequestBody RefreshRequest request) {
        try {
            RefreshResponse response = authenticationService.refreshToken(request);

            return ApiResponse.<RefreshResponse>builder()
                    .result(response)
                    .code(HttpStatus.OK.value())
                    .message("Token refreshed successfully")
                    .build();
        } catch (AppException e) {
            log.error("Error during token refresh: {}", e.getMessage());
            return ApiResponse.<RefreshResponse>builder()
                    .code(HttpStatus.BAD_REQUEST.value())
                    .message(e.getMessage())
                    .build();
        } catch (Exception e) {
            log.error("Unexpected error during token refresh", e);
            return ApiResponse.<RefreshResponse>builder()
                    .code(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .message("An unexpected error occurred")
                    .build();
        }
    }



}