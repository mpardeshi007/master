# Bank Transfer Agency - React Application

A comprehensive bank transfer agency management system built with React, featuring a secure login system and a feature-rich dashboard for managing investments, transactions, and financial operations.

## Features

### 🔐 Login Screen
- **User Authentication**: Username and password validation
- **Security Features**: 
  - Captcha verification (mathematical challenge)
  - Password visibility toggle
  - Remember me functionality
- **Multi-language Support**: Language selector with 5 languages
- **Password Recovery**: Forgot password functionality
- **Form Validation**: Real-time validation with error messages

### 📊 Dashboard
- **Top Navigation Bar**:
  - Company logo and branding
  - User profile dropdown with logout and settings
  - Notification system with badge counter
  - Help center access

- **Sidebar Navigation**:
  - Dashboard (default view)
  - Investors Management
  - Transactions
  - Funds
  - Reports
  - Reconciliation
  - Compliance
  - Admin Settings

- **Dashboard Content**:
  - **Key Performance Indicators (KPIs)**:
    - Total Fund Under Management ($2.4B)
    - Active Investors (1,234)
    - Transaction Success Rate (98.7%)
    - Average Processing Time (2.3 min)
    - And more financial metrics
  
  - **Interactive Charts**:
    - Fund performance trends (Line chart)
    - Transaction volume analysis
    - Investor activity distribution (Pie chart)
  
  - **Recent Activities**: Real-time activity feed
  - **Quick Actions**: One-click access to common tasks

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone or download the project files**
2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **Open your browser** and navigate to `http://localhost:3000`

### Login Credentials
For demonstration purposes, you can use any username and password combination that meets the validation requirements:
- Username: Any non-empty string
- Password: Minimum 6 characters
- Don't forget to check the captcha verification!

## 🛠️ Technologies Used

- **React 18**: Modern React with hooks
- **React Router DOM**: Client-side routing
- **Recharts**: Interactive chart library
- **React Icons**: Comprehensive icon library
- **CSS3**: Custom styling with responsive design
- **Modern JavaScript (ES6+)**: Latest JavaScript features

## 📱 Responsive Design

The application is fully responsive and works seamlessly across:
- Desktop computers (1200px+)
- Tablets (768px - 1024px)
- Mobile phones (320px - 768px)

## 🎨 Design Features

- **Modern UI/UX**: Clean, professional interface
- **Gradient Backgrounds**: Beautiful color schemes
- **Interactive Elements**: Hover effects and animations
- **Accessibility**: Keyboard navigation and screen reader support
- **Dark/Light Theming**: Professional color palette

## 📊 Dashboard Metrics

The dashboard displays realistic financial metrics including:
- Fund management statistics
- Transaction processing data
- Investor activity analytics
- Compliance and regulatory information
- Performance trending over time

## 🔧 Available Scripts

In the project directory, you can run:

- `npm start`: Runs the app in development mode
- `npm build`: Builds the app for production
- `npm test`: Launches the test runner
- `npm eject`: Ejects from Create React App (not recommended)

## 🔒 Security Features

- Client-side form validation
- Captcha verification system
- Session management
- Secure routing with authentication guards
- Input sanitization

## 📖 Project Structure

```
src/
├── components/
│   ├── Login.js          # Login component
│   ├── Login.css         # Login styles
│   ├── Dashboard.js      # Main dashboard
│   ├── Dashboard.css     # Dashboard styles
│   ├── TopNavigation.js  # Top navigation bar
│   ├── Sidebar.js        # Sidebar navigation
│   └── DashboardContent.js # Dashboard content
├── App.js                # Main app component
├── App.css              # App styles
├── index.js             # Entry point
└── index.css            # Global styles
```

## 🌟 Future Enhancements

- Backend API integration
- Real-time data updates
- Advanced user roles and permissions
- Email notifications
- Export functionality for reports
- Advanced charting and analytics
- Mobile app version

## 🐛 Troubleshooting

If you encounter any issues:

1. **Clear browser cache** and reload
2. **Check console** for any error messages
3. **Verify Node.js version** (should be 14+)
4. **Reinstall dependencies**: `rm -rf node_modules && npm install`

## 📞 Support

For technical support or questions about the application, please refer to the help section in the top navigation bar or contact the development team.

---

**Built with ❤️ using React** 