package com.systembank.app.rest.Models;

import com.systembank.app.rest.Interface.Account;

public class SavingsAccount implements Account {
    private String accountNumber;
    
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

