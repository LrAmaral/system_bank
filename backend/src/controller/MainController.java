package controller;

import model.*;
import factory.*;
import java.util.Random;

public class MainController {

    public Account createAccountAndUser(AbstractFactory factory) {
        String accountNumber = generateAccountNumber();
        Account account = factory.createAccount(accountNumber);
        User user = factory.createUser();

        account.display();
        user.display();
        System.out.println("Número da conta: " + accountNumber);
        return account;
    }

    private String generateAccountNumber() {
        Random random = new Random();
        int number = random.nextInt(90000) + 10000; 
        return String.valueOf(number);
    }
}
