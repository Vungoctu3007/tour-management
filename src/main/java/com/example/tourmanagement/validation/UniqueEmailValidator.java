package com.example.tourmanagement.validation;


import com.example.tourmanagement.repository.CustomerRepository;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UniqueEmailValidator implements ConstraintValidator<UniqueEmail, String> {
    @Autowired
    private CustomerRepository customerRepository;
    @Override
    public void initialize(UniqueEmail constraintAnnotation) {
        // Any initialization code goes here if needed
    }

    @Override
    public boolean isValid(String email, ConstraintValidatorContext context) {
        if (email == null || email.isEmpty()) {
            return true; // Leave null checks to @NotBlank or @Email annotations
        }

        return !customerRepository.existsCustomerByCustomerEmail(email);
    }
}
