package com.systembank.app.rest.Controllers;

import com.systembank.app.rest.Adapter.DollarCurrencyAdapter;
import com.systembank.app.rest.Adapter.RealCurrencyAdapter;
import com.systembank.app.rest.Factory.AbstractFactory;
import com.systembank.app.rest.Interface.CurrencyAdapter;
import com.systembank.app.rest.Models.Note;
import com.systembank.app.rest.Models.TransferRequest;
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

import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
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

    @GetMapping("/cpf/{cpf}")
    public ResponseEntity<?> findByCPF(@PathVariable String cpf) {
        try {
            Optional<User> user = userRepo.findByCpf(cpf);
            if (user.isPresent()) {
                return ResponseEntity.ok(user.get());
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new ErrorResponse("Usuário não encontrado", "CPF não corresponde a nenhum usuário."));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Erro ao buscar usuário", e.getMessage()));
        }
    }

    @PostMapping("/transfer")
    public ResponseEntity<?> transfer(@RequestBody TransferRequest transferRequest) {
        if (transferRequest.getSenderId() == null || transferRequest.getRecipientCpf() == null || transferRequest.getAmount() <= 0) {
            return ResponseEntity.badRequest().body(new ErrorResponse("Dados inválidos", "ID do remetente, CPF do destinatário e valor devem ser fornecidos."));
        }

        try {
            Optional<User> sender = userRepo.findById(transferRequest.getSenderId());
            Optional<User> recipient = userRepo.findByCpf(transferRequest.getRecipientCpf());

            if (sender.isPresent() && recipient.isPresent()) {
                User senderUser = sender.get();
                User recipientUser = recipient.get();

                if (senderUser.getBalance() < transferRequest.getAmount()) {
                    return ResponseEntity.badRequest().body(new ErrorResponse("Saldo insuficiente", "Você não tem saldo suficiente para essa transferência."));
                }

                senderUser.setBalance(senderUser.getBalance() - transferRequest.getAmount());
                recipientUser.setBalance(recipientUser.getBalance() + transferRequest.getAmount());

                userRepo.save(senderUser);
                userRepo.save(recipientUser);

                userService.addTransaction(senderUser.getId(), transferRequest.getAmount(), LocalDateTime.now(), "Transferência (Enviada)");
                userService.addTransaction(recipientUser.getId(), transferRequest.getAmount(), LocalDateTime.now(), "Transferência (Recebida)");

                return ResponseEntity.ok(new SuccessResponse("Transferência realizada com sucesso"));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse("Usuário não encontrado", "Verifique o CPF do destinatário."));
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Erro ao realizar transferência", e.getMessage()));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id);

        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    
    @PostMapping
    public ResponseEntity<?> saveUser(@RequestBody Map<String, Object> userMap) {
        String password = (String) userMap.get("password");
        if (!isPasswordValid(password)) {
            return ResponseEntity.badRequest().body(new ErrorResponse(
                    "Senha inválida",
                    "A senha deve ter exatamente 6 dígitos e não pode conter sequências repetidas ou numéricas."
            ));
        }
    
        try {
            User user = new User();
            user.setUsername((String) userMap.get("username"));
            user.setPassword(password);
            user.setEmail((String) userMap.get("email"));
            user.setCpf((String) userMap.get("cpf"));
            user.setAccountType((String) userMap.get("accountType"));
            user.setAccountStatus((String) userMap.get("accountStatus"));
    
            String accountNumber = generateAccountNumber();
            user.setAccountNumber(accountNumber);
            user.setCreatedAt(new java.sql.Date(new Date().getTime()));
            user.setBalance(0.00);
    
            accountFactory.createAccount(accountNumber);
            accountFactory.createUser();
    
            userService.createUser(user);

            User userAuth = userService.authenticateUser(accountNumber, password);

            return ResponseEntity.ok(userAuth);
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

        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse("Credenciais inválidas", "Usuário ou senha inválidos."));
        }
    }

    @PostMapping("/{userId}/deposit")
    public ResponseEntity<?> deposit(
            @PathVariable Long userId, 
            @RequestBody List<Note> notes,
            @RequestParam String currency) { 

        User user = userService.findById(userId);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse("Usuário não encontrado", "O usuário com o ID fornecido não foi encontrado."));
        }

        CurrencyAdapter currencyAdapter = currency.equals("USD") ? new DollarCurrencyAdapter() : new RealCurrencyAdapter();

        double totalAmount = notes.stream()
                .mapToDouble(note -> currencyAdapter.convertToLocalCurrency(getDenominationValue(note.getDenomination())) * note.getQuantity())
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

        userService.addTransaction(userId, (int) totalAmount, LocalDateTime.now(), "Depósito");

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
