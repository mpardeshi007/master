package com.bny.jwt.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@RestController
@RequestMapping("/api/v1/funds")
@CrossOrigin(origins = "*")
public class FundController {

    private final Random random = new Random();

    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> health() {
        Map<String, Object> health = new HashMap<>();
        health.put("status", "UP");
        health.put("timestamp", LocalDateTime.now());
        health.put("service", "Fund Management Service");
        health.put("version", "1.0.0");
        health.put("endpoint", "/api/v1/funds");
        return ResponseEntity.ok(health);
    }

    @GetMapping("/prices")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> getFundPrices() {
        // Simulate some processing time
        try {
            Thread.sleep(random.nextInt(100) + 50); // 50-150ms
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }

        Map<String, Object> response = new HashMap<>();
        response.put("funds", new Object[]{
            Map.of("id", "FUND001", "name", "Growth Fund", "price", 25.50, "change", 0.15),
            Map.of("id", "FUND002", "name", "Income Fund", "price", 18.75, "change", -0.05),
            Map.of("id", "FUND003", "name", "Balanced Fund", "price", 22.30, "change", 0.08)
        });
        response.put("timestamp", LocalDateTime.now());
        response.put("totalFunds", 3);
        
        return ResponseEntity.ok(response);
    }

    @GetMapping("/details/{fundId}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> getFundDetails(@PathVariable String fundId) {
        Map<String, Object> fundDetails = new HashMap<>();
        fundDetails.put("id", fundId);
        fundDetails.put("name", "Sample Fund " + fundId);
        fundDetails.put("description", "This is a sample fund for demonstration purposes");
        fundDetails.put("nav", 25.50);
        fundDetails.put("aum", 1000000.00);
        fundDetails.put("lastUpdated", LocalDateTime.now());
        
        return ResponseEntity.ok(fundDetails);
    }

    @PostMapping("/purchase")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> purchaseFund(@RequestBody Map<String, Object> request) {
        Map<String, Object> response = new HashMap<>();
        response.put("transactionId", "TXN" + System.currentTimeMillis());
        response.put("status", "SUCCESS");
        response.put("fundId", request.get("fundId"));
        response.put("amount", request.get("amount"));
        response.put("timestamp", LocalDateTime.now());
        
        return ResponseEntity.ok(response);
    }
} 