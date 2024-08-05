package com.systembank.app.rest.Repo;

import com.systembank.app.rest.Models.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {
    Note findByDenomination(int denomination);
}
