# Transfer Agency Hub - Full Stack Application

A comprehensive financial management platform built with Spring Boot backend and React frontend, featuring JWT authentication, role-based access control, and modern UI/UX.

## Features

### Backend (Spring Boot)
- **JWT Token Authentication**: Secure authentication using JSON Web Tokens
- **Role-based Access Control**: Support for USER, ADMIN, and SERVER roles
- **Stateless Security**: Complete stateless authentication system
- **H2 Database**: In-memory database for development and testing
- **Password Encryption**: BCrypt password hashing
- **Token Validation**: Robust token validation and error handling

### Frontend (React)
- **Modern React UI**: Built with React 18 and React Router
- **Responsive Design**: Mobile-first responsive design
- **Role-based Navigation**: Dynamic menu based on user roles
- **JWT Integration**: Seamless integration with backend authentication
- **Dashboard**: Comprehensive dashboard with stats and activity feeds
- **Multi-section Interface**: Investor, Transaction, Fund, and Admin management

## Default Users

The application creates the following test users on startup:

- **Username**: `user`, **Password**: `password`, **Role**: USER
- **Username**: `admin`, **Password**: `admin`, **Roles**: ADMIN, USER  
- **Username**: `server`, **Password**: `server`, **Role**: SERVER

## Quick Start

### Option 1: Run Full Stack Application (Recommended)
```bash
# Build frontend and start backend
run-full-stack.bat
```

### Option 2: Manual Setup

#### Frontend Setup
```bash
# Navigate to frontend directory
cd src/main/resources/frontend

# Install dependencies
npm install

# Build for production
npm run build

# Copy build files to Spring Boot static resources
xcopy "build\*" "..\static\" /e /i
```

#### Backend Setup
```bash
# Run Spring Boot application
mvn clean spring-boot:run
```

### Access the Application
- **Web Interface**: http://localhost:8080
- **Login Page**: http://localhost:8080/login
- **Dashboard**: http://localhost:8080/dashboard
- **API Base**: http://localhost:8080/api

## API Endpoints

### Authentication Endpoints

#### User Login
```http
POST /api/auth/signin
Content-Type: application/json

{
    "username": "user",
    "password": "password"
}
```

#### Generate Server Token
```http
POST /api/auth/server-token
Content-Type: application/json

{
    "serverName": "service-a",
    "roles": ["SERVER"]
}
```

#### Validate Token
```http
GET /api/auth/validate
Authorization: Bearer <token>
```

### Protected Endpoints

#### User Access (USER or ADMIN role required)
```http
GET /api/protected/user
Authorization: Bearer <token>
```

#### Admin Dashboard (ADMIN role required)
```http
GET /api/admin/dashboard
Authorization: Bearer <token>
```

#### Server Status (SERVER role required)
```http
GET /api/server/status
Authorization: Bearer <token>
```

#### Public Endpoint (No Authentication)
```http
GET /api/public/hello
```

#### User Protected Endpoint
```http
GET /api/protected/user
Authorization: Bearer <your-jwt-token>
```

#### Admin Only Endpoint  
```http
GET /api/admin/dashboard
Authorization: Bearer <admin-jwt-token>
```

#### Server-to-Server Endpoint
```http
GET /api/server/status
Authorization: Bearer <server-jwt-token>
```

#### Post Data from Server
```http
POST /api/server/data
Authorization: Bearer <server-jwt-token>
Content-Type: application/json

{
    "message": "Hello from server",
    "timestamp": 1234567890
}
```

#### Current User Info
```http
GET /api/current-user
Authorization: Bearer <your-jwt-token>
```

## JWT Token Structure

The JWT tokens contain the following claims:
- `sub`: Username or server name
- `roles`: List of user/server roles
- `type`: "server" for server tokens (optional)
- `iat`: Issued at timestamp
- `exp`: Expiration timestamp

## Server-to-Server Authentication Flow

1. **Get Server Token**: Call `/api/auth/server-token` with server credentials
2. **Use Token**: Include token in Authorization header as `Bearer <token>`
3. **Access Protected Resources**: Server endpoints validate the token and roles

## Example Usage

### 1. Login as User
```bash
curl -X POST http://localhost:8080/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"username":"user","password":"password"}'
```

### 2. Use Token to Access Protected Endpoint
```bash
curl -X GET http://localhost:8080/api/protected/user \
  -H "Authorization: Bearer <your-token-here>"
```

### 3. Generate Server Token
```bash
curl -X POST http://localhost:8080/api/auth/server-token \
  -H "Content-Type: application/json" \
  -d '{"serverName":"service-a","roles":["SERVER"]}'
```

### 4. Server-to-Server Communication
```bash
curl -X GET http://localhost:8080/api/server/status \
  -H "Authorization: Bearer <server-token-here>"
```

## Security Configuration

- **CSRF**: Disabled (stateless JWT authentication)
- **Session Management**: Stateless
- **Password Encoding**: BCrypt
- **JWT Secret**: Configured in `application.properties`
- **Token Expiration**: 24 hours by default

## Database

Uses H2 in-memory database for demonstration. Access H2 console at:
- URL: http://localhost:8080/h2-console
- JDBC URL: jdbc:h2:mem:testdb
- Username: sa
- Password: password

## Running the Application

1. Build and run:
```bash
mvn spring-boot:run
```

2. The application starts on port 8080
3. Test the endpoints using the examples above

## Architecture Components

- **JwtUtil**: Handles JWT token generation, validation, and parsing
- **JwtAuthenticationFilter**: Intercepts requests and validates JWT tokens
- **SecurityConfig**: Spring Security configuration with JWT support
- **UserDetailsService**: Loads user details for authentication
- **AuthController**: Handles login and token generation endpoints
- **TestController**: Demonstrates protected endpoints with role-based access

## Error Handling

The system handles various JWT-related errors:
- Invalid token signature
- Expired tokens  
- Malformed tokens
- Missing tokens
- Insufficient privileges
