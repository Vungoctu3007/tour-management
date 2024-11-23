package com.example.tourmanagement.service;

import com.example.tourmanagement.dto.request.AuthenticationRequest;
import com.example.tourmanagement.dto.request.ExchangeTokenRequest;
import com.example.tourmanagement.dto.request.IntrospectRequest;
import com.example.tourmanagement.dto.request.RefreshRequest;
import com.example.tourmanagement.dto.response.AuthenticationResponse;
import com.example.tourmanagement.dto.response.IntrospectResponse;
import com.example.tourmanagement.dto.response.RefreshResponse;
import com.example.tourmanagement.entity.Customer;
import com.example.tourmanagement.entity.InvalidatedToken;
import com.example.tourmanagement.repository.CustomerRepository;
import com.example.tourmanagement.entity.User;
import com.example.tourmanagement.exception.AppException;
import com.example.tourmanagement.exception.ErrorCode;
import com.example.tourmanagement.repository.InvalidatedTokenRepository;
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
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final CustomerRepository customerRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final InvalidatedTokenRepository invalidatedTokenRepository;
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

    public record TokenInfo(String token, Date expiryDate) {
    }

    public IntrospectResponse introspect(IntrospectRequest request) throws JsonEOFException, ParseException {
        var token = request.getToken();
        boolean isValid = true;

        try {
            verifyToken(token, true);
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

        if(user.getStatus() == 0) {
            throw  new AppException(ErrorCode.USER_IS_BLOCKED);
        }


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


    public TokenInfo generateToken(User user) {
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);

        Date issueTime = new Date();
        Date expiryTime = new Date(Instant.ofEpochMilli(issueTime.getTime())
                .plus(1, ChronoUnit.HOURS)
                .toEpochMilli());


        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(user.getUsername()) // Username as subject
                .issuer("hoangtuan.com")
                .issueTime(issueTime)
                .expirationTime(expiryTime)
                .jwtID(UUID.randomUUID().toString()) // Unique ID for the token
                .claim("user_id", user.getId()) // Add user_id claim here
                .claim("scope",user.getRole().getRoleName().trim())
                .claim("username", user.getUsername())
                .claim("email:",user.getEmail())
                .build();


        JWSObject jwsObject = new JWSObject(header, new Payload(jwtClaimsSet.toJSONObject()));

        try {
            jwsObject.sign(new MACSigner(signerKey.getBytes()));
            return new TokenInfo(jwsObject.serialize(), expiryTime);
        } catch (JOSEException e) {
            log.error("Cannot create token", e);
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }
    }


    public Map<String, Object> decodeToken(String token) throws Exception {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        log.info("username : {}", authentication.getName());
        for (GrantedAuthority authority : authentication.getAuthorities()) {
            log.info(authority.getAuthority());
        }
        try {
            // Parse the token
            SignedJWT signedJWT = SignedJWT.parse(token);

            // Verify the token
            JWSVerifier verifier = new MACVerifier(signerKey.getBytes());
            if (!signedJWT.verify(verifier)) {
                throw new AppException(ErrorCode.UNAUTHENTICATED);
            }

            // Get claims from the token
            JWTClaimsSet claims = signedJWT.getJWTClaimsSet();

            // Extract specific information
            Map<String, Object> tokenDetails = new HashMap<>();
            tokenDetails.put("user_id", claims.getClaim("user_id"));
            tokenDetails.put("role_name", claims.getClaim("scope")); // Assuming scope holds the role name
            tokenDetails.put("expiration_time", claims.getExpirationTime());
            tokenDetails.put("issued_time", claims.getIssueTime());

            log.info("token detail : {}", tokenDetails);
            return tokenDetails;
        } catch (Exception e) {
            throw new Exception(e);
        }
    }



    public SignedJWT verifyToken(String token, boolean isRefresh) throws JOSEException, ParseException, java.text.ParseException {
        JWSVerifier verifier = new MACVerifier(signerKey.getBytes());

        SignedJWT signedJWT = SignedJWT.parse(token);

        log.info("Decoded token: {}", signedJWT.getJWTClaimsSet().toJSONObject()); // Log claims for debugging

        Date expiryTime = signedJWT.getJWTClaimsSet().getExpirationTime();
        var verified = signedJWT.verify(verifier);

        if (!(verified && expiryTime.after(new Date()))) {
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }

        return signedJWT;
    }


    private String buildScope(User user) {
        // Tạo một StringJoiner để lưu các scope
        StringJoiner stringJoiner = new StringJoiner(" ");
        if (user.getRole() != null) {
            // Thêm tên role vào scope (ROLE_ADMIN, ROLE_CUSTOMER, v.v.)
            stringJoiner.add(user.getRole().getRoleName());
        }
        return stringJoiner.toString(); // Trả về scope dạng chuỗi
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

    //refresh token
    public RefreshResponse refreshToken(RefreshRequest request) throws ParseException, JOSEException, java.text.ParseException {
        var signedJWT = verifyToken(request.getToken(), true);

        var jit = signedJWT.getJWTClaimsSet().getJWTID();
        var expiryTime = signedJWT.getJWTClaimsSet().getExpirationTime();

        InvalidatedToken invalidatedToken =
                InvalidatedToken.builder().id(jit).expiryTime(expiryTime).build();

        invalidatedTokenRepository.save(invalidatedToken);

        var username = signedJWT.getJWTClaimsSet().getSubject();

        var user = userRepository.findByUsername(username).orElseThrow(() -> new AppException(ErrorCode.UNAUTHENTICATED));

        var token = generateToken(user);

        return RefreshResponse.builder().token(token.token()).authenticated(true).build();
    }


}