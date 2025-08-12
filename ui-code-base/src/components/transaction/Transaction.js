import React, { useState } from 'react';
import { 
  FaPlus, FaSearch, FaFilter, FaEye, FaEdit, FaTrash,
  FaExchangeAlt, FaArrowUp, FaArrowDown, FaSync, FaRandom,
  FaCalendarAlt, FaDollarSign, FaUser, FaCheckCircle,
  FaClock, FaExclamationTriangle, FaTimes, FaDownload,
  FaFileExport, FaPrint, FaLock, FaUnlock, FaChartLine,
  FaBars, FaInfoCircle
} from 'react-icons/fa';
import './Transaction.css';

const Transaction = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('all'); // all, transactionId, investorName, dateRange, status
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentView, setCurrentView] = useState('history'); // history, initiate, confirmation
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('date');

  // Transaction initiation form state
  const [newTransaction, setNewTransaction] = useState({
    type: 'purchase',
    investorId: '',
    fundId: '',
    amount: '',
    units: '',
    navPrice: '',
    notes: ''
  });

  // Mock transaction data
  const [transactions, setTransactions] = useState([
    {
      id: 'TXN001234',
      type: 'Purchase',
      investorName: 'John Smith',
      investorId: 'INV001234',
      fundName: 'Growth Fund',
      fundId: 'GF001',
      amount: 25000,
      units: 250,
      navPrice: 100.00,
      status: 'Completed',
      date: '2024-01-15',
      time: '10:30 AM',
      confirmationCode: 'CONF-001234',
      fees: 125,
      netAmount: 24875,
      lockedNav: true,
      processedBy: 'System'
    },
    {
      id: 'TXN001235',
      type: 'Redemption',
      investorName: 'Sarah Johnson',
      investorId: 'INV001235',
      fundName: 'Balanced Fund',
      fundId: 'BF001',
      amount: 15000,
      units: 300,
      navPrice: 50.00,
      status: 'Pending',
      date: '2024-01-14',
      time: '2:15 PM',
      confirmationCode: 'CONF-001235',
      fees: 75,
      netAmount: 14925,
      lockedNav: false,
      processedBy: 'Admin'
    },
    {
      id: 'TXN001236',
      type: 'Transfer',
      investorName: 'Tech Ventures LLC',
      investorId: 'INV001236',
      fundName: 'Technology Fund',
      fundId: 'TF001',
      amount: 50000,
      units: 500,
      navPrice: 100.00,
      status: 'Failed',
      date: '2024-01-13',
      time: '11:45 AM',
      confirmationCode: 'CONF-001236',
      fees: 250,
      netAmount: 49750,
      lockedNav: true,
      processedBy: 'John Doe',
      failureReason: 'Insufficient balance'
    },
    {
      id: 'TXN001237',
      type: 'Exchange',
      investorName: 'Maria Garcia',
      investorId: 'INV001237',
      fundName: 'Conservative Fund',
      fundId: 'CF001',
      amount: 30000,
      units: 600,
      navPrice: 50.00,
      status: 'Processing',
      date: '2024-01-12',
      time: '9:20 AM',
      confirmationCode: 'CONF-001237',
      fees: 150,
      netAmount: 29850,
      lockedNav: true,
      processedBy: 'Jane Smith'
    }
  ]);

  // Mock funds and investors for dropdowns
  const funds = [
    { id: 'GF001', name: 'Growth Fund', navPrice: 100.00 },
    { id: 'BF001', name: 'Balanced Fund', navPrice: 50.00 },
    { id: 'TF001', name: 'Technology Fund', navPrice: 120.00 },
    { id: 'CF001', name: 'Conservative Fund', navPrice: 45.00 }
  ];

  const investors = [
    { id: 'INV001234', name: 'John Smith' },
    { id: 'INV001235', name: 'Sarah Johnson' },
    { id: 'INV001236', name: 'Tech Ventures LLC' },
    { id: 'INV001237', name: 'Maria Garcia' }
  ];

  // Filter and search transactions
  const filteredTransactions = transactions.filter(transaction => {
    let matchesSearch = true;
    
    if (searchTerm) {
      switch (searchType) {
        case 'transactionId':
          matchesSearch = transaction.id.toLowerCase().includes(searchTerm.toLowerCase());
          break;
        case 'investorName':
          matchesSearch = transaction.investorName.toLowerCase().includes(searchTerm.toLowerCase());
          break;
        case 'status':
          matchesSearch = transaction.status.toLowerCase().includes(searchTerm.toLowerCase());
          break;
        default:
          matchesSearch = transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.investorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.status.toLowerCase().includes(searchTerm.toLowerCase());
      }
    }

    const matchesType = filterType === 'all' || transaction.type.toLowerCase() === filterType.toLowerCase();
    const matchesStatus = filterStatus === 'all' || transaction.status.toLowerCase() === filterStatus.toLowerCase();
    
    let matchesDateRange = true;
    if (dateFrom && dateTo) {
      const transactionDate = new Date(transaction.date);
      const fromDate = new Date(dateFrom);
      const toDate = new Date(dateTo);
      matchesDateRange = transactionDate >= fromDate && transactionDate <= toDate;
    }

    return matchesSearch && matchesType && matchesStatus && matchesDateRange;
  });

  // Sort transactions
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.date) - new Date(a.date);
      case 'amount':
        return b.amount - a.amount;
      case 'type':
        return a.type.localeCompare(b.type);
      case 'status':
        return a.status.localeCompare(b.status);
      default:
        return 0;
    }
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US');
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return <FaCheckCircle className="status-icon completed" />;
      case 'pending':
        return <FaClock className="status-icon pending" />;
      case 'processing':
        return <FaSync className="status-icon processing" />;
      case 'failed':
        return <FaTimes className="status-icon failed" />;
      default:
        return <FaInfoCircle className="status-icon" />;
    }
  };

  const getTypeIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'purchase':
        return <FaArrowUp className="type-icon purchase" />;
      case 'redemption':
        return <FaArrowDown className="type-icon redemption" />;
      case 'transfer':
        return <FaExchangeAlt className="type-icon transfer" />;
      case 'exchange':
        return <FaRandom className="type-icon exchange" />;
      default:
        return <FaExchangeAlt className="type-icon" />;
    }
  };

  const handleInitiateTransaction = () => {
    const selectedFund = funds.find(f => f.id === newTransaction.fundId);
    const calculatedUnits = newTransaction.amount / selectedFund?.navPrice || 0;
    const fees = newTransaction.amount * 0.005; // 0.5% fee
    const netAmount = newTransaction.amount - fees;

    const transaction = {
      id: `TXN${String(transactions.length + 1).padStart(6, '0')}`,
      type: newTransaction.type.charAt(0).toUpperCase() + newTransaction.type.slice(1),
      investorName: investors.find(i => i.id === newTransaction.investorId)?.name || '',
      investorId: newTransaction.investorId,
      fundName: selectedFund?.name || '',
      fundId: newTransaction.fundId,
      amount: parseFloat(newTransaction.amount),
      units: calculatedUnits,
      navPrice: selectedFund?.navPrice || 0,
      status: 'Pending',
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString(),
      confirmationCode: `CONF-${String(transactions.length + 1).padStart(6, '0')}`,
      fees: fees,
      netAmount: netAmount,
      lockedNav: false,
      processedBy: 'Current User'
    };

    setSelectedTransaction(transaction);
    setCurrentView('confirmation');
  };

  const confirmTransaction = () => {
    setTransactions([selectedTransaction, ...transactions]);
    setNewTransaction({
      type: 'purchase',
      investorId: '',
      fundId: '',
      amount: '',
      units: '',
      navPrice: '',
      notes: ''
    });
    setSelectedTransaction(null);
    setCurrentView('history');
  };

  if (currentView === 'initiate') {
    return (
      <div className="transaction-container">
        <div className="transaction-header">
          <div className="header-left">
            <h1>Initiate Transaction</h1>
            <p>Create a new transaction for an investor</p>
          </div>
          <div className="header-actions">
            <button 
              className="btn btn-secondary"
              onClick={() => setCurrentView('history')}
            >
              Cancel
            </button>
          </div>
        </div>

        <div className="transaction-form-container">
          <div className="transaction-types">
            <h3>Transaction Type</h3>
            <div className="type-buttons">
              {['purchase', 'redemption', 'transfer', 'exchange'].map(type => (
                <button
                  key={type}
                  className={`type-btn ${newTransaction.type === type ? 'active' : ''}`}
                  onClick={() => setNewTransaction({...newTransaction, type})}
                >
                  {getTypeIcon(type)}
                  <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                </button>
              ))}
            </div>
          </div>

          <form className="transaction-form" onSubmit={(e) => { e.preventDefault(); handleInitiateTransaction(); }}>
            <div className="form-grid">
              <div className="form-group">
                <label>Investor *</label>
                <select
                  value={newTransaction.investorId}
                  onChange={(e) => setNewTransaction({...newTransaction, investorId: e.target.value})}
                  required
                >
                  <option value="">Select Investor</option>
                  {investors.map(investor => (
                    <option key={investor.id} value={investor.id}>
                      {investor.name} ({investor.id})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Fund *</label>
                <select
                  value={newTransaction.fundId}
                  onChange={(e) => setNewTransaction({...newTransaction, fundId: e.target.value})}
                  required
                >
                  <option value="">Select Fund</option>
                  {funds.map(fund => (
                    <option key={fund.id} value={fund.id}>
                      {fund.name} - NAV: {formatCurrency(fund.navPrice)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Amount *</label>
                <input
                  type="number"
                  value={newTransaction.amount}
                  onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div className="form-group">
                <label>Estimated Units</label>
                <input
                  type="number"
                  value={newTransaction.fundId && newTransaction.amount ? 
                    (newTransaction.amount / funds.find(f => f.id === newTransaction.fundId)?.navPrice).toFixed(4) : ''
                  }
                  readOnly
                  className="readonly"
                />
              </div>

              <div className="form-group full-width">
                <label>Notes (Optional)</label>
                <textarea
                  value={newTransaction.notes}
                  onChange={(e) => setNewTransaction({...newTransaction, notes: e.target.value})}
                  rows="3"
                  placeholder="Add any additional notes for this transaction..."
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary" disabled={!newTransaction.investorId || !newTransaction.fundId || !newTransaction.amount}>
                <FaCheckCircle /> Preview Transaction
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  if (currentView === 'confirmation' && selectedTransaction) {
    const selectedFund = funds.find(f => f.id === selectedTransaction.fundId);
    
    return (
      <div className="transaction-container">
        <div className="transaction-header">
          <div className="header-left">
            <h1>Transaction Confirmation</h1>
            <p>Review and confirm the transaction details</p>
          </div>
          <div className="header-actions">
            <button 
              className="btn btn-secondary"
              onClick={() => setCurrentView('initiate')}
            >
              Back to Edit
            </button>
          </div>
        </div>

        <div className="confirmation-container">
          <div className="confirmation-card">
            <div className="confirmation-header">
              <div className="transaction-type-badge">
                {getTypeIcon(selectedTransaction.type)}
                <span>{selectedTransaction.type}</span>
              </div>
              <div className="transaction-amount">
                {formatCurrency(selectedTransaction.amount)}
              </div>
            </div>

            <div className="confirmation-details">
              <div className="detail-section">
                <h3>Transaction Details</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="label">Transaction ID:</span>
                    <span className="value">{selectedTransaction.id}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Type:</span>
                    <span className="value">{selectedTransaction.type}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Date:</span>
                    <span className="value">{formatDate(selectedTransaction.date)}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Time:</span>
                    <span className="value">{selectedTransaction.time}</span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h3>Investor Information</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="label">Investor:</span>
                    <span className="value">{selectedTransaction.investorName}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Investor ID:</span>
                    <span className="value">{selectedTransaction.investorId}</span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h3>Fund Information</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="label">Fund:</span>
                    <span className="value">{selectedTransaction.fundName}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">NAV Price:</span>
                    <span className="value">{formatCurrency(selectedTransaction.navPrice)}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Units:</span>
                    <span className="value">{selectedTransaction.units.toFixed(4)}</span>
                  </div>
                  <div className="detail-item nav-lock">
                    <span className="label">NAV Lock:</span>
                    <span className="value">
                      {selectedTransaction.lockedNav ? 
                        <><FaLock /> Locked</> : 
                        <><FaUnlock /> Not Locked</>
                      }
                    </span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h3>Financial Summary</h3>
                <div className="financial-summary">
                  <div className="summary-item">
                    <span className="label">Transaction Amount:</span>
                    <span className="value">{formatCurrency(selectedTransaction.amount)}</span>
                  </div>
                  <div className="summary-item">
                    <span className="label">Processing Fees:</span>
                    <span className="value">-{formatCurrency(selectedTransaction.fees)}</span>
                  </div>
                  <div className="summary-item total">
                    <span className="label">Net Amount:</span>
                    <span className="value">{formatCurrency(selectedTransaction.netAmount)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="confirmation-actions">
              <div className="nav-lock-info">
                <FaInfoCircle />
                <span>NAV will be locked upon confirmation for next business day processing</span>
              </div>
              <div className="action-buttons">
                <button 
                  className="btn btn-secondary"
                  onClick={() => setCurrentView('initiate')}
                >
                  Modify Transaction
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={confirmTransaction}
                >
                  <FaCheckCircle /> Confirm Transaction
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="transaction-container">
      <div className="transaction-header">
        <div className="header-left">
          <h1>Transaction Management</h1>
          <p>Manage and track all investment transactions</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-secondary">
            <FaDownload /> Export
          </button>
          <button 
            className="btn btn-primary"
            onClick={() => setCurrentView('initiate')}
          >
            <FaPlus /> New Transaction
          </button>
        </div>
      </div>

      <div className="transaction-controls">
        <div className="search-section">
          <div className="search-type-selector">
            <select 
              value={searchType} 
              onChange={(e) => setSearchType(e.target.value)}
              className="search-type-select"
            >
              <option value="all">Search All</option>
              <option value="transactionId">Transaction ID</option>
              <option value="investorName">Investor Name</option>
              <option value="status">Status</option>
            </select>
          </div>
          
          <div className="search-box">
            <FaSearch />
            <input
              type="text"
              placeholder={`Search by ${searchType === 'all' ? 'transaction ID, investor, or status' : searchType}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {searchType === 'dateRange' && (
            <div className="date-range-inputs">
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                placeholder="From"
              />
              <span>to</span>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                placeholder="To"
              />
            </div>
          )}
        </div>

        <div className="control-buttons">
          <button 
            className={`btn ${showFilters ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaFilter /> Filters
          </button>

          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="date">Sort by Date</option>
            <option value="amount">Sort by Amount</option>
            <option value="type">Sort by Type</option>
            <option value="status">Sort by Status</option>
          </select>
        </div>
      </div>

      {showFilters && (
        <div className="filter-panel">
          <div className="filter-groups">
            <div className="filter-group">
              <label>Transaction Type:</label>
              <select 
                value={filterType} 
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="purchase">Purchase</option>
                <option value="redemption">Redemption</option>
                <option value="transfer">Transfer</option>
                <option value="exchange">Exchange</option>
              </select>
            </div>
            
            <div className="filter-group">
              <label>Status:</label>
              <select 
                value={filterStatus} 
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="failed">Failed</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Date Range:</label>
              <div className="date-inputs">
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  placeholder="From"
                />
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  placeholder="To"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="transaction-stats">
        <div className="stat-card">
          <div className="stat-value">{transactions.length}</div>
          <div className="stat-label">Total Transactions</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{transactions.filter(t => t.status === 'Completed').length}</div>
          <div className="stat-label">Completed</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">
            {formatCurrency(transactions.reduce((sum, t) => sum + t.amount, 0))}
          </div>
          <div className="stat-label">Total Volume</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{transactions.filter(t => t.status === 'Pending' || t.status === 'Processing').length}</div>
          <div className="stat-label">Pending Processing</div>
        </div>
      </div>

      <div className="transaction-table-container">
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Type</th>
              <th>Investor</th>
              <th>Fund</th>
              <th>Amount</th>
              <th>Units</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedTransactions.map(transaction => (
              <tr key={transaction.id}>
                <td>
                  <span className="transaction-id">{transaction.id}</span>
                </td>
                <td>
                  <div className="transaction-type">
                    {getTypeIcon(transaction.type)}
                    <span>{transaction.type}</span>
                  </div>
                </td>
                <td>
                  <div className="investor-info">
                    <div className="investor-name">{transaction.investorName}</div>
                    <div className="investor-id">{transaction.investorId}</div>
                  </div>
                </td>
                <td>
                  <div className="fund-info">
                    <div className="fund-name">{transaction.fundName}</div>
                    <div className="nav-price">NAV: {formatCurrency(transaction.navPrice)}</div>
                  </div>
                </td>
                <td>
                  <span className="amount">{formatCurrency(transaction.amount)}</span>
                </td>
                <td>
                  <span className="units">{transaction.units.toFixed(4)}</span>
                </td>
                <td>
                  <div className="status-cell">
                    {getStatusIcon(transaction.status)}
                    <span className={`status-badge ${transaction.status.toLowerCase()}`}>
                      {transaction.status}
                    </span>
                  </div>
                </td>
                <td>
                  <div className="date-time">
                    <div className="date">{formatDate(transaction.date)}</div>
                    <div className="time">{transaction.time}</div>
                  </div>
                </td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="btn-icon" 
                      title="View Details"
                      onClick={() => {
                        setSelectedTransaction(transaction);
                        setCurrentView('confirmation');
                      }}
                    >
                      <FaEye />
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

      {sortedTransactions.length === 0 && (
        <div className="empty-state">
          <FaExchangeAlt />
          <h3>No transactions found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default Transaction; 