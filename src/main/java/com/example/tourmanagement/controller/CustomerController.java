package com.example.tourmanagement.controller;

import com.example.tourmanagement.dto.request.ApiResponse;
import com.example.tourmanagement.dto.request.CustomerRequest;
import com.example.tourmanagement.dto.response.CustomerResponse;
import com.example.tourmanagement.dto.response.CustomerResponseWrapper;
import com.example.tourmanagement.dto.response.UserResponse;
import com.example.tourmanagement.dto.response.UserResponseWrapper;
import com.example.tourmanagement.service.CustomerService;
import com.example.tourmanagement.service.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/admin/customer")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CustomerController {

  @Autowired
  UserService userService;
  @Autowired
  CustomerService customerService;

  @GetMapping
  public ApiResponse<CustomerResponseWrapper> getListCustomer(@RequestParam(defaultValue = "1") int page, @RequestParam int size) {
    Pageable pageable= PageRequest.of(page-1, size);
    return ApiResponse.<CustomerResponseWrapper>builder()
        .result(customerService.getCustomers(pageable))
        .build();
  }

  @PutMapping("/update")
  public ApiResponse<CustomerResponse> updateCustomerByUserId(
      @RequestParam int userId,
      @RequestBody CustomerRequest request) {
    log.info("Updating customer for userId: {}", userId);
    CustomerResponse updatedCustomer = userService.updateCustomerByUserId(userId, request);
    return ApiResponse.<CustomerResponse>builder()
        .result(updatedCustomer)
        .build();
  }
  @GetMapping("/getCustomerById")
  public ApiResponse<CustomerResponse> getCustomerById(@RequestParam Integer userId) {
    log.info("Fetching customer by userId: {}", userId);
    CustomerResponse customerResponse = userService.getCustomerByUserId(userId);
    return ApiResponse.<CustomerResponse>builder()
        .result(customerResponse)
        .build();
  }


  @GetMapping("/search")
  ApiResponse<CustomerResponseWrapper> searchCustomer(@RequestParam String username, @RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int size) {
    Pageable pageable = PageRequest.of(page - 1, size);
    CustomerResponseWrapper customerResponse = userService.searcCustomerByUsername(username, pageable);
    return ApiResponse.<CustomerResponseWrapper>builder()
        .result(customerResponse)
        .build();
  }

}
