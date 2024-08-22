package com.systembank.app.rest.Models;

import jakarta.persistence.*;

@Entity
public class Slot {

    @Id
    private int denomination;

    private int quantity;

    
    public Slot() { }

    public Slot(int denomination, int quantity) {
        this.denomination = denomination;
        this.quantity = quantity;
    }

    
    public int getDenomination() {
        return denomination;
    }

    public void setDenomination(int denomination) {
        this.denomination = denomination;
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

    @Override
    public String toString() {
        return "Slot{" +
                "denomination=" + denomination +
                ", quantity=" + quantity +
                '}';
    }
}
