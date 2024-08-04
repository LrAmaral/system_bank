package com.systembank.app.rest.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.systembank.app.rest.Models.Note;
import com.systembank.app.rest.Repo.NoteRepository;

@Service
public class NoteService {

    @Autowired
    private NoteRepository noteRepository;

    public void updateNoteQuantity(int denomination, int quantity) {
        Note existingNote = noteRepository.findByDenomination(denomination);
        if (existingNote != null) {
            existingNote.setQuantity(existingNote.getQuantity() + quantity);
            noteRepository.save(existingNote);
        } else {
            Note newNote = new Note();
            newNote.setDenomination(denomination);
            newNote.setQuantity(quantity);
            noteRepository.save(newNote);
        }
    }
}
