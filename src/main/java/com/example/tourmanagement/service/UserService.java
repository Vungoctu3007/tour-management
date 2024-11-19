package com.example.tourmanagement.service;

import com.example.tourmanagement.dto.request.UserCreateRequest;
import com.example.tourmanagement.dto.request.UserUpdateRequest;
import com.example.tourmanagement.dto.response.UserResponse;
import com.example.tourmanagement.dto.response.UserResponseWrapper;
import com.example.tourmanagement.entity.Customer;
import com.example.tourmanagement.entity.Employee;
import com.example.tourmanagement.entity.Role;
import com.example.tourmanagement.entity.User;
import com.example.tourmanagement.exception.AppException;
import com.example.tourmanagement.exception.ErrorCode;
import com.example.tourmanagement.mapper.UserMapper;
import com.example.tourmanagement.repository.CustomerRepository;
import com.example.tourmanagement.repository.EmployeeRepository;
import com.example.tourmanagement.repository.RoleRepository;
import com.example.tourmanagement.repository.UserRepository;
import com.nimbusds.jose.JOSEException;
import com.nimbusds.jwt.SignedJWT;
import lombok.extern.slf4j.Slf4j;

import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.apache.el.parser.ParseException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;
    private final CustomerRepository customerRepository;
    private final EmployeeRepository employeeRepository;
    private EmployeeService employeeService;
    private EmailService emailService;
    private AuthenticationService authenticationService;
    private record TokenInfo(String token, Date expiryDate) {
    }


    public UserService(UserRepository userRepository, UserMapper userMapper, PasswordEncoder passwordEncoder,
            RoleRepository roleRepository, CustomerRepository customerRepository, EmployeeRepository employeeRepository,
            EmployeeService employeeService, AuthenticationService authenticationService, EmailService emailService) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
        this.customerRepository = customerRepository;
        this.employeeRepository = employeeRepository;
        this.employeeService = employeeService;
        this.authenticationService = authenticationService;
        this.emailService = emailService;
    }

    @Transactional(readOnly = true)

    public UserResponseWrapper getUsers(Pageable pageable) {
        Page<User> usersPage = userRepository.findAllByStatus(1, pageable);
        Page<UserResponse> userResponsesPage = usersPage.map(userMapper::toUserResponse);
        return new UserResponseWrapper(userResponsesPage.getTotalPages(), userResponsesPage.getTotalElements(),
                userResponsesPage.getContent());
    }

    public UserResponse createUser(UserCreateRequest request) {
        System.out.println("username : " + request.getUsername());

        // Check if the username already exists
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new AppException(ErrorCode.USER_EXISTS);
        }

        // Validate password length
        if (request.getPassword().length() < 6) {
            throw new AppException(ErrorCode.PASSWORD_TOO_SHORT);
        }

        // Map request to User entity
        User user = userMapper.toUser(request);
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setStatus(0); // Set status to 0 (not verified)
        user.setVerificationToken(null);
        Role role;
        if (request.getUsername().startsWith("NV_")) {
            role = roleRepository.findById(2)
                    .orElseThrow(() -> new RuntimeException("Default role does not exist"));
            user.setRole(role);

            // Save user to generate the ID
            user = userRepository.save(user);

            Employee employee = new Employee();
            String employeeId = employeeService.generateEmployeeId();
            employee.setEmployeeId(employeeId);
            employee.setEmployeeEmail(user.getUsername() + "@example.com");
            employee.setUser(user);
            employeeRepository.save(employee);
        } else {
            role = roleRepository.findById(3)
                    .orElseThrow(() -> new RuntimeException("Default role does not exist"));
            user.setRole(role);

            // Save user to generate the ID
            user = userRepository.save(user);

            Customer customer = new Customer();
            customer.setCustomerEmail(user.getUsername() + "@gmail.com");
            customer.setUser(user);
            customer.setCustomerAddress("Default");
            customer.setCustomerName(user.getUsername());
            customer.setCustomerPhone("0827415586");
            customerRepository.save(customer);
        }

        // Generate token using the saved user (with ID)
        AuthenticationService.TokenInfo tokenInfo = authenticationService.generateToken(user);

        log.info("token info create new : ", tokenInfo);
        user.setVerificationToken(tokenInfo.token());



        // Update the user with the generated token
        userRepository.save(user);

        // Send verification email
        sendVerificationEmail(user);

        return userMapper.toUserResponse(user);
    }



    // create user
    public UserResponse newUser(UserCreateRequest request) {
        System.out.println(request);

        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword())); // Hash the password
        user.setEmail(request.getEmail());

        Role role = roleRepository.findById(request.getRoleId())
                .orElseThrow(() -> new RuntimeException("Role not found"));
        user.setRole(role);
        user.setStatus(1);
        User savedUser = userRepository.save(user);

        UserResponse response = new UserResponse();
        response.setId(savedUser.getId());
        response.setUsername(savedUser.getUsername());
        response.setEmail(savedUser.getEmail());

        return response;
    }

    @Transactional
    public void updateUserStatus(int userId, int status) {
        userRepository.updateUserStatus(userId, status);
    }

    @Transactional(readOnly = true)
    public UserResponseWrapper searchUserByUsername(String username, Pageable pageable) {
        // Assuming that userRepository.searchUsers() returns a Page<User>
        Page<User> userPage = userRepository.searchUsers(username, pageable);

        // Check if the userPage has content and return the wrapper
        return new UserResponseWrapper(
                userPage.getTotalPages(),
                userPage.getTotalElements(),
                userPage.map(userMapper::toUserResponse).getContent());
    }


    public UserResponse updateUser(UserUpdateRequest request, int id) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));

        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());

        Role role = roleRepository.findById(request.getRoleId())
                .orElseThrow(() -> new RuntimeException("Role not found"));

        user.setRole(role);
        user.setStatus(1);

        userRepository.save(user);

        UserResponse response = new UserResponse();
        response.setId(user.getId());
        response.setUsername(user.getUsername());
        response.setEmail(user.getEmail());
        response.setRole(user.getRole().getId());
        response.setRoleName(user.getRole().getRoleName());

        return response;
    }

    //send mail authentiaction
    private void sendVerificationEmail(User user) {
        AuthenticationService.TokenInfo tokenInfo = authenticationService.generateToken(user);

        String subject = "Verify Your Account";
        String verificationUrl = "http://localhost:3000/verify?userId=" + user.getId();
        String message = "<h1>Verify Your Account</h1>"
                + "<p>Dear " + user.getUsername() + ",</p>"
                + "<p>Please verify your email by clicking the link below:</p>"
                + "<a href=\"" + verificationUrl + "\">Verify Email</a>"
                + "<p>This link will expire in 1 hour.</p>"
                + "<p>Thank you!</p>";

        emailService.sendHtmlMessage(user.getEmail(), subject, message);
    }


    //xác thực thành công đổi status = 1
    @Transactional
    public void verifyEmail(String token) {
        log.info("token: {}", token);
        try {
            SignedJWT signedJWT = authenticationService.verifyToken(token, false);

            // Check if "user_id" claim exists
            Object userIdClaim = signedJWT.getJWTClaimsSet().getClaim("user_id");
            if (userIdClaim == null) {
                log.error("Token does not contain 'user_id' claim");
                throw new AppException(ErrorCode.INVALID_TOKEN);
            }

            int userId = ((Number) userIdClaim).intValue(); // Safely cast the claim to Integer

            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

            if (user.getStatus() == 1) {
                throw new AppException(ErrorCode.USER_ALREADY_VERIFIED);
            }

            user.setStatus(1); // Set status to "verified"
            user.setVerificationToken(null);
            userRepository.save(user);
        } catch (AppException e) {
            log.error("Error during email verification: {}", e.getMessage());
            throw e;
        } catch (Exception e) {
            log.error("Unexpected error during email verification", e);
            throw new AppException(ErrorCode.INVALID_TOKEN);
        }
    }


    //get user by id
    @Transactional(readOnly = true)
    public UserResponse getUserById(int userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        return userMapper.toUserResponse(user);
    }

}
