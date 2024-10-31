package com.example.tourmanagement.service;

import com.example.tourmanagement.constant.PredefinedRole;
import com.example.tourmanagement.dto.request.UserRequest;
import com.example.tourmanagement.dto.response.UserResponse;
import com.example.tourmanagement.entity.Role;
import com.example.tourmanagement.entity.User;
import com.example.tourmanagement.exception.AppException;
import com.example.tourmanagement.exception.ErrorCode;
import com.example.tourmanagement.mapper.UserMapper;
import com.example.tourmanagement.repository.RoleRepository;
import com.example.tourmanagement.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
@Slf4j
@Service
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;

    public UserService(UserRepository userRepository, UserMapper userMapper, PasswordEncoder passwordEncoder, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
    }


//    @PreAuthorize("hasRole('ADMIN')")
    public List<UserResponse> getUsers() {
        return userRepository.findAll().stream().map(userMapper::toUserResponse).toList();
    }

//    @PreAuthorize("hasRole('ADMIN')")
//    public UserResponse getUser(Integer id) {
//        return userMapper.toUserResponse(
//                userRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED)));
//    }

    //create user
    public UserResponse createUser(UserRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) throw new AppException(ErrorCode.USER_EXITS);


        User user = userMapper.toUser(request);

//        Role role = roleRepository.findById(user.getRole().getId())
//                .orElseThrow(() -> new RuntimeException("Role không tồn tại"));

        user.setUsername(request.getUsername());
//        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user = userRepository.save(user);
        return userMapper.toUserResponse(user);
    }
}
