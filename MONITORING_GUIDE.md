# Monitoring System Implementation Guide

## Overview

The Transfer Agency Hub now includes a comprehensive monitoring system that provides real-time visibility into the health, performance, and status of all microservices in the architecture. This system is designed to be extensible and can seamlessly accommodate new services as they are added to the microservices ecosystem.

## Features

### 🔍 Real-time Service Monitoring
- **Health Status Tracking**: Monitor service health (healthy, warning, error)
- **Performance Metrics**: Track response times, uptime, and error rates
- **Request Volume**: Monitor daily request counts
- **Auto-refresh**: Data updates every 30 seconds

### 📊 API Logging & Analytics
- **Automatic Logging**: All API calls are automatically logged via interceptor
- **Error Tracking**: Detailed error logging with severity levels
- **Performance Analysis**: Response time tracking and analysis
- **Request Details**: IP addresses, user agents, and request metadata

### 🛠️ Service Management
- **Dynamic Service Registration**: Add new services on-the-fly
- **Service Testing**: Test service connectivity
- **Metrics Reset**: Reset service metrics when needed
- **Service Removal**: Remove services from monitoring

### 📈 System Metrics
- **Overall System Health**: Aggregate system status
- **Service Counts**: Healthy, warning, and error service counts
- **Average Response Times**: System-wide performance metrics
- **Total API Calls**: Track system usage

## Architecture

### Backend Components

#### 1. ServiceHealth Model
```java
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
}
```

#### 2. ApiLog Model
```java
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
}
```

#### 3. MonitoringService
- **Service Registry**: Manages registered services
- **Health Checks**: Performs periodic health checks
- **Log Management**: Handles API log storage and retrieval
- **Metrics Calculation**: Computes system metrics

#### 4. MonitoringController
Provides REST endpoints for:
- `GET /api/monitoring/services` - Get all services
- `GET /api/monitoring/services/{serviceId}` - Get specific service
- `GET /api/monitoring/logs` - Get API logs
- `GET /api/monitoring/metrics` - Get system metrics
- `POST /api/monitoring/services/{serviceId}/test` - Test service connection
- `POST /api/monitoring/services/{serviceId}/reset` - Reset service metrics
- `POST /api/monitoring/services` - Register new service
- `DELETE /api/monitoring/services/{serviceId}` - Unregister service

#### 5. MonitoringInterceptor
- **Automatic Logging**: Intercepts all API calls
- **Performance Tracking**: Measures response times
- **Error Detection**: Captures exceptions and errors
- **Service Identification**: Maps endpoints to services

### Frontend Components

#### 1. MonitoringService (Frontend)
```javascript
class MonitoringService {
    async getAllServices()
    async getServiceHealth(serviceId)
    async getApiLogs(limit, serviceId, severity)
    async getSystemMetrics()
    async testServiceConnection(serviceId)
    async resetServiceMetrics(serviceId)
    async registerService(serviceData)
    async unregisterService(serviceId)
    async exportLogs(format)
}
```

#### 2. Admin Component Updates
- **Real-time Data**: Integrates with monitoring APIs
- **Interactive UI**: All buttons now have real functionality
- **Error Handling**: Comprehensive error handling and display
- **Service Management**: Add/remove services through UI

## API Endpoints

### Monitoring Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/monitoring/services` | Get all monitored services | ADMIN |
| GET | `/api/monitoring/services/{serviceId}` | Get specific service health | ADMIN |
| GET | `/api/monitoring/logs` | Get API logs with filters | ADMIN |
| GET | `/api/monitoring/metrics` | Get system metrics | ADMIN |
| POST | `/api/monitoring/services/{serviceId}/test` | Test service connection | ADMIN |
| POST | `/api/monitoring/services/{serviceId}/reset` | Reset service metrics | ADMIN |
| POST | `/api/monitoring/services` | Register new service | ADMIN |
| DELETE | `/api/monitoring/services/{serviceId}` | Unregister service | ADMIN |
| POST | `/api/monitoring/logs` | Log API call | None |
| GET | `/api/monitoring/health` | System health check | None |

### Health Check Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | General health check |
| GET | `/api/health/ready` | Readiness probe |
| GET | `/api/health/live` | Liveness probe |

## Usage Examples

