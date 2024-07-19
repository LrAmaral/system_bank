package com.systembank.app.rest.observable;

import java.util.ArrayList;
import java.util.List;

import com.systembank.app.rest.observer.AccountObserver;

public class AccountObservable {
    private Double accountBalance;
    private List<AccountObserver> observers = new ArrayList<>();

    public void addObserver(AccountObserver observer) {
        observers.add(observer);
    }

    public void removeObserver(AccountObserver observer) {
        observers.remove(observer);
    }

    private void notifyObservers() {
        for (AccountObserver observer : observers) {
            observer.update(this, accountBalance);
        }
    }

    public void deposit(Double amount) {
        this.accountBalance += amount;
        notifyObservers();
    }

    public void withdraw(Double amount) {
        this.accountBalance -= amount;
        notifyObservers();
    }

    public Double getAccountBalance() {
        return accountBalance;
    }

    public void setAccountBalance(Double accountBalance) {
        this.accountBalance = accountBalance;
        notifyObservers();
    }
}
