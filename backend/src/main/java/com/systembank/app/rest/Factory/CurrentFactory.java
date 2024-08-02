package com.systembank.app.rest.Factory;

import com.systembank.app.rest.Interface.Account;
import com.systembank.app.rest.Interface.UserInterface;
import com.systembank.app.rest.Models.CurrentAccount;
import com.systembank.app.rest.Models.SilverUser;

public class CurrentFactory implements AbstractFactory {
    @Override
    public Account createAccount(String accountNumber) {
        return new CurrentAccount(accountNumber); 
    }

    @Override
    public UserInterface createUser() {
        return new SilverUser(); 
    }
}
