package com.systembank.app.rest.Services;

import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

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

    public boolean withdraw(Map<Integer, Integer> selectedNotes) {
        List<Slot> tempSlots = new ArrayList<>(slots);

        // Verificar se há notas suficientes para o saque
        for (Map.Entry<Integer, Integer> entry : selectedNotes.entrySet()) {
            int denomination = entry.getKey();
            int count = entry.getValue();

            for (Slot slot : tempSlots) {
                if (slot.getDenomination() == denomination) {
                    if (slot.getQuantity() < count) {
                        return false;  // Não há notas suficientes
                    }
                    slot.setQuantity(slot.getQuantity() - count);
                }
            }
        }

        slots = tempSlots;  
        return true;
    }

    public void updateSlots(Map<Integer, Integer> selectedNotes) {
        for (Map.Entry<Integer, Integer> entry : selectedNotes.entrySet()) {
            int denomination = entry.getKey();
            int count = entry.getValue();

            for (Slot slot : slots) {
                if (slot.getDenomination() == denomination) {
                    int newQuantity = slot.getQuantity() - count;
                    slot.setQuantity(Math.max(newQuantity, 0)); 
                    break;
                }
            }
        }
    }

    public List<Slot> getSlots() {
        return slots;
    }
}
