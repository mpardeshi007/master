package com.bny.jwt.model;

import java.time.LocalDateTime;

public class ServiceHealth {
    private String serviceId;
    private String serviceName;
    private String endpoint;
    private String status; // healthy, warning, error
    private long responseTime;
    private double uptime;
    private LocalDateTime lastCheck;
    private long requestsToday;
    private double errorRate;
    private String provider;
    private String version;
    private String environment;
    private boolean isActive;

    public ServiceHealth() {}

    public ServiceHealth(String serviceId, String serviceName, String endpoint, String status, 
                        long responseTime, double uptime, LocalDateTime lastCheck, 
                        long requestsToday, double errorRate, String provider) {
        this.serviceId = serviceId;
        this.serviceName = serviceName;
        this.endpoint = endpoint;
        this.status = status;
        this.responseTime = responseTime;
        this.uptime = uptime;
        this.lastCheck = lastCheck;
        this.requestsToday = requestsToday;
        this.errorRate = errorRate;
        this.provider = provider;
        this.isActive = true;
    }

    // Getters and Setters
    public String getServiceId() { return serviceId; }
    public void setServiceId(String serviceId) { this.serviceId = serviceId; }

    public String getServiceName() { return serviceName; }
    public void setServiceName(String serviceName) { this.serviceName = serviceName; }

    public String getEndpoint() { return endpoint; }
    public void setEndpoint(String endpoint) { this.endpoint = endpoint; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public long getResponseTime() { return responseTime; }
    public void setResponseTime(long responseTime) { this.responseTime = responseTime; }

    public double getUptime() { return uptime; }
    public void setUptime(double uptime) { this.uptime = uptime; }

    public LocalDateTime getLastCheck() { return lastCheck; }
    public void setLastCheck(LocalDateTime lastCheck) { this.lastCheck = lastCheck; }

    public long getRequestsToday() { return requestsToday; }
    public void setRequestsToday(long requestsToday) { this.requestsToday = requestsToday; }

    public double getErrorRate() { return errorRate; }
    public void setErrorRate(double errorRate) { this.errorRate = errorRate; }

    public String getProvider() { return provider; }
    public void setProvider(String provider) { this.provider = provider; }

    public String getVersion() { return version; }
    public void setVersion(String version) { this.version = version; }

    public String getEnvironment() { return environment; }
    public void setEnvironment(String environment) { this.environment = environment; }

    public boolean isActive() { return isActive; }
    public void setActive(boolean active) { isActive = active; }
} 