package com.systembank.app.rest.Repo;

import com.systembank.app.rest.Models.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountRepo extends JpaRepository<Account, Long> {
    Optional<Account> findTopByOrderByIdDesc();
}
