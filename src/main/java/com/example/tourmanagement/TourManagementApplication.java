package com.example.tourmanagement;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
@SpringBootApplication(scanBasePackages = {"com.example.tourmanagement"})
public class TourManagementApplication {

	public static void main(String[] args) {
		Dotenv dotenv = Dotenv.load();
		System.setProperty("GOOGLE_CLIENT_SECRET", dotenv.get("GOOGLE_CLIENT_SECRET"));
		System.setProperty("JWT_SIGNER_KEY", dotenv.get("JWT_SIGNER_KEY"));
		SpringApplication.run(TourManagementApplication.class, args);
	}

}
