package com.systembank.app.rest.Factory;

import com.systembank.app.rest.Interface.Account;
import com.systembank.app.rest.Interface.UserInterface;

public interface AbstractFactory {
    Account createAccount(String accountNumber);
    UserInterface createUser();
}
