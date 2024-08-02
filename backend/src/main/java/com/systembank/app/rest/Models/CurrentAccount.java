package com.systembank.app.rest.Models;

import com.systembank.app.rest.Interface.Account;

public class CurrentAccount implements Account {
    private String accountNumber;

    public CurrentAccount(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    @Override
    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    @Override
    public void display() {
        
    }
}
