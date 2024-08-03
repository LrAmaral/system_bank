package com.systembank.app.rest.proxy;

import com.systembank.app.rest.Models.User;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service("userServiceProxy")
public class UserServiceProxy implements UserService {
    private final UserService userService;

    public UserServiceProxy(@Qualifier("userServiceImpl") UserService userService) {
        this.userService = userService;
    }

    @Override
    public User authenticateUser(String accountNumber, String password) {
        return userService.authenticateUser(accountNumber, password);
    }

    @Override
    public User createUser(User user) {
        return userService.createUser(user);
    }
}
