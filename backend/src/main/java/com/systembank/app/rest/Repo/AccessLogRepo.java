package com.systembank.app.rest.Repo;

import com.systembank.app.rest.Models.AccessLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccessLogRepo extends JpaRepository<AccessLog, Long> {
}
