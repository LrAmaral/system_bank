package com.systembank.app.rest.proxy;

import com.systembank.app.rest.Models.User;

public class UserServiceProxy implements UserService {
    private UserServiceImpl userService;
    
    public UserServiceProxy() {
        this.userService = new UserServiceImpl();
    }

    @Override
    public boolean authenticateUser(String username, String password) {
        
        return userService.authenticateUser(username, password);
    }

    @Override
    public User createUser(User user) {
        
        return userService.createUser(user);
    }
}