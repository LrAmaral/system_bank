package factory;
import model.*;

public interface AbstractFactory {
    Account createAccount();
    User createUser();
}
