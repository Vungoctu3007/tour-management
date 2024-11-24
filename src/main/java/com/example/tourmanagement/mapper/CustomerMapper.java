package com.example.tourmanagement.mapper;

import com.example.tourmanagement.dto.response.CustomerResponse;
import com.example.tourmanagement.entity.Customer;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CustomerMapper {
  @Mapping(source = "user.id", target = "userId")
  @Mapping(source = "customerName", target = "name")
  @Mapping(source = "customerEmail", target = "email")
  @Mapping(source = "customerPhone", target = "phone")
  @Mapping(source = "customerAddress", target = "address")
  CustomerResponse toCustomerResponse(Customer customer);
}
