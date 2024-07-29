package com.systembank.app.rest.Services;

import com.systembank.app.rest.Models.Account;
import com.systembank.app.rest.observable.AccountObservable;
import com.systembank.app.rest.observer.AccountObserver;
import com.systembank.app.rest.Repo.AccountRepo;
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

    public Account createAccount(String accountClientName, String passwordAccount) {
        Account account = new Account();
        account.setPasswordAccount(passwordAccount);
        account.setBalance(0.0);

        // Salvar a conta pela primeira vez para gerar o ID
        Account savedAccount = accountRepo.save(account);

        // Gerar o número da conta com base no ID
        String accountNumber = String.format("%06d", savedAccount.getId());
        savedAccount.setAccountNumber(accountNumber);

        // Salvar a conta novamente com o número da conta gerado
        return accountRepo.save(savedAccount);
    }

    public Account deposit(Long id, Double amount) {
        Optional<Account> optionalAccount = accountRepo.findById(id);
        if (optionalAccount.isPresent()) {
            Account account = optionalAccount.get();
            account.setBalance(account.getBalance() + amount);
            accountObservable.setAccountBalance(account.getBalance());
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
                accountObservable.setAccountBalance(account.getBalance());
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
