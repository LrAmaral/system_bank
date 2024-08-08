package com.systembank.app.rest.Proxy;

import com.systembank.app.rest.Models.Transaction;
import com.systembank.app.rest.Models.User;
import com.systembank.app.rest.Repo.UserRepo;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

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

    @Override
    public User findById(Long userId) {
        return userRepo.findById(userId).orElse(null);
    }

    @Override
    public User findByCPF(String cpf) {
        return userRepo.findByCpf(cpf).orElse(null);
    }

    @Override
    public User getUserById(Long id) {
        return userRepo.findById(id).orElse(null);
    }

    @Override
    public User updateUser(User user) {
        return userRepo.save(user);
    }

    @Override
    public User selectStatus(User user) {
        return userRepo.findById(user.getId()).orElse(null);
    }

    @Override
    public void addTransaction(Long userId, int amount, LocalDateTime date, String type) {
        User user = findById(userId);
        if (user != null) {
            Transaction transaction = new Transaction(amount, date, type, user);
            user.getTransactions().add(transaction);
            updateUser(user);
        }
    }
}
