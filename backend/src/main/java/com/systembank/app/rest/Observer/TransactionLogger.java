package com.systembank.app.rest.Observer;

import com.systembank.app.rest.Models.Transaction; // Use a classe existente Transaction

public class TransactionLogger implements Observer {

    @Override
    public void update(Object data) {
        if (data instanceof Transaction) {
            Transaction transaction = (Transaction) data;
            System.out.println("Transação registrada: " + transaction.getType() + 
                               " de R$" + transaction.getAmount() + 
                               " para o usuário " + transaction.getUser().getId() +
                               " em " + transaction.getDate());
        }
    }
}
