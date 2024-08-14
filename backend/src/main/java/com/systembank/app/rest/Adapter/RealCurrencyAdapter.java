package com.systembank.app.rest.Adapter;

import com.systembank.app.rest.Interface.CurrencyAdapter;

public class RealCurrencyAdapter implements CurrencyAdapter {
  @Override
  public double convertToLocalCurrency(double amount) {
      return amount; 
  }

  @Override
  public double convertToForeignCurrency(double amount) {
      return amount; 
  }
}
