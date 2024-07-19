package com.systembank.app.rest.repo;

import com.systembank.app.rest.models.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepo extends JpaRepository<Account, Long> {
}
