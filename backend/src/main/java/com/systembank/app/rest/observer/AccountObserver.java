package com.systembank.app.rest.Observer;

import com.systembank.app.rest.Observable.AccountObservable;

public interface AccountObserver {
    void update(AccountObservable observable, Double newBalance);
}