### 1. Register a New Service
```bash
curl -X POST http://localhost:8080/api/monitoring/services \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <admin-token>" \
  -d '{
    "serviceId": "PAYMENT_SERVICE",
    "serviceName": "Payment Processing Service",
    "endpoint": "/api/v1/payments",
    "provider": "Internal",
    "version": "2.1.0",
    "environment": "production"
  }'
```

### 2. Test Service Connection
```bash
curl -X POST http://localhost:8080/api/monitoring/services/PAYMENT_SERVICE/test \
  -H "Authorization: Bearer <admin-token>"
```

### 3. Get Service Logs
```bash
curl -X GET "http://localhost:8080/api/monitoring/logs?serviceId=PAYMENT_SERVICE&limit=100" \
  -H "Authorization: Bearer <admin-token>"
```

### 4. Export Logs
```bash
curl -X POST "http://localhost:8080/api/monitoring/export?format=json" \
  -H "Authorization: Bearer <admin-token>"
```

## Adding New Services

### 1. Automatic Detection
The system automatically detects and monitors services based on endpoint patterns:
- `/api/v1/funds/*` → FUND_SERVICE
- `/api/v1/transactions/*` → TRANSACTION_SERVICE
- `/api/v1/customers/*` → CUSTOMER_SERVICE
- `/api/v1/reconciliation/*` → RECONCILIATION_SERVICE
- `/api/v1/reports/*` → REPORTING_SERVICE

### 2. Manual Registration
Add new services through the UI or API:

1. **Via UI**: Click "Add Service" button in Admin → API Monitoring
2. **Via API**: Use the registration endpoint
3. **Auto-monitoring**: The interceptor will automatically start logging calls

### 3. Health Check Implementation
For new services, implement health check endpoints:
```java
@RestController
@RequestMapping("/api/health")
public class ServiceHealthController {
    
    @GetMapping
    public ResponseEntity<Map<String, Object>> health() {
        Map<String, Object> health = new HashMap<>();
        health.put("status", "UP");
        health.put("timestamp", LocalDateTime.now());
        health.put("service", "Your Service Name");
        health.put("version", "1.0.0");
        return ResponseEntity.ok(health);
    }
}
```

## Configuration

### Health Check Settings
```java
// In MonitoringService.java
private static final int HEALTH_CHECK_INTERVAL = 30000; // 30 seconds
private static final int TIMEOUT_THRESHOLD = 5000; // 5 seconds
private static final double ERROR_RATE_THRESHOLD = 5.0; // 5%
private static final double UPTIME_THRESHOLD = 95.0; // 95%
```

### Log Retention
- **API Logs**: Last 1000 logs kept in memory
- **Service Metrics**: Rolling averages maintained
- **Health History**: Last check time tracked

## Security

### Authentication
- All monitoring endpoints require ADMIN role
- JWT token validation
- Role-based access control

### Data Protection
- Sensitive data not logged
- IP address anonymization available
- Audit trail for admin actions

## Troubleshooting

### Common Issues

1. **Service Not Appearing**
   - Check if service is registered
   - Verify endpoint mapping in interceptor
   - Ensure health check endpoint exists

2. **Health Check Failures**
   - Verify service is running
   - Check network connectivity
   - Review health check endpoint implementation

3. **Logs Not Appearing**
   - Check interceptor configuration
   - Verify monitoring service is running
   - Review endpoint exclusions

### Debug Mode
Enable debug logging in `application.properties`:
```properties
logging.level.com.bny.jwt.service.MonitoringService=DEBUG
logging.level.com.bny.jwt.config.MonitoringInterceptor=DEBUG
```

## Future Enhancements

### Planned Features
1. **Alerting System**: Email/SMS notifications for service failures
2. **Dashboard Widgets**: Customizable monitoring dashboards
3. **Historical Data**: Long-term metrics storage
4. **Performance Baselines**: Automated performance analysis
5. **Service Dependencies**: Dependency mapping and impact analysis
6. **Integration**: Prometheus, Grafana, and other monitoring tools

### Extensibility Points
1. **Custom Health Checks**: Service-specific health check implementations
2. **External Integrations**: Third-party monitoring service integration
3. **Custom Metrics**: Service-specific metric collection
4. **Alert Rules**: Configurable alerting rules and thresholds

## Support

For questions or issues with the monitoring system:
1. Check the application logs
2. Review the health check endpoints
3. Verify service registration
4. Test API connectivity manually

The monitoring system is designed to be robust and self-healing, providing comprehensive visibility into your microservices architecture while maintaining minimal overhead. 