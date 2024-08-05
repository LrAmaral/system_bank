package com.systembank.app.rest.Controllers;

import com.systembank.app.rest.Factory.AbstractFactory;
import com.systembank.app.rest.Models.Note;
import com.systembank.app.rest.Models.User;
import com.systembank.app.rest.Services.NoteService;
import com.systembank.app.rest.Services.SlotManager; 
import com.systembank.app.rest.Proxy.UserService;
import com.systembank.app.rest.Repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private AbstractFactory accountFactory;

    @Autowired
    @Qualifier("userServiceProxy")
    private UserService userService;

    @Autowired
    private NoteService noteService; 

    @Autowired
    private SlotManager slotManager;

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
            user.setBalance(0.00);
    
            accountFactory.createAccount(accountNumber);
            accountFactory.createUser(); 
    
            userService.createUser(user);
            return ResponseEntity.ok(new SuccessResponse("Usuário salvo com sucesso. Número da conta: " + accountNumber));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Erro ao salvar usuário", e.getMessage()));
        }
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> loginDetails) {
        String accountNumber = loginDetails.get("account");
        String password = loginDetails.get("password");

        User user = userService.authenticateUser(accountNumber, password);

        System.out.println(user);
        
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse("Credenciais inválidas", "Usuário ou senha inválidos."));
        }
    }

  @PostMapping("/{userId}/deposit")
    public ResponseEntity<?> deposit(@PathVariable Long userId, @RequestBody List<Note> notes) {
        User user = userService.findById(userId);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse("Usuário não encontrado", "O usuário com o ID fornecido não foi encontrado."));
        }

        double totalAmount = notes.stream()
                .mapToDouble(note -> getDenominationValue(note.getDenomination()) * note.getQuantity())
                .sum();

        if (totalAmount <= 0) {
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse("Valor inválido", "O valor total do depósito deve ser maior que zero."));
        }

        user.setBalance(user.getBalance() + totalAmount);

        for (Note note : notes) {
            noteService.updateNoteQuantity(note.getDenomination(), note.getQuantity());
        }

        Map<Integer, Integer> noteMap = notes.stream()
                .collect(Collectors.toMap(Note::getDenomination, Note::getQuantity));
        slotManager.updateSlots(noteMap);

        userService.updateUser(user);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Depósito realizado com sucesso.");
        response.put("balance", user.getBalance());

        return ResponseEntity.ok(response);
    }

    
    private double getDenominationValue(int denomination) {
        switch (denomination) {
            case 2: return 2.0;
            case 5: return 5.0;
            case 10: return 10.0;
            case 20: return 20.0;
            case 50: return 50.0;
            case 100: return 100.0;
            case 200: return 200.0;
            default: throw new IllegalArgumentException("Denominação inválida");
        }
    }

    
    private String generateAccountNumber() {
        Random random = new Random();
        int number = random.nextInt(90000) + 10000;
        return String.valueOf(number);
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
