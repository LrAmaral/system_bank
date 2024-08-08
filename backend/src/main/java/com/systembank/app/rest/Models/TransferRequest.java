package com.systembank.app.rest.Models;

public class TransferRequest {
    private Long senderId; 
    private String recipientCpf;
    private Double amount;

    public Long getSenderId() {
        return senderId;
    }

    public void setSenderId(Long senderId) {
        this.senderId = senderId;
    }

    public String getRecipientCpf() {
        return recipientCpf;
    }

    public void setRecipientCpf(String recipientCpf) {
        this.recipientCpf = recipientCpf;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }
}
