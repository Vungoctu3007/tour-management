package com.example.tourmanagement.service;

import com.example.tourmanagement.constant.PredefinedRole;
import com.example.tourmanagement.dto.request.AuthenticationRequest;
import com.example.tourmanagement.dto.request.UserCreateRequest;
import com.example.tourmanagement.dto.request.UserRequest;
import com.example.tourmanagement.dto.response.AuthenticationResponse;
import com.example.tourmanagement.dto.response.UserCreateResponse;
import com.example.tourmanagement.dto.response.UserResponse;
import com.example.tourmanagement.entity.Role;
import com.example.tourmanagement.entity.User;
import com.example.tourmanagement.exception.AppException;
import com.example.tourmanagement.exception.ErrorCode;
import com.example.tourmanagement.mapper.UserMapper;
import com.example.tourmanagement.repository.CustomerRepository;
import com.example.tourmanagement.repository.RoleRepository;
import com.example.tourmanagement.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;

@Slf4j
@Service
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;
    private final CustomerRepository customerRepository;

    public UserService(UserRepository userRepository, UserMapper userMapper, PasswordEncoder passwordEncoder,
            RoleRepository roleRepository, CustomerRepository customerRepository) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
        this.customerRepository = customerRepository;
    }

    // @PreAuthorize("hasRole('ADMIN')")
    @Transactional(readOnly = true) 
    public List<UserCreateResponse> getUsers() {
        return userRepository.findAll()
                .stream()
                .map(userMapper::toUserResponse)
                .toList();
    }

    // @PreAuthorize("hasRole('ADMIN')")
    // public UserResponse getUser(Integer id) {
    // return userMapper.toUserResponse(
    // userRepository.findById(id).orElseThrow(() -> new
    // AppException(ErrorCode.USER_NOT_EXISTED)));
    // }

    public UserCreateResponse createUser(UserCreateRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new AppException(ErrorCode.USER_EXITS);
        }

        log.info("password:"+request.getPassword());
    
        if (request.getPassword().length() < 6) {
            throw new AppException(ErrorCode.PASSWORD_TOO_SHORT); // Bạn cần định nghĩa mã lỗi này
        }
    
        User user = userMapper.toUser(request);
        Role defaultRole = roleRepository.findById(3) // Giả sử role có id là 3
                .orElseThrow(() -> new RuntimeException("Role mặc định không tồn tại"));
    
        user.setUsername(request.getUsername());

        user.setPassword(passwordEncoder.encode(request.getPassword()));

        user.setRole(defaultRole);
    
        

        user = userRepository.save(user);
    
        return userMapper.toUserResponse(user);
    }
    //delete user
    @Transactional
    public void deleteUser(int userId) {
        // User user = userRepository.findById(userId)
        //         .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        
        // customerRepository.deleteCustomerByUserId(userId);

        userRepository.deleteById(userId);
        log.info("User with ID {} has been deleted.", userId);
    }
    
}
