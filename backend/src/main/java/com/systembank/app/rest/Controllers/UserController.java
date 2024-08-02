package com.systembank.app.rest.Controllers;

import com.systembank.app.rest.Models.User;
import com.systembank.app.rest.Repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.SecureRandom;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.regex.Pattern;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserRepo userRepo;

    @GetMapping
    public ResponseEntity<?> getUsers() {
        try {
            List<User> users = userRepo.findAll();
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Erro ao buscar usuários", e.getMessage()));
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable long id) {
        try {
            Optional<User> userOptional = userRepo.findById(id);
            if (userOptional.isPresent()) {
                return ResponseEntity.ok(userOptional.get());
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new ErrorResponse("Usuário não encontrado", "Não há nenhum usuário com o ID fornecido."));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Erro ao buscar usuário", e.getMessage()));
        }
    }

    @PostMapping
    public ResponseEntity<?> saveUser(@RequestBody User user) {
        String password = user.getPassword();
        if (!isPasswordValid(password)) {
            return ResponseEntity.badRequest().body(new ErrorResponse(
                    "Senha inválida", 
                    "A senha deve ter exatamente 6 dígitos e não pode conter sequências repetidas ou numéricas."
            ));
        }
    
        try {
            String accountNumber = generateAccountNumber();
            user.setAccountNumber(accountNumber);
            user.setCreatedAt(new java.sql.Date(new Date().getTime()));
            user.setBalance(0.0); 
    
            userRepo.save(user);
            return ResponseEntity.ok(new SuccessResponse("Usuário salvo com sucesso. Número da conta: " + accountNumber));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Erro ao salvar usuário", e.getMessage()));
        }
    }

    @PostMapping("/{id}/deposit")
    public ResponseEntity<?> deposit(@PathVariable long id, @RequestBody Map<String, Double> depositDetails) {
        double amount = depositDetails.getOrDefault("amount", 0.0);

        if (amount <= 0) {
            return ResponseEntity.badRequest().body(new ErrorResponse("Valor inválido", "O valor do depósito deve ser maior que zero."));
        }

        try {
            Optional<User> userOptional = userRepo.findById(id);
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                user.setBalance(user.getBalance() + amount); 
                userRepo.save(user); 
                return ResponseEntity.ok(new SuccessResponse("Depósito realizado com sucesso"));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new ErrorResponse("Usuário não encontrado", "Não há nenhum usuário com o ID fornecido."));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Erro ao realizar depósito", e.getMessage()));
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@RequestBody User user, @PathVariable long id) {
        String password = user.getPassword();
        if (!isPasswordValid(password)) {
            return ResponseEntity.badRequest().body(new ErrorResponse(
                    "Senha inválida", 
                    "A senha deve ter exatamente 6 dígitos e não pode conter sequências repetidas ou numéricas."
            ));
        }

        try {
            Optional<User> optionalUser = userRepo.findById(id);
            if (optionalUser.isPresent()) {
                User existingUser = optionalUser.get();
                existingUser.setUsername(user.getUsername());
                existingUser.setPassword(user.getPassword());
                existingUser.setEmail(user.getEmail());
                existingUser.setCpf(user.getCpf());
                existingUser.setBalance(user.getBalance());
                existingUser.setCreatedAt(user.getCreatedAt());
                userRepo.save(existingUser);
                return ResponseEntity.ok(new SuccessResponse("Usuário atualizado com sucesso"));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new ErrorResponse("Usuário não encontrado", "Não há nenhum usuário com o ID fornecido."));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Erro ao atualizar usuário", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable long id) {
        try {
            Optional<User> optionalUser = userRepo.findById(id);
            if (optionalUser.isPresent()) {
                userRepo.delete(optionalUser.get());
                return ResponseEntity.ok(new SuccessResponse("Usuário deletado com sucesso"));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new ErrorResponse("Usuário não encontrado", "Não há nenhum usuário com o ID fornecido."));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Erro ao deletar usuário", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> loginDetails) {
        String accountNumber = loginDetails.get("accountNumber");
        String password = loginDetails.get("password");

        try {
            Optional<User> userOptional = userRepo.findByAccountNumberAndPassword(accountNumber, password);
            if (userOptional.isPresent()) {
                return ResponseEntity.ok(userOptional.get());
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new ErrorResponse("Credenciais inválidas", "Número da conta ou senha inválidos."));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Erro ao fazer login", e.getMessage()));
        }
    }

    private String generateAccountNumber() {
        SecureRandom random = new SecureRandom();
        int number = random.nextInt(1_000_000); 
        return String.format("%06d", number); 
    }

    private boolean isPasswordValid(String password) {
        String regex = "\\d{6}";
        if (!Pattern.matches(regex, password)) {
            return false;
        }

        regex = "(.)\\1{2,}";
        Pattern pattern = Pattern.compile(regex);
        if (pattern.matcher(password).find()) {
            return false;
        }

        for (int i = 0; i < password.length() - 1; i++) {
            int current = Character.getNumericValue(password.charAt(i));
            int next = Character.getNumericValue(password.charAt(i + 1));
            if (next == current + 1 || next == current - 1) {
                return false;
            }
        }

        return true;
    }

    public static class ErrorResponse {
        private String error;
        private String message;

        public ErrorResponse(String error, String message) {
            this.error = error;
            this.message = message;
        }

        public String getError() {
            return error;
        }

        public void setError(String error) {
            this.error = error;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }

    public static class SuccessResponse {
        private String message;

        public SuccessResponse(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }
}
