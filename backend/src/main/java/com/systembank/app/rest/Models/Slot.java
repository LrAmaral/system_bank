package com.systembank.app.rest.Models;

public class Slot {
  private int denomination;
  private int quantity;

  public Slot(int denomination, int quantity) {
      this.denomination = denomination;
      this.quantity = quantity;
  }

  public int getDenomination() {
      return denomination;
  }

  public int getQuantity() {
      return quantity;
  }

  public void setQuantity(int quantity) {
      this.quantity = quantity;
  }

  public boolean isAvailable(int requiredQuantity) {
      return this.quantity >= requiredQuantity;
  }
}
