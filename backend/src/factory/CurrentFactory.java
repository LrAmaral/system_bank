package factory;

import model.*;

public class CurrentFactory implements AbstractFactory {
    @Override
    public Account createAccount(String accountNumber) {
        return new CurrentAccount(accountNumber); 
    }

    @Override
    public User createUser() {
        return new SilverUser(); 
    }
}
