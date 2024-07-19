package com.systembank.app.rest.observer;

import com.systembank.app.rest.observable.AccountObservable;

public interface AccountObserver {
    void update(AccountObservable observable, Double newBalance);
}
