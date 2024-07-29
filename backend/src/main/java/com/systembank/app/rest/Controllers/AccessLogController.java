package com.systembank.app.rest.Controllers;

import com.systembank.app.rest.Models.AccessLog;
import com.systembank.app.rest.Repo.AccessLogRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/access-logs")
public class AccessLogController {

    @Autowired
    private AccessLogRepo accessLogRepo;

    @GetMapping
    public List<AccessLog> getAccessLogs() {
        return accessLogRepo.findAll();
    }

    @PostMapping
    public String saveAccessLog(@RequestBody AccessLog accessLog) {
        accessLogRepo.save(accessLog);
        return "AccessLog saved successfully";
    }

    @PutMapping("/{id}")
    public String updateAccessLog(@RequestBody AccessLog accessLog, @PathVariable long id) {
        Optional<AccessLog> optionalAccessLog = accessLogRepo.findById(id);
        if (optionalAccessLog.isPresent()) {
            AccessLog existingAccessLog = optionalAccessLog.get();
            existingAccessLog.setUser(accessLog.getUser());
            existingAccessLog.setActivity(accessLog.getActivity());
            existingAccessLog.setTimestamp(accessLog.getTimestamp());
            accessLogRepo.save(existingAccessLog);
            return "AccessLog updated successfully";
        } else {
            return "AccessLog not found";
        }
    }

    @DeleteMapping("/{id}")
    public String deleteAccessLog(@PathVariable long id) {
        Optional<AccessLog> optionalAccessLog = accessLogRepo.findById(id);
        if (optionalAccessLog.isPresent()) {
            accessLogRepo.delete(optionalAccessLog.get());
            return "AccessLog deleted successfully";
        } else {
            return "AccessLog not found";
        }
    }
}
