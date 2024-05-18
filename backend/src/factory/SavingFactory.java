package factory;

import model.*;

public class SavingFactory implements AbstractFactory {
    @Override
    public Account createAccount(String accountNumber) {
        return new SavingAccount(accountNumber);
    }

    @Override
    public User createUser() {
        return new BronzeUser(); 
    }
}
