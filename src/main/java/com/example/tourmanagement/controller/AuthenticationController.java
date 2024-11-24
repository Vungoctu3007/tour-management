package com.example.tourmanagement.controller;

import com.example.tourmanagement.dto.request.*;
import com.example.tourmanagement.dto.response.AuthenticationResponse;
import com.example.tourmanagement.dto.response.IntrospectResponse;
import com.example.tourmanagement.dto.response.RefreshResponse;
import com.example.tourmanagement.dto.response.UserResponse;
import com.example.tourmanagement.entity.Customer;
import com.example.tourmanagement.entity.Role;
import com.example.tourmanagement.entity.User;
import com.example.tourmanagement.exception.AppException;
import com.example.tourmanagement.exception.ErrorCode;
import com.example.tourmanagement.repository.CustomerRepository;
import com.example.tourmanagement.repository.RoleRepository;
import com.example.tourmanagement.repository.UserRepository;
import com.example.tourmanagement.service.AuthenticationService;
import com.example.tourmanagement.service.UserService;
import com.fasterxml.jackson.core.io.JsonEOFException;
import com.nimbusds.jose.JOSEException;
import java.util.Optional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.util.HashMap;
import java.util.Map;

import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.apache.el.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@Slf4j
@RestController
@RequestMapping("/api/auth")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class AuthenticationController {

  @Autowired
  private final AuthenticationService authenticationService;
  private final UserService userService;
  @Autowired
  private UserRepository userRepository;
  @Autowired
  private CustomerRepository customerRepository;

  @NonFinal
  @Value("${spring.security.oauth2.client.registration.facebook.client-id}")
  protected String FACEBOOK_CLIENT_ID;

  @NonFinal
  @Value("${spring.security.oauth2.client.registration.facebook.client-secret}")
  protected String FACEBOOK_CLIENT_SECRET;

  @NonFinal
  @Value("${spring.security.oauth2.client.registration.google.client-id}")
  protected String GOOGLE_CLIENT_ID;

  @NonFinal
  @Value("${spring.security.oauth2.client.registration.google.client-secret}")
  protected String GOOGLE_CLIENT_SECRET;

  @NonFinal
  @Value("${outbound.identity.redirect-uri}")
  protected String REDIRECT_URI;
  @Autowired
  private RoleRepository roleRepository;


  @GetMapping("/{userId}")
  public ApiResponse<UserResponse> getUserById(@PathVariable int userId) {
    UserResponse userResponse = userService.getUserById(userId);
    return ApiResponse.<UserResponse>builder()
        .result(userResponse)
        .build();
  }

  @PostMapping("/oauth2/callback/google")
  public ResponseEntity<?> handleGoogleCallback(@RequestBody Map<String, String> body) {
    String code = body.get("code");
    if (code == null) {
      return ResponseEntity.badRequest().body("No code provided");
    }

    try {
      // 1. Lấy access token từ Google
      String accessToken = getAccessTokenFromCode(code);

      // 2. Lấy thông tin người dùng từ Google
      Map<String, Object> userInfo = getUserInfoFromGoogle(accessToken);

      // 3. Lấy thông tin người dùng từ email
      String email = (String) userInfo.get("email");
      String name = (String) userInfo.get("name");
      String picture = (String) userInfo.get("picture");

      log.info("email :", email);

      // Kiểm tra xem người dùng đã tồn tại trong database chưa
      Optional<User> existingUser = userRepository.findByEmail(email);

      System.out.println(existingUser);

      if (existingUser.isPresent()) {
        // Nếu đã tồn tại, tạo token và trả về thông tin
        AuthenticationService.TokenInfo tokenInfo = authenticationService.generateToken(existingUser.get());
        return ResponseEntity.ok(Map.of(
            "token", tokenInfo.token(),
            "expiryTime", tokenInfo.expiryDate(),
            "email", email,
            "name", existingUser.get().getUsername(),
            "picture", picture
        ));
      }

      // 4. Nếu không tồn tại, tạo người dùng mới
      Role customerRole = roleRepository.findByRoleId(3)
          .orElseThrow(() -> new IllegalStateException("Role ROLE_CUSTOMER does not exist in the database"));

      User newUser = new User();
      newUser.setUsername(name);
      newUser.setPassword("password account google");
      newUser.setEmail(email);
      newUser.setRole(customerRole);
      newUser.setStatus(1);
      User savedUser = userRepository.save(newUser);

      Customer customer = new Customer();
      customer.setUserId(savedUser.getId());
      customer.setCustomerName(savedUser.getUsername());
      customer.setCustomerEmail(savedUser.getEmail());
      customer.setCustomerPhone("0827415586");
      customer.setCustomerAddress("119/30 Nguyen van Cu");
      customerRepository.save(customer);

      // 5. Tạo token cho người dùng mới
      AuthenticationService.TokenInfo tokenInfo = authenticationService.generateToken(savedUser);

      // 6. Trả về token và thông tin người dùng
      return ResponseEntity.ok(Map.of(
          "token", tokenInfo.token(),
          "expiryTime", tokenInfo.expiryDate(),
          "email", email,
          "name", name,
          "picture", picture
      ));
    } catch (Exception e) {
      return ResponseEntity.status(500).body("Error during Google login: " + e.getMessage());
    }
  }


  private String getAccessTokenFromCode(String code) throws Exception {
    RestTemplate restTemplate = new RestTemplate();
    String tokenUrl = "https://oauth2.googleapis.com/token";

    Map<String, String> params = new HashMap<>();
    params.put("code", code);
    params.put("client_id", GOOGLE_CLIENT_ID);
    params.put("client_secret", GOOGLE_CLIENT_SECRET);
    params.put("redirect_uri", "http://localhost:3000/oauth2/redirect");
    params.put("grant_type", "authorization_code");

    ResponseEntity<Map> response = restTemplate.postForEntity(tokenUrl, params, Map.class);

    if (!response.getStatusCode().is2xxSuccessful()) {
      throw new Exception("Failed to fetch access token");
    }

    return (String) response.getBody().get("access_token");
  }

  //login facebook
  @PostMapping("/oauth2/callback/facebook")
  public ResponseEntity<?> handleFacebookCallback(@RequestBody Map<String, String> body) {
    String code = body.get("code");
    if (code == null) {
      return ResponseEntity.badRequest().body("No code provided");
    }

    try {
      // 1. Lấy access token từ Facebook
      String accessToken = getAccessTokenFromCodeWithFacebook(code);

      // 2. Lấy thông tin người dùng từ Facebook
      Map<String, Object> userInfo = getUserInfoFromFacebook(accessToken);

      // 3. Lấy thông tin người dùng từ email
      String email = (String) userInfo.get("email");
      String name = (String) userInfo.get("name");

      // Kiểm tra xem người dùng đã tồn tại trong database chưa
      Optional<User> existingUser = userRepository.findByEmail(email);
      System.out.println(existingUser);
      if (existingUser.isPresent()) {
        // Nếu đã tồn tại, tạo token và trả về thông tin
        AuthenticationService.TokenInfo tokenInfo = authenticationService.generateToken(existingUser.get());
        return ResponseEntity.ok(Map.of(
            "token", tokenInfo.token(),
            "email", email,
            "name", existingUser.get().getUsername()
        ));
      }

      // 4. Nếu không tồn tại, tạo người dùng mới
      com.example.tourmanagement.entity.Role customerRole = roleRepository.findByRoleId(3)
          .orElseThrow(() -> new IllegalStateException("Role ROLE_CUSTOMER does not exist in the database"));
      User newUser = new User();
      newUser.setUsername(name);
      newUser.setEmail(email);
      newUser.setPassword("oauth2_default_password_facebook"); // Mật khẩu mặc định
      newUser.setRole(customerRole); // Vai trò mặc
      newUser.setStatus(1);
      userRepository.save(newUser);

      Customer customer = new Customer();
      customer.setUserId(newUser.getId());
      customer.setCustomerName(newUser.getUsername());
      customer.setCustomerEmail(newUser.getEmail());
      customer.setCustomerPhone("0827415586");
      customer.setCustomerAddress("119/30 Nguyen van Cu");
      customerRepository.save(customer); // Lưu Customer vào DB

      // 5. Tạo token JWT cho người dùng mới
      AuthenticationService.TokenInfo tokenInfo = authenticationService.generateToken(newUser);

      // 6. Trả về token và thông tin người dùng
      return ResponseEntity.ok(Map.of(
          "token", tokenInfo.token(),
          "email", email,
          "name", name
      ));
    } catch (Exception e) {
      return ResponseEntity.status(500).body("Error during Facebook login: " + e.getMessage());
    }
  }


  private String getAccessTokenFromCodeWithFacebook(String code) throws Exception {
    RestTemplate restTemplate = new RestTemplate();
    String tokenUrl = "https://graph.facebook.com/v12.0/oauth/access_token"
        + "?client_id=" + FACEBOOK_CLIENT_ID
        + "&client_secret=" + FACEBOOK_CLIENT_SECRET
        + "&redirect_uri=http://localhost:3000/oauth2/callback/facebook"
        + "&code=" + code;

    ResponseEntity<Map> response = restTemplate.getForEntity(tokenUrl, Map.class);

    if (!response.getStatusCode().is2xxSuccessful()) {
      throw new Exception("Failed to fetch access token");
    }

    return (String) response.getBody().get("access_token");
  }


  private Map<String, Object> getUserInfoFromFacebook(String accessToken) throws Exception {
    RestTemplate restTemplate = new RestTemplate();
    String userInfoUrl = "https://graph.facebook.com/me?fields=id,name,email,picture";

    HttpHeaders headers = new HttpHeaders();
    headers.setBearerAuth(accessToken);
    HttpEntity<?> entity = new HttpEntity<>(headers);

    ResponseEntity<Map> response = restTemplate.exchange(userInfoUrl, HttpMethod.GET, entity,
        Map.class);

    if (!response.getStatusCode().is2xxSuccessful()) {
      throw new Exception("Failed to fetch user info");
    }

    return response.getBody();
  }


  private Map<String, Object> getUserInfoFromGoogle(String accessToken) throws Exception {
    RestTemplate restTemplate = new RestTemplate();
    String userInfoUrl = "https://www.googleapis.com/oauth2/v3/userinfo";

    HttpHeaders headers = new HttpHeaders();
    headers.setBearerAuth(accessToken);
    HttpEntity<?> entity = new HttpEntity<>(headers);

    ResponseEntity<Map> response = restTemplate.exchange(userInfoUrl, HttpMethod.GET, entity,
        Map.class);

    if (!response.getStatusCode().is2xxSuccessful()) {
      throw new Exception("Failed to fetch user info");
    }

    return response.getBody();
  }


  @PostMapping("/login")
  public ApiResponse<AuthenticationResponse> authenticate(
      @RequestBody AuthenticationRequest request) {
    var result = authenticationService.authenticate(request);
    return ApiResponse.<AuthenticationResponse>builder()
        .result(result)
        .build();
  }

  @PostMapping("/outbound/authentication")
  public ApiResponse<AuthenticationResponse> outboundAuthenticate(
      @RequestParam("code") String code) {
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
  public ApiResponse<Map<String, Object>> decodeToken(
      @RequestHeader("Authorization") String authorizationHeader) {
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

  @PostMapping("/register")
  public ApiResponse<UserResponse> register(@RequestBody UserCreateRequest request) {
    if (userService.existsByEmail(request.getEmail())) {
      // Trả về phản hồi nếu email đã tồn tại
      return ApiResponse.<UserResponse>builder()
          .code(ErrorCode.EMAIL_IS_EXISTED.getCode()) // Mã lỗi
          .message(ErrorCode.EMAIL_IS_EXISTED.getMessage()) // Thông báo lỗi
          .result(null) // Không có kết quả trả về
          .build();
    }

    // Tạo mới user nếu email chưa tồn tại
    return ApiResponse.<UserResponse>builder()
        .result(userService.createUser(request)) // Thông tin user được tạo
        .code(1000) // Mã thành công
        .message("Registration successful") // Thông báo thành công
        .build();
  }

}