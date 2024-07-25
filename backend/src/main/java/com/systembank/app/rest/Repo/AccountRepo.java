package com.systembank.app.rest.Repo;

import com.systembank.app.rest.Models.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepo extends JpaRepository<Account, Long> {
}
