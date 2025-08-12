import React from 'react';
import { 
  FaArrowUp, FaArrowDown, FaUserPlus, FaExchangeAlt, FaFileAlt,
  FaDollarSign, FaUsers, FaClock, FaCheckCircle, FaExclamationTriangle
} from 'react-icons/fa';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const DashboardContent = () => {
  // Mock data for charts
  const performanceData = [
    { month: 'Jan', performance: 65, transactions: 120 },
    { month: 'Feb', performance: 72, transactions: 135 },
    { month: 'Mar', performance: 78, transactions: 149 },
    { month: 'Apr', performance: 83, transactions: 162 },
    { month: 'May', performance: 91, transactions: 178 },
    { month: 'Jun', performance: 87, transactions: 195 }
  ];

  const investorActivityData = [
    { name: 'Active', value: 450, color: '#10b981' },
    { name: 'Inactive', value: 120, color: '#f59e0b' },
    { name: 'Pending', value: 30, color: '#ef4444' }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'transaction',
      description: 'New fund transfer initiated by Investor #1234',
      amount: '$25,000',
      time: '2 minutes ago',
      status: 'pending'
    },
    {
      id: 2,
      type: 'investor',
      description: 'New investor registration completed',
      amount: '',
      time: '15 minutes ago',
      status: 'completed'
    },
    {
      id: 3,
      type: 'report',
      description: 'Monthly compliance report generated',
      amount: '',
      time: '1 hour ago',
      status: 'completed'
    },
    {
      id: 4,
      type: 'transaction',
      description: 'Fund withdrawal processed for Investor #5678',
      amount: '$15,500',
      time: '2 hours ago',
      status: 'completed'
    }
  ];

  const kpiData = [
    {
      title: 'Total Fund Under Management',
      value: '$2.4B',
      change: '+12.5%',
      isPositive: true,
      icon: FaDollarSign
    },
    {
      title: 'Active Investors',
      value: '1,234',
      change: '+8.2%',
      isPositive: true,
      icon: FaUsers
    },
    {
      title: 'Total Transactions Today',
      value: '856',
      change: '+15.3%',
      isPositive: true,
      icon: FaExchangeAlt
    },
    {
      title: 'Transaction Success Rate',
      value: '98.7%',
      change: '-0.3%',
      isPositive: false,
      icon: FaCheckCircle
    },
    {
      title: 'Average Processing Time',
      value: '2.3 min',
      change: '-5.1%',
      isPositive: true,
      icon: FaClock
    },
    {
      title: 'Pending Transactions',
      value: '23',
      change: '+4.2%',
      isPositive: false,
      icon: FaExclamationTriangle
    }
  ];

  const quickActions = [
    { id: 1, title: 'New Investor', icon: FaUserPlus, color: '#3b82f6' },
    { id: 2, title: 'Create Transaction', icon: FaExchangeAlt, color: '#10b981' },
    { id: 3, title: 'Generate Report', icon: FaFileAlt, color: '#f59e0b' }
  ];

  return (
    <div className="dashboard-content-wrapper">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome back! Here's what's happening with your bank transfer agency today.</p>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <div key={index} className="kpi-card card">
              <div className="kpi-content">
                <div className="kpi-header">
                  <div className="kpi-icon">
                    <Icon />
                  </div>
                  <div className={`kpi-change ${kpi.isPositive ? 'positive' : 'negative'}`}>
                    {kpi.isPositive ? <FaArrowUp /> : <FaArrowDown />}
                    {kpi.change}
                  </div>
                </div>
                <div className="kpi-body">
                  <h3 className="kpi-value">{kpi.value}</h3>
                  <p className="kpi-title">{kpi.title}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        <div className="chart-container">
          <div className="chart-card card">
            <div className="chart-header">
              <h3>Fund Performance & Transaction Trends</h3>
              <p>Monthly performance and transaction volume</p>
            </div>
            <div className="chart-content">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="performance" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    name="Performance (%)"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="transactions" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    name="Transactions"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="chart-container">
          <div className="chart-card card">
            <div className="chart-header">
              <h3>Investor Activity Distribution</h3>
              <p>Current investor status breakdown</p>
            </div>
            <div className="chart-content">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={investorActivityData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {investorActivityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="pie-legend">
                {investorActivityData.map((item, index) => (
                  <div key={index} className="legend-item">
                    <div 
                      className="legend-color" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span>{item.name}: {item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bottom-section">
        {/* Recent Activities */}
        <div className="activities-section">
          <div className="activities-card card">
            <div className="card-header">
              <h3>Recent Activities</h3>
              <button className="view-all-btn">View All</button>
            </div>
            <div className="activities-list">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="activity-item">
                  <div className="activity-content">
                    <p className="activity-description">{activity.description}</p>
                    <div className="activity-meta">
                      <span className="activity-time">{activity.time}</span>
                      {activity.amount && (
                        <span className="activity-amount">{activity.amount}</span>
                      )}
                    </div>
                  </div>
                  <div className={`activity-status ${activity.status}`}>
                    {activity.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions-section">
          <div className="quick-actions-card card">
            <div className="card-header">
              <h3>Quick Actions</h3>
            </div>
            <div className="quick-actions-grid">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <button 
                    key={action.id} 
                    className="quick-action-btn"
                    style={{ borderLeft: `4px solid ${action.color}` }}
                  >
                    <div className="action-icon" style={{ color: action.color }}>
                      <Icon />
                    </div>
                    <span className="action-title">{action.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent; 