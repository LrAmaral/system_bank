package com.systembank.app.rest.proxy;

import com.systembank.app.rest.Models.User;
import com.systembank.app.rest.Repo.UserRepo;
import org.springframework.stereotype.Service;
import org.springframework.context.annotation.Primary;

@Service
@Primary
public class UserServiceImpl implements UserService {

    private final UserRepo userRepo;

    public UserServiceImpl(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    @Override
    public boolean authenticateUser(String username, String password) {
        return userRepo.findByUsernameAndPassword(username, password).isPresent();
    }

    @Override
    public User createUser(User user) {
        return userRepo.save(user);
    }
}
