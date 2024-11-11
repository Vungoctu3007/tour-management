package com.example.tourmanagement.service;

import com.example.tourmanagement.dto.request.AuthenticationRequest;
import com.example.tourmanagement.dto.request.ExchangeTokenRequest;
import com.example.tourmanagement.dto.request.IntrospectRequest;
import com.example.tourmanagement.dto.response.AuthenticationResponse;
import com.example.tourmanagement.dto.response.IntrospectResponse;
import com.example.tourmanagement.entity.Customer;
import com.example.tourmanagement.repository.CustomerRepository;
import com.example.tourmanagement.entity.User;
import com.example.tourmanagement.exception.AppException;
import com.example.tourmanagement.exception.ErrorCode;
import com.example.tourmanagement.repository.OutboundIdentityClient;
import com.example.tourmanagement.repository.UserRepository;
import com.fasterxml.jackson.core.io.JsonEOFException;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import lombok.RequiredArgsConstructor;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.apache.el.parser.ParseException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.StringJoiner;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final CustomerRepository customerRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    OutboundIdentityClient outboundIdentityClient;

    @Value("${jwt.signerKey}")
    protected String signerKey;

    @NonFinal
    @Value("${outbound.identity.client-id}")
    protected String CLIENT_ID;

    @NonFinal
    @Value("${outbound.identity.client-secret}")
    protected String CLIENT_SECRET;

    @NonFinal
    @Value("${outbound.identity.redirect-uri}")
    protected String REDIRECT_URI;

    @NonFinal
    protected final String GRANT_TYPE = "authorization_code";

    private record TokenInfo(String token, Date expiryDate) {
    }

    public IntrospectResponse introspect(IntrospectRequest request) throws JsonEOFException, ParseException {
        var token = request.getToken();
        boolean isValid = true;

        try {
            verifyToken(token);
        } catch (Exception e) {
            isValid = false;
        }
        return IntrospectResponse.builder().valid(isValid).build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        // Log username for debugging (avoid logging passwords in production)
        System.out.println("Username: " + request.getUsername());

        // Retrieve user by username, throw exception if not found
        var user = userRepository
                .findByUsername(request.getUsername())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        // Compare input password with the stored encoded password
        boolean authenticated = passwordEncoder.matches(request.getPassword(), user.getPassword());
        if (!authenticated) {
            throw new AppException(ErrorCode.USER_OR_PASSWORD_WRONG);
        }

        // Retrieve role and set user-specific data
        int roleId = user.getRole().getId();
        String roleName = user.getRole().getRoleName();
        String userName;
        int userId = user.getId();
        System.out.println("user_id : " + userId);
        if (roleId == 3) {
            // Fetch customer-specific name for customers
            Customer customer = customerRepository.findByCustomerId(userId)
                    .orElseThrow(() -> new AppException(ErrorCode.CUSTOMER_NOT_EXIST));
            userName = customer.getCustomerName();
        } else {
            // Default to username for non-customer roles
            userName = user.getUsername();
        }

        // Generate token and set expiry details
        var token = generateToken(user);

        // Build and return the response
        return AuthenticationResponse.builder()
                .token(token.token)
                .expiryTime(token.expiryDate)
                .userId(userId)
                .roleId(roleId)
                .roleName(roleName)
                .userName(userName)
                .build();
    }


    private TokenInfo generateToken(User user) {
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);

        Date issueTime = new Date();
        Date expiryTime = new Date(Instant.ofEpochMilli(issueTime.getTime())
                .plus(1, ChronoUnit.HOURS)
                .toEpochMilli());
        log.info("oke");
        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(user.getUsername())
                .issuer("hoangtuan.com")
                .issueTime(issueTime)
                .expirationTime(expiryTime)
                .jwtID(UUID.randomUUID().toString())
                .claim("user_id", user.getId())
                .build();

        // Create the payload
        Payload payload = new Payload(jwtClaimsSet.toJSONObject());

        // Create JWS object
        JWSObject jwsObject = new JWSObject(header, payload);

        try {
            System.out.println("generateToken");
            // Sign the JWS object with the secret key
            jwsObject.sign(new MACSigner(
                    signerKey.getBytes()));
            return new TokenInfo(jwsObject.serialize(), expiryTime);
        } catch (JOSEException e) {
            log.error("Cannot create token", e);
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }
    }

    private SignedJWT verifyToken(String token) throws JOSEException, ParseException, java.text.ParseException {
        JWSVerifier verifier = new MACVerifier(signerKey.getBytes());

        SignedJWT signedJWT = SignedJWT.parse(token);

        Date expiryTime = signedJWT.getJWTClaimsSet().getExpirationTime();

        var verified = signedJWT.verify(verifier);

        if (!(verified && expiryTime.after(new Date())))
            throw new AppException(ErrorCode.UNAUTHENTICATED);

        return signedJWT;
    }

    private String buildScope(User user) {
        StringJoiner stringJoiner = new StringJoiner(" ");
        log.info("role name :", user.getRole().getRoleName());
        if (user.getRole() != null && user.getRole().getRoleName() != null) {
            stringJoiner.add("ROLE_" + user.getRole().getRoleName());
            try {
                // if (!CollectionUtils.isEmpty((Collection<?>) user.getRole())) {
                // user.getRole().getId().forEach(permission -> {
                // stringJoiner.add(permission.getName());
                // });
                // }
                return "ok";

            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return stringJoiner.toString();
    }

    public AuthenticationResponse outboundAuthenticate(String code){
        try {
            var response = outboundIdentityClient.exchangeToken(ExchangeTokenRequest.builder()
                    .code(code)
                    .clientId(CLIENT_ID)
                    .clientSecret(CLIENT_SECRET)
                    .redirectUri(REDIRECT_URI)
                    .grantType(GRANT_TYPE)
                    .build());

            log.info("TOKEN RESPONSE {}", response);

            return AuthenticationResponse.builder()
                    .token(response.getAccessToken())
                    .build();
        } catch (Exception e) {
            log.error("Error occurred during token exchange: {}", e.getMessage(), e);
            throw new AppException(ErrorCode.OAUTH_ERROR);
        }
    }

}
