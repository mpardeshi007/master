package com.bny.jwt.controller;

import com.bny.jwt.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.core.io.ClassPathResource;

import java.util.HashMap;
import java.util.Map;

@RestController
public class DebugController {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/debug/check")
    public Map<String, Object> checkResources() {
        Map<String, Object> result = new HashMap<>();
        
        try {
            ClassPathResource indexHtml = new ClassPathResource("static/index.html");
            result.put("index.html exists", indexHtml.exists());
            
            ClassPathResource staticDir = new ClassPathResource("static/static");
            result.put("static directory exists", staticDir.exists());
            
            ClassPathResource cssDir = new ClassPathResource("static/static/css");
            result.put("css directory exists", cssDir.exists());
            
            ClassPathResource jsDir = new ClassPathResource("static/static/js");
            result.put("js directory exists", jsDir.exists());
            
        } catch (Exception e) {
            result.put("error", e.getMessage());
        }
        
        return result;
    }
    
    @GetMapping("/debug/users")
    public Map<String, Object> checkUsers() {
        Map<String, Object> result = new HashMap<>();
        
        try {
            long userCount = userRepository.count();
            result.put("total users", userCount);
            
            boolean userExists = userRepository.findByUsername("user").isPresent();
            boolean adminExists = userRepository.findByUsername("admin").isPresent();
            boolean serverExists = userRepository.findByUsername("server").isPresent();
            
            result.put("user exists", userExists);
            result.put("admin exists", adminExists);
            result.put("server exists", serverExists);
            
            // Test password encoding
            String testPassword = "password";
            String encodedPassword = passwordEncoder.encode(testPassword);
            boolean passwordMatches = passwordEncoder.matches(testPassword, encodedPassword);
            
            result.put("password encoding test", passwordMatches);
            
        } catch (Exception e) {
            result.put("error", e.getMessage());
        }
        
        return result;
    }
    
    @PostMapping("/debug/test-login")
    public ResponseEntity<?> testLogin(@RequestBody Map<String, String> request) {
        Map<String, Object> result = new HashMap<>();
        
        try {
            String username = request.get("username");
            String password = request.get("password");
            
            result.put("received_username", username);
            result.put("received_password", "[HIDDEN]");
            
            var user = userRepository.findByUsername(username);
            result.put("user_found", user.isPresent());
            
            if (user.isPresent()) {
                boolean passwordMatches = passwordEncoder.matches(password, user.get().getPassword());
                result.put("password_matches", passwordMatches);
                result.put("user_roles", user.get().getRoles());
            }
            
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            result.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(result);
        }
    }
}
