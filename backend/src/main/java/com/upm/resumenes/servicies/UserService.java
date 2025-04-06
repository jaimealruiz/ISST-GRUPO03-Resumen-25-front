package com.upm.resumenes.servicies;

import com.upm.resumenes.entities.User;

import java.util.Optional;

public interface UserService {
    User registerUser(String email, String password);
    Optional<User> loginUser(String email, String password);
    Optional<User> findById(Long id);
    Optional<User> findByEmail(String email);
}
