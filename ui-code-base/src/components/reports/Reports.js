import React, { useState } from 'react';
import { 
  FaFileAlt, FaDownload, FaSearch, FaFilter, FaCalendarAlt,
  FaExclamationTriangle, FaCheckCircle, FaClock, FaEye, FaPrint,
  FaShieldAlt, FaUserCheck, FaBan, FaFlag, FaHistory, FaEdit,
  FaUsers, FaDollarSign, FaExchangeAlt, FaBuilding, FaGlobe,
  FaLock, FaUnlock, FaBell, FaChartLine, FaTimes, FaInfo,
  FaSort, FaArrowUp, FaArrowDown, FaPlay, FaPause, FaTrash,
  FaPlus, FaSync, FaDatabase, FaCog, FaClipboardCheck,
  FaExclamationCircle, FaTimesCircle, FaWarehouse, FaKey
} from 'react-icons/fa';
import './Reports.css';

const Reports = () => {
  const [currentView, setCurrentView] = useState('regulatory'); // regulatory, audit, alerts
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('last30');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedAlert, setSelectedAlert] = useState(null);

  // Mock regulatory reports data
  const [regulatoryReports] = useState([
    {
      id: 'REG001',
      type: 'FATCA',
      title: 'Foreign Account Tax Compliance Act Report',
      status: 'generated',
      dueDate: '2024-03-31',
      generatedDate: '2024-02-28',
      period: 'Q1 2024',
      totalAccounts: 1245,
      reportableAccounts: 23,
      compliance: 98.5,
      fileSize: '2.4 MB',
      submissionStatus: 'submitted'
    },
    {
      id: 'REG002',
      type: 'AML',
      title: 'Anti-Money Laundering Compliance Report',
      status: 'pending',
      dueDate: '2024-02-15',
      generatedDate: null,
      period: 'January 2024',
      totalTransactions: 15678,
      flaggedTransactions: 45,
      compliance: 99.7,
      fileSize: null,
      submissionStatus: 'pending'
    },
    {
      id: 'REG003',
      type: 'KYC',
      title: 'Know Your Customer Status Report',
      status: 'generated',
      dueDate: '2024-02-28',
      generatedDate: '2024-02-25',
      period: 'February 2024',
      totalCustomers: 8945,
      compliantCustomers: 8890,
      compliance: 99.4,
      fileSize: '1.8 MB',
      submissionStatus: 'submitted'
    },
    {
      id: 'REG004',
      type: 'FATCA',
      title: 'FATCA Quarterly Filing Report',
      status: 'overdue',
      dueDate: '2024-01-31',
      generatedDate: null,
      period: 'Q4 2023',
      totalAccounts: 1198,
      reportableAccounts: 18,
      compliance: 95.2,
      fileSize: null,
      submissionStatus: 'overdue'
    }
  ]);

  // Mock audit logs data
  const [auditLogs] = useState([
    {
      id: 'AUDIT001',
      timestamp: '2024-02-15T10:30:45Z',
      userId: 'admin@company.com',
      userName: 'John Smith',
      action: 'user_created',
      entity: 'User Account',
      entityId: 'USR-1024',
      details: 'Created new investor account for Jane Doe',
      ipAddress: '192.168.1.45',
      severity: 'info',
      module: 'User Management',
      changes: {
        before: null,
        after: {
          name: 'Jane Doe',
          email: 'jane.doe@email.com',
          status: 'active'
        }
      }
    },
    {
      id: 'AUDIT002',
      timestamp: '2024-02-15T09:15:22Z',
      userId: 'manager@company.com',
      userName: 'Sarah Wilson',
      action: 'transaction_modified',
      entity: 'Transaction',
      entityId: 'TXN-5678',
      details: 'Modified transaction amount from $10,000 to $12,500',
      ipAddress: '192.168.1.67',
      severity: 'warning',
      module: 'Transaction Management',
      changes: {
        before: { amount: 10000, status: 'pending' },
        after: { amount: 12500, status: 'pending' }
      }
    },
    {
      id: 'AUDIT003',
      timestamp: '2024-02-15T08:45:10Z',
      userId: 'system@company.com',
      userName: 'System',
      action: 'data_export',
      entity: 'Report',
      entityId: 'RPT-AML-202402',
      details: 'Exported AML compliance report',
      ipAddress: '127.0.0.1',
      severity: 'info',
      module: 'Reporting',
      changes: {
        before: null,
        after: { exported: true, format: 'PDF' }
      }
    },
    {
      id: 'AUDIT004',
      timestamp: '2024-02-14T16:20:33Z',
      userId: 'compliance@company.com',
      userName: 'Mike Johnson',
      action: 'kyc_status_updated',
      entity: 'Customer',
      entityId: 'CUST-9876',
      details: 'Updated KYC status from pending to verified',
      ipAddress: '192.168.1.89',
      severity: 'info',
      module: 'Compliance',
      changes: {
        before: { kycStatus: 'pending' },
        after: { kycStatus: 'verified' }
      }
    },
    {
      id: 'AUDIT005',
      timestamp: '2024-02-14T14:55:18Z',
      userId: 'admin@company.com',
      userName: 'John Smith',
      action: 'system_settings_changed',
      entity: 'System Configuration',
      entityId: 'CFG-SECURITY',
      details: 'Modified security settings - enabled 2FA requirement',
      ipAddress: '192.168.1.45',
      severity: 'critical',
      module: 'System Administration',
      changes: {
        before: { require2FA: false },
        after: { require2FA: true }
      }
    }
  ]);

  // Mock alerts and exceptions data
  const [alerts] = useState([
    {
      id: 'ALERT001',
      type: 'suspicious_transaction',
      severity: 'high',
      title: 'Large Cash Transaction Alert',
      description: 'Transaction exceeds threshold limit of $10,000',
      status: 'open',
      createdDate: '2024-02-15T11:30:00Z',
      assignedTo: 'compliance@company.com',
      relatedEntity: 'TXN-7890',
      amount: 15000,
      customer: 'Robert Johnson',
      customerId: 'CUST-4567',
      flag: 'Large Amount',
      riskScore: 85,
      autoResolved: false
    },
    {
      id: 'ALERT002',
      type: 'compliance_flag',
      severity: 'medium',
      title: 'KYC Documentation Expired',
      description: 'Customer KYC documents have expired and require renewal',
      status: 'in_progress',
      createdDate: '2024-02-14T09:15:00Z',
      assignedTo: 'kyc@company.com',
      relatedEntity: 'CUST-1234',
      amount: null,
      customer: 'Alice Brown',
      customerId: 'CUST-1234',
      flag: 'Expired Documents',
      riskScore: 65,
      autoResolved: false
    },
    {
      id: 'ALERT003',
      type: 'aml_violation',
      severity: 'critical',
      title: 'Multiple Rapid Transactions',
      description: 'Customer performed 15+ transactions within 24 hours',
      status: 'open',
      createdDate: '2024-02-15T15:45:00Z',
      assignedTo: 'aml@company.com',
      relatedEntity: 'CUST-5678',
      amount: 45000,
      customer: 'David Chen',
      customerId: 'CUST-5678',
      flag: 'Rapid Transactions',
      riskScore: 95,
      autoResolved: false
    },
    {
      id: 'ALERT004',
      type: 'system_anomaly',
      severity: 'low',
      title: 'Unusual Login Pattern',
      description: 'User logged in from new geographic location',
      status: 'resolved',
      createdDate: '2024-02-13T20:30:00Z',
      assignedTo: 'security@company.com',
      relatedEntity: 'USR-3456',
      amount: null,
      customer: 'Emily Davis',
      customerId: 'USR-3456',
      flag: 'Geographic Anomaly',
      riskScore: 35,
      autoResolved: true,
      resolvedDate: '2024-02-14T08:00:00Z'
    },
    {
      id: 'ALERT005',
      type: 'regulatory_deadline',
      severity: 'medium',
      title: 'FATCA Report Due Soon',
      description: 'FATCA quarterly report due in 3 days',
      status: 'open',
      createdDate: '2024-02-12T10:00:00Z',
      assignedTo: 'regulatory@company.com',
      relatedEntity: 'REG-FATCA-Q1',
      amount: null,
      customer: null,
      customerId: null,
      flag: 'Regulatory Deadline',
      riskScore: 70,
      autoResolved: false
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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'generated':
      case 'submitted':
      case 'resolved':
        return <FaCheckCircle className="status-icon success" />;
      case 'pending':
      case 'in_progress':
        return <FaClock className="status-icon warning" />;
      case 'overdue':
      case 'open':
        return <FaExclamationTriangle className="status-icon danger" />;
      default:
        return <FaInfo className="status-icon info" />;
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical':
        return <FaExclamationCircle className="severity-icon critical" />;
      case 'high':
        return <FaExclamationTriangle className="severity-icon high" />;
      case 'medium':
        return <FaFlag className="severity-icon medium" />;
      case 'low':
        return <FaInfo className="severity-icon low" />;
      case 'warning':
        return <FaExclamationTriangle className="severity-icon warning" />;
      default:
        return <FaInfo className="severity-icon info" />;
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'FATCA':
        return <FaGlobe />;
      case 'AML':
        return <FaShieldAlt />;
      case 'KYC':
        return <FaUserCheck />;
      case 'user_created':
      case 'kyc_status_updated':
        return <FaUsers />;
      case 'transaction_modified':
        return <FaExchangeAlt />;
      case 'data_export':
        return <FaDownload />;
      case 'system_settings_changed':
        return <FaCog />;
      case 'suspicious_transaction':
        return <FaDollarSign />;
      case 'compliance_flag':
        return <FaFlag />;
      case 'aml_violation':
        return <FaBan />;
      case 'system_anomaly':
        return <FaExclamationTriangle />;
      case 'regulatory_deadline':
        return <FaCalendarAlt />;
      default:
        return <FaFileAlt />;
    }
  };

  const filterData = (data, type) => {
    let filtered = data;

    if (searchTerm) {
      filtered = filtered.filter(item => {
        const searchText = searchTerm.toLowerCase();
        if (type === 'regulatory') {
          return item.title.toLowerCase().includes(searchText) ||
                 item.type.toLowerCase().includes(searchText) ||
                 item.period.toLowerCase().includes(searchText);
        } else if (type === 'audit') {
          return item.action.toLowerCase().includes(searchText) ||
                 item.userName.toLowerCase().includes(searchText) ||
                 item.details.toLowerCase().includes(searchText) ||
                 item.module.toLowerCase().includes(searchText);
        } else if (type === 'alerts') {
          return item.title.toLowerCase().includes(searchText) ||
                 item.description.toLowerCase().includes(searchText) ||
                 (item.customer && item.customer.toLowerCase().includes(searchText)) ||
                 item.type.toLowerCase().includes(searchText);
        }
        return true;
      });
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(item => item.status === filterStatus);
    }

    if (filterType !== 'all') {
      filtered = filtered.filter(item => item.type === filterType);
    }

    return filtered;
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const renderRegulatoryReports = () => {
    const filteredReports = filterData(regulatoryReports, 'regulatory');

    return (
      <div className="reports-section">
        <div className="section-header">
          <h2><FaClipboardCheck /> Regulatory Reports</h2>
          <p>FATCA, AML, and KYC compliance reporting</p>
        </div>

        <div className="reports-stats">
          <div className="stat-card">
            <div className="stat-value">{regulatoryReports.filter(r => r.status === 'generated').length}</div>
            <div className="stat-label">Generated Reports</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{regulatoryReports.filter(r => r.status === 'pending').length}</div>
            <div className="stat-label">Pending Reports</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{regulatoryReports.filter(r => r.status === 'overdue').length}</div>
            <div className="stat-label">Overdue Reports</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">
              {(regulatoryReports.reduce((sum, r) => sum + r.compliance, 0) / regulatoryReports.length).toFixed(1)}%
            </div>
            <div className="stat-label">Avg Compliance</div>
          </div>
        </div>

        <div className="reports-table-container">
          <table className="reports-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Report Title</th>
                <th>Period</th>
                <th>Status</th>
                <th>Due Date</th>
                <th>Compliance</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map(report => (
                <tr key={report.id}>
                  <td>
                    <div className="report-type">
                      {getTypeIcon(report.type)}
                      <span className={`type-badge ${report.type.toLowerCase()}`}>
                        {report.type}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="report-title">
                      <div className="title">{report.title}</div>
                      <div className="report-id">{report.id}</div>
                    </div>
                  </td>
                  <td>{report.period}</td>
                  <td>
                    <div className="status-cell">
                      {getStatusIcon(report.status)}
                      <span className={`status-badge ${report.status}`}>
                        {report.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                  </td>
                  <td>{formatDate(report.dueDate)}</td>
                  <td>
                    <div className="compliance-score">
                      <div className="score-value">{report.compliance}%</div>
                      <div className={`score-bar ${report.compliance >= 95 ? 'good' : report.compliance >= 90 ? 'medium' : 'low'}`}>
                        <div className="score-fill" style={{ width: `${report.compliance}%` }}></div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-icon" title="View Report">
                        <FaEye />
                      </button>
                      <button className="btn-icon" title="Download">
                        <FaDownload />
                      </button>
                      <button className="btn-icon" title="Print">
                        <FaPrint />
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

  const renderAuditLogs = () => {
    const filteredLogs = filterData(auditLogs, 'audit');

    return (
      <div className="reports-section">
        <div className="section-header">
          <h2><FaHistory /> Audit Logs</h2>
          <p>System activity tracking and data change monitoring</p>
        </div>

        <div className="audit-stats">
          <div className="stat-card">
            <div className="stat-value">{auditLogs.length}</div>
            <div className="stat-label">Total Activities</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{auditLogs.filter(log => log.severity === 'critical').length}</div>
            <div className="stat-label">Critical Events</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{new Set(auditLogs.map(log => log.userId)).size}</div>
            <div className="stat-label">Active Users</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{new Set(auditLogs.map(log => log.module)).size}</div>
            <div className="stat-label">Modules Accessed</div>
          </div>
        </div>

        <div className="audit-table-container">
          <table className="audit-table">
            <thead>
              <tr>
                <th onClick={() => handleSort('timestamp')}>
                  Timestamp 
                  {sortBy === 'timestamp' && (
                    sortOrder === 'asc' ? <FaArrowUp /> : <FaArrowDown />
                  )}
                </th>
                <th>User</th>
                <th>Action</th>
                <th>Entity</th>
                <th>Details</th>
                <th>Severity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map(log => (
                <tr key={log.id}>
                  <td>
                    <div className="timestamp">
                      <div className="date">{formatDate(log.timestamp)}</div>
                      <div className="ip">IP: {log.ipAddress}</div>
                    </div>
                  </td>
                  <td>
                    <div className="user-info">
                      <div className="user-name">{log.userName}</div>
                      <div className="user-email">{log.userId}</div>
                    </div>
                  </td>
                  <td>
                    <div className="action-info">
                      {getTypeIcon(log.action)}
                      <span className="action-text">{log.action.replace('_', ' ')}</span>
                    </div>
                  </td>
                  <td>
                    <div className="entity-info">
                      <div className="entity-type">{log.entity}</div>
                      <div className="entity-id">{log.entityId}</div>
                    </div>
                  </td>
                  <td>
                    <div className="details-cell">
                      <div className="details-text">{log.details}</div>
                      <div className="module-tag">{log.module}</div>
                    </div>
                  </td>
                  <td>
                    <div className="severity-cell">
                      {getSeverityIcon(log.severity)}
                      <span className={`severity-badge ${log.severity}`}>
                        {log.severity.toUpperCase()}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-icon" title="View Details">
                        <FaEye />
                      </button>
                      <button className="btn-icon" title="View Changes">
                        <FaEdit />
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

  const renderAlertsExceptions = () => {
    const filteredAlerts = filterData(alerts, 'alerts');

    return (
      <div className="reports-section">
        <div className="section-header">
          <h2><FaBell /> Alerts & Exceptions</h2>
          <p>Suspicious transactions and compliance flag monitoring</p>
        </div>

        <div className="alerts-stats">
          <div className="stat-card critical">
            <div className="stat-value">{alerts.filter(a => a.severity === 'critical' && a.status === 'open').length}</div>
            <div className="stat-label">Critical Alerts</div>
          </div>
          <div className="stat-card high">
            <div className="stat-value">{alerts.filter(a => a.severity === 'high' && a.status === 'open').length}</div>
            <div className="stat-label">High Priority</div>
          </div>
          <div className="stat-card medium">
            <div className="stat-value">{alerts.filter(a => a.status === 'open').length}</div>
            <div className="stat-label">Open Alerts</div>
          </div>
          <div className="stat-card success">
            <div className="stat-value">{alerts.filter(a => a.status === 'resolved').length}</div>
            <div className="stat-label">Resolved Today</div>
          </div>
        </div>

        <div className="alerts-grid">
          {filteredAlerts.map(alert => (
            <div key={alert.id} className={`alert-card ${alert.severity} ${alert.status}`}>
              <div className="alert-header">
                <div className="alert-type">
                  {getTypeIcon(alert.type)}
                  <span className={`type-badge ${alert.type}`}>
                    {alert.type.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
                <div className="alert-severity">
                  {getSeverityIcon(alert.severity)}
                  <span className={`severity-text ${alert.severity}`}>
                    {alert.severity.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="alert-content">
                <h4 className="alert-title">{alert.title}</h4>
                <p className="alert-description">{alert.description}</p>

                <div className="alert-details">
                  {alert.customer && (
                    <div className="detail-item">
                      <FaUsers />
                      <span>Customer: {alert.customer}</span>
                    </div>
                  )}
                  {alert.amount && (
                    <div className="detail-item">
                      <FaDollarSign />
                      <span>Amount: {formatCurrency(alert.amount)}</span>
                    </div>
                  )}
                  <div className="detail-item">
                    <FaFlag />
                    <span>Flag: {alert.flag}</span>
                  </div>
                  <div className="detail-item">
                    <FaChartLine />
                    <span>Risk Score: {alert.riskScore}/100</span>
                  </div>
                </div>

                <div className="alert-meta">
                  <div className="meta-item">
                    <span className="meta-label">Created:</span>
                    <span className="meta-value">{formatDate(alert.createdDate)}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Assigned to:</span>
                    <span className="meta-value">{alert.assignedTo}</span>
                  </div>
                  {alert.resolvedDate && (
                    <div className="meta-item">
                      <span className="meta-label">Resolved:</span>
                      <span className="meta-value">{formatDate(alert.resolvedDate)}</span>
                    </div>
                  )}
                </div>

                <div className="risk-score-bar">
                  <div className="risk-label">Risk Level</div>
                  <div className={`risk-bar ${alert.riskScore >= 80 ? 'high' : alert.riskScore >= 50 ? 'medium' : 'low'}`}>
                    <div className="risk-fill" style={{ width: `${alert.riskScore}%` }}></div>
                  </div>
                  <div className="risk-value">{alert.riskScore}/100</div>
                </div>
              </div>

              <div className="alert-actions">
                <button className="btn btn-secondary">
                  <FaEye /> View Details
                </button>
                {alert.status === 'open' && (
                  <button className="btn btn-primary">
                    <FaCheckCircle /> Resolve
                  </button>
                )}
                {alert.status === 'resolved' && alert.autoResolved && (
                  <span className="auto-resolved">
                    <FaSync /> Auto-Resolved
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="reports-container">
      <div className="reports-header">
        <div className="header-left">
          <h1>Reports & Compliance</h1>
          <p>Regulatory reporting, audit trails, and compliance monitoring</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-secondary">
            <FaSync /> Refresh Data
          </button>
          <button className="btn btn-secondary">
            <FaDownload /> Export All
          </button>
          <button className="btn btn-primary">
            <FaPlus /> Generate Report
          </button>
        </div>
      </div>

      <div className="reports-navigation">
        <button 
          className={`nav-tab ${currentView === 'regulatory' ? 'active' : ''}`}
          onClick={() => setCurrentView('regulatory')}
        >
          <FaClipboardCheck /> Regulatory Reports
        </button>
        <button 
          className={`nav-tab ${currentView === 'audit' ? 'active' : ''}`}
          onClick={() => setCurrentView('audit')}
        >
          <FaHistory /> Audit Logs
        </button>
        <button 
          className={`nav-tab ${currentView === 'alerts' ? 'active' : ''}`}
          onClick={() => setCurrentView('alerts')}
        >
          <FaBell /> Alerts & Exceptions
        </button>
      </div>

      <div className="reports-controls">
        <div className="search-box">
          <FaSearch />
          <input
            type="text"
            placeholder={`Search ${currentView === 'regulatory' ? 'reports' : currentView === 'audit' ? 'audit logs' : 'alerts'}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="control-buttons">
          <select 
            value={selectedPeriod} 
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="period-select"
          >
            <option value="last7">Last 7 days</option>
            <option value="last30">Last 30 days</option>
            <option value="last90">Last 90 days</option>
            <option value="thisYear">This Year</option>
            <option value="all">All Time</option>
          </select>

          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            className="status-select"
          >
            <option value="all">All Status</option>
            {currentView === 'regulatory' && (
              <>
                <option value="generated">Generated</option>
                <option value="pending">Pending</option>
                <option value="overdue">Overdue</option>
                <option value="submitted">Submitted</option>
              </>
            )}
            {currentView === 'alerts' && (
              <>
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </>
            )}
          </select>

          <button 
            className={`btn btn-secondary ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaFilter /> Filters
          </button>
        </div>
      </div>

      <div className="reports-content">
        {currentView === 'regulatory' && renderRegulatoryReports()}
        {currentView === 'audit' && renderAuditLogs()}
        {currentView === 'alerts' && renderAlertsExceptions()}
      </div>
    </div>
  );
};

export default Reports; 