package com.bny.jwt.model;

import java.time.LocalDateTime;

public class ApiLog {
    private String logId;
    private LocalDateTime timestamp;
    private String endpoint;
    private String method;
    private int statusCode;
    private long responseTime;
    private String error;
    private String userAgent;
    private String ipAddress;
    private String severity; // info, warning, error
    private String serviceId;
    private String requestId;
    private String userId;

    public ApiLog() {}

    public ApiLog(String logId, LocalDateTime timestamp, String endpoint, String method, 
                 int statusCode, long responseTime, String error, String userAgent, 
                 String ipAddress, String severity) {
        this.logId = logId;
        this.timestamp = timestamp;
        this.endpoint = endpoint;
        this.method = method;
        this.statusCode = statusCode;
        this.responseTime = responseTime;
        this.error = error;
        this.userAgent = userAgent;
        this.ipAddress = ipAddress;
        this.severity = severity;
    }

    // Getters and Setters
    public String getLogId() { return logId; }
    public void setLogId(String logId) { this.logId = logId; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }

    public String getEndpoint() { return endpoint; }
    public void setEndpoint(String endpoint) { this.endpoint = endpoint; }

    public String getMethod() { return method; }
    public void setMethod(String method) { this.method = method; }

    public int getStatusCode() { return statusCode; }
    public void setStatusCode(int statusCode) { this.statusCode = statusCode; }

    public long getResponseTime() { return responseTime; }
    public void setResponseTime(long responseTime) { this.responseTime = responseTime; }

    public String getError() { return error; }
    public void setError(String error) { this.error = error; }

    public String getUserAgent() { return userAgent; }
    public void setUserAgent(String userAgent) { this.userAgent = userAgent; }

    public String getIpAddress() { return ipAddress; }
    public void setIpAddress(String ipAddress) { this.ipAddress = ipAddress; }

    public String getSeverity() { return severity; }
    public void setSeverity(String severity) { this.severity = severity; }

    public String getServiceId() { return serviceId; }
    public void setServiceId(String serviceId) { this.serviceId = serviceId; }

    public String getRequestId() { return requestId; }
    public void setRequestId(String requestId) { this.requestId = requestId; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
} 