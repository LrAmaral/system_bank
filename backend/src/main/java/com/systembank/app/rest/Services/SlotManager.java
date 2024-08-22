package com.systembank.app.rest.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

import com.systembank.app.rest.Models.Note;
import com.systembank.app.rest.Models.Slot;
import com.systembank.app.rest.Repo.NoteRepository;
import com.systembank.app.rest.Repo.SlotRepository;

@Component
public class SlotManager {

    private List<Slot> slots;

    @Autowired
    private NoteRepository noteRepository;

    @Autowired
    private SlotRepository slotRepository;

    public void initializeSlots() {
        this.slots = slotRepository.findAll();
    }

    public boolean withdraw(Map<Integer, Integer> selectedNotes) {
        for (Map.Entry<Integer, Integer> entry : selectedNotes.entrySet()) {
            int denomination = entry.getKey();
            int count = entry.getValue();

            Note note = noteRepository.findByDenomination(denomination);
            if (note == null || note.getQuantity() < count) {
                return false;
            }
        }

        for (Map.Entry<Integer, Integer> entry : selectedNotes.entrySet()) {
            int denomination = entry.getKey();
            int count = entry.getValue();

            Note note = noteRepository.findByDenomination(denomination);
            if (note != null) {
                note.setQuantity(note.getQuantity() - count);
                noteRepository.save(note);
            }
        }

        return true;
    }

    public void updateSlots(Map<Integer, Integer> selectedNotes) {
        if (this.slots == null) {
            initializeSlots();
        }

        for (Map.Entry<Integer, Integer> entry : selectedNotes.entrySet()) {
            int denomination = entry.getKey();
            int count = entry.getValue();

            for (Slot slot : slots) {
                if (slot.getDenomination() == denomination) {
                    int newQuantity = slot.getQuantity() + count;
                    slot.setQuantity(newQuantity);
                    slotRepository.save(slot);
                    break;
                }
            }
        }
    }

    public List<Note> getSlotsFromDB() {
        return noteRepository.findAll();
    }
}
