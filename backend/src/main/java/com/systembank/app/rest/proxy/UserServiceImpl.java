package com.systembank.app.rest.proxy;

import com.systembank.app.rest.Models.User;
import com.systembank.app.rest.Repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;

public class UserServiceImpl implements UserService {
    
    @Autowired
    private UserRepo userRepo;

    @Override
    public boolean authenticateUser(String username, String password) {
        return userRepo.findByUsernameAndPassword(username, password).isPresent();
    }

    @Override
    public User createUser(User user) {
        return userRepo.save(user);
    }
}
