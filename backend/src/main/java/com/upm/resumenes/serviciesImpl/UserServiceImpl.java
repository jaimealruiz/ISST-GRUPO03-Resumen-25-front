package com.upm.resumenes.serviciesImpl;

import com.upm.resumenes.entities.User;
import com.upm.resumenes.repositories.UserRepository;
import com.upm.resumenes.servicies.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User registerUser(String email, String password) {
        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("El email ya está registrado");
        }

        User user = new User();
        user.setEmail(email);
        user.setPassword(password); // En un futuro, ira cifrada
        user.setWriter(false);

        return userRepository.save(user);
    }

    @Override
    public Optional<User> loginUser(String email, String password) {
        return userRepository.findByEmail(email)
                .filter(user -> user.getPassword().equals(password)); // Comparación simple
    }

    @Override
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
