package controller;

import model.*;
import view.MainView;
import factory.*;

public class MainController {
    private MainView view;

    public MainController(MainView view) {
        this.view = view;
    }

    public void createAccountAndUser(AbstractFactory factory) {
        Account account = factory.createAccount();
        User user = factory.createUser();

        account.display();
        user.display();
    }
}
