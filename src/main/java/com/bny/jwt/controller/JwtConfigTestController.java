package com.bny.jwt.controller;

import com.bny.jwt.config.JwtConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class JwtConfigTestController {

    @Autowired
    private JwtConfig jwtConfig;
    
    @GetMapping("/debug/jwt-config")
    public ResponseEntity<?> testJwtConfig() {
        Map<String, Object> response = new HashMap<>();
        response.put("secretExists", jwtConfig.getSecret() != null && !jwtConfig.getSecret().isEmpty());
        response.put("secretLength", jwtConfig.getSecret() != null ? jwtConfig.getSecret().length() : 0);
        response.put("expiration", jwtConfig.getExpiration());
        
        // The actual secret value should never be returned in production
        // This is just for debugging purposes
        response.put("secretFirstChars", jwtConfig.getSecret() != null && jwtConfig.getSecret().length() > 4 
                ? jwtConfig.getSecret().substring(0, 4) + "..." 
                : "N/A");
        
        return ResponseEntity.ok(response);
    }
}
