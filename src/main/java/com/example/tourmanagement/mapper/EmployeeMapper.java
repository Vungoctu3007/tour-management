package com.example.tourmanagement.mapper;

import com.example.tourmanagement.dto.response.CustomerResponse;
import com.example.tourmanagement.dto.response.EmployeeResponse;
import com.example.tourmanagement.entity.Customer;
import com.example.tourmanagement.entity.Employee;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface EmployeeMapper {
  @Mapping(source = "user.id", target = "userId")
  @Mapping(source = "employeeEmail", target = "email")
  @Mapping(source = "employeeId", target = "id")
  EmployeeResponse toEmployeeResponse(Employee employee);
}
