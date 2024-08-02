package com.systembank.app.rest.proxy;

import com.systembank.app.rest.Models.User;

public interface UserService {
    boolean authenticateUser(String username, String password);
    User createUser(User user);
}