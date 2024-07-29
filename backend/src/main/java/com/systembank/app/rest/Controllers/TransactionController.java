package com.systembank.app.rest.Controllers;

import com.systembank.app.rest.Models.Transaction;
import com.systembank.app.rest.Repo.TransactionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/transactions")
public class TransactionController {

    @Autowired
    private TransactionRepo transactionRepo;

    @GetMapping
    public List<Transaction> getTransactions() {
        return transactionRepo.findAll();
    }

    @PostMapping
    public String saveTransaction(@RequestBody Transaction transaction) {
        transactionRepo.save(transaction);
        return "Transaction saved successfully";
    }

    @PutMapping("/{id}")
    public String updateTransaction(@RequestBody Transaction transaction, @PathVariable long id) {
        Optional<Transaction> optionalTransaction = transactionRepo.findById(id);
        if (optionalTransaction.isPresent()) {
            Transaction existingTransaction = optionalTransaction.get();
            existingTransaction.setAccount(transaction.getAccount());
            existingTransaction.setTransactionType(transaction.getTransactionType());
            existingTransaction.setAmount(transaction.getAmount());
            existingTransaction.setTransactionDate(transaction.getTransactionDate());
            transactionRepo.save(existingTransaction);
            return "Transaction updated successfully";
        } else {
            return "Transaction not found";
        }
    }

    @DeleteMapping("/{id}")
    public String deleteTransaction(@PathVariable long id) {
        Optional<Transaction> optionalTransaction = transactionRepo.findById(id);
        if (optionalTransaction.isPresent()) {
            transactionRepo.delete(optionalTransaction.get());
            return "Transaction deleted successfully";
        } else {
            return "Transaction not found";
        }
    }
}
