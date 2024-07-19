package com.systembank.app.rest.websocket;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.systembank.app.rest.models.Account;
import com.systembank.app.rest.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.Map;

public class WebSocketHandler extends TextWebSocketHandler {

    @Autowired
    private AccountService accountService;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    protected void handleTextMessage(@NonNull WebSocketSession session, @NonNull TextMessage message) throws Exception {
        String payload = message.getPayload();
        // Usando TypeReference para especificar os tipos de chave e valor
        Map<String, Object> receivedMessage = objectMapper.readValue(payload, new TypeReference<Map<String,Object>>() {});

        String messageType = (String) receivedMessage.get("type");

        switch (messageType) {
            case "createAccount":
                handleCreateAccount(session, receivedMessage);
                break;
            case "deposit":
                handleDeposit(session, receivedMessage);
                break;
            case "withdraw":
                handleWithdraw(session, receivedMessage);
                break;
            case "transfer":
                handleTransfer(session, receivedMessage);
                break;
            default:
                session.sendMessage(new TextMessage("Unknown message type: " + messageType));
        }
    }

    private void handleCreateAccount(@NonNull WebSocketSession session, Map<String, Object> message) throws Exception {
        try {
            String accountNumber = (String) message.get("accountNumber");
            String accountClientName = (String) message.get("accountClientName");
            String passwordAccount = (String) message.get("passwordAccount");

            Account account = accountService.createAccount(accountNumber, accountClientName, passwordAccount);
            String response = objectMapper.writeValueAsString(account);
            session.sendMessage(new TextMessage(response));
        } catch (Exception e) {
            session.sendMessage(new TextMessage("Error creating account: " + e.getMessage()));
        }
    }

    private void handleDeposit(@NonNull WebSocketSession session, Map<String, Object> message) throws Exception {
        try {
            Long id = Long.valueOf((String) message.get("id"));
            Double amount = Double.valueOf((String) message.get("amount"));

            Account account = accountService.deposit(id, amount);
            String response = objectMapper.writeValueAsString(account);
            session.sendMessage(new TextMessage(response));
        } catch (Exception e) {
            session.sendMessage(new TextMessage("Error depositing amount: " + e.getMessage()));
        }
    }

    private void handleWithdraw(@NonNull WebSocketSession session, Map<String, Object> message) throws Exception {
        try {
            Long id = Long.valueOf((String) message.get("id"));
            Double amount = Double.valueOf((String) message.get("amount"));

            Account account = accountService.withdraw(id, amount);
            String response = objectMapper.writeValueAsString(account);
            session.sendMessage(new TextMessage(response));
        } catch (Exception e) {
            session.sendMessage(new TextMessage("Error withdrawing amount: " + e.getMessage()));
        }
    }

    private void handleTransfer(@NonNull WebSocketSession session, Map<String, Object> message) throws Exception {
        try {
            Long fromAccountId = Long.valueOf((String) message.get("fromAccountId"));
            Long toAccountId = Long.valueOf((String) message.get("toAccountId"));
            Double amount = Double.valueOf((String) message.get("amount"));

            accountService.transfer(fromAccountId, toAccountId, amount);
            session.sendMessage(new TextMessage("Transfer successful"));
        } catch (Exception e) {
            session.sendMessage(new TextMessage("Error transferring amount: " + e.getMessage()));
        }
    }
}
