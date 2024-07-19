package com.systembank.app.rest.service;

import com.systembank.app.rest.models.Account;
import com.systembank.app.rest.observable.AccountObservable;
import com.systembank.app.rest.observer.AccountObserver;
import com.systembank.app.rest.repo.AccountRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AccountService {

    @Autowired
    private AccountRepo accountRepo;

    private AccountObservable accountObservable = new AccountObservable();

    public void addAccountObserver(AccountObserver observer) {
        accountObservable.addObserver(observer);
    }

    public Account createAccount(String accountNumber, String accountClientName, String passwordAccount) {
        Account account = new Account();
        account.setAccountNumber(accountNumber);
        account.setAccountClientName(accountClientName);
        account.setPasswordAccount(passwordAccount);
        account.setAccountBalance(0.0);
        return accountRepo.save(account);
    }

    public Account deposit(Long id, Double amount) {
        Optional<Account> optionalAccount = accountRepo.findById(id);
        if (optionalAccount.isPresent()) {
            Account account = optionalAccount.get();
            account.setAccountBalance(account.getAccountBalance() + amount);
            accountObservable.setAccountBalance(account.getAccountBalance());
            return accountRepo.save(account);
        } else {
            throw new RuntimeException("Account not found");
        }
    }

    public Account withdraw(Long id, Double amount) {
        Optional<Account> optionalAccount = accountRepo.findById(id);
        if (optionalAccount.isPresent()) {
            Account account = optionalAccount.get();
            if (account.getAccountBalance() >= amount) {
                account.setAccountBalance(account.getAccountBalance() - amount);
                accountObservable.setAccountBalance(account.getAccountBalance());
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
