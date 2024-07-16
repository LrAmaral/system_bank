package com.systembank.app.rest.Controller;


import org.springframework.beans.factory.annotation.Autowired;
import com.systembank.app.rest.Models.Account;
import com.systembank.app.rest.Repo.AccountRepo;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@RestController
public class ApiController {

  	@Autowired
	  private AccountRepo userRepo;

    @GetMapping(value = "/")
    public String getPage() {
      return "Hello, World!";
    }

    @GetMapping(value = "/account")  
    public List<Account> getUsers() {
      return userRepo.findAll();
    }

    @PostMapping(value = "/save")
    public String saveUser(@RequestBody Account account) {
      userRepo.save(account);
      return "success";
    }

    @PutMapping(value = "/update/{id}")
    public String updateUser(@RequestBody Account account, @PathVariable long id) {
      // account updateUser = userRepo.findById(id).get();
      // updateUser.setFirstName(account.getFirstName());
      // updateUser.setLastName(account.getLastName());
      // updateUser.setOccupation(account.getOccupation());
      // updateUser.setAge(account.getAge());
      // userRepo.save(updateUser);
      return "updated";
    }

    @DeleteMapping(value = "/delete/{id}")
    public String deleteUser(@PathVariable long id){
      // account deleteUser = userRepo.findById(id).get();
      // userRepo.delete(deleteUser);
      return "deleted account with the id:" + id;
    }
}
