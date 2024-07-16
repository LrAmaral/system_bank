package com.systembank.app.rest.Models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Account {
  
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column
  private String accountNumber;

  @Column
  private String accountClientName;

  @Column
  private Double accountBalance;

  @Column
  private String passwordAccount;

  public int getId(int id){
    return id;
  }

  public void setId(Long id){
    this.id = id;
  }

  public String getAccountNumber(){
    return accountNumber;
  }

  public void setAccountNumber(String accountNumber){
    this.accountNumber = accountNumber;
  }

  public String getAccountClientName(){
    return accountClientName;
  }

  public void setAccountClientName(String accountClientName){
    this.accountClientName = accountClientName;
  }

  public Double getAccountBalance(){
    return accountBalance;
  }

  public void setAccountBalance(Double accountBalance){
    this.accountBalance = accountBalance;
  }
 
  public String getPasswordAccount(){
    return passwordAccount;
  }

  public void setPasswordAccount(String passwordAccount){
    this.passwordAccount = passwordAccount;
  }
}
