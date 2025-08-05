import React, { useState } from 'react';
import { 
  FaSearch, FaFilter, FaEye, FaChartLine, FaArrowUp, FaArrowDown,
  FaDollarSign, FaCalendarAlt, FaShieldAlt, FaInfoCircle, FaDownload,
  FaPrint, FaStar, FaRegStar, FaBookOpen, FaExclamationTriangle,
  FaCheckCircle, FaTrendingUp, FaTrendingDown, FaPercentage,
  FaFileAlt, FaUsers, FaHistory, FaBuilding, FaGlobe, FaPhone,
  FaEnvelope, FaClock, FaLayerGroup, FaBalanceScale
} from 'react-icons/fa';
import './Fund.css';

const Fund = () => {
  const [currentView, setCurrentView] = useState('explorer'); // explorer, details
  const [selectedFund, setSelectedFund] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterRisk, setFilterRisk] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('performance');
  const [favorites, setFavorites] = useState(['FUND001', 'FUND003']);

  // Mock fund data
  const [funds] = useState([
    {
      id: 'FUND001',
      name: 'Growth Fund',
      category: 'Equity',
      riskLevel: 'High',
      navPrice: 125.50,
      minInvestment: 5000,
      expenseRatio: 1.25,
      aum: 250000000, // Assets Under Management
      performance: {
        '1D': 0.85,
        '1W': 2.3,
        '1M': 5.2,
        '3M': 12.8,
        '6M': 18.5,
        '1Y': 25.3,
        '3Y': 78.9,
        '5Y': 156.2
      },
      fundManager: 'Sarah Johnson',
      launchDate: '2019-03-15',
      description: 'A diversified equity fund focused on growth companies with strong potential for capital appreciation.',
      objectives: 'Long-term capital appreciation through investment in growth stocks of companies with above-average earnings growth potential.',
      strategy: 'The fund invests primarily in large-cap and mid-cap stocks of companies that demonstrate strong growth characteristics, innovative business models, and sustainable competitive advantages.',
      riskProfile: {
        volatility: 'High',
        marketRisk: 'High',
        creditRisk: 'Low',
        liquidityRisk: 'Low'
      },
      topHoldings: [
        { name: 'TechCorp Inc.', allocation: 8.5, sector: 'Technology' },
        { name: 'Growth Industries', allocation: 7.2, sector: 'Consumer Discretionary' },
        { name: 'Innovation Ltd.', allocation: 6.8, sector: 'Healthcare' },
        { name: 'Future Systems', allocation: 5.9, sector: 'Technology' },
        { name: 'Digital Solutions', allocation: 5.4, sector: 'Communication Services' }
      ],
      sectorAllocation: [
        { sector: 'Technology', allocation: 35.2 },
        { sector: 'Healthcare', allocation: 22.8 },
        { sector: 'Consumer Discretionary', allocation: 18.5 },
        { sector: 'Communication Services', allocation: 12.7 },
        { sector: 'Others', allocation: 10.8 }
      ],
      fees: {
        managementFee: 1.25,
        performanceFee: 0,
        entryLoad: 2.5,
        exitLoad: 1.0
      },
      documents: [
        { name: 'Prospectus', type: 'PDF', size: '2.3 MB' },
        { name: 'Annual Report', type: 'PDF', size: '5.1 MB' },
        { name: 'Factsheet', type: 'PDF', size: '890 KB' }
      ]
    },
    {
      id: 'FUND002',
      name: 'Balanced Fund',
      category: 'Hybrid',
      riskLevel: 'Moderate',
      navPrice: 89.75,
      minInvestment: 1000,
      expenseRatio: 1.45,
      aum: 180000000,
      performance: {
        '1D': 0.25,
        '1W': 1.1,
        '1M': 3.4,
        '3M': 8.7,
        '6M': 12.3,
        '1Y': 18.9,
        '3Y': 45.6,
        '5Y': 89.3
      },
      fundManager: 'Michael Chen',
      launchDate: '2018-07-22',
      description: 'A balanced approach combining equity and debt instruments for steady growth with moderate risk.',
      objectives: 'To provide investors with regular income and long-term capital appreciation through a balanced portfolio of equity and debt securities.',
      strategy: 'The fund maintains a strategic allocation of 60-70% in equity and 30-40% in debt instruments, adjusting based on market conditions.',
      riskProfile: {
        volatility: 'Moderate',
        marketRisk: 'Moderate',
        creditRisk: 'Low',
        liquidityRisk: 'Low'
      },
      topHoldings: [
        { name: 'Stable Corp', allocation: 6.8, sector: 'Financial Services' },
        { name: 'Government Bond 2027', allocation: 15.2, sector: 'Government Securities' },
        { name: 'Reliable Industries', allocation: 5.9, sector: 'Utilities' },
        { name: 'Corporate Bond AAA', allocation: 12.8, sector: 'Corporate Bonds' },
        { name: 'Blue Chip Ltd.', allocation: 5.4, sector: 'Industrial' }
      ],
      sectorAllocation: [
        { sector: 'Government Securities', allocation: 35.0 },
        { sector: 'Financial Services', allocation: 20.5 },
        { sector: 'Corporate Bonds', allocation: 15.8 },
        { sector: 'Utilities', allocation: 12.2 },
        { sector: 'Others', allocation: 16.5 }
      ],
      fees: {
        managementFee: 1.45,
        performanceFee: 0,
        entryLoad: 2.0,
        exitLoad: 0.5
      },
      documents: [
        { name: 'Prospectus', type: 'PDF', size: '1.8 MB' },
        { name: 'Annual Report', type: 'PDF', size: '4.2 MB' },
        { name: 'Factsheet', type: 'PDF', size: '750 KB' }
      ]
    },
    {
      id: 'FUND003',
      name: 'Conservative Bond Fund',
      category: 'Debt',
      riskLevel: 'Low',
      navPrice: 52.30,
      minInvestment: 500,
      expenseRatio: 0.85,
      aum: 320000000,
      performance: {
        '1D': 0.05,
        '1W': 0.3,
        '1M': 1.2,
        '3M': 3.8,
        '6M': 6.2,
        '1Y': 8.9,
        '3Y': 22.4,
        '5Y': 41.8
      },
      fundManager: 'Emily Rodriguez',
      launchDate: '2017-01-10',
      description: 'A conservative debt fund investing in high-quality government and corporate bonds for stable returns.',
      objectives: 'To generate steady income with capital preservation through investment in high-grade debt securities.',
      strategy: 'The fund invests primarily in government securities and high-rated corporate bonds with focus on capital preservation and steady income generation.',
      riskProfile: {
        volatility: 'Low',
        marketRisk: 'Low',
        creditRisk: 'Very Low',
        liquidityRisk: 'Very Low'
      },
      topHoldings: [
        { name: 'Government Bond 2029', allocation: 25.6, sector: 'Government Securities' },
        { name: 'Treasury Bill 2025', allocation: 18.9, sector: 'Government Securities' },
        { name: 'AAA Corporate Bond', allocation: 12.4, sector: 'Corporate Bonds' },
        { name: 'Municipal Bond', allocation: 10.8, sector: 'Municipal Securities' },
        { name: 'Banking Sector Bond', allocation: 8.7, sector: 'Financial Services' }
      ],
      sectorAllocation: [
        { sector: 'Government Securities', allocation: 65.8 },
        { sector: 'Corporate Bonds', allocation: 20.2 },
        { sector: 'Municipal Securities', allocation: 8.5 },
        { sector: 'Financial Services', allocation: 5.5 }
      ],
      fees: {
        managementFee: 0.85,
        performanceFee: 0,
        entryLoad: 1.0,
        exitLoad: 0.25
      },
      documents: [
        { name: 'Prospectus', type: 'PDF', size: '1.5 MB' },
        { name: 'Annual Report', type: 'PDF', size: '3.8 MB' },
        { name: 'Factsheet', type: 'PDF', size: '680 KB' }
      ]
    },
    {
      id: 'FUND004',
      name: 'Technology Fund',
      category: 'Sector',
      riskLevel: 'High',
      navPrice: 156.80,
      minInvestment: 10000,
      expenseRatio: 1.75,
      aum: 95000000,
      performance: {
        '1D': 1.2,
        '1W': 3.8,
        '1M': 8.9,
        '3M': 22.4,
        '6M': 28.7,
        '1Y': 45.6,
        '3Y': 125.8,
        '5Y': 285.4
      },
      fundManager: 'David Kim',
      launchDate: '2020-09-01',
      description: 'A sector-focused fund investing in technology companies with high growth potential.',
      objectives: 'To achieve long-term capital appreciation by investing in technology sector companies with innovative products and services.',
      strategy: 'The fund concentrates investments in technology companies across various sub-sectors including software, hardware, semiconductors, and emerging technologies.',
      riskProfile: {
        volatility: 'Very High',
        marketRisk: 'Very High',
        creditRisk: 'Low',
        liquidityRisk: 'Moderate'
      },
      topHoldings: [
        { name: 'Cloud Computing Inc.', allocation: 12.8, sector: 'Technology' },
        { name: 'AI Solutions Corp', allocation: 11.5, sector: 'Technology' },
        { name: 'Semiconductor Giant', allocation: 10.9, sector: 'Technology' },
        { name: 'Software Innovations', allocation: 9.8, sector: 'Technology' },
        { name: 'Cybersecurity Leaders', allocation: 8.6, sector: 'Technology' }
      ],
      sectorAllocation: [
        { sector: 'Software', allocation: 45.2 },
        { sector: 'Hardware', allocation: 25.8 },
        { sector: 'Semiconductors', allocation: 18.5 },
        { sector: 'Emerging Tech', allocation: 10.5 }
      ],
      fees: {
        managementFee: 1.75,
        performanceFee: 10.0,
        entryLoad: 3.0,
        exitLoad: 1.5
      },
      documents: [
        { name: 'Prospectus', type: 'PDF', size: '2.8 MB' },
        { name: 'Annual Report', type: 'PDF', size: '6.2 MB' },
        { name: 'Factsheet', type: 'PDF', size: '920 KB' }
      ]
    }
  ]);

  // Filter and search funds
  const filteredFunds = funds.filter(fund => {
    const matchesSearch = fund.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fund.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fund.fundManager.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || fund.category.toLowerCase() === filterCategory.toLowerCase();
    const matchesRisk = filterRisk === 'all' || fund.riskLevel.toLowerCase() === filterRisk.toLowerCase();
    return matchesSearch && matchesCategory && matchesRisk;
  });

  // Sort funds
  const sortedFunds = [...filteredFunds].sort((a, b) => {
    switch (sortBy) {
      case 'performance':
        return b.performance['1Y'] - a.performance['1Y'];
      case 'nav':
        return b.navPrice - a.navPrice;
      case 'aum':
        return b.aum - a.aum;
      case 'expense':
        return a.expenseRatio - b.expenseRatio;
      case 'name':
        return a.name.localeCompare(b.name);
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

  const formatNumber = (number) => {
    if (number >= 1000000) {
      return (number / 1000000).toFixed(1) + 'M';
    } else if (number >= 1000) {
      return (number / 1000).toFixed(1) + 'K';
    }
    return number.toString();
  };

  const formatPercentage = (value) => {
    const color = value >= 0 ? 'positive' : 'negative';
    const icon = value >= 0 ? <FaArrowUp /> : <FaArrowDown />;
    return (
      <span className={`percentage ${color}`}>
        {icon} {Math.abs(value).toFixed(2)}%
      </span>
    );
  };

  const getRiskColor = (riskLevel) => {
    switch (riskLevel.toLowerCase()) {
      case 'low':
      case 'very low':
        return 'low';
      case 'moderate':
        return 'moderate';
      case 'high':
      case 'very high':
        return 'high';
      default:
        return 'moderate';
    }
  };

  const toggleFavorite = (fundId) => {
    setFavorites(prev => 
      prev.includes(fundId) 
        ? prev.filter(id => id !== fundId)
        : [...prev, fundId]
    );
  };

  if (currentView === 'details' && selectedFund) {
    return (
      <div className="fund-container">
        <div className="fund-header">
          <div className="header-left">
            <h1>Fund Details</h1>
            <p>Comprehensive information about {selectedFund.name}</p>
          </div>
          <div className="header-actions">
            <button 
              className="btn btn-secondary"
              onClick={() => setCurrentView('explorer')}
            >
              Back to Explorer
            </button>
            <button className="btn btn-primary">
              <FaDollarSign /> Invest Now
            </button>
          </div>
        </div>

        <div className="fund-detail-container">
          {/* Fund Overview */}
          <div className="fund-overview">
            <div className="fund-title-section">
              <div className="fund-title">
                <h2>{selectedFund.name}</h2>
                <button 
                  className={`favorite-btn ${favorites.includes(selectedFund.id) ? 'active' : ''}`}
                  onClick={() => toggleFavorite(selectedFund.id)}
                >
                  {favorites.includes(selectedFund.id) ? <FaStar /> : <FaRegStar />}
                </button>
              </div>
              <div className="fund-badges">
                <span className="category-badge">{selectedFund.category}</span>
                <span className={`risk-badge ${getRiskColor(selectedFund.riskLevel)}`}>
                  {selectedFund.riskLevel} Risk
                </span>
              </div>
            </div>

            <div className="fund-key-metrics">
              <div className="metric-card">
                <div className="metric-value">{formatCurrency(selectedFund.navPrice)}</div>
                <div className="metric-label">Current NAV</div>
                <div className="metric-change">
                  {formatPercentage(selectedFund.performance['1D'])} today
                </div>
              </div>
              <div className="metric-card">
                <div className="metric-value">{formatPercentage(selectedFund.performance['1Y'])}</div>
                <div className="metric-label">1 Year Return</div>
              </div>
              <div className="metric-card">
                <div className="metric-value">{formatCurrency(selectedFund.aum)}</div>
                <div className="metric-label">Assets Under Management</div>
              </div>
              <div className="metric-card">
                <div className="metric-value">{selectedFund.expenseRatio}%</div>
                <div className="metric-label">Expense Ratio</div>
              </div>
            </div>
          </div>

          {/* Performance Chart */}
          <div className="performance-section">
            <h3><FaChartLine /> Performance Overview</h3>
            <div className="performance-periods">
              {Object.entries(selectedFund.performance).map(([period, value]) => (
                <div key={period} className="performance-period">
                  <div className="period-label">{period}</div>
                  <div className="period-value">{formatPercentage(value)}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Fund Information */}
          <div className="fund-info-grid">
            <div className="info-section">
              <h3><FaInfoCircle /> Fund Information</h3>
              <div className="info-details">
                <div className="info-item">
                  <span className="label">Fund Manager:</span>
                  <span className="value">{selectedFund.fundManager}</span>
                </div>
                <div className="info-item">
                  <span className="label">Launch Date:</span>
                  <span className="value">{new Date(selectedFund.launchDate).toLocaleDateString()}</span>
                </div>
                <div className="info-item">
                  <span className="label">Minimum Investment:</span>
                  <span className="value">{formatCurrency(selectedFund.minInvestment)}</span>
                </div>
                <div className="info-item">
                  <span className="label">Category:</span>
                  <span className="value">{selectedFund.category}</span>
                </div>
              </div>
            </div>

            <div className="info-section">
              <h3><FaShieldAlt /> Risk Profile</h3>
              <div className="risk-details">
                {Object.entries(selectedFund.riskProfile).map(([risk, level]) => (
                  <div key={risk} className="risk-item">
                    <span className="risk-label">{risk.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</span>
                    <span className={`risk-level ${getRiskColor(level)}`}>{level}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Fund Description */}
          <div className="fund-description">
            <h3><FaBookOpen /> Fund Prospectus</h3>
            <div className="description-content">
              <div className="description-section">
                <h4>Investment Objective</h4>
                <p>{selectedFund.objectives}</p>
              </div>
              <div className="description-section">
                <h4>Investment Strategy</h4>
                <p>{selectedFund.strategy}</p>
              </div>
              <div className="description-section">
                <h4>Fund Description</h4>
                <p>{selectedFund.description}</p>
              </div>
            </div>
          </div>

          {/* Portfolio Holdings */}
          <div className="portfolio-section">
            <div className="holdings-section">
              <h3><FaLayerGroup /> Top Holdings</h3>
              <div className="holdings-list">
                {selectedFund.topHoldings.map((holding, index) => (
                  <div key={index} className="holding-item">
                    <div className="holding-info">
                      <div className="holding-name">{holding.name}</div>
                      <div className="holding-sector">{holding.sector}</div>
                    </div>
                    <div className="holding-allocation">{holding.allocation}%</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="allocation-section">
              <h3><FaBalanceScale /> Sector Allocation</h3>
              <div className="allocation-chart">
                {selectedFund.sectorAllocation.map((sector, index) => (
                  <div key={index} className="allocation-item">
                    <div className="allocation-bar">
                      <div 
                        className="allocation-fill" 
                        style={{width: `${sector.allocation}%`}}
                      ></div>
                    </div>
                    <div className="allocation-info">
                      <span className="sector-name">{sector.sector}</span>
                      <span className="sector-percentage">{sector.allocation}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Fees and Charges */}
          <div className="fees-section">
            <h3><FaDollarSign /> Fees and Charges</h3>
            <div className="fees-grid">
              <div className="fee-item">
                <div className="fee-label">Management Fee</div>
                <div className="fee-value">{selectedFund.fees.managementFee}%</div>
              </div>
              <div className="fee-item">
                <div className="fee-label">Performance Fee</div>
                <div className="fee-value">{selectedFund.fees.performanceFee}%</div>
              </div>
              <div className="fee-item">
                <div className="fee-label">Entry Load</div>
                <div className="fee-value">{selectedFund.fees.entryLoad}%</div>
              </div>
              <div className="fee-item">
                <div className="fee-label">Exit Load</div>
                <div className="fee-value">{selectedFund.fees.exitLoad}%</div>
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className="documents-section">
            <h3><FaFileAlt /> Documents</h3>
            <div className="documents-grid">
              {selectedFund.documents.map((doc, index) => (
                <div key={index} className="document-item">
                  <div className="document-icon">
                    <FaFileAlt />
                  </div>
                  <div className="document-info">
                    <div className="document-name">{doc.name}</div>
                    <div className="document-meta">{doc.type} • {doc.size}</div>
                  </div>
                  <button className="document-download">
                    <FaDownload />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fund-container">
      <div className="fund-header">
        <div className="header-left">
          <h1>Fund Explorer</h1>
          <p>Discover and analyze investment funds</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-secondary">
            <FaDownload /> Export
          </button>
          <button className="btn btn-primary">
            <FaFileAlt /> Fund Comparison
          </button>
        </div>
      </div>

      <div className="fund-controls">
        <div className="search-box">
          <FaSearch />
          <input
            type="text"
            placeholder="Search funds by name, category, or manager..."
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

          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="performance">Sort by Performance</option>
            <option value="nav">Sort by NAV</option>
            <option value="aum">Sort by AUM</option>
            <option value="expense">Sort by Expense Ratio</option>
            <option value="name">Sort by Name</option>
          </select>
        </div>
      </div>

      {showFilters && (
        <div className="filter-panel">
          <div className="filter-groups">
            <div className="filter-group">
              <label>Category:</label>
              <select 
                value={filterCategory} 
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="equity">Equity</option>
                <option value="debt">Debt</option>
                <option value="hybrid">Hybrid</option>
                <option value="sector">Sector</option>
              </select>
            </div>
            
            <div className="filter-group">
              <label>Risk Level:</label>
              <select 
                value={filterRisk} 
                onChange={(e) => setFilterRisk(e.target.value)}
              >
                <option value="all">All Risk Levels</option>
                <option value="low">Low Risk</option>
                <option value="moderate">Moderate Risk</option>
                <option value="high">High Risk</option>
              </select>
            </div>
          </div>
        </div>
      )}

      <div className="fund-stats">
        <div className="stat-card">
          <div className="stat-value">{funds.length}</div>
          <div className="stat-label">Total Funds</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">
            {formatCurrency(funds.reduce((sum, fund) => sum + fund.aum, 0))}
          </div>
          <div className="stat-label">Total AUM</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">
            {(funds.reduce((sum, fund) => sum + fund.performance['1Y'], 0) / funds.length).toFixed(1)}%
          </div>
          <div className="stat-label">Avg 1Y Return</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{favorites.length}</div>
          <div className="stat-label">Favorites</div>
        </div>
      </div>

      <div className="fund-grid">
        {sortedFunds.map(fund => (
          <div key={fund.id} className="fund-card">
            <div className="fund-card-header">
              <div className="fund-title">
                <h3>{fund.name}</h3>
                <button 
                  className={`favorite-btn ${favorites.includes(fund.id) ? 'active' : ''}`}
                  onClick={() => toggleFavorite(fund.id)}
                >
                  {favorites.includes(fund.id) ? <FaStar /> : <FaRegStar />}
                </button>
              </div>
              <div className="fund-badges">
                <span className="category-badge">{fund.category}</span>
                <span className={`risk-badge ${getRiskColor(fund.riskLevel)}`}>
                  {fund.riskLevel}
                </span>
              </div>
            </div>

            <div className="fund-metrics">
              <div className="metric">
                <div className="metric-label">NAV Price</div>
                <div className="metric-value">{formatCurrency(fund.navPrice)}</div>
              </div>
              <div className="metric">
                <div className="metric-label">1Y Return</div>
                <div className="metric-value">{formatPercentage(fund.performance['1Y'])}</div>
              </div>
              <div className="metric">
                <div className="metric-label">AUM</div>
                <div className="metric-value">{formatCurrency(fund.aum)}</div>
              </div>
              <div className="metric">
                <div className="metric-label">Expense Ratio</div>
                <div className="metric-value">{fund.expenseRatio}%</div>
              </div>
            </div>

            <div className="fund-performance">
              <div className="performance-label">Performance</div>
              <div className="performance-grid">
                <div className="perf-item">
                  <span className="perf-period">1M</span>
                  <span className="perf-value">{formatPercentage(fund.performance['1M'])}</span>
                </div>
                <div className="perf-item">
                  <span className="perf-period">6M</span>
                  <span className="perf-value">{formatPercentage(fund.performance['6M'])}</span>
                </div>
                <div className="perf-item">
                  <span className="perf-period">1Y</span>
                  <span className="perf-value">{formatPercentage(fund.performance['1Y'])}</span>
                </div>
                <div className="perf-item">
                  <span className="perf-period">3Y</span>
                  <span className="perf-value">{formatPercentage(fund.performance['3Y'])}</span>
                </div>
              </div>
            </div>

            <div className="fund-manager">
              <FaUsers />
              <span>Managed by {fund.fundManager}</span>
            </div>

            <div className="fund-actions">
              <button 
                className="btn btn-secondary"
                onClick={() => {
                  setSelectedFund(fund);
                  setCurrentView('details');
                }}
              >
                <FaEye /> View Details
              </button>
              <button className="btn btn-primary">
                <FaDollarSign /> Invest
              </button>
            </div>
          </div>
        ))}
      </div>

      {sortedFunds.length === 0 && (
        <div className="empty-state">
          <FaSearch />
          <h3>No funds found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default Fund; 