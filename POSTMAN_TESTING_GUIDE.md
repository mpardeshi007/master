# JWT Authentication System - Postman Testing Guide

## 📁 Files Created

- **JWT-Authentication-Postman-Collection.json** - Main collection with all API endpoints and tests
- **JWT-Authentication-Postman-Environment.json** - Environment variables for tokens and base URL
- **This Guide** - Step-by-step testing instructions

## 🚀 Quick Setup Instructions

### 1. Import Collection and Environment

1. **Open Postman**
2. **Import Collection:**
   - Click "Import" button
   - Select `JWT-Authentication-Postman-Collection.json`
   - Click "Import"

3. **Import Environment:**
   - Click "Import" button  
   - Select `JWT-Authentication-Postman-Environment.json`
   - Click "Import"

4. **Select Environment:**
   - In top-right dropdown, select "JWT Authentication Environment"

### 2. Verify Server is Running

Ensure your Spring Boot application is running on `http://localhost:8080`

## 📋 Test Execution Order

### **Phase 1: Authentication Tests**

#### ✅ **Step 1: User Login - Regular User**
- **Purpose**: Login as regular user and get JWT token
- **Expected**: Status 200, token saved to `userToken` environment variable
- **Test Verifications**:
  - Response contains `accessToken`
  - Username is `user`
  - Roles include `ROLE_USER`

#### ✅ **Step 2: Admin Login**
- **Purpose**: Login as admin user and get JWT token with elevated privileges
- **Expected**: Status 200, token saved to `adminToken` environment variable
- **Test Verifications**:
  - Response contains `accessToken`
  - Username is `admin`
  - Roles include both `ROLE_ADMIN` and `ROLE_USER`

#### ✅ **Step 3: Generate Server Token**
- **Purpose**: Create JWT token for server-to-server communication
- **Expected**: Status 200, token saved to `serverToken` environment variable
- **Test Verifications**:
  - Server name is `service-a`
  - Roles include `SERVER`
  - Token type is `Bearer`

### **Phase 2: Public Access Tests**

#### ✅ **Step 4: Public Hello Endpoint**
- **Purpose**: Verify public endpoints work without authentication
- **Expected**: Status 200, accessible without any token
- **Test Verifications**:
  - Response contains "public endpoint" message
  - No authorization required

### **Phase 3: User Role Tests**

#### ✅ **Step 5: User Protected Endpoint**
- **Purpose**: Test user can access user-level protected endpoints
- **Prerequisites**: Requires `userToken` from Step 1
- **Expected**: Status 200, personalized response
- **Test Verifications**:
  - Message includes "Hello user"
  - Username is `user`

#### ✅ **Step 6: Current User Info**
- **Purpose**: Retrieve current user information from JWT
- **Prerequisites**: Requires `userToken` from Step 1
- **Expected**: Status 200, user details returned
- **Test Verifications**:
  - Username is `user`
  - Authenticated is `true`

#### ❌ **Step 7: Access Denied - User tries Admin Endpoint**
- **Purpose**: Verify role-based access control (should fail)
- **Prerequisites**: Requires `userToken` from Step 1
- **Expected**: Status 403 Forbidden
- **Test Verifications**:
  - User cannot access admin endpoints
  - Proper error handling

### **Phase 4: Admin Role Tests**

#### ✅ **Step 8: Admin Dashboard**
- **Purpose**: Test admin can access admin-only endpoints
- **Prerequisites**: Requires `adminToken` from Step 2
- **Expected**: Status 200, admin dashboard access
- **Test Verifications**:
  - Message includes "Admin Dashboard"
  - Username is `admin`

### **Phase 5: Server-to-Server Tests**

#### ✅ **Step 9: Server Status Endpoint**
- **Purpose**: Test server-to-server communication
- **Prerequisites**: Requires `serverToken` from Step 3
- **Expected**: Status 200, server status information
- **Test Verifications**:
  - Message includes "Server-to-Server communication successful"
  - Server name is `service-a`
  - Timestamp is provided

#### ✅ **Step 10: Server Data Post**
- **Purpose**: Test server can POST data to protected endpoint
- **Prerequisites**: Requires `serverToken` from Step 3
- **Expected**: Status 200, data processed successfully
- **Test Verifications**:
  - Data received confirmation
  - Posted data is echoed back
  - Processing timestamp provided

#### ❌ **Step 11: Unauthorized Access to Server Endpoint**
- **Purpose**: Verify user token cannot access server endpoints
- **Prerequisites**: Requires `userToken` from Step 1
- **Expected**: Status 403 Forbidden
- **Test Verifications**:
  - User token rejected for server endpoint
  - Proper security enforcement

### **Phase 6: Security Tests**

#### ❌ **Step 12: Access Without Token**
- **Purpose**: Verify protected endpoints require authentication
- **Expected**: Status 401 Unauthorized
- **Test Verifications**:
  - No token = no access
  - Proper 401 response

#### ❌ **Step 13: Access With Invalid Token**
- **Purpose**: Verify invalid tokens are rejected
- **Expected**: Status 401 Unauthorized
- **Test Verifications**:
  - Invalid tokens are rejected
  - Proper error handling

## 🔄 Running All Tests

### Option 1: Run Individual Tests
- Execute each request manually in the order specified above
- Check test results in the "Test Results" tab after each request

### Option 2: Run Collection (Automated)
1. Click on the collection name "JWT Authentication System - BNY Team Project"
2. Click "Run" button
3. Select all requests
4. Click "Run JWT Authentication System - BNY Team Project"
5. Watch automated test execution

## ✅ Expected Test Results Summary

| Test Phase | Total Tests | Should Pass | Should Fail |
|------------|-------------|-------------|-------------|
| Authentication | 4 tests | 3 ✅ | 1 ❌ |
| Public Access | 1 test | 1 ✅ | 0 ❌ |
| User Role | 3 tests | 2 ✅ | 1 ❌ |
| Admin Role | 1 test | 1 ✅ | 0 ❌ |
| Server-to-Server | 3 tests | 2 ✅ | 1 ❌ |
| Security | 2 tests | 0 ✅ | 2 ❌ |
| **TOTAL** | **14 tests** | **9 ✅** | **5 ❌** |

*Note: The "Should Fail" tests are intentional security checks that verify proper access control.*

## 🔧 Troubleshooting

### Common Issues:

1. **Server Not Running**
   - Error: Connection refused
   - Solution: Start Spring Boot application on port 8080

2. **Token Expired**
   - Error: 401 Unauthorized after some time
   - Solution: Re-run login requests to get fresh tokens

3. **Environment Variables Not Set**
   - Error: Tests failing due to missing tokens
   - Solution: Ensure environment is selected and login tests run first

4. **Wrong Environment Selected**
   - Error: baseUrl not found
   - Solution: Select "JWT Authentication Environment" in top-right dropdown

## 📊 Test Coverage

The collection covers:

- ✅ **User Authentication**: Login with credentials
- ✅ **Token Generation**: JWT creation and validation  
- ✅ **Role-Based Access**: USER, ADMIN, SERVER role verification
- ✅ **Server-to-Server**: Inter-service communication
- ✅ **Security Controls**: Unauthorized access prevention
- ✅ **Error Handling**: Proper HTTP status codes
- ✅ **Token Management**: Automatic token storage and reuse

## 🎯 Success Criteria

All tests should complete with:
- 9 successful authentications (✅)
- 5 proper access denials (❌)
- Proper HTTP status codes
- Correct response formats
- Token persistence across requests

Happy Testing! 🚀
