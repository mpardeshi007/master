package com.bny.jwt.controller;

import com.bny.jwt.model.ServiceHealth;
import com.bny.jwt.model.ApiLog;
import com.bny.jwt.model.TrafficAnalytics;
import com.bny.jwt.service.MonitoringService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/monitoring")
@CrossOrigin(origins = "*")
public class MonitoringController {

    @Autowired
    private MonitoringService monitoringService;

    @GetMapping("/services")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ServiceHealth>> getAllServices() {
        return ResponseEntity.ok(monitoringService.getAllServices());
    }

    @GetMapping("/services/{serviceId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ServiceHealth> getServiceHealth(@PathVariable String serviceId) {
        ServiceHealth service = monitoringService.getServiceHealth(serviceId);
        if (service != null) {
            return ResponseEntity.ok(service);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/logs")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ApiLog>> getApiLogs(
            @RequestParam(defaultValue = "50") int limit,
            @RequestParam(required = false) String serviceId,
            @RequestParam(required = false) String severity) {
        
        List<ApiLog> logs;
        if (serviceId != null) {
            logs = monitoringService.getApiLogsByService(serviceId);
        } else if (severity != null) {
            logs = monitoringService.getApiLogsBySeverity(severity);
        } else {
            logs = monitoringService.getRecentLogs(limit);
        }
        
        return ResponseEntity.ok(logs);
    }

    @GetMapping("/metrics")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> getSystemMetrics() {
        return ResponseEntity.ok(monitoringService.getSystemMetrics());
    }

    @PostMapping("/services/{serviceId}/test")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> testServiceConnection(@PathVariable String serviceId) {
        try {
            monitoringService.testServiceConnection(serviceId);
            return ResponseEntity.ok("Service connection test completed");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to test service connection: " + e.getMessage());
        }
    }

    @PostMapping("/services/{serviceId}/reset")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> resetServiceMetrics(@PathVariable String serviceId) {
        try {
            monitoringService.resetServiceMetrics(serviceId);
            return ResponseEntity.ok("Service metrics reset successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to reset service metrics: " + e.getMessage());
        }
    }

    @PostMapping("/services")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> registerService(@RequestBody ServiceHealth service) {
        try {
            monitoringService.registerService(service);
            return ResponseEntity.ok("Service registered successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to register service: " + e.getMessage());
        }
    }

    @DeleteMapping("/services/{serviceId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> unregisterService(@PathVariable String serviceId) {
        try {
            monitoringService.unregisterService(serviceId);
            return ResponseEntity.ok("Service unregistered successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to unregister service: " + e.getMessage());
        }
    }

    @PostMapping("/logs")
    public ResponseEntity<String> logApiCall(@RequestBody ApiLog apiLog) {
        try {
            monitoringService.logApiCall(
                apiLog.getEndpoint(),
                apiLog.getMethod(),
                apiLog.getStatusCode(),
                apiLog.getResponseTime(),
                apiLog.getError(),
                apiLog.getUserAgent(),
                apiLog.getIpAddress(),
                apiLog.getServiceId()
            );
            return ResponseEntity.ok("API call logged successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to log API call: " + e.getMessage());
        }
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> getSystemHealth() {
        Map<String, Object> health = monitoringService.getSystemMetrics();
        health.put("status", "UP");
        health.put("timestamp", System.currentTimeMillis());
        return ResponseEntity.ok(health);
    }

    @GetMapping("/services/{serviceId}/logs")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ApiLog>> getServiceLogs(@PathVariable String serviceId) {
        List<ApiLog> logs = monitoringService.getApiLogsByService(serviceId);
        return ResponseEntity.ok(logs);
    }

    @PostMapping("/export")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> exportLogs(@RequestParam(defaultValue = "json") String format) {
        try {
            monitoringService.exportLogs(format);
            return ResponseEntity.ok("Logs exported successfully in " + format + " format");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to export logs: " + e.getMessage());
        }
    }

    @GetMapping("/analytics")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<TrafficAnalytics> getTrafficAnalytics() {
        try {
            TrafficAnalytics analytics = monitoringService.getTrafficAnalytics();
            return ResponseEntity.ok(analytics);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
} 