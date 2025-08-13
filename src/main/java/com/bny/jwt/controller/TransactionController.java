package com.bny.jwt.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@RestController
@RequestMapping("/api/v1/transactions")
@CrossOrigin(origins = "*")
public class TransactionController {

    private final Random random = new Random();

    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> health() {
        Map<String, Object> health = new HashMap<>();
        health.put("status", "UP");
        health.put("timestamp", LocalDateTime.now());
        health.put("service", "Transaction Processing Service");
        health.put("version", "1.0.0");
        health.put("endpoint", "/api/v1/transactions");
        return ResponseEntity.ok(health);
    }

    @GetMapping("/list")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> getTransactions() {
        // Simulate processing time
        try {
            Thread.sleep(random.nextInt(200) + 100); // 100-300ms
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }

        Map<String, Object> response = new HashMap<>();
        response.put("transactions", new Object[]{
            Map.of("id", "TXN001", "type", "PURCHASE", "amount", 1000.00, "status", "COMPLETED", "date", LocalDateTime.now().minusDays(1)),
            Map.of("id", "TXN002", "type", "REDEMPTION", "amount", 500.00, "status", "COMPLETED", "date", LocalDateTime.now().minusHours(2)),
            Map.of("id", "TXN003", "type", "PURCHASE", "amount", 2500.00, "status", "PENDING", "date", LocalDateTime.now())
        });
        response.put("totalTransactions", 3);
        response.put("timestamp", LocalDateTime.now());
        
        return ResponseEntity.ok(response);
    }

    @PostMapping("/process")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> processTransaction(@RequestBody Map<String, Object> request) {
        Map<String, Object> response = new HashMap<>();
        response.put("transactionId", "TXN" + System.currentTimeMillis());
        response.put("status", "PROCESSING");
        response.put("type", request.get("type"));
        response.put("amount", request.get("amount"));
        response.put("timestamp", LocalDateTime.now());
        
        return ResponseEntity.ok(response);
    }

    @GetMapping("/status/{transactionId}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> getTransactionStatus(@PathVariable String transactionId) {
        Map<String, Object> status = new HashMap<>();
        status.put("transactionId", transactionId);
        status.put("status", "COMPLETED");
        status.put("processedAt", LocalDateTime.now());
        status.put("processingTime", random.nextInt(500) + 100); // 100-600ms
        
        return ResponseEntity.ok(status);
    }
} 