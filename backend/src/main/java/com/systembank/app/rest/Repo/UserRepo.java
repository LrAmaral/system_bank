package com.systembank.app.rest.Repo;

import com.systembank.app.rest.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepo extends JpaRepository<User, Long> {
    Optional<User> findByAccountNumberAndPassword(String accountNumber, String password);
}
