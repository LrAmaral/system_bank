package com.systembank.app.rest.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.systembank.app.rest.Models.Account;

public interface AccountRepo  extends JpaRepository<Account, Long>{}