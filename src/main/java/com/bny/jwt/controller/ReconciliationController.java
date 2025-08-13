package com.bny.jwt.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@RestController
@RequestMapping("/api/v1/reconciliation")
@CrossOrigin(origins = "*")
public class ReconciliationController {

    private final Random random = new Random();

    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> health() {
        Map<String, Object> health = new HashMap<>();
        health.put("status", "UP");
        health.put("timestamp", LocalDateTime.now());
        health.put("service", "Reconciliation Service");
        health.put("version", "1.0.0");
        health.put("endpoint", "/api/v1/reconciliation");
        return ResponseEntity.ok(health);
    }

    @GetMapping("/status")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> getReconciliationStatus() {
        // Simulate processing time
        try {
            Thread.sleep(random.nextInt(300) + 200); // 200-500ms
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }

        Map<String, Object> response = new HashMap<>();
        response.put("reconciliationStatus", "IN_PROGRESS");
        response.put("lastRun", LocalDateTime.now().minusHours(2));
        response.put("nextRun", LocalDateTime.now().plusHours(22));
        response.put("totalRecords", 15420);
        response.put("matchedRecords", 15380);
        response.put("unmatchedRecords", 40);
        response.put("matchRate", 99.74);
        response.put("timestamp", LocalDateTime.now());
        
        return ResponseEntity.ok(response);
    }

    @PostMapping("/run")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> runReconciliation(@RequestBody Map<String, Object> request) {
        Map<String, Object> response = new HashMap<>();
        response.put("reconciliationId", "REC" + System.currentTimeMillis());
        response.put("status", "STARTED");
        response.put("startedAt", LocalDateTime.now());
        response.put("estimatedDuration", "15 minutes");
        
        return ResponseEntity.ok(response);
    }

    @GetMapping("/exceptions")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> getExceptions() {
        Map<String, Object> response = new HashMap<>();
        response.put("exceptions", new Object[]{
            Map.of("id", "EXC001", "type", "AMOUNT_MISMATCH", "description", "Transaction amount differs from bank record", "severity", "HIGH"),
            Map.of("id", "EXC002", "type", "MISSING_TRANSACTION", "description", "Transaction not found in bank records", "severity", "MEDIUM"),
            Map.of("id", "EXC003", "type", "DUPLICATE_ENTRY", "description", "Duplicate transaction detected", "severity", "LOW")
        });
        response.put("totalExceptions", 3);
        response.put("timestamp", LocalDateTime.now());
        
        return ResponseEntity.ok(response);
    }
} 