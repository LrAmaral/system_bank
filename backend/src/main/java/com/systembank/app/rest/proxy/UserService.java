package com.systembank.app.rest.Proxy;

import com.systembank.app.rest.Models.User;
import java.time.LocalDateTime;

public interface UserService {
    User authenticateUser(String accountNumber, String password);
    User createUser(User user);
    User findById(Long userId);
    User updateUser(User user);
    void addTransaction(Long userId, int amount, LocalDateTime date, String type);
}
