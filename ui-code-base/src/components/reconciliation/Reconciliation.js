import React, { useState } from 'react';
import { 
  FaBalanceScale, FaSearch, FaFilter, FaDownload, FaUpload,
  FaCheckCircle, FaExclamationTriangle, FaTimes, FaClock,
  FaEye, FaEdit, FaSync, FaFileAlt, FaPrint, FaCalendarAlt,
  FaDollarSign, FaBuilding, FaExchangeAlt, FaFlag, FaPlus,
  FaSort, FaArrowUp, FaArrowDown, FaInfo, FaCog, FaHistory,
  FaChartLine, FaBan, FaUndo, FaSave, FaTrash, FaLock,
  FaUnlock, FaDatabase, FaClipboardCheck, FaUserCheck,
  FaWarehouse, FaKey, FaShieldAlt, FaGlobe, FaBell
} from 'react-icons/fa';
import './Reconciliation.css';

const Reconciliation = () => {
  const [currentView, setCurrentView] = useState('dashboard'); // dashboard, bank-recon, cash-position, exceptions
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // Mock reconciliation data
  const [bankRecords] = useState([
    {
      id: 'BANK001',
      date: '2024-02-15',
      description: 'Wire Transfer - Purchase Settlement',
      debit: 0,
      credit: 125000.00,
      balance: 2875000.00,
      reference: 'WT20240215001',
      status: 'matched',
      taRecord: 'TA-TXN-7890',
      matchedDate: '2024-02-15T10:30:00Z',
      matchedBy: 'system',
      bankAccount: 'Settlement Account ***1234'
    },
    {
      id: 'BANK002',
      date: '2024-02-15',
      description: 'ACH Transfer - Dividend Payment',
      debit: 45000.00,
      credit: 0,
      balance: 2830000.00,
      reference: 'ACH20240215002',
      status: 'unmatched',
      taRecord: null,
      matchedDate: null,
      matchedBy: null,
      bankAccount: 'Dividend Account ***5678'
    },
    {
      id: 'BANK003',
      date: '2024-02-14',
      description: 'Internal Transfer',
      debit: 75000.00,
      credit: 0,
      balance: 2875000.00,
      reference: 'INT20240214003',
      status: 'exception',
      taRecord: 'TA-TXN-7891',
      matchedDate: null,
      matchedBy: null,
      bankAccount: 'Operating Account ***9012',
      exception: 'Amount mismatch: Bank $75,000 vs TA $74,500'
    }
  ]);

  const [taRecords] = useState([
    {
      id: 'TA-TXN-7890',
      date: '2024-02-15',
      description: 'Mutual Fund Purchase - Growth Fund',
      debit: 0,
      credit: 125000.00,
      investor: 'John Smith',
      fundCode: 'GF001',
      status: 'matched',
      bankRecord: 'BANK001',
      matchedDate: '2024-02-15T10:30:00Z',
      settlementDate: '2024-02-17'
    },
    {
      id: 'TA-TXN-7891',
      date: '2024-02-14',
      description: 'Mutual Fund Redemption - Balanced Fund',
      debit: 74500.00,
      credit: 0,
      investor: 'Jane Doe',
      fundCode: 'BF001',
      status: 'exception',
      bankRecord: 'BANK003',
      matchedDate: null,
      settlementDate: '2024-02-16'
    },
    {
      id: 'TA-TXN-7892',
      date: '2024-02-15',
      description: 'Management Fee Collection',
      debit: 0,
      credit: 8500.00,
      investor: null,
      fundCode: 'FEES',
      status: 'unmatched',
      bankRecord: null,
      matchedDate: null,
      settlementDate: '2024-02-15'
    }
  ]);

  const [cashPositions] = useState([
    {
      account: 'Settlement Account ***1234',
      bankBalance: 2875000.00,
      taBalance: 2875000.00,
      difference: 0.00,
      status: 'balanced',
      lastRecon: '2024-02-15T16:00:00Z',
      currency: 'USD'
    },
    {
      account: 'Dividend Account ***5678',
      bankBalance: 450000.00,
      taBalance: 495000.00,
      difference: -45000.00,
      status: 'unmatched',
      lastRecon: '2024-02-15T16:00:00Z',
      currency: 'USD'
    },
    {
      account: 'Operating Account ***9012',
      bankBalance: 125000.00,
      taBalance: 125500.00,
      difference: -500.00,
      status: 'exception',
      lastRecon: '2024-02-15T16:00:00Z',
      currency: 'USD'
    }
  ]);

  const [exceptions] = useState([
    {
      id: 'EXC001',
      type: 'amount_mismatch',
      severity: 'high',
      description: 'Amount difference between bank and TA records',
      bankRecord: 'BANK003',
      taRecord: 'TA-TXN-7891',
      bankAmount: 75000.00,
      taAmount: 74500.00,
      difference: 500.00,
      status: 'open',
      createdDate: '2024-02-14T17:00:00Z',
      assignedTo: 'reconciliation@company.com',
      priority: 'high'
    },
    {
      id: 'EXC002',
      type: 'missing_bank_record',
      severity: 'medium',
      description: 'TA record without corresponding bank transaction',
      bankRecord: null,
      taRecord: 'TA-TXN-7892',
      bankAmount: null,
      taAmount: 8500.00,
      difference: 8500.00,
      status: 'investigating',
      createdDate: '2024-02-15T09:00:00Z',
      assignedTo: 'ops@company.com',
      priority: 'medium'
    },
    {
      id: 'EXC003',
      type: 'missing_ta_record',
      severity: 'medium',
      description: 'Bank record without corresponding TA transaction',
      bankRecord: 'BANK002',
      taRecord: null,
      bankAmount: 45000.00,
      taAmount: null,
      difference: 45000.00,
      status: 'open',
      createdDate: '2024-02-15T11:00:00Z',
      assignedTo: 'reconciliation@company.com',
      priority: 'medium'
    }
  ]);

  // Helper functions
  const formatCurrency = (amount) => {
    if (amount === null || amount === undefined) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString) => {
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
      case 'matched':
      case 'balanced':
        return <FaCheckCircle className="status-icon success" />;
      case 'unmatched':
        return <FaClock className="status-icon warning" />;
      case 'exception':
        return <FaExclamationTriangle className="status-icon danger" />;
      case 'investigating':
        return <FaEye className="status-icon info" />;
      case 'open':
        return <FaFlag className="status-icon danger" />;
      default:
        return <FaInfo className="status-icon info" />;
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'high':
        return <FaExclamationTriangle className="severity-icon high" />;
      case 'medium':
        return <FaFlag className="severity-icon medium" />;
      case 'low':
        return <FaInfo className="severity-icon low" />;
      default:
        return <FaInfo className="severity-icon info" />;
    }
  };

  const calculateStats = () => {
    const totalBankRecords = bankRecords.length;
    const matchedRecords = bankRecords.filter(r => r.status === 'matched').length;
    const unmatchedRecords = bankRecords.filter(r => r.status === 'unmatched').length;
    const exceptionsCount = bankRecords.filter(r => r.status === 'exception').length;
    const matchRate = totalBankRecords > 0 ? (matchedRecords / totalBankRecords * 100).toFixed(1) : 0;

    return {
      totalBankRecords,
      matchedRecords,
      unmatchedRecords,
      exceptionsCount,
      matchRate
    };
  };

  const handleAutoMatch = () => {
    // Simulate auto-matching logic
    console.log('Auto-matching initiated...');
  };

  const handleManualMatch = (bankId, taId) => {
    // Simulate manual matching
    console.log(`Manual match: ${bankId} with ${taId}`);
  };

  const renderDashboard = () => {
    const stats = calculateStats();
    const totalCashDifference = cashPositions.reduce((sum, pos) => sum + Math.abs(pos.difference), 0);

    return (
      <div className="recon-section">
        <div className="section-header">
          <h2><FaBalanceScale /> Reconciliation Dashboard</h2>
          <p>Bank transfer agency reconciliation overview and status</p>
        </div>

        <div className="recon-stats">
          <div className="stat-card matched">
            <div className="stat-icon">
              <FaCheckCircle />
            </div>
            <div className="stat-content">
              <div className="stat-value">{stats.matchedRecords}</div>
              <div className="stat-label">Matched Records</div>
              <div className="stat-change">
                <FaArrowUp /> {stats.matchRate}% Match Rate
              </div>
            </div>
          </div>
          
          <div className="stat-card unmatched">
            <div className="stat-icon">
              <FaClock />
            </div>
            <div className="stat-content">
              <div className="stat-value">{stats.unmatchedRecords}</div>
              <div className="stat-label">Unmatched Records</div>
              <div className="stat-change">Pending Review</div>
            </div>
          </div>
          
          <div className="stat-card exceptions">
            <div className="stat-icon">
              <FaExclamationTriangle />
            </div>
            <div className="stat-content">
              <div className="stat-value">{stats.exceptionsCount}</div>
              <div className="stat-label">Exceptions</div>
              <div className="stat-change">Require Action</div>
            </div>
          </div>
          
          <div className="stat-card difference">
            <div className="stat-icon">
              <FaDollarSign />
            </div>
            <div className="stat-content">
              <div className="stat-value">{formatCurrency(totalCashDifference)}</div>
              <div className="stat-label">Total Differences</div>
              <div className="stat-change">Cash Position</div>
            </div>
          </div>
        </div>

        <div className="dashboard-sections">
          <div className="dashboard-section">
            <h3><FaClock /> Recent Activity</h3>
            <div className="activity-list">
              {[...bankRecords, ...taRecords]
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .slice(0, 5)
                .map(record => (
                  <div key={record.id} className="activity-item">
                    <div className="activity-icon">
                      {getStatusIcon(record.status)}
                    </div>
                    <div className="activity-content">
                      <div className="activity-description">{record.description}</div>
                      <div className="activity-meta">
                        {formatDate(record.date)} • {formatCurrency(record.credit || record.debit)}
                      </div>
                    </div>
                    <div className="activity-status">
                      <span className={`status-badge ${record.status}`}>
                        {record.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="dashboard-section">
            <h3><FaBuilding /> Cash Positions</h3>
            <div className="positions-list">
              {cashPositions.map((position, index) => (
                <div key={index} className="position-item">
                  <div className="position-header">
                    <div className="account-name">{position.account}</div>
                    <div className="position-status">
                      {getStatusIcon(position.status)}
                      <span className={`status-text ${position.status}`}>
                        {position.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="position-amounts">
                    <div className="amount-item">
                      <span className="amount-label">Bank:</span>
                      <span className="amount-value">{formatCurrency(position.bankBalance)}</span>
                    </div>
                    <div className="amount-item">
                      <span className="amount-label">TA:</span>
                      <span className="amount-value">{formatCurrency(position.taBalance)}</span>
                    </div>
                    <div className="amount-item">
                      <span className="amount-label">Diff:</span>
                      <span className={`amount-value ${position.difference < 0 ? 'negative' : position.difference > 0 ? 'positive' : 'neutral'}`}>
                        {formatCurrency(position.difference)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="quick-actions">
          <h3>Quick Actions</h3>
          <div className="quick-actions-grid">
            <button className="quick-action-card" onClick={() => setCurrentView('bank-recon')}>
              <FaSync />
              <span>Run Auto Match</span>
            </button>
            <button className="quick-action-card" onClick={() => setCurrentView('cash-position')}>
              <FaBuilding />
              <span>Cash Positions</span>
            </button>
            <button className="quick-action-card" onClick={() => setCurrentView('exceptions')}>
              <FaExclamationTriangle />
              <span>View Exceptions</span>
            </button>
            <button className="quick-action-card">
              <FaDownload />
              <span>Export Report</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderBankReconciliation = () => {
    return (
      <div className="recon-section">
        <div className="section-header">
          <h2><FaExchangeAlt /> Bank Reconciliation</h2>
          <p>Match bank records with transfer agency transactions</p>
        </div>

        <div className="recon-controls">
          <div className="control-group">
            <button className="btn btn-primary" onClick={handleAutoMatch}>
              <FaSync /> Auto Match
            </button>
            <button className="btn btn-secondary">
              <FaUpload /> Import Bank File
            </button>
            <button className="btn btn-secondary">
              <FaDownload /> Export Unmatched
            </button>
          </div>
        </div>

        <div className="reconciliation-tables">
          <div className="table-section">
            <h3><FaBuilding /> Bank Records</h3>
            <div className="table-container">
              <table className="recon-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Reference</th>
                    <th>Debit</th>
                    <th>Credit</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bankRecords.map(record => (
                    <tr key={record.id} className={record.status}>
                      <td>{formatDate(record.date)}</td>
                      <td>
                        <div className="description-cell">
                          <div className="description-text">{record.description}</div>
                          <div className="account-info">{record.bankAccount}</div>
                        </div>
                      </td>
                      <td className="reference">{record.reference}</td>
                      <td className="amount debit">
                        {record.debit > 0 ? formatCurrency(record.debit) : '-'}
                      </td>
                      <td className="amount credit">
                        {record.credit > 0 ? formatCurrency(record.credit) : '-'}
                      </td>
                      <td>
                        <div className="status-cell">
                          {getStatusIcon(record.status)}
                          <span className={`status-badge ${record.status}`}>
                            {record.status.toUpperCase()}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button className="btn-icon" title="View Details">
                            <FaEye />
                          </button>
                          <button className="btn-icon" title="Manual Match">
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

          <div className="table-section">
            <h3><FaDatabase /> Transfer Agency Records</h3>
            <div className="table-container">
              <table className="recon-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Investor/Fund</th>
                    <th>Debit</th>
                    <th>Credit</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {taRecords.map(record => (
                    <tr key={record.id} className={record.status}>
                      <td>{formatDate(record.date)}</td>
                      <td>{record.description}</td>
                      <td>
                        <div className="investor-cell">
                          <div className="investor-name">{record.investor || 'System'}</div>
                          <div className="fund-code">{record.fundCode}</div>
                        </div>
                      </td>
                      <td className="amount debit">
                        {record.debit > 0 ? formatCurrency(record.debit) : '-'}
                      </td>
                      <td className="amount credit">
                        {record.credit > 0 ? formatCurrency(record.credit) : '-'}
                      </td>
                      <td>
                        <div className="status-cell">
                          {getStatusIcon(record.status)}
                          <span className={`status-badge ${record.status}`}>
                            {record.status.toUpperCase()}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button className="btn-icon" title="View Details">
                            <FaEye />
                          </button>
                          <button className="btn-icon" title="Manual Match">
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
        </div>
      </div>
    );
  };

  const renderCashPosition = () => {
    return (
      <div className="recon-section">
        <div className="section-header">
          <h2><FaDollarSign /> Cash Position</h2>
          <p>Monitor cash balances across all accounts</p>
        </div>

        <div className="cash-positions-grid">
          {cashPositions.map((position, index) => (
            <div key={index} className={`position-card ${position.status}`}>
              <div className="position-header">
                <h4>{position.account}</h4>
                <div className="position-status">
                  {getStatusIcon(position.status)}
                  <span className={`status-text ${position.status}`}>
                    {position.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="position-balances">
                <div className="balance-item">
                  <div className="balance-label">Bank Balance</div>
                  <div className="balance-value bank">{formatCurrency(position.bankBalance)}</div>
                </div>
                <div className="balance-item">
                  <div className="balance-label">TA Balance</div>
                  <div className="balance-value ta">{formatCurrency(position.taBalance)}</div>
                </div>
                <div className="balance-item difference">
                  <div className="balance-label">Difference</div>
                  <div className={`balance-value ${position.difference < 0 ? 'negative' : position.difference > 0 ? 'positive' : 'neutral'}`}>
                    {formatCurrency(position.difference)}
                  </div>
                </div>
              </div>

              <div className="position-meta">
                <div className="meta-item">
                  <span className="meta-label">Last Reconciled:</span>
                  <span className="meta-value">{formatDateTime(position.lastRecon)}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Currency:</span>
                  <span className="meta-value">{position.currency}</span>
                </div>
              </div>

              <div className="position-actions">
                <button className="btn btn-secondary">
                  <FaEye /> View Details
                </button>
                <button className="btn btn-primary">
                  <FaSync /> Reconcile
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderExceptions = () => {
    return (
      <div className="recon-section">
        <div className="section-header">
          <h2><FaExclamationTriangle /> Exceptions</h2>
          <p>Review and resolve reconciliation exceptions</p>
        </div>

        <div className="exceptions-grid">
          {exceptions.map(exception => (
            <div key={exception.id} className={`exception-card ${exception.severity}`}>
              <div className="exception-header">
                <div className="exception-type">
                  {getSeverityIcon(exception.severity)}
                  <span className={`type-badge ${exception.type}`}>
                    {exception.type.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
                <div className="exception-priority">
                  <span className={`priority-badge ${exception.priority}`}>
                    {exception.priority.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="exception-content">
                <h4 className="exception-title">
                  {exception.type === 'amount_mismatch' && 'Amount Mismatch'}
                  {exception.type === 'missing_bank_record' && 'Missing Bank Record'}
                  {exception.type === 'missing_ta_record' && 'Missing TA Record'}
                </h4>
                <p className="exception-description">{exception.description}</p>

                <div className="exception-details">
                  {exception.bankRecord && (
                    <div className="detail-item">
                      <FaBuilding />
                      <span>Bank Record: {exception.bankRecord}</span>
                    </div>
                  )}
                  {exception.taRecord && (
                    <div className="detail-item">
                      <FaDatabase />
                      <span>TA Record: {exception.taRecord}</span>
                    </div>
                  )}
                  <div className="detail-item">
                    <FaDollarSign />
                    <span>Difference: {formatCurrency(Math.abs(exception.difference))}</span>
                  </div>
                </div>

                <div className="exception-amounts">
                  {exception.bankAmount !== null && (
                    <div className="amount-comparison">
                      <div className="amount-item bank">
                        <span className="amount-label">Bank Amount:</span>
                        <span className="amount-value">{formatCurrency(exception.bankAmount)}</span>
                      </div>
                    </div>
                  )}
                  {exception.taAmount !== null && (
                    <div className="amount-comparison">
                      <div className="amount-item ta">
                        <span className="amount-label">TA Amount:</span>
                        <span className="amount-value">{formatCurrency(exception.taAmount)}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="exception-meta">
                  <div className="meta-item">
                    <span className="meta-label">Created:</span>
                    <span className="meta-value">{formatDateTime(exception.createdDate)}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Assigned to:</span>
                    <span className="meta-value">{exception.assignedTo}</span>
                  </div>
                </div>
              </div>

              <div className="exception-actions">
                <button className="btn btn-secondary">
                  <FaEye /> Investigate
                </button>
                <button className="btn btn-primary">
                  <FaCheckCircle /> Resolve
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="reconciliation-container">
      <div className="reconciliation-header">
        <div className="header-left">
          <h1>Reconciliation</h1>
          <p>Bank transfer agency reconciliation and cash position management</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-secondary">
            <FaSync /> Refresh Data
          </button>
          <button className="btn btn-secondary">
            <FaDownload /> Export Report
          </button>
          <button className="btn btn-primary">
            <FaSync /> Run Reconciliation
          </button>
        </div>
      </div>

      <div className="reconciliation-navigation">
        <button 
          className={`nav-tab ${currentView === 'dashboard' ? 'active' : ''}`}
          onClick={() => setCurrentView('dashboard')}
        >
          <FaBalanceScale /> Dashboard
        </button>
        <button 
          className={`nav-tab ${currentView === 'bank-recon' ? 'active' : ''}`}
          onClick={() => setCurrentView('bank-recon')}
        >
          <FaExchangeAlt /> Bank Reconciliation
        </button>
        <button 
          className={`nav-tab ${currentView === 'cash-position' ? 'active' : ''}`}
          onClick={() => setCurrentView('cash-position')}
        >
          <FaDollarSign /> Cash Position
        </button>
        <button 
          className={`nav-tab ${currentView === 'exceptions' ? 'active' : ''}`}
          onClick={() => setCurrentView('exceptions')}
        >
          <FaExclamationTriangle /> Exceptions
        </button>
      </div>

      <div className="reconciliation-controls">
        <div className="search-box">
          <FaSearch />
          <input
            type="text"
            placeholder={`Search ${currentView === 'dashboard' ? 'records' : currentView}...`}
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
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>

          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            className="status-select"
          >
            <option value="all">All Status</option>
            <option value="matched">Matched</option>
            <option value="unmatched">Unmatched</option>
            <option value="exception">Exception</option>
          </select>

          <button 
            className={`btn btn-secondary ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaFilter /> Filters
          </button>
        </div>
      </div>

      <div className="reconciliation-content">
        {currentView === 'dashboard' && renderDashboard()}
        {currentView === 'bank-recon' && renderBankReconciliation()}
        {currentView === 'cash-position' && renderCashPosition()}
        {currentView === 'exceptions' && renderExceptions()}
      </div>
    </div>
  );
};

export default Reconciliation; 