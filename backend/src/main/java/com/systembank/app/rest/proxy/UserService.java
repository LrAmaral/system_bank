package com.systembank.app.rest.Proxy;

import com.systembank.app.rest.Models.User;
import java.time.LocalDateTime;

public interface UserService {
    User authenticateUser(String accountNumber, String password);
    User createUser(User user);
    User findById(Long userId);
    User findByCPF(String cpf);
    User updateUser(User user);
    User getUserById(Long id);
    User selectStatus(User user);
    void addTransaction(Long userId, double amount, LocalDateTime date, String type); 
}
