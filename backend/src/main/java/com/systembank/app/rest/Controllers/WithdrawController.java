package com.systembank.app.rest.Controllers;

import com.systembank.app.rest.Models.Slot;
import com.systembank.app.rest.Models.User;
import com.systembank.app.rest.Proxy.UserService;
import com.systembank.app.rest.Services.SlotManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/slots")
public class WithdrawController {

    @Autowired
    private UserService userService;

    @Autowired
    private SlotManager slotManager;

    @GetMapping("/available-slots")
    public ResponseEntity<?> getAvailableSlots() {
        try {
            List<Slot> slots = slotManager.getSlots();
            return ResponseEntity.ok(slots);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Erro ao buscar notas disponíveis", e.getMessage()));
        }
    }

    @PostMapping("/withdraw/{userId}")
    public ResponseEntity<?> withdraw(@PathVariable Long userId, @RequestBody Map<Integer, Integer> selectedNotes) {
        try {
            User user = userService.findById(userId);
            if (user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new ErrorResponse("Usuário não encontrado", "O usuário com o ID fornecido não foi encontrado."));
            }

            int totalAmount = selectedNotes.entrySet().stream()
                    .mapToInt(entry -> entry.getKey() * entry.getValue())
                    .sum();

            if (user.getBalance() < totalAmount) {
                return ResponseEntity.badRequest()
                        .body(new ErrorResponse("Saldo insuficiente", "O valor solicitado é maior que o saldo disponível."));
            }

            if (slotManager.withdraw(selectedNotes)) {
                user.setBalance(user.getBalance() - totalAmount);
                userService.updateUser(user);

                userService.addTransaction(userId, totalAmount, LocalDateTime.now(), "Saque");

                return ResponseEntity.ok(new SuccessResponse("Saque realizado com sucesso."));
            } else {
                return ResponseEntity.badRequest()
                        .body(new ErrorResponse("Erro ao realizar saque", "Notas insuficientes para o valor solicitado."));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Erro ao processar saque", e.getMessage()));
        }
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
