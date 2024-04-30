package factory;
import model.*;

public class CurrentFactory implements AbstractFactory {
    @Override
    public Account createAccount() {
        return new CurrentAccount();
    }

    @Override
    public User createUser() {
        return new SilverUser(); 
    }
}
