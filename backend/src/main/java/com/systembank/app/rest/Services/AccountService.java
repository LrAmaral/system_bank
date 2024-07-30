package com.systembank.app.rest.Services;

import com.systembank.app.rest.Models.Account;
import com.systembank.app.rest.Repo.AccountRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;
import java.util.UUID;

@Service
public class AccountService {

    @Autowired
    private AccountRepo accountRepo;
    
    public Account createAccount(String accountClientName, String passwordAccount) {
        
        String accountNumber = generateAccountNumber();
        
        Account account = new Account();
        account.setAccountNumber(accountNumber);
        account.setPasswordAccount(passwordAccount);
        account.setBalance(0.0);
        return accountRepo.save(account);
    }

    
     private String generateAccountNumber() {
        return UUID.randomUUID().toString().substring(0, 12); 
    }
    
    
    public Account deposit(Long id, Double amount) {
        Optional<Account> optionalAccount = accountRepo.findById(id);
        if (optionalAccount.isPresent()) {
            Account account = optionalAccount.get();
            account.setBalance(account.getBalance() + amount);
            return accountRepo.save(account);
        } else {
            throw new RuntimeException("Account not found");
        }
    }

    
    public Account withdraw(Long id, Double amount) {
        Optional<Account> optionalAccount = accountRepo.findById(id);
        if (optionalAccount.isPresent()) {
            Account account = optionalAccount.get();
            if (account.getBalance() >= amount) {
                account.setBalance(account.getBalance() - amount);
                return accountRepo.save(account);
            } else {
                throw new RuntimeException("Insufficient balance");
            }
        } else {
            throw new RuntimeException("Account not found");
        }
    }

    
    public void transfer(Long fromAccountId, Long toAccountId, Double amount) {
        withdraw(fromAccountId, amount);
        deposit(toAccountId, amount);
    }
}
