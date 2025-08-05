import React, { useState } from 'react';
import { 
  FaPlus, FaSearch, FaFilter, FaEdit, FaTrash, FaEye, 
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaDollarSign,
  FaCalendarAlt, FaBuilding, FaUser, FaSort, FaDownload,
  FaFileExport, FaUserPlus, FaUsers, FaChartLine,
  FaExchangeAlt, FaPiggyBank, FaCheckCircle, FaTimes,
  FaExclamationTriangle, FaIdCard, FaClock, FaArrowUp,
  FaArrowDown
} from 'react-icons/fa';
import './Investor.css';

const Investor = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterInvestmentType, setFilterInvestmentType] = useState('all');
  const [filterFund, setFilterFund] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [currentView, setCurrentView] = useState('overview'); // overview, list, add, edit, view
  const [selectedInvestor, setSelectedInvestor] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  // Mock investor data
  const [investors, setInvestors] = useState([
    {
      id: 1,
      name: 'John Smith',
      accountNumber: 'INV001234',
      email: 'john.smith@email.com',
      phone: '+1 (555) 123-4567',
      type: 'Individual',
      investmentType: 'Equity',
      status: 'Active',
      kycStatus: 'Completed',
      investmentAmount: 250000,
      portfolioValue: 275000,
      joinDate: '2023-01-15',
      address: '123 Main St, New York, NY 10001',
      riskProfile: 'Moderate',
      lastActivity: '2024-01-15',
      fund: 'Growth Fund',
      holdings: [
        { fund: 'Growth Fund', amount: 150000, units: 1500 },
        { fund: 'Balanced Fund', amount: 100000, units: 2000 }
      ],
      recentTransactions: [
        { date: '2024-01-15', type: 'Purchase', amount: 25000, fund: 'Growth Fund' },
        { date: '2024-01-10', type: 'Dividend', amount: 1250, fund: 'Growth Fund' }
      ],
      totalDividends: 15000
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      accountNumber: 'INV001235',
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 987-6543',
      type: 'Individual',
      investmentType: 'Mutual Fund',
      status: 'Active',
      kycStatus: 'Completed',
      investmentAmount: 500000,
      portfolioValue: 485000,
      joinDate: '2022-08-22',
      address: '456 Oak Ave, Los Angeles, CA 90210',
      riskProfile: 'Aggressive',
      lastActivity: '2024-01-12',
      fund: 'Aggressive Growth Fund',
      holdings: [
        { fund: 'Aggressive Growth Fund', amount: 300000, units: 2500 },
        { fund: 'Technology Fund', amount: 185000, units: 1850 }
      ],
      recentTransactions: [
        { date: '2024-01-12', type: 'Purchase', amount: 50000, fund: 'Technology Fund' },
        { date: '2024-01-08', type: 'Dividend', amount: 2500, fund: 'Aggressive Growth Fund' }
      ],
      totalDividends: 28000
    },
    {
      id: 3,
      name: 'Tech Ventures LLC',
      accountNumber: 'INV001236',
      email: 'contact@techventures.com',
      phone: '+1 (555) 456-7890',
      type: 'Corporate',
      investmentType: 'Bonds',
      status: 'Pending',
      kycStatus: 'Pending',
      investmentAmount: 1000000,
      portfolioValue: 1050000,
      joinDate: '2023-11-01',
      address: '789 Business Blvd, San Francisco, CA 94105',
      riskProfile: 'Conservative',
      lastActivity: '2024-01-10',
      fund: 'Conservative Bond Fund',
      holdings: [
        { fund: 'Conservative Bond Fund', amount: 800000, units: 8000 },
        { fund: 'Government Securities', amount: 250000, units: 2500 }
      ],
      recentTransactions: [
        { date: '2024-01-10', type: 'Purchase', amount: 100000, fund: 'Government Securities' },
        { date: '2024-01-05', type: 'Interest', amount: 3500, fund: 'Conservative Bond Fund' }
      ],
      totalDividends: 42000
    },
    {
      id: 4,
      name: 'Maria Garcia',
      accountNumber: 'INV001237',
      email: 'maria.garcia@email.com',
      phone: '+1 (555) 321-7654',
      type: 'Individual',
      investmentType: 'Hybrid',
      status: 'Active',
      kycStatus: 'In Review',
      investmentAmount: 350000,
      portfolioValue: 368000,
      joinDate: '2023-06-15',
      address: '321 Pine St, Chicago, IL 60601',
      riskProfile: 'Moderate',
      lastActivity: '2024-01-14',
      fund: 'Balanced Fund',
      holdings: [
        { fund: 'Balanced Fund', amount: 200000, units: 4000 },
        { fund: 'Index Fund', amount: 168000, units: 1680 }
      ],
      recentTransactions: [
        { date: '2024-01-14', type: 'Purchase', amount: 18000, fund: 'Index Fund' },
        { date: '2024-01-09', type: 'Dividend', amount: 1800, fund: 'Balanced Fund' }
      ],
      totalDividends: 18500
    }
  ]);

  const [newInvestor, setNewInvestor] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'Individual',
    status: 'Pending',
    investmentAmount: '',
    address: '',
    riskProfile: 'Moderate'
  });

  // Filter and search investors
  const filteredInvestors = investors.filter(investor => {
    const matchesSearch = investor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         investor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         investor.accountNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || investor.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesInvestmentType = filterInvestmentType === 'all' || investor.investmentType.toLowerCase() === filterInvestmentType.toLowerCase();
    const matchesFund = filterFund === 'all' || investor.fund.toLowerCase().includes(filterFund.toLowerCase());
    return matchesSearch && matchesStatus && matchesInvestmentType && matchesFund;
  });

  // Sort investors
  const sortedInvestors = [...filteredInvestors].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'investmentAmount':
        return b.investmentAmount - a.investmentAmount;
      case 'joinDate':
        return new Date(b.joinDate) - new Date(a.joinDate);
      default:
        return 0;
    }
  });

  const handleAddInvestor = () => {
    const id = Math.max(...investors.map(i => i.id)) + 1;
    const investor = {
      ...newInvestor,
      id,
      portfolioValue: parseFloat(newInvestor.investmentAmount) || 0,
      joinDate: new Date().toISOString().split('T')[0],
      lastActivity: new Date().toISOString().split('T')[0]
    };
    setInvestors([...investors, investor]);
    setNewInvestor({
      name: '',
      email: '',
      phone: '',
      type: 'Individual',
      status: 'Pending',
      investmentAmount: '',
      address: '',
      riskProfile: 'Moderate'
    });
    setCurrentView('list');
  };

  const handleDeleteInvestor = (id) => {
    setInvestors(investors.filter(investor => investor.id !== id));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US');
  };

  // Calculate overview metrics
  const totalHoldings = investors.reduce((sum, inv) => sum + inv.portfolioValue, 0);
  const totalDividends = investors.reduce((sum, inv) => sum + inv.totalDividends, 0);
  const totalInvestment = investors.reduce((sum, inv) => sum + inv.investmentAmount, 0);
  const allTransactions = investors.flatMap(inv => 
    inv.recentTransactions.map(trans => ({
      ...trans,
      investorName: inv.name,
      investorId: inv.id
    }))
  ).sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10);

  if (currentView === 'overview') {
    return (
      <div className="investor-container">
        <div className="investor-header">
          <div className="header-left">
            <h1>Investor Overview</h1>
            <p>Comprehensive view of all investor activities and holdings</p>
          </div>
          <div className="header-actions">
            <button 
              className="btn btn-secondary"
              onClick={() => setCurrentView('list')}
            >
              <FaUsers /> View All Investors
            </button>
            <button 
              className="btn btn-primary"
              onClick={() => setCurrentView('add')}
            >
              <FaPlus /> Add Investor
            </button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="overview-stats">
          <div className="stat-card">
            <div className="stat-icon holdings">
              <FaChartLine />
            </div>
            <div className="stat-content">
              <div className="stat-value">{formatCurrency(totalHoldings)}</div>
              <div className="stat-label">Total Holdings</div>
              <div className="stat-change positive">
                <FaArrowUp /> +5.2% this month
              </div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon transactions">
              <FaExchangeAlt />
            </div>
            <div className="stat-content">
              <div className="stat-value">{formatCurrency(totalInvestment)}</div>
              <div className="stat-label">Total Investment</div>
              <div className="stat-change positive">
                <FaArrowUp /> +12.8% YTD
              </div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon dividends">
              <FaDollarSign />
            </div>
            <div className="stat-content">
              <div className="stat-value">{formatCurrency(totalDividends)}</div>
              <div className="stat-label">Total Dividends</div>
              <div className="stat-change positive">
                <FaArrowUp /> +8.5% this quarter
              </div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon investors">
              <FaUsers />
            </div>
            <div className="stat-content">
              <div className="stat-value">{investors.length}</div>
              <div className="stat-label">Active Investors</div>
              <div className="stat-change positive">
                <FaArrowUp /> +3 new this month
              </div>
            </div>
          </div>
        </div>

        {/* Holdings & Transactions */}
        <div className="overview-sections">
          <div className="overview-section">
            <h3>Holdings Distribution</h3>
            <div className="holdings-chart">
              {investors.slice(0, 5).map(investor => (
                <div key={investor.id} className="holding-item">
                  <div className="holding-info">
                    <div className="investor-name">{investor.name}</div>
                    <div className="fund-name">{investor.fund}</div>
                  </div>
                  <div className="holding-value">
                    <div className="amount">{formatCurrency(investor.portfolioValue)}</div>
                    <div className="percentage">
                      {((investor.portfolioValue / totalHoldings) * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="overview-section">
            <h3>Recent Transactions</h3>
            <div className="transactions-list">
              {allTransactions.slice(0, 8).map((transaction, index) => (
                <div key={index} className="transaction-item">
                  <div className="transaction-type">
                    <div className={`type-icon ${transaction.type.toLowerCase()}`}>
                      {transaction.type === 'Purchase' && <FaArrowUp />}
                      {transaction.type === 'Dividend' && <FaDollarSign />}
                      {transaction.type === 'Interest' && <FaPiggyBank />}
                    </div>
                  </div>
                  <div className="transaction-details">
                    <div className="transaction-desc">
                      {transaction.type} - {transaction.fund}
                    </div>
                    <div className="transaction-investor">{transaction.investorName}</div>
                  </div>
                  <div className="transaction-meta">
                    <div className="transaction-amount">
                      {formatCurrency(transaction.amount)}
                    </div>
                    <div className="transaction-date">
                      {formatDate(transaction.date)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Fund Performance */}
        <div className="fund-performance">
          <h3>Fund Performance Summary</h3>
          <div className="fund-grid">
            {['Growth Fund', 'Balanced Fund', 'Conservative Bond Fund', 'Technology Fund'].map(fund => {
              const fundInvestors = investors.filter(inv => inv.fund === fund);
              const fundTotal = fundInvestors.reduce((sum, inv) => sum + inv.portfolioValue, 0);
              return (
                <div key={fund} className="fund-card">
                  <div className="fund-header">
                    <h4>{fund}</h4>
                    <span className="fund-investors">{fundInvestors.length} investors</span>
                  </div>
                  <div className="fund-value">{formatCurrency(fundTotal)}</div>
                  <div className="fund-change positive">+7.2% MTD</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'add') {
    return (
      <div className="investor-container">
        <div className="investor-header">
          <div className="header-left">
            <h1>Add New Investor</h1>
            <p>Create a new investor profile</p>
          </div>
          <div className="header-actions">
            <button 
              className="btn btn-secondary"
              onClick={() => setCurrentView('list')}
            >
              Cancel
            </button>
          </div>
        </div>

        <div className="investor-form-container">
          <form className="investor-form" onSubmit={(e) => { e.preventDefault(); handleAddInvestor(); }}>
            <div className="form-grid">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  value={newInvestor.name}
                  onChange={(e) => setNewInvestor({...newInvestor, name: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  value={newInvestor.email}
                  onChange={(e) => setNewInvestor({...newInvestor, email: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  value={newInvestor.phone}
                  onChange={(e) => setNewInvestor({...newInvestor, phone: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Investor Type</label>
                <select
                  value={newInvestor.type}
                  onChange={(e) => setNewInvestor({...newInvestor, type: e.target.value})}
                >
                  <option value="Individual">Individual</option>
                  <option value="Corporate">Corporate</option>
                  <option value="Trust">Trust</option>
                  <option value="Partnership">Partnership</option>
                </select>
              </div>

              <div className="form-group">
                <label>Initial Investment Amount</label>
                <input
                  type="number"
                  value={newInvestor.investmentAmount}
                  onChange={(e) => setNewInvestor({...newInvestor, investmentAmount: e.target.value})}
                  min="0"
                  step="1000"
                />
              </div>

              <div className="form-group">
                <label>Risk Profile</label>
                <select
                  value={newInvestor.riskProfile}
                  onChange={(e) => setNewInvestor({...newInvestor, riskProfile: e.target.value})}
                >
                  <option value="Conservative">Conservative</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Aggressive">Aggressive</option>
                </select>
              </div>

              <div className="form-group full-width">
                <label>Address</label>
                <textarea
                  value={newInvestor.address}
                  onChange={(e) => setNewInvestor({...newInvestor, address: e.target.value})}
                  rows="3"
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                <FaUserPlus /> Create Investor
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  if (currentView === 'view' && selectedInvestor) {
    return (
      <div className="investor-container">
        <div className="investor-header">
          <div className="header-left">
            <h1>Investor Profile</h1>
            <p>Comprehensive investor information and KYC details</p>
          </div>
          <div className="header-actions">
            <button 
              className="btn btn-secondary"
              onClick={() => setCurrentView('list')}
            >
              Back to List
            </button>
            <button className="btn btn-primary">
              <FaEdit /> Edit Profile
            </button>
          </div>
        </div>

        <div className="investor-profile-container">
          {/* Profile Header */}
          <div className="profile-header">
            <div className="profile-main">
              <div className="profile-avatar">
                {selectedInvestor.type === 'Corporate' ? <FaBuilding /> : <FaUser />}
              </div>
              <div className="profile-info">
                <h2>{selectedInvestor.name}</h2>
                <p className="account-number">Account: {selectedInvestor.accountNumber}</p>
                <div className="status-badges">
                  <span className={`status-badge ${selectedInvestor.status.toLowerCase()}`}>
                    {selectedInvestor.status}
                  </span>
                  <span className={`kyc-badge ${selectedInvestor.kycStatus.toLowerCase().replace(' ', '-')}`}>
                    {selectedInvestor.kycStatus === 'Completed' && <FaCheckCircle />}
                    {selectedInvestor.kycStatus === 'Pending' && <FaClock />}
                    {selectedInvestor.kycStatus === 'In Review' && <FaExclamationTriangle />}
                    KYC: {selectedInvestor.kycStatus}
                  </span>
                </div>
              </div>
            </div>
            <div className="profile-stats">
              <div className="stat-item">
                <div className="stat-value">{formatCurrency(selectedInvestor.portfolioValue)}</div>
                <div className="stat-label">Portfolio Value</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{formatCurrency(selectedInvestor.totalDividends)}</div>
                <div className="stat-label">Total Dividends</div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="profile-content">
            <div className="profile-section">
              <h3><FaIdCard /> Personal Details</h3>
              <div className="detail-grid">
                <div className="detail-item">
                  <span className="detail-label">Full Name:</span>
                  <span className="detail-value">{selectedInvestor.name}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Account Number:</span>
                  <span className="detail-value">{selectedInvestor.accountNumber}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Investor Type:</span>
                  <span className="detail-value">{selectedInvestor.type}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Investment Type:</span>
                  <span className="detail-value">{selectedInvestor.investmentType}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Risk Profile:</span>
                  <span className="detail-value">{selectedInvestor.riskProfile}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Join Date:</span>
                  <span className="detail-value">{formatDate(selectedInvestor.joinDate)}</span>
                </div>
              </div>
            </div>

            <div className="profile-section">
              <h3><FaEnvelope /> Contact Information</h3>
              <div className="detail-grid">
                <div className="detail-item">
                  <span className="detail-label">Email:</span>
                  <span className="detail-value">{selectedInvestor.email}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Phone:</span>
                  <span className="detail-value">{selectedInvestor.phone}</span>
                </div>
                <div className="detail-item full-width">
                  <span className="detail-label">Address:</span>
                  <span className="detail-value">{selectedInvestor.address}</span>
                </div>
              </div>
            </div>

            <div className="profile-section">
              <h3><FaCheckCircle /> KYC Status</h3>
              <div className="kyc-status-container">
                <div className={`kyc-status-card ${selectedInvestor.kycStatus.toLowerCase().replace(' ', '-')}`}>
                  <div className="kyc-icon">
                    {selectedInvestor.kycStatus === 'Completed' && <FaCheckCircle />}
                    {selectedInvestor.kycStatus === 'Pending' && <FaClock />}
                    {selectedInvestor.kycStatus === 'In Review' && <FaExclamationTriangle />}
                  </div>
                  <div className="kyc-details">
                    <h4>KYC Status: {selectedInvestor.kycStatus}</h4>
                    <p>
                      {selectedInvestor.kycStatus === 'Completed' && 'All KYC documents have been verified and approved.'}
                      {selectedInvestor.kycStatus === 'Pending' && 'KYC documents are pending submission or review.'}
                      {selectedInvestor.kycStatus === 'In Review' && 'KYC documents are currently under review by our compliance team.'}
                    </p>
                    <div className="kyc-date">Last updated: {formatDate(selectedInvestor.lastActivity)}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="profile-section">
              <h3><FaChartLine /> Holdings</h3>
              <div className="holdings-list">
                {selectedInvestor.holdings.map((holding, index) => (
                  <div key={index} className="holding-card">
                    <div className="holding-info">
                      <h4>{holding.fund}</h4>
                      <p>{holding.units} units</p>
                    </div>
                    <div className="holding-amount">
                      {formatCurrency(holding.amount)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="profile-section">
              <h3><FaExchangeAlt /> Recent Transactions</h3>
              <div className="transactions-table">
                {selectedInvestor.recentTransactions.map((transaction, index) => (
                  <div key={index} className="transaction-row">
                    <div className="transaction-type">
                      <div className={`type-badge ${transaction.type.toLowerCase()}`}>
                        {transaction.type}
                      </div>
                    </div>
                    <div className="transaction-fund">{transaction.fund}</div>
                    <div className="transaction-amount">{formatCurrency(transaction.amount)}</div>
                    <div className="transaction-date">{formatDate(transaction.date)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="investor-container">
      <div className="investor-header">
        <div className="header-left">
          <h1>Investor Management</h1>
          <p>Manage and track your investor relationships</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-secondary">
            <FaDownload /> Export
          </button>
          <button 
            className="btn btn-primary"
            onClick={() => setCurrentView('add')}
          >
            <FaPlus /> Add Investor
          </button>
        </div>
      </div>

      <div className="investor-controls">
        <div className="search-box">
          <FaSearch />
          <input
            type="text"
            placeholder="Search by name, email, or account number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="control-buttons">
          <button 
            className={`btn ${showFilters ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaFilter /> Filters
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => setCurrentView('overview')}
          >
            <FaChartLine /> Overview
          </button>

          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="name">Sort by Name</option>
            <option value="investmentAmount">Sort by Investment</option>
            <option value="joinDate">Sort by Join Date</option>
            <option value="portfolioValue">Sort by Portfolio Value</option>
          </select>
        </div>
      </div>

      {showFilters && (
        <div className="filter-panel">
          <div className="filter-groups">
            <div className="filter-group">
              <label>Status:</label>
              <select 
                value={filterStatus} 
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            
            <div className="filter-group">
              <label>Investment Type:</label>
              <select 
                value={filterInvestmentType} 
                onChange={(e) => setFilterInvestmentType(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="equity">Equity</option>
                <option value="mutual fund">Mutual Fund</option>
                <option value="bonds">Bonds</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
            
            <div className="filter-group">
              <label>Fund Investment:</label>
              <select 
                value={filterFund} 
                onChange={(e) => setFilterFund(e.target.value)}
              >
                <option value="all">All Funds</option>
                <option value="growth">Growth Fund</option>
                <option value="balanced">Balanced Fund</option>
                <option value="conservative">Conservative Bond Fund</option>
                <option value="technology">Technology Fund</option>
                <option value="aggressive">Aggressive Growth Fund</option>
              </select>
            </div>
          </div>
        </div>
      )}

      <div className="investor-stats">
        <div className="stat-card">
          <div className="stat-value">{investors.length}</div>
          <div className="stat-label">Total Investors</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{investors.filter(i => i.status === 'Active').length}</div>
          <div className="stat-label">Active Investors</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">
            {formatCurrency(investors.reduce((sum, i) => sum + i.investmentAmount, 0))}
          </div>
          <div className="stat-label">Total Investment</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">
            {formatCurrency(investors.reduce((sum, i) => sum + i.portfolioValue, 0))}
          </div>
          <div className="stat-label">Portfolio Value</div>
        </div>
      </div>

      <div className="investor-table-container">
        <table className="investor-table">
          <thead>
            <tr>
              <th>Investor Details</th>
              <th>Account Number</th>
              <th>Investment Type</th>
              <th>Fund</th>
              <th>Status</th>
              <th>Investment Amount</th>
              <th>Portfolio Value</th>
              <th>Join Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedInvestors.map(investor => (
              <tr key={investor.id}>
                <td>
                  <div className="investor-info">
                    <div className="investor-avatar">
                      {investor.type === 'Corporate' ? <FaBuilding /> : <FaUser />}
                    </div>
                    <div>
                      <div className="investor-name">{investor.name}</div>
                      <div className="investor-email">{investor.email}</div>
                      <div className="investor-type">{investor.type}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="account-number">{investor.accountNumber}</span>
                </td>
                <td>
                  <span className="investment-type">{investor.investmentType}</span>
                </td>
                <td>
                  <span className="fund-name">{investor.fund}</span>
                </td>
                <td>
                  <div className="status-container">
                    <span className={`status-badge ${investor.status.toLowerCase()}`}>
                      {investor.status}
                    </span>
                    <span className={`kyc-status ${investor.kycStatus.toLowerCase().replace(' ', '-')}`}>
                      {investor.kycStatus === 'Completed' && <FaCheckCircle />}
                      {investor.kycStatus === 'Pending' && <FaClock />}
                      {investor.kycStatus === 'In Review' && <FaExclamationTriangle />}
                      KYC
                    </span>
                  </div>
                </td>
                <td>{formatCurrency(investor.investmentAmount)}</td>
                <td>
                  <div className="portfolio-value">
                    <span className="amount">{formatCurrency(investor.portfolioValue)}</span>
                    <span className="gain-loss">
                      {investor.portfolioValue > investor.investmentAmount ? 
                        <span className="gain">+{formatCurrency(investor.portfolioValue - investor.investmentAmount)}</span> :
                        <span className="loss">-{formatCurrency(investor.investmentAmount - investor.portfolioValue)}</span>
                      }
                    </span>
                  </div>
                </td>
                <td>{formatDate(investor.joinDate)}</td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="btn-icon" 
                      title="View Profile"
                      onClick={() => {
                        setSelectedInvestor(investor);
                        setCurrentView('view');
                      }}
                    >
                      <FaEye />
                    </button>
                    <button className="btn-icon" title="Edit">
                      <FaEdit />
                    </button>
                    <button 
                      className="btn-icon btn-danger" 
                      title="Delete"
                      onClick={() => handleDeleteInvestor(investor.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {sortedInvestors.length === 0 && (
        <div className="empty-state">
          <FaUsers />
          <h3>No investors found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default Investor; 