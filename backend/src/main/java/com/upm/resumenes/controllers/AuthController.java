package com.upm.resumenes.controllers;

import com.upm.resumenes.entities.User;
import com.upm.resumenes.servicies.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
//Registro, Login, Logout
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class AuthController {

    @Autowired
    private UserService userService;

    
    @PostMapping("/signup")
    public User signup(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String password = body.get("password");
        return userService.registerUser(email, password);
    }

    //Iniciar sesion --> devuelve todo el usuario y gestion la sesion --> pasar a jwt
    @PostMapping("/login")
    public User login(@RequestBody Map<String, String> body, HttpSession session) {
        String email = body.get("email");
        String password = body.get("password");

        return userService.loginUser(email, password)
                .map(user -> {
                    session.setAttribute("userId", user.getId());
                    return user;
                })
                .orElseThrow(() -> new RuntimeException("Credenciales incorrectas"));
    }


    @PostMapping("/logout")
    public void logout(HttpSession session) {
        session.invalidate();
    }

    //Recibe una sesion http del navegador del usuatrio, y si esta validade le acepta
    @GetMapping("/me")
    public User me(HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");
        if (userId == null) throw new RuntimeException("No hay sesión activa");
        return userService.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }
}
