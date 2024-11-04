package com.example.tourmanagement.service;

import com.example.tourmanagement.entity.Employee;
import com.example.tourmanagement.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployeeService {
    @Autowired
    private EmployeeRepository employeeRepository;

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
}
