package com.systembank.app.rest.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.systembank.app.rest.Controllers.WithdrawController;
import com.systembank.app.rest.Observer.TransactionLogger;

@Configuration
public class ObserverConfig {

    @Bean
    public WithdrawController withdrawController() {
        WithdrawController withdrawController = new WithdrawController();
        TransactionLogger logger = new TransactionLogger();
        withdrawController.addObserver(logger);
        return withdrawController;
    }
}
