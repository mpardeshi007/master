# 🔐 Transfer Agency Dashboard - Login Guide

## 👤 **Available Users for Login**

The backend automatically creates these users when you first start the application:

### **1. Regular User** 👨‍💼
- **Username:** `user`
- **Password:** `password`
- **Roles:** USER
- **Access:** Standard dashboard access

### **2. Admin User** 👨‍💻
- **Username:** `admin` 
- **Password:** `admin`
- **Roles:** ADMIN, USER
- **Access:** Full administrative access + dashboard

### **3. Server User** 🖥️
- **Username:** `server`
- **Password:** `server`  
- **Roles:** SERVER
- **Access:** Server-to-server communication

## 🚀 **How to Login**

### **Step 1: Ensure Backend is Running**
Make sure your Spring Boot backend is running on port 8080:
```bash
# Run this in the main project directory
mvn spring-boot:run
# OR
java -jar target/jwt-authentication-0.0.1-SNAPSHOT.jar
# OR
./start.bat
```

### **Step 2: Access the Frontend**
The React frontend should be running on: **http://localhost:3000**

**Click this link to access your dashboard:** [http://127.0.0.1:56495](http://127.0.0.1:56495)

### **Step 3: Login Process**
1. **Open the frontend URL** in your browser
2. **You'll see the login page** with username and password fields
3. **Enter credentials** from the table above
4. **Click "Sign In"**
5. **You'll be redirected** to the enhanced dashboard

## 🎯 **Recommended Login for Testing**

### **For Regular Dashboard Access:**
```
Username: user
Password: password
```

### **For Admin Features:**
```
Username: admin  
Password: admin
```

## 🔍 **Login Process Details**

### **What Happens When You Login:**
1. **Frontend sends credentials** to `/api/auth/signin`
2. **Backend validates** username/password against database
3. **JWT token generated** with user info and roles
4. **Token stored** in browser localStorage
5. **User redirected** to enhanced dashboard
6. **Dashboard shows** user-specific information

### **Authentication Features:**
✅ **JWT Token Security** - Secure token-based authentication  
✅ **Auto Token Validation** - Tokens validated on each request  
✅ **Auto Logout** - Automatic logout when token expires  
✅ **Protected Routes** - Unauthenticated users redirected to login  
✅ **Role-based Access** - Different permissions for different users  
✅ **Session Management** - Secure session handling  

## 🛠️ **Troubleshooting Login Issues**

### **Issue: "Connection refused" or "Network Error"**
**Solution:** Make sure backend is running on port 8080
```bash
# Check if backend is running
curl http://localhost:8080/api/auth/signin
```

### **Issue: "Invalid credentials" error**
**Solution:** Double-check username and password:
- `user` / `password` (case-sensitive)
- `admin` / `admin` (case-sensitive)

### **Issue: Login page keeps loading**
**Solution:** 
1. Refresh the page (Ctrl+F5)
2. Clear browser cache
3. Check browser console for errors (F12)

### **Issue: Dashboard not showing after login**
**Solution:**
1. Check that JWT token was received
2. Look for any console errors
3. Verify backend `/api/auth/validate` endpoint is working

## 📊 **After Successful Login**

### **What You'll See:**
✅ **Enhanced Dashboard** with comprehensive visual analytics  
✅ **Navigation Menu** with all Transfer Agency modules  
✅ **User Info** displayed in top navigation bar  
✅ **Interactive Charts** for all business metrics  
✅ **Professional UI** with modern design  

### **Available Modules:**
- 📋 **Investor Management** - Comprehensive investor analytics
- 💰 **Transaction Processing** - Real-time transaction insights
- 🏦 **Fund Administration** - Fund performance metrics
- 💵 **Dividend Management** - Dividend tracking and yields
- 📊 **Reports & Compliance** - Regulatory compliance monitoring
- ⚖️ **Reconciliation** - Financial reconciliation accuracy

## 🔐 **Security Notes**

### **Password Information:**
- Passwords are **BCrypt encrypted** in the database
- **JWT tokens expire** automatically for security
- **CORS enabled** for frontend-backend communication
- **Protected endpoints** require valid authentication

### **Token Management:**
- Tokens stored securely in **localStorage**
- **Automatic validation** on app startup
- **Logout clears all tokens**
- **Re-login required** when tokens expire

## 🎉 **Quick Start**

**Ready to login? Use these credentials:**

```
👤 Username: user
🔑 Password: password
```

**Then access:** [http://127.0.0.1:56495](http://127.0.0.1:56495)

Your enhanced Transfer Agency Dashboard with JWT authentication is ready to use! 🚀
