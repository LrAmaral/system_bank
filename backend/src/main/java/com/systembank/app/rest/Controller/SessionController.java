package com.systembank.app.rest.Controller;

import com.systembank.app.rest.Models.Session;
import com.systembank.app.rest.Repo.SessionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/sessions")
public class SessionController {

    @Autowired
    private SessionRepo sessionRepo;

    @GetMapping
    public List<Session> getSessions() {
        return sessionRepo.findAll();
    }

    @PostMapping
    public String saveSession(@RequestBody Session session) {
        sessionRepo.save(session);
        return "Session saved successfully";
    }

    @PutMapping("/{id}")
    public String updateSession(@RequestBody Session session, @PathVariable long id) {
        Optional<Session> optionalSession = sessionRepo.findById(id);
        if (optionalSession.isPresent()) {
            Session existingSession = optionalSession.get();
            existingSession.setUser(session.getUser());
            existingSession.setSessionToken(session.getSessionToken());
            existingSession.setCreatedAt(session.getCreatedAt());
            existingSession.setExpiresAt(session.getExpiresAt());
            sessionRepo.save(existingSession);
            return "Session updated successfully";
        } else {
            return "Session not found";
        }
    }

    @DeleteMapping("/{id}")
    public String deleteSession(@PathVariable long id) {
        Optional<Session> optionalSession = sessionRepo.findById(id);
        if (optionalSession.isPresent()) {
            sessionRepo.delete(optionalSession.get());
            return "Session deleted successfully";
        } else {
            return "Session not found";
        }
    }
}
