package com.bny.jwt.model;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

public class TrafficAnalytics {
    private List<TimeSeriesData> hourlyTraffic;
    private List<TimeSeriesData> dailyTraffic;
    private Map<String, Long> requestsByService;
    private Map<String, Long> requestsByMethod;
    private Map<String, Long> requestsByStatus;
    private List<ResponseTimeData> responseTimeTrend;
    private Map<String, Double> errorRateByService;
    private LocalDateTime lastUpdated;

    public TrafficAnalytics() {}

    public TrafficAnalytics(List<TimeSeriesData> hourlyTraffic, List<TimeSeriesData> dailyTraffic,
                           Map<String, Long> requestsByService, Map<String, Long> requestsByMethod,
                           Map<String, Long> requestsByStatus, List<ResponseTimeData> responseTimeTrend,
                           Map<String, Double> errorRateByService) {
        this.hourlyTraffic = hourlyTraffic;
        this.dailyTraffic = dailyTraffic;
        this.requestsByService = requestsByService;
        this.requestsByMethod = requestsByMethod;
        this.requestsByStatus = requestsByStatus;
        this.responseTimeTrend = responseTimeTrend;
        this.errorRateByService = errorRateByService;
        this.lastUpdated = LocalDateTime.now();
    }

    // Getters and Setters
    public List<TimeSeriesData> getHourlyTraffic() { return hourlyTraffic; }
    public void setHourlyTraffic(List<TimeSeriesData> hourlyTraffic) { this.hourlyTraffic = hourlyTraffic; }

    public List<TimeSeriesData> getDailyTraffic() { return dailyTraffic; }
    public void setDailyTraffic(List<TimeSeriesData> dailyTraffic) { this.dailyTraffic = dailyTraffic; }

    public Map<String, Long> getRequestsByService() { return requestsByService; }
    public void setRequestsByService(Map<String, Long> requestsByService) { this.requestsByService = requestsByService; }

    public Map<String, Long> getRequestsByMethod() { return requestsByMethod; }
    public void setRequestsByMethod(Map<String, Long> requestsByMethod) { this.requestsByMethod = requestsByMethod; }

    public Map<String, Long> getRequestsByStatus() { return requestsByStatus; }
    public void setRequestsByStatus(Map<String, Long> requestsByStatus) { this.requestsByStatus = requestsByStatus; }

    public List<ResponseTimeData> getResponseTimeTrend() { return responseTimeTrend; }
    public void setResponseTimeTrend(List<ResponseTimeData> responseTimeTrend) { this.responseTimeTrend = responseTimeTrend; }

    public Map<String, Double> getErrorRateByService() { return errorRateByService; }
    public void setErrorRateByService(Map<String, Double> errorRateByService) { this.errorRateByService = errorRateByService; }

    public LocalDateTime getLastUpdated() { return lastUpdated; }
    public void setLastUpdated(LocalDateTime lastUpdated) { this.lastUpdated = lastUpdated; }

    // Inner classes for structured data
    public static class TimeSeriesData {
        private LocalDateTime timestamp;
        private long count;
        private double averageResponseTime;
        private long errorCount;

        public TimeSeriesData() {}

        public TimeSeriesData(LocalDateTime timestamp, long count, double averageResponseTime, long errorCount) {
            this.timestamp = timestamp;
            this.count = count;
            this.averageResponseTime = averageResponseTime;
            this.errorCount = errorCount;
        }

        // Getters and Setters
        public LocalDateTime getTimestamp() { return timestamp; }
        public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }

        public long getCount() { return count; }
        public void setCount(long count) { this.count = count; }

        public double getAverageResponseTime() { return averageResponseTime; }
        public void setAverageResponseTime(double averageResponseTime) { this.averageResponseTime = averageResponseTime; }

        public long getErrorCount() { return errorCount; }
        public void setErrorCount(long errorCount) { this.errorCount = errorCount; }
    }

    public static class ResponseTimeData {
        private LocalDateTime timestamp;
        private String serviceId;
        private double averageResponseTime;
        private double p95ResponseTime;
        private double p99ResponseTime;

        public ResponseTimeData() {}

        public ResponseTimeData(LocalDateTime timestamp, String serviceId, double averageResponseTime, 
                              double p95ResponseTime, double p99ResponseTime) {
            this.timestamp = timestamp;
            this.serviceId = serviceId;
            this.averageResponseTime = averageResponseTime;
            this.p95ResponseTime = p95ResponseTime;
            this.p99ResponseTime = p99ResponseTime;
        }

        // Getters and Setters
        public LocalDateTime getTimestamp() { return timestamp; }
        public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }

        public String getServiceId() { return serviceId; }
        public void setServiceId(String serviceId) { this.serviceId = serviceId; }

        public double getAverageResponseTime() { return averageResponseTime; }
        public void setAverageResponseTime(double averageResponseTime) { this.averageResponseTime = averageResponseTime; }

        public double getP95ResponseTime() { return p95ResponseTime; }
        public void setP95ResponseTime(double p95ResponseTime) { this.p95ResponseTime = p95ResponseTime; }

        public double getP99ResponseTime() { return p99ResponseTime; }
        public void setP99ResponseTime(double p99ResponseTime) { this.p99ResponseTime = p99ResponseTime; }
    }
} 