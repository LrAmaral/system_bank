package com.systembank.app.rest.proxy;

import com.systembank.app.rest.Models.User;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service
public class UserServiceProxy implements UserService {

     private final UserServiceImpl userService;

    public UserServiceProxy(@Qualifier("userServiceImpl") UserServiceImpl userService) {
        this.userService = userService;
    }

    @Override
    public boolean authenticateUser(String username, String password) {
        // You can add any additional logic here
        return userService.authenticateUser(username, password);
    }

    @Override
    public User createUser(User user) {
        // You can add any additional logic here
        return userService.createUser(user);
    }
}
