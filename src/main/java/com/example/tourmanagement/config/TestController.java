package com.example.tourmanagement.config;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/api")
public class TestController {
    // This method returns a list of users as a Map
    @GetMapping("/users")
    public Map<String, String> getUsers() {
        // In Java, arrays are created with array syntax, but we'll use a Map for key-value pairs.
        Map<String, String> users = new HashMap<>();
        users.put("a", "adsf");
        return users;
    }
}