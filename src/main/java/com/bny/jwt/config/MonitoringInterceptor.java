package com.bny.jwt.config;

import com.bny.jwt.service.MonitoringService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.time.LocalDateTime;

@Component
public class MonitoringInterceptor implements HandlerInterceptor {

    @Autowired
    private MonitoringService monitoringService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        // Store start time for response time calculation
        request.setAttribute("startTime", System.currentTimeMillis());
        return true;
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        try {
            // Calculate response time
            Long startTime = (Long) request.getAttribute("startTime");
            long responseTime = startTime != null ? System.currentTimeMillis() - startTime : 0;

            // Extract request information
            String endpoint = request.getRequestURI();
            String method = request.getMethod();
            int statusCode = response.getStatus();
            String userAgent = request.getHeader("User-Agent");
            String ipAddress = getClientIpAddress(request);
            
            // Determine service ID from endpoint
            String serviceId = determineServiceId(endpoint);
            
            // Log error if exception occurred
            String error = ex != null ? ex.getMessage() : null;

            // Log the API call
            monitoringService.logApiCall(
                endpoint,
                method,
                statusCode,
                responseTime,
                error,
                userAgent,
                ipAddress,
                serviceId
            );
        } catch (Exception e) {
            // Don't let monitoring errors affect the main application
            System.err.println("Error in monitoring interceptor: " + e.getMessage());
        }
    }

    private String getClientIpAddress(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isEmpty() && !"unknown".equalsIgnoreCase(xForwardedFor)) {
            return xForwardedFor.split(",")[0];
        }
        
        String xRealIp = request.getHeader("X-Real-IP");
        if (xRealIp != null && !xRealIp.isEmpty() && !"unknown".equalsIgnoreCase(xRealIp)) {
            return xRealIp;
        }
        
        return request.getRemoteAddr();
    }

    private String determineServiceId(String endpoint) {
        if (endpoint.startsWith("/api/v1/funds")) {
            return "FUND_SERVICE";
        } else if (endpoint.startsWith("/api/v1/transactions")) {
            return "TRANSACTION_SERVICE";
        } else if (endpoint.startsWith("/api/v1/customers")) {
            return "CUSTOMER_SERVICE";
        } else if (endpoint.startsWith("/api/v1/reconciliation")) {
            return "RECONCILIATION_SERVICE";
        } else if (endpoint.startsWith("/api/v1/reports")) {
            return "REPORTING_SERVICE";
        } else if (endpoint.startsWith("/api/monitoring")) {
            return "MONITORING_SERVICE";
        } else if (endpoint.startsWith("/api/auth")) {
            return "AUTH_SERVICE";
        } else {
            return "UNKNOWN_SERVICE";
        }
    }
} 