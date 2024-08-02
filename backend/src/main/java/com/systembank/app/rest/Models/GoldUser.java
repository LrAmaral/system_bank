package com.systembank.app.rest.Models;

import com.systembank.app.rest.Interface.UserInterface;

public class GoldUser implements UserInterface {
    private String username;
    private String password;

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public String getPassword() {
        return password;
    }
    
    @Override
    public void display() {
        System.out.println("Usuário Ouro criado");
    }
}