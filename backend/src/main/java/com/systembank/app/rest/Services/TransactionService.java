package com.systembank.app.rest.Services;

import com.systembank.app.rest.Models.Transaction;
import com.systembank.app.rest.Repo.TransactionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepo transactionRepo;

    public List<Transaction> getTransactionsByUserId(Long userId) {
        return transactionRepo.findByUserIdOrderByDateDesc(userId);
    }

    public void saveTransaction(Transaction transaction) {
        transactionRepo.save(transaction);
    }
}
