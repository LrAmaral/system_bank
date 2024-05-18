package factory;

import model.Account;
import model.User;

public interface AbstractFactory {
    Account createAccount(String accountNumber); 
    User createUser();
}
