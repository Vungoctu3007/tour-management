package com.example.tourmanagement.service;

import com.example.tourmanagement.dto.response.CustomerResponse;
import com.example.tourmanagement.dto.response.CustomerResponseWrapper;
import com.example.tourmanagement.dto.response.UserResponse;
import com.example.tourmanagement.dto.response.UserResponseWrapper;
import com.example.tourmanagement.entity.Customer;
import com.example.tourmanagement.entity.User;
import com.example.tourmanagement.mapper.CustomerMapper;
import com.example.tourmanagement.repository.CustomerRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
@Slf4j
@Service
public class CustomerService {
  private final CustomerRepository customerRepository;
  private final CustomerMapper customerMapper;
  public CustomerService(CustomerRepository customerRepository , CustomerMapper customerMapper) {
    this.customerRepository = customerRepository;
    this.customerMapper = customerMapper;
  }

  @Transactional(readOnly = true)

  public CustomerResponseWrapper getCustomers(Pageable pageable) {
    Page<Customer> usersPage = customerRepository.findAllCustomer(pageable);
    Page<CustomerResponse> customerResponsePage = usersPage.map(customerMapper::toCustomerResponse);
    return new CustomerResponseWrapper(customerResponsePage.getTotalPages(), customerResponsePage.getTotalElements(),
        customerResponsePage.getContent());
  }
}
