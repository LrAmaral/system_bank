package com.systembank.app.rest.Controller;

import com.systembank.app.rest.Models.Account;
import com.systembank.app.rest.Repo.AccountRepo;
import com.systembank.app.rest.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173") // Permite CORS para a URL do frontend
public class ApiController {

    @Autowired
    private AccountService accountService;

    @Autowired
    private AccountRepo accountRepo;

    @GetMapping(value = "/")
    public String getPage() {
        return "Hello, World!";
    }

    @GetMapping(value = "/account")
    public List<Account> getAccounts() {
        return accountRepo.findAll();
    }

    @PostMapping(value = "/save")
    public String saveAccount(@RequestBody Account account) {
        accountRepo.save(account);
        return "success";
    }

    @PutMapping(value = "/update/{id}")
    public String updateAccount(@RequestBody Account account, @PathVariable long id) {
        Optional<Account> optionalAccount = accountRepo.findById(id);
        if (optionalAccount.isPresent()) {
            Account existingAccount = optionalAccount.get();
            existingAccount.setAccountNumber(account.getAccountNumber());
            existingAccount.setAccountClientName(account.getAccountClientName());
            existingAccount.setPasswordAccount(account.getPasswordAccount());
            existingAccount.setAccountBalance(account.getAccountBalance());
            accountRepo.save(existingAccount);
            return "updated";
        } else {
            return "account not found";
        }
    }

    @DeleteMapping(value = "/delete/{id}")
    public String deleteAccount(@PathVariable long id) {
        Optional<Account> optionalAccount = accountRepo.findById(id);
        if (optionalAccount.isPresent()) {
            accountRepo.delete(optionalAccount.get());
            return "deleted account with the id: " + id;
        } else {
            return "account not found";
        }
    }

    @PostMapping(value = "/deposit/{id}")
    public String deposit(@PathVariable Long id, @RequestParam Double amount) {
        accountService.deposit(id, amount);
        return "Deposited successfully";
    }

    @PostMapping(value = "/withdraw/{id}")
    public String withdraw(@PathVariable Long id, @RequestParam Double amount) {
        accountService.withdraw(id, amount);
        return "Withdrawn successfully";
    }

    @PostMapping(value = "/transfer")
    public String transfer(@RequestParam Long fromAccountId, @RequestParam Long toAccountId, @RequestParam Double amount) {
        accountService.transfer(fromAccountId, toAccountId, amount);
        return "Transferred successfully";
    }
}
