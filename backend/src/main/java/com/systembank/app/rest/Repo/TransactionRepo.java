package com.systembank.app.rest.Repo;

import com.systembank.app.rest.Models.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepo extends JpaRepository<Transaction, Long> {
}
