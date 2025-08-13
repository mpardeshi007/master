# Testing the Monitoring System

## Prerequisites

1. **Backend Running**: Ensure the Spring Boot application is running on port 8080
2. **Frontend Running**: Ensure the React application is running on port 3000
3. **Admin Access**: Login with admin credentials (username: `admin`, password: `admin`)

## Step-by-Step Testing

### 1. Start the Backend
```bash
# In the project root directory
mvn clean spring-boot:run
```

### 2. Start the Frontend
```bash
# In the ui-code-base directory
npm start
```

### 3. Login as Admin
- Navigate to http://localhost:3000
- Login with username: `admin`, password: `password`
- Navigate to Admin → API Monitoring

### 4. Generate Real Data
Run the data generation script to create real monitoring data:

```bash
# Option 1: Using Node.js directly
node generate-monitoring-data.js

# Option 2: Using the batch file (Windows)
generate-data.bat
```

### 5. Verify Real Data is Displayed

#### Expected Results:
- **Services Section**: Should show 5 default services (FUND_SERVICE, TRANSACTION_SERVICE, etc.)
- **API Logs**: Should show recent API calls with real timestamps
- **System Metrics**: Should show actual counts and averages
- **All Buttons**: Should be functional and perform real actions

#### What You Should See:

1. **Service Cards** with real data:
   - Service names and endpoints
   - Real response times
   - Actual uptime percentages
   - Real error rates
   - Last check timestamps

2. **API Logs Table** with real entries:
   - Recent API calls with timestamps
   - Real IP addresses
   - Actual response times
   - Real status codes
   - Error messages (if any)

3. **Functional Buttons**:
   - **Refresh Data**: Updates with latest data
   - **Export Logs**: Downloads real log data
   - **Add Service**: Opens modal to register new services
   - **View Logs**: Shows service-specific logs
   - **Test Connection**: Actually tests service connectivity
   - **Reset**: Resets real service metrics
   - **Remove Service**: Removes services from monitoring

### 6. Test Button Functionality

#### Test Connection Button:
1. Click "Test Connection" on any service
2. Should see the service status update
3. Response time should change
4. Last check time should update

#### Add Service Button:
1. Click "Add Service"
2. Fill in service details:
   - Service ID: `TEST_SERVICE`
   - Service Name: `Test Microservice`
   - Endpoint: `/api/v1/test`
   - Provider: `Internal`
   - Version: `1.0.0`
3. Click "Add Service"
4. Should see the new service appear in the list

#### View Logs Button:
1. Click "View Logs" on any service
2. Should filter logs to show only that service's logs
3. Logs should have real timestamps and data

#### Export Logs Button:
1. Click "Export Logs"
2. Should download a JSON file with real log data
3. File should contain actual API call records

#### Reset Button:
1. Click "Reset" on any service
2. Service metrics should reset to zero
3. Request count should go back to 0

### 7. Verify Real-time Updates

1. **Auto-refresh**: Data should update every 30 seconds
2. **Manual refresh**: Click "Refresh Data" to see immediate updates
3. **Real metrics**: Numbers should reflect actual system activity

### 8. Test Error Handling

#### Backend Not Running:
1. Stop the Spring Boot application
2. Refresh the monitoring page
3. Should see error message: "Backend server is not running"
4. Should show empty state instead of dummy data

#### Network Errors:
1. Disconnect network
2. Should see appropriate error messages
3. Should not show fallback/dummy data

## Troubleshooting

### No Data Showing:
1. **Check Backend**: Ensure Spring Boot is running on port 8080
2. **Check Console**: Look for JavaScript errors in browser console
3. **Check Network**: Verify API calls are reaching the backend
4. **Generate Data**: Run the data generation script

### Buttons Not Working:
1. **Check Authentication**: Ensure you're logged in as admin
2. **Check Console**: Look for JavaScript errors
3. **Check Network**: Verify API calls are successful
4. **Check Permissions**: Ensure user has ADMIN role

### Dummy Data Still Showing:
1. **Clear Browser Cache**: Hard refresh the page (Ctrl+F5)
2. **Check API Responses**: Verify backend is returning real data
3. **Check Fallback Logic**: Ensure fallback data is removed
4. **Restart Applications**: Restart both frontend and backend

## Expected Real Data Examples

### Service Health Data:
```json
{
  "serviceId": "FUND_SERVICE",
  "serviceName": "Fund Management Service",
  "endpoint": "/api/v1/funds",
  "status": "healthy",
  "responseTime": 145,
  "uptime": 99.8,
  "lastCheck": "2024-02-15T11:45:00Z",
  "requestsToday": 1247,
  "errorRate": 0.2,
  "provider": "Internal"
}
```

### API Log Data:
```json
{
  "logId": "LOG001",
  "timestamp": "2024-02-15T11:45:23Z",
  "endpoint": "/api/v1/funds/prices",
  "method": "GET",
  "statusCode": 200,
  "responseTime": 145,
  "error": null,
  "userAgent": "Mozilla/5.0...",
  "ipAddress": "192.168.1.45",
  "severity": "info",
  "serviceId": "FUND_SERVICE"
}
```

## Success Criteria

✅ **Real Data Displayed**: No dummy/fallback data visible
✅ **All Buttons Functional**: Every button performs real actions
✅ **Real-time Updates**: Data updates automatically
✅ **Error Handling**: Proper error messages for failures
✅ **Service Management**: Can add/remove services
✅ **Log Export**: Can download real log data
✅ **Performance Metrics**: Shows actual response times and error rates

If all criteria are met, the monitoring system is working correctly with real data! 