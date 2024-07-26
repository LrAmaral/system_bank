package com.systembank.app.rest.Controller;

import com.systembank.app.rest.Models.User;
import com.systembank.app.rest.Repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserRepo userRepo;

    @GetMapping
    public List<User> getUsers() {
        return userRepo.findAll();
    }

    @GetMapping("/{id}")
    public Optional<User> getUserById(@PathVariable long id) {
        return userRepo.findById(id);
    }

    @PostMapping
    public String saveUser(@RequestBody User user) {
        // Gerando um número de conta único
        String accountNumber = generateAccountNumber();
        user.setAccountNumber(accountNumber);

        // Definindo a data de criação
        user.setCreatedAt(new java.sql.Date(new Date().getTime()));

        userRepo.save(user);
        return "User saved successfully with account number: " + accountNumber;
    }

    @PutMapping("/{id}")
    public String updateUser(@RequestBody User user, @PathVariable long id) {
        Optional<User> optionalUser = userRepo.findById(id);
        if (optionalUser.isPresent()) {
            User existingUser = optionalUser.get();
            existingUser.setUsername(user.getUsername());
            existingUser.setPassword(user.getPassword());
            existingUser.setEmail(user.getEmail());
            existingUser.setCpf(user.getCpf());
            existingUser.setCreatedAt(user.getCreatedAt());
            userRepo.save(existingUser);
            return "User updated successfully";
        } else {
            return "User not found";
        }   
    }

    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable long id) {
        Optional<User> optionalUser = userRepo.findById(id);
        if (optionalUser.isPresent()) {
            userRepo.delete(optionalUser.get());
            return "User deleted successfully";
        } else {
            return "User not found";
        }
    }

    private String generateAccountNumber() {
        // Gerando um número de conta aleatório
        return UUID.randomUUID().toString().replace("-", "").substring(0, 10);
    }
}
