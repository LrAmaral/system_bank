package com.systembank.app.rest.Controllers;

import com.systembank.app.rest.Models.Account;
import com.systembank.app.rest.Services.AccountService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/accounts")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @PostMapping
    public ResponseEntity<Account> createAccount(@RequestBody Account account) {
        Account createdAccount = accountService.createAccount(account.getUser().getUsername(), account.getPasswordAccount());
        return ResponseEntity.ok(createdAccount);
    }

}
