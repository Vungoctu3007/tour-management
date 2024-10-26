package com.example.tourmanagement.service;

import com.example.tourmanagement.dto.response.UserResponse;
import com.example.tourmanagement.entity.User;
import com.example.tourmanagement.exception.AppException;
import com.example.tourmanagement.exception.ErrorCode;
import com.example.tourmanagement.mapper.UserMapper;
import com.example.tourmanagement.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;
@Slf4j
@Service
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public UserService(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    @PreAuthorize("hasRole('ADMIN')")
    public List<UserResponse> getUsers() {
        log.info("In method get Users");
        return userRepository.findAll().stream().map(userMapper::toUserResponse).toList();
    }

    @PreAuthorize("hasRole('ADMIN')")
    public UserResponse getUser(Integer id) {
        return userMapper.toUserResponse(
                userRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED)));
    }
}
