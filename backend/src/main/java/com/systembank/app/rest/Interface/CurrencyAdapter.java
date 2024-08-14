package com.systembank.app.rest.Interface;

public interface CurrencyAdapter {
  double convertToLocalCurrency(double amount);
  double convertToForeignCurrency(double amount);
}
