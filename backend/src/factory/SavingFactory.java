package factory;
import model.*;

public class SavingFactory implements AbstractFactory {
    @Override
    public Account createAccount() {
        return new SavingAccount();
    }

    @Override
    public User createUser() {
        return new BronzeUser(); 
    }
}
