package com.formularioboot.formulario.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.formularioboot.formulario.models.User;

@RestController
@RequestMapping("/api/users")
public class UserController {
     private List<User> userList = new ArrayList<>();

    @PostMapping
    public User createUser(@RequestBody User user) {
        user.setNombre(user.getNombre().toUpperCase());
        userList.add(user);
        return user;
    }

    @GetMapping("/listUsers")
    public List<User> getAllUsers() {
        return userList;
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable int id) {
        return userList.stream()
                       .filter(user -> user.getId() == id)
                       .findFirst()
                       .orElse(null);
    }
}
