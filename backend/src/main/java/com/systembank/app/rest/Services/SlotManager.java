package com.systembank.app.rest.Services;

import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

import com.systembank.app.rest.Models.Slot;

@Component
public class SlotManager {
    private List<Slot> slots;

    public SlotManager() {
        slots = new ArrayList<>();
        slots.add(new Slot(2, 10));
        slots.add(new Slot(5, 10));
        slots.add(new Slot(10, 10));
        slots.add(new Slot(20, 10));
        slots.add(new Slot(50, 10));
        slots.add(new Slot(100, 10));
        slots.add(new Slot(200, 10));
    }

    public boolean withdraw(int amount) {
        List<Slot> usedSlots = new ArrayList<>();
        int remainingAmount = amount;

        
        for (Slot slot : slots) {
            int denomination = slot.getDenomination();
            int quantityNeeded = remainingAmount / denomination;

            if (quantityNeeded > 0 && slot.isAvailable(quantityNeeded)) {
                usedSlots.add(new Slot(denomination, quantityNeeded));
                remainingAmount -= denomination * quantityNeeded;
            }
        }

        
        if (remainingAmount == 0) {
            
            for (Slot usedSlot : usedSlots) {
                for (Slot slot : slots) {
                    if (slot.getDenomination() == usedSlot.getDenomination()) {
                        slot.setQuantity(slot.getQuantity() - usedSlot.getQuantity());
                        break;
                    }
                }
            }
            return true; 
        } else {
            return false; 
        }
    }

    public List<Slot> getSlots() {
        return slots;
    }
}
