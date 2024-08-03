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
    public User authenticateUser(String accountNumber, String password) {
        return userRepo.findByAccountNumberAndPassword(accountNumber, password).orElse(null);
    }

    @Override
    public User createUser(User user) {
        return userRepo.save(user);
    }

    public User findById(Long userId) {
        return userRepo.findById(userId).orElse(null);
    }

    @Override
    public User updateUser(User user) {
        return userRepo.save(user);
    }
}
