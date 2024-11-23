package com.example.tourmanagement.mapper;

import com.example.tourmanagement.dto.response.CustomerResponse;
import com.example.tourmanagement.entity.Customer;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CustomerMapper {
  CustomerResponse toCustomerResponse(Customer customer);
}
