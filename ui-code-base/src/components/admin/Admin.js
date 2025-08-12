import React, { useState } from 'react';
import { 
  FaCog, FaUsers, FaUserShield, FaKey, FaLock, FaUnlock,
  FaEdit, FaTrash, FaPlus, FaSearch, FaFilter, FaDownload,
  FaEye, FaEyeSlash, FaSave, FaUndo, FaCheckCircle, FaTimes,
  FaExclamationTriangle, FaInfo, FaClock, FaDatabase, FaServer,
  FaChartLine, FaWifi, FaWifiSlash, FaSync, FaBell, FaFlag,
  FaCode, FaFileAlt, FaPrint, FaCalendarAlt, FaArrowUp, FaArrowDown,
  FaShieldAlt, FaGlobe, FaBuilding, FaBan, FaPlay, FaPause,
  FaHistory, FaExchangeAlt, FaDollarSign, FaPercentage, FaClipboard,
  FaToggleOn, FaToggleOff, FaWarehouse, FaNetworkWired, FaUserCheck,
  FaUser
} from 'react-icons/fa';
import './Admin.css';

const Admin = () => {
  const [currentView, setCurrentView] = useState('user-management'); // user-management, system-settings, api-monitoring
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [isAddingUser, setIsAddingUser] = useState(false);

  // Mock users data
  const [users, setUsers] = useState([
    {
      id: 'USR001',
      name: 'John Smith',
      email: 'john.smith@company.com',
      role: 'admin',
      department: 'IT Administration',
      status: 'active',
      lastLogin: '2024-02-15T10:30:00Z',
      createdDate: '2024-01-15T09:00:00Z',
      permissions: ['user_management', 'system_settings', 'reports', 'transactions'],
      twoFactorEnabled: true,
      loginAttempts: 0,
      ipAddress: '192.168.1.45'
    },
    {
      id: 'USR002',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@company.com',
      role: 'manager',
      department: 'Operations',
      status: 'active',
      lastLogin: '2024-02-15T08:15:00Z',
      createdDate: '2024-01-20T10:30:00Z',
      permissions: ['transactions', 'reports', 'reconciliation'],
      twoFactorEnabled: true,
      loginAttempts: 0,
      ipAddress: '192.168.1.67'
    },
    {
      id: 'USR003',
      name: 'Mike Johnson',
      email: 'mike.johnson@company.com',
      role: 'operator',
      department: 'Customer Service',
      status: 'inactive',
      lastLogin: '2024-02-10T16:45:00Z',
      createdDate: '2024-01-25T14:15:00Z',
      permissions: ['transactions', 'customer_view'],
      twoFactorEnabled: false,
      loginAttempts: 3,
      ipAddress: '192.168.1.89'
    }
  ]);

  // Mock system settings data
  const [systemSettings, setSystemSettings] = useState({
    general: {
      systemName: 'Transfer Agency Hub',
      timezone: 'UTC-5',
      dateFormat: 'MM/DD/YYYY',
      currency: 'USD',
      sessionTimeout: 30,
      maintenanceMode: false
    },
    security: {
      passwordPolicy: {
        minLength: 8,
        requireUppercase: true,
        requireLowercase: true,
        requireNumbers: true,
        requireSpecialChars: true,
        expirationDays: 90
      },
      twoFactorRequired: true,
      maxLoginAttempts: 3,
      lockoutDuration: 15,
      ipWhitelist: ['192.168.1.0/24', '10.0.0.0/8']
    },
    transactions: {
      dailyLimits: {
        purchase: 1000000,
        redemption: 500000,
        transfer: 250000
      },
      autoApprovalThreshold: 10000,
      settlementDays: 3,
      cutoffTime: '15:00',
      holidayProcessing: false
    },
    funds: {
      defaultNAVSource: 'primary',
      priceValidationEnabled: true,
      maxPriceDeviation: 5.0,
      autoRebalancing: true,
      rebalanceThreshold: 2.0
    }
  });

  // Mock API monitoring data
  const [apiEndpoints] = useState([
    {
      id: 'API001',
      name: 'Fund Price Service',
      endpoint: '/api/v1/funds/prices',
      status: 'healthy',
      responseTime: 145,
      uptime: 99.8,
      lastCheck: '2024-02-15T11:45:00Z',
      requestsToday: 1247,
      errorRate: 0.2,
      provider: 'MarketData Corp'
    },
    {
      id: 'API002',
      name: 'Bank Integration',
      endpoint: '/api/v1/bank/transactions',
      status: 'warning',
      responseTime: 2340,
      uptime: 98.5,
      lastCheck: '2024-02-15T11:44:00Z',
      requestsToday: 856,
      errorRate: 1.5,
      provider: 'BankConnect API'
    },
    {
      id: 'API003',
      name: 'KYC Verification',
      endpoint: '/api/v1/kyc/verify',
      status: 'error',
      responseTime: 0,
      uptime: 87.3,
      lastCheck: '2024-02-15T11:30:00Z',
      requestsToday: 234,
      errorRate: 12.7,
      provider: 'IdentityCheck Inc'
    },
    {
      id: 'API004',
      name: 'Regulatory Reporting',
      endpoint: '/api/v1/reports/regulatory',
      status: 'healthy',
      responseTime: 567,
      uptime: 99.9,
      lastCheck: '2024-02-15T11:45:00Z',
      requestsToday: 145,
      errorRate: 0.1,
      provider: 'RegTech Solutions'
    }
  ]);

  const [apiLogs] = useState([
    {
      id: 'LOG001',
      timestamp: '2024-02-15T11:45:23Z',
      endpoint: '/api/v1/kyc/verify',
      method: 'POST',
      statusCode: 500,
      responseTime: 0,
      error: 'Connection timeout to external service',
      userAgent: 'TrustAgent/1.0',
      ipAddress: '192.168.1.45',
      severity: 'error'
    },
    {
      id: 'LOG002',
      timestamp: '2024-02-15T11:44:15Z',
      endpoint: '/api/v1/bank/transactions',
      method: 'GET',
      statusCode: 200,
      responseTime: 2340,
      error: null,
      userAgent: 'BankConnector/2.1',
      ipAddress: '10.0.0.15',
      severity: 'warning'
    },
    {
      id: 'LOG003',
      timestamp: '2024-02-15T11:43:07Z',
      endpoint: '/api/v1/funds/prices',
      method: 'GET',
      statusCode: 200,
      responseTime: 145,
      error: null,
      userAgent: 'PriceUpdater/1.5',
      ipAddress: '192.168.1.67',
      severity: 'info'
    }
  ]);

  // Helper functions
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
      case 'healthy':
        return <FaCheckCircle className="status-icon success" />;
      case 'inactive':
      case 'warning':
        return <FaExclamationTriangle className="status-icon warning" />;
      case 'error':
      case 'suspended':
        return <FaTimes className="status-icon danger" />;
      default:
        return <FaInfo className="status-icon info" />;
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin':
        return <FaUserShield className="role-icon admin" />;
      case 'manager':
        return <FaUsers className="role-icon manager" />;
      case 'operator':
        return <FaUser className="role-icon operator" />;
      default:
        return <FaUser className="role-icon" />;
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'error':
        return <FaTimes className="severity-icon error" />;
      case 'warning':
        return <FaExclamationTriangle className="severity-icon warning" />;
      case 'info':
        return <FaInfo className="severity-icon info" />;
      default:
        return <FaInfo className="severity-icon" />;
    }
  };

  const handleSettingChange = (category, setting, value) => {
    setSystemSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));
  };

  const renderUserManagement = () => {
    const filteredUsers = users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = filterRole === 'all' || user.role === filterRole;
      const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
      return matchesSearch && matchesRole && matchesStatus;
    });

    return (
      <div className="admin-section">
        <div className="section-header">
          <h2><FaUsers /> User Management</h2>
          <p>Manage user accounts, roles, and permissions</p>
        </div>

        <div className="admin-controls">
          <div className="search-box">
            <FaSearch />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="control-buttons">
            <select 
              value={filterRole} 
              onChange={(e) => setFilterRole(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="operator">Operator</option>
            </select>

            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>

            <button 
              className="btn btn-primary"
              onClick={() => setIsAddingUser(true)}
            >
              <FaPlus /> Add User
            </button>
          </div>
        </div>

        <div className="users-stats">
          <div className="stat-card">
            <div className="stat-value">{users.filter(u => u.status === 'active').length}</div>
            <div className="stat-label">Active Users</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{users.filter(u => u.role === 'admin').length}</div>
            <div className="stat-label">Administrators</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{users.filter(u => u.twoFactorEnabled).length}</div>
            <div className="stat-label">2FA Enabled</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{users.filter(u => u.loginAttempts > 0).length}</div>
            <div className="stat-label">Failed Logins</div>
          </div>
        </div>

        <div className="users-table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Department</th>
                <th>Status</th>
                <th>Last Login</th>
                <th>2FA</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id}>
                  <td>
                    <div className="user-info">
                      <div className="user-avatar">
                        {getRoleIcon(user.role)}
                      </div>
                      <div className="user-details">
                        <div className="user-name">{user.name}</div>
                        <div className="user-email">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`role-badge ${user.role}`}>
                      {user.role.toUpperCase()}
                    </span>
                  </td>
                  <td>{user.department}</td>
                  <td>
                    <div className="status-cell">
                      {getStatusIcon(user.status)}
                      <span className={`status-badge ${user.status}`}>
                        {user.status.toUpperCase()}
                      </span>
                    </div>
                  </td>
                  <td>{formatDate(user.lastLogin)}</td>
                  <td>
                    <div className="two-factor-status">
                      {user.twoFactorEnabled ? (
                        <FaLock className="enabled" />
                      ) : (
                        <FaUnlock className="disabled" />
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-icon" title="View Details">
                        <FaEye />
                      </button>
                      <button className="btn-icon" title="Edit User">
                        <FaEdit />
                      </button>
                      <button className="btn-icon danger" title="Delete User">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderSystemSettings = () => {
    return (
      <div className="admin-section">
        <div className="section-header">
          <h2><FaCog /> System Settings</h2>
          <p>Configure system parameters and business rules</p>
        </div>

        <div className="settings-container">
          {/* General Settings */}
          <div className="settings-section">
            <h3><FaBuilding /> General Settings</h3>
            <div className="settings-grid">
              <div className="setting-item">
                <label className="setting-label">System Name</label>
                <input
                  type="text"
                  value={systemSettings.general.systemName}
                  onChange={(e) => handleSettingChange('general', 'systemName', e.target.value)}
                  className="setting-input"
                />
              </div>
              <div className="setting-item">
                <label className="setting-label">Timezone</label>
                <select
                  value={systemSettings.general.timezone}
                  onChange={(e) => handleSettingChange('general', 'timezone', e.target.value)}
                  className="setting-select"
                >
                  <option value="UTC-5">EST (UTC-5)</option>
                  <option value="UTC-6">CST (UTC-6)</option>
                  <option value="UTC-7">MST (UTC-7)</option>
                  <option value="UTC-8">PST (UTC-8)</option>
                </select>
              </div>
              <div className="setting-item">
                <label className="setting-label">Date Format</label>
                <select
                  value={systemSettings.general.dateFormat}
                  onChange={(e) => handleSettingChange('general', 'dateFormat', e.target.value)}
                  className="setting-select"
                >
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>
              <div className="setting-item">
                <label className="setting-label">Session Timeout (minutes)</label>
                <input
                  type="number"
                  value={systemSettings.general.sessionTimeout}
                  onChange={(e) => handleSettingChange('general', 'sessionTimeout', parseInt(e.target.value))}
                  className="setting-input"
                  min="5"
                  max="480"
                />
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="settings-section">
            <h3><FaShieldAlt /> Security Settings</h3>
            <div className="settings-grid">
              <div className="setting-item">
                <label className="setting-label">Two-Factor Authentication Required</label>
                <button 
                  className={`toggle-btn ${systemSettings.security.twoFactorRequired ? 'active' : ''}`}
                  onClick={() => handleSettingChange('security', 'twoFactorRequired', !systemSettings.security.twoFactorRequired)}
                >
                  {systemSettings.security.twoFactorRequired ? <FaToggleOn /> : <FaToggleOff />}
                </button>
              </div>
              <div className="setting-item">
                <label className="setting-label">Max Login Attempts</label>
                <input
                  type="number"
                  value={systemSettings.security.maxLoginAttempts}
                  onChange={(e) => handleSettingChange('security', 'maxLoginAttempts', parseInt(e.target.value))}
                  className="setting-input"
                  min="1"
                  max="10"
                />
              </div>
              <div className="setting-item">
                <label className="setting-label">Lockout Duration (minutes)</label>
                <input
                  type="number"
                  value={systemSettings.security.lockoutDuration}
                  onChange={(e) => handleSettingChange('security', 'lockoutDuration', parseInt(e.target.value))}
                  className="setting-input"
                  min="5"
                  max="60"
                />
              </div>
              <div className="setting-item">
                <label className="setting-label">Password Min Length</label>
                <input
                  type="number"
                  value={systemSettings.security.passwordPolicy.minLength}
                  onChange={(e) => handleSettingChange('security', 'passwordPolicy', {
                    ...systemSettings.security.passwordPolicy,
                    minLength: parseInt(e.target.value)
                  })}
                  className="setting-input"
                  min="6"
                  max="20"
                />
              </div>
            </div>
          </div>

          {/* Transaction Settings */}
          <div className="settings-section">
            <h3><FaExchangeAlt /> Transaction Settings</h3>
            <div className="settings-grid">
              <div className="setting-item">
                <label className="setting-label">Daily Purchase Limit</label>
                <input
                  type="number"
                  value={systemSettings.transactions.dailyLimits.purchase}
                  onChange={(e) => handleSettingChange('transactions', 'dailyLimits', {
                    ...systemSettings.transactions.dailyLimits,
                    purchase: parseInt(e.target.value)
                  })}
                  className="setting-input"
                />
              </div>
              <div className="setting-item">
                <label className="setting-label">Daily Redemption Limit</label>
                <input
                  type="number"
                  value={systemSettings.transactions.dailyLimits.redemption}
                  onChange={(e) => handleSettingChange('transactions', 'dailyLimits', {
                    ...systemSettings.transactions.dailyLimits,
                    redemption: parseInt(e.target.value)
                  })}
                  className="setting-input"
                />
              </div>
              <div className="setting-item">
                <label className="setting-label">Auto-Approval Threshold</label>
                <input
                  type="number"
                  value={systemSettings.transactions.autoApprovalThreshold}
                  onChange={(e) => handleSettingChange('transactions', 'autoApprovalThreshold', parseInt(e.target.value))}
                  className="setting-input"
                />
              </div>
              <div className="setting-item">
                <label className="setting-label">Settlement Days</label>
                <input
                  type="number"
                  value={systemSettings.transactions.settlementDays}
                  onChange={(e) => handleSettingChange('transactions', 'settlementDays', parseInt(e.target.value))}
                  className="setting-input"
                  min="1"
                  max="7"
                />
              </div>
            </div>
          </div>

          {/* Fund Settings */}
          <div className="settings-section">
            <h3><FaDollarSign /> Fund Settings</h3>
            <div className="settings-grid">
              <div className="setting-item">
                <label className="setting-label">Price Validation Enabled</label>
                <button 
                  className={`toggle-btn ${systemSettings.funds.priceValidationEnabled ? 'active' : ''}`}
                  onClick={() => handleSettingChange('funds', 'priceValidationEnabled', !systemSettings.funds.priceValidationEnabled)}
                >
                  {systemSettings.funds.priceValidationEnabled ? <FaToggleOn /> : <FaToggleOff />}
                </button>
              </div>
              <div className="setting-item">
                <label className="setting-label">Max Price Deviation (%)</label>
                <input
                  type="number"
                  value={systemSettings.funds.maxPriceDeviation}
                  onChange={(e) => handleSettingChange('funds', 'maxPriceDeviation', parseFloat(e.target.value))}
                  className="setting-input"
                  step="0.1"
                  min="0"
                  max="10"
                />
              </div>
              <div className="setting-item">
                <label className="setting-label">Auto Rebalancing</label>
                <button 
                  className={`toggle-btn ${systemSettings.funds.autoRebalancing ? 'active' : ''}`}
                  onClick={() => handleSettingChange('funds', 'autoRebalancing', !systemSettings.funds.autoRebalancing)}
                >
                  {systemSettings.funds.autoRebalancing ? <FaToggleOn /> : <FaToggleOff />}
                </button>
              </div>
              <div className="setting-item">
                <label className="setting-label">Rebalance Threshold (%)</label>
                <input
                  type="number"
                  value={systemSettings.funds.rebalanceThreshold}
                  onChange={(e) => handleSettingChange('funds', 'rebalanceThreshold', parseFloat(e.target.value))}
                  className="setting-input"
                  step="0.1"
                  min="0.5"
                  max="5"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="settings-actions">
          <button className="btn btn-secondary">
            <FaUndo /> Reset to Defaults
          </button>
          <button className="btn btn-primary">
            <FaSave /> Save Settings
          </button>
        </div>
      </div>
    );
  };

  const renderAPIMonitoring = () => {
    return (
      <div className="admin-section">
        <div className="section-header">
          <h2><FaNetworkWired /> API Monitoring</h2>
          <p>Monitor integration health, performance, and error tracking</p>
        </div>

        <div className="api-stats">
          <div className="stat-card healthy">
            <div className="stat-value">{apiEndpoints.filter(api => api.status === 'healthy').length}</div>
            <div className="stat-label">Healthy APIs</div>
          </div>
          <div className="stat-card warning">
            <div className="stat-value">{apiEndpoints.filter(api => api.status === 'warning').length}</div>
            <div className="stat-label">Warning Status</div>
          </div>
          <div className="stat-card error">
            <div className="stat-value">{apiEndpoints.filter(api => api.status === 'error').length}</div>
            <div className="stat-label">Error Status</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">
              {(apiEndpoints.reduce((sum, api) => sum + api.responseTime, 0) / apiEndpoints.length).toFixed(0)}ms
            </div>
            <div className="stat-label">Avg Response Time</div>
          </div>
        </div>

        <div className="api-endpoints-grid">
          {apiEndpoints.map(api => (
            <div key={api.id} className={`api-card ${api.status}`}>
              <div className="api-header">
                <div className="api-name">
                  <h4>{api.name}</h4>
                  <span className="api-endpoint">{api.endpoint}</span>
                </div>
                <div className="api-status">
                  {getStatusIcon(api.status)}
                  <span className={`status-text ${api.status}`}>
                    {api.status.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="api-metrics">
                <div className="metric-item">
                  <div className="metric-label">Response Time</div>
                  <div className={`metric-value ${api.responseTime > 1000 ? 'warning' : 'good'}`}>
                    {api.responseTime}ms
                  </div>
                </div>
                <div className="metric-item">
                  <div className="metric-label">Uptime</div>
                  <div className={`metric-value ${api.uptime < 95 ? 'warning' : 'good'}`}>
                    {api.uptime}%
                  </div>
                </div>
                <div className="metric-item">
                  <div className="metric-label">Requests Today</div>
                  <div className="metric-value">{api.requestsToday.toLocaleString()}</div>
                </div>
                <div className="metric-item">
                  <div className="metric-label">Error Rate</div>
                  <div className={`metric-value ${api.errorRate > 5 ? 'error' : api.errorRate > 1 ? 'warning' : 'good'}`}>
                    {api.errorRate}%
                  </div>
                </div>
              </div>

              <div className="api-meta">
                <div className="meta-item">
                  <span className="meta-label">Provider:</span>
                  <span className="meta-value">{api.provider}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Last Check:</span>
                  <span className="meta-value">{formatDate(api.lastCheck)}</span>
                </div>
              </div>

              <div className="api-actions">
                <button className="btn btn-secondary">
                  <FaEye /> View Logs
                </button>
                <button className="btn btn-primary">
                  <FaSync /> Test Connection
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="api-logs-section">
          <h3><FaHistory /> Recent API Logs</h3>
          <div className="logs-table-container">
            <table className="logs-table">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Endpoint</th>
                  <th>Method</th>
                  <th>Status</th>
                  <th>Response Time</th>
                  <th>Error</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {apiLogs.map(log => (
                  <tr key={log.id} className={log.severity}>
                    <td>{formatDate(log.timestamp)}</td>
                    <td>
                      <div className="endpoint-cell">
                        <div className="endpoint-path">{log.endpoint}</div>
                        <div className="endpoint-ip">{log.ipAddress}</div>
                      </div>
                    </td>
                    <td>
                      <span className={`method-badge ${log.method.toLowerCase()}`}>
                        {log.method}
                      </span>
                    </td>
                    <td>
                      <div className="status-cell">
                        {getSeverityIcon(log.severity)}
                        <span className={`status-code ${log.statusCode >= 400 ? 'error' : 'success'}`}>
                          {log.statusCode}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className={`response-time ${log.responseTime > 1000 ? 'slow' : 'fast'}`}>
                        {log.responseTime}ms
                      </span>
                    </td>
                    <td>
                      <div className="error-cell">
                        {log.error ? (
                          <span className="error-message">{log.error}</span>
                        ) : (
                          <span className="no-error">-</span>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn-icon" title="View Details">
                          <FaEye />
                        </button>
                        <button className="btn-icon" title="Download Log">
                          <FaDownload />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div className="header-left">
          <h1>Admin Settings</h1>
          <p>System administration, user management, and monitoring</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-secondary">
            <FaSync /> Refresh Data
          </button>
          <button className="btn btn-secondary">
            <FaDownload /> Export Logs
          </button>
          <button className="btn btn-primary">
            <FaBell /> System Health
          </button>
        </div>
      </div>

      <div className="admin-navigation">
        <button 
          className={`nav-tab ${currentView === 'user-management' ? 'active' : ''}`}
          onClick={() => setCurrentView('user-management')}
        >
          <FaUsers /> User Management
        </button>
        <button 
          className={`nav-tab ${currentView === 'system-settings' ? 'active' : ''}`}
          onClick={() => setCurrentView('system-settings')}
        >
          <FaCog /> System Settings
        </button>
        <button 
          className={`nav-tab ${currentView === 'api-monitoring' ? 'active' : ''}`}
          onClick={() => setCurrentView('api-monitoring')}
        >
          <FaNetworkWired /> API Monitoring
        </button>
      </div>

      <div className="admin-content">
        {currentView === 'user-management' && renderUserManagement()}
        {currentView === 'system-settings' && renderSystemSettings()}
        {currentView === 'api-monitoring' && renderAPIMonitoring()}
      </div>
    </div>
  );
};

export default Admin; 