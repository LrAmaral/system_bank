package com.systembank.app.rest.Factory;

import org.springframework.stereotype.Component;

import com.systembank.app.rest.Interface.Account;
import com.systembank.app.rest.Interface.UserInterface;
import com.systembank.app.rest.Models.SavingAccount;
import com.systembank.app.rest.Models.BronzeUser;

@Component
public class SavingFactory implements AbstractFactory {
    @Override
    public Account createAccount(String accountNumber) {
        return new SavingAccount(accountNumber); 
    }

    @Override
    public UserInterface createUser() {
        return new BronzeUser(); 
    }
}
