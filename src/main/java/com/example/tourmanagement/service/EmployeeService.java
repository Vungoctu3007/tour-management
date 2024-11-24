package com.example.tourmanagement.service;

import com.example.tourmanagement.dto.response.CustomerResponse;
import com.example.tourmanagement.dto.response.CustomerResponseWrapper;
import com.example.tourmanagement.dto.response.EmployeeResponse;
import com.example.tourmanagement.dto.response.EmployeeResponseWrapper;
import com.example.tourmanagement.entity.Customer;
import com.example.tourmanagement.entity.Employee;
import com.example.tourmanagement.mapper.EmployeeMapper;
import com.example.tourmanagement.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class EmployeeService {

  @Autowired
  private EmployeeRepository employeeRepository;
  @Autowired
  private EmployeeMapper employeeMapper;

  public String generateEmployeeId() {
    long count = employeeRepository.count();
    // Tạo mã nhân viên theo định dạng NV_XX
    return String.format("NV_%02d", count + 1);
  }

  public Employee createEmployee(Employee employee) {
    // Gán employeeId cho nhân viên mới
    employee.setEmployeeId(generateEmployeeId());
    return employeeRepository.save(employee);
  }

  @Transactional(readOnly = true)

  public EmployeeResponseWrapper getCustomers(Pageable pageable) {
    Page<Employee> usersPage = employeeRepository.findAllEmployee(pageable);
    Page<EmployeeResponse> customerResponsePage = usersPage.map(employeeMapper::toEmployeeResponse);
    return new EmployeeResponseWrapper(
        customerResponsePage.getTotalPages(),
        customerResponsePage.getTotalElements(),
        customerResponsePage.getContent());
  }

  @Transactional(readOnly = true)
  public EmployeeResponseWrapper searchEmployeeByEmail(String email, Pageable pageable) {
    Page<Employee> customerPage = employeeRepository.searchEmployeeByEmail(email, pageable);

    // Check if the userPage has content and return the wrapper
    return new EmployeeResponseWrapper(
        customerPage.getTotalPages(),
        customerPage.getTotalElements(),
        customerPage.map(employeeMapper::toEmployeeResponse).getContent());
  }
}
