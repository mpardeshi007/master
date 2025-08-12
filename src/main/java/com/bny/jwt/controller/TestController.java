package com.bny.jwt.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
public class TestController {

    @GetMapping("/api/info")
    public ResponseEntity<?> infoEndpoint() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Transfer Agency Hub - Backend API");
        response.put("version", "1.0.0");
        response.put("frontend", Map.of(
            "app", "http://localhost:8080",
            "login", "http://localhost:8080/login",
            "dashboard", "http://localhost:8080/dashboard"
        ));
        response.put("api_endpoints", Map.of(
            "login", "/api/auth/signin",
            "serverToken", "/api/auth/server-token",
            "validate", "/api/auth/validate",
            "public", "/api/public/hello",
            "protected", "/api/protected/user",
            "admin", "/api/admin/dashboard",
            "server", "/api/server/status",
            "info", "/api/info",
            "debug", "/debug/check",
            "documentation", "See README.md for full documentation"
        ));
        return ResponseEntity.ok(response);
    }

    @GetMapping("/api/public/hello")
    public ResponseEntity<?> publicEndpoint() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "This is a public endpoint - no authentication required");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/api/protected/user")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> userAccess() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Hello " + authentication.getName() + "! This is a user protected endpoint");
        response.put("username", authentication.getName());
        response.put("authorities", authentication.getAuthorities());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/api/admin/dashboard")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> adminAccess() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Welcome to Admin Dashboard!");
        response.put("username", authentication.getName());
        response.put("authorities", authentication.getAuthorities());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/api/server/status")
    @PreAuthorize("hasRole('SERVER')")
    public ResponseEntity<?> serverAccess() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Server-to-Server communication successful!");
        response.put("serverName", authentication.getName());
        response.put("authorities", authentication.getAuthorities());
        response.put("timestamp", System.currentTimeMillis());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/server/data")
    @PreAuthorize("hasRole('SERVER')")
    public ResponseEntity<?> receiveServerData(@RequestBody Map<String, Object> data) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Data received from server: " + authentication.getName());
        response.put("receivedData", data);
        response.put("processedAt", System.currentTimeMillis());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/current-user")
    public ResponseEntity<?> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Map<String, Object> response = new HashMap<>();
        response.put("username", authentication.getName());
        response.put("authorities", authentication.getAuthorities());
        response.put("authenticated", authentication.isAuthenticated());
        return ResponseEntity.ok(response);
    }
}
