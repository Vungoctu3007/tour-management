package com.example.tourmanagement.service;

import com.example.tourmanagement.dto.request.UserCreateRequest;
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
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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

    public UserService(UserRepository userRepository, UserMapper userMapper, PasswordEncoder passwordEncoder,
            RoleRepository roleRepository, CustomerRepository customerRepository, EmployeeRepository employeeRepository,
            EmployeeService employeeService) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
        this.customerRepository = customerRepository;
        this.employeeRepository = employeeRepository;
        this.employeeService = employeeService;
    }

    @Transactional(readOnly = true)
    public UserResponseWrapper getUsers(Pageable pageable) {
        Page<User> usersPage = userRepository.findAllByStatus(1, pageable);
        // Chuyển đổi từng User thành UserResponse
        Page<UserResponse> userResponsesPage = usersPage.map(userMapper::toUserResponse);
        return new UserResponseWrapper(userResponsesPage.getTotalPages(), userResponsesPage.getTotalElements(),
                userResponsesPage.getContent());
    }

    public UserResponse createUser(UserCreateRequest request) {
        System.out.println("username : " + request.getUsername());
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new AppException(ErrorCode.USER_EXISTS);
        }

        if (request.getPassword().length() < 6) {
            throw new AppException(ErrorCode.PASSWORD_TOO_SHORT);
        }

        User user = userMapper.toUser(request);
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setStatus(1);
        Role role;

        if (request.getUsername().startsWith("NV_")) {
            role = roleRepository.findById(2) // Vai trò mặc định cho nhân viên
                    .orElseThrow(() -> new RuntimeException("Role mặc định không tồn tại"));

            user.setRole(role); 
            user = userRepository.save(user); 

         
            Employee employee = new Employee();
            String employeeId = employeeService.generateEmployeeId(); 
            employee.setEmployeeId(employeeId);
            employee.setEmployeeEmail(user.getUsername() + "@example.com"); 
            employee.setUser(user); 
            employeeRepository.save(employee); 

        } else {
            role = roleRepository.findById(3) 
                    .orElseThrow(() -> new RuntimeException("Role mặc định không tồn tại"));

            user.setRole(role); 
            
            user = userRepository.save(user);

            Customer customer = new Customer();
            customer.setCustomerEmail(user.getUsername() + "@gmail.com"); 
            customer.setUser(user);
            customer.setCustomerAddress("Default");
            customer.setCustomerName(user.getUsername());
            customerRepository.save(customer);
        }

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

}
