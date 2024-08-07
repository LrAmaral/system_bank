package com.systembank.app.rest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.systembank.app.rest", "com.systembank.app.rest.Factory"})
public class SystemBank {
    public static void main(String[] args) {
        SpringApplication.run(SystemBank.class, args);
    }
}