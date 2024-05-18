package model;

public class SavingAccount implements Account {
    private String accountNumber;

    public SavingAccount(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    @Override
    public void display() {
        System.out.println("Conta Poupança criada: " + accountNumber);
    }

    public String getAccountNumber() {
        return accountNumber;
    }
}
