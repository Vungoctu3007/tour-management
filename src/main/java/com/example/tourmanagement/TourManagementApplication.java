package com.example.tourmanagement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
@SpringBootApplication(scanBasePackages = {"com.example.tourmanagement"})
public class TourManagementApplication {

	public static void main(String[] args) {

		SpringApplication.run(TourManagementApplication.class, args);
	}

}
