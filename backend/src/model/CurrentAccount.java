package model;

public class CurrentAccount implements Account {
    private String accountNumber;

    public CurrentAccount(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    @Override
    public void display() {
        System.out.println("Conta Corrente criada: " + accountNumber);
    }

    public String getAccountNumber() {
        return accountNumber;
    }
}
