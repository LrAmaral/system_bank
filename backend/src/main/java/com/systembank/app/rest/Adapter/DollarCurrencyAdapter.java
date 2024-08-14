package com.systembank.app.rest.Adapter;

import com.systembank.app.rest.Interface.CurrencyAdapter;

public class DollarCurrencyAdapter implements CurrencyAdapter {
  private static final double DOLLAR = 5.00; 

  @Override
  public double convertToLocalCurrency(double amount) {
      return amount * DOLLAR; 
  }

  @Override
  public double convertToForeignCurrency(double amount) {
      return amount / DOLLAR; 
  }
}

