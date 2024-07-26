package com.systembank.app.rest.Repo;

import com.systembank.app.rest.Models.Session;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SessionRepo extends JpaRepository<Session, Long> {
}
