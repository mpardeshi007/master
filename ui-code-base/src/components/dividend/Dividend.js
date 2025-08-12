import React, { useState } from 'react';
import { 
  FaCoins, FaCalendarAlt, FaDollarSign, FaChartLine, FaHistory,
  FaCog, FaToggleOn, FaToggleOff, FaDownload, FaEye, FaFilter,
  FaSearch, FaFileAlt, FaPrint, FaPercentage, FaArrowRight,
  FaCheckCircle, FaClock, FaExclamationTriangle, FaInfoCircle,
  FaSave, FaEdit, FaUndo, FaSync, FaArrowUp, FaBell,
  FaUser, FaPiggyBank, FaBuilding, FaFlag
} from 'react-icons/fa';
import './Dividend.css';

const Dividend = () => {
  const [currentView, setCurrentView] = useState('dashboard'); // dashboard, history, settings
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [editingSettings, setEditingSettings] = useState(false);

  // Mock dividend data
  const [upcomingDividends] = useState([
    {
      id: 'DIV001',
      fundName: 'Growth Fund',
      fundCode: 'GF001',
      exDividendDate: '2024-02-15',
      recordDate: '2024-02-16',
      paymentDate: '2024-02-28',
      dividendRate: 2.50,
      estimatedAmount: 1250.00,
      status: 'announced',
      totalUnits: 500,
      divType: 'quarterly',
      taxRate: 20
    },
    {
      id: 'DIV002',
      fundName: 'Balanced Fund',
      fundCode: 'BF001',
      exDividendDate: '2024-02-20',
      recordDate: '2024-02-21',
      paymentDate: '2024-03-05',
      dividendRate: 1.80,
      estimatedAmount: 900.00,
      status: 'pending',
      totalUnits: 500,
      divType: 'quarterly',
      taxRate: 20
    },
    {
      id: 'DIV003',
      fundName: 'Conservative Bond Fund',
      fundCode: 'CF001',
      exDividendDate: '2024-02-25',
      recordDate: '2024-02-26',
      paymentDate: '2024-03-10',
      dividendRate: 1.25,
      estimatedAmount: 625.00,
      status: 'upcoming',
      totalUnits: 500,
      divType: 'monthly',
      taxRate: 15
    }
  ]);

  const [dividendHistory] = useState([
    {
      id: 'HIST001',
      fundName: 'Growth Fund',
      fundCode: 'GF001',
      paymentDate: '2024-01-15',
      dividendRate: 2.45,
      grossAmount: 1225.00,
      taxAmount: 245.00,
      netAmount: 980.00,
      units: 500,
      reinvested: false,
      reinvestedUnits: 0,
      taxYear: 2024,
      quarter: 'Q1'
    },
    {
      id: 'HIST002',
      fundName: 'Balanced Fund',
      fundCode: 'BF001',
      paymentDate: '2024-01-20',
      dividendRate: 1.75,
      grossAmount: 875.00,
      taxAmount: 175.00,
      netAmount: 700.00,
      units: 500,
      reinvested: true,
      reinvestedUnits: 8.75,
      taxYear: 2024,
      quarter: 'Q1'
    },
    {
      id: 'HIST003',
      fundName: 'Conservative Bond Fund',
      fundCode: 'CF001',
      paymentDate: '2023-12-15',
      dividendRate: 1.20,
      grossAmount: 600.00,
      taxAmount: 90.00,
      netAmount: 510.00,
      units: 500,
      reinvested: true,
      reinvestedUnits: 10.20,
      taxYear: 2023,
      quarter: 'Q4'
    },
    {
      id: 'HIST004',
      fundName: 'Technology Fund',
      fundCode: 'TF001',
      paymentDate: '2023-11-30',
      dividendRate: 3.20,
      grossAmount: 1600.00,
      taxAmount: 320.00,
      netAmount: 1280.00,
      units: 500,
      reinvested: false,
      reinvestedUnits: 0,
      taxYear: 2023,
      quarter: 'Q4'
    }
  ]);

  const [reinvestmentSettings, setReinvestmentSettings] = useState({
    'GF001': { enabled: true, percentage: 100, fundSpecific: true },
    'BF001': { enabled: true, percentage: 100, fundSpecific: true },
    'CF001': { enabled: true, percentage: 75, fundSpecific: false },
    'TF001': { enabled: false, percentage: 0, fundSpecific: false }
  });

  const [globalSettings, setGlobalSettings] = useState({
    autoReinvest: true,
    emailNotifications: true,
    smsNotifications: false,
    defaultReinvestmentPercentage: 100,
    taxOptimization: true
  });

  // Helper functions
  const formatCurrency = (amount) => {
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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'announced':
        return <FaBell className="status-icon announced" />;
      case 'pending':
        return <FaClock className="status-icon pending" />;
      case 'upcoming':
        return <FaCalendarAlt className="status-icon upcoming" />;
      case 'processed':
        return <FaCheckCircle className="status-icon processed" />;
      default:
        return <FaInfoCircle className="status-icon" />;
    }
  };

  const calculateTotalUpcoming = () => {
    return upcomingDividends.reduce((sum, div) => sum + div.estimatedAmount, 0);
  };

  const calculateYearlyTotal = (year) => {
    return dividendHistory
      .filter(div => div.taxYear === year)
      .reduce((sum, div) => sum + div.grossAmount, 0);
  };

  const handleSettingsChange = (fundCode, setting, value) => {
    setReinvestmentSettings(prev => ({
      ...prev,
      [fundCode]: {
        ...prev[fundCode],
        [setting]: value
      }
    }));
  };

  const handleGlobalSettingsChange = (setting, value) => {
    setGlobalSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const saveSettings = () => {
    setEditingSettings(false);
    // Here you would typically save to backend
    console.log('Settings saved:', { reinvestmentSettings, globalSettings });
  };

  const resetSettings = () => {
    // Reset to default values
    setEditingSettings(false);
  };

  if (currentView === 'history') {
    const filteredHistory = dividendHistory.filter(div => {
      const matchesSearch = div.fundName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           div.fundCode.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPeriod = selectedPeriod === 'all' || 
                           (selectedPeriod === '2024' && div.taxYear === 2024) ||
                           (selectedPeriod === '2023' && div.taxYear === 2023);
      return matchesSearch && matchesPeriod;
    });

    return (
      <div className="dividend-container">
        <div className="dividend-header">
          <div className="header-left">
            <h1>Dividend History</h1>
            <p>Track your past dividend distributions and tax information</p>
          </div>
          <div className="header-actions">
            <button 
              className="btn btn-secondary"
              onClick={() => setCurrentView('dashboard')}
            >
              Back to Dashboard
            </button>
            <button className="btn btn-secondary">
              <FaDownload /> Export History
            </button>
            <button className="btn btn-primary">
              <FaFileAlt /> Tax Report
            </button>
          </div>
        </div>

        <div className="dividend-controls">
          <div className="search-box">
            <FaSearch />
            <input
              type="text"
              placeholder="Search by fund name or code..."
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
              <option value="all">All Periods</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
            </select>
          </div>
        </div>

        <div className="history-stats">
          <div className="stat-card">
            <div className="stat-value">{formatCurrency(calculateYearlyTotal(2024))}</div>
            <div className="stat-label">2024 YTD Dividends</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{formatCurrency(calculateYearlyTotal(2023))}</div>
            <div className="stat-label">2023 Total Dividends</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">
              {dividendHistory.filter(d => d.reinvested).length}
            </div>
            <div className="stat-label">Reinvested Payments</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">
              {formatCurrency(dividendHistory.reduce((sum, d) => sum + d.taxAmount, 0))}
            </div>
            <div className="stat-label">Total Tax Withheld</div>
          </div>
        </div>

        <div className="history-table-container">
          <table className="history-table">
            <thead>
              <tr>
                <th>Fund</th>
                <th>Payment Date</th>
                <th>Dividend Rate</th>
                <th>Gross Amount</th>
                <th>Tax Amount</th>
                <th>Net Amount</th>
                <th>Reinvested</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredHistory.map(dividend => (
                <tr key={dividend.id}>
                  <td>
                    <div className="fund-info">
                      <div className="fund-name">{dividend.fundName}</div>
                      <div className="fund-code">{dividend.fundCode}</div>
                    </div>
                  </td>
                  <td>{formatDate(dividend.paymentDate)}</td>
                  <td className="dividend-rate">{formatCurrency(dividend.dividendRate)}</td>
                  <td className="gross-amount">{formatCurrency(dividend.grossAmount)}</td>
                  <td className="tax-amount">-{formatCurrency(dividend.taxAmount)}</td>
                  <td className="net-amount">{formatCurrency(dividend.netAmount)}</td>
                  <td>
                    <div className="reinvestment-info">
                      {dividend.reinvested ? (
                        <span className="reinvested">
                          <FaCheckCircle /> {dividend.reinvestedUnits.toFixed(4)} units
                        </span>
                      ) : (
                        <span className="cash-payout">Cash Payout</span>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-icon" title="View Details">
                        <FaEye />
                      </button>
                      <button className="btn-icon" title="Download Receipt">
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

        {filteredHistory.length === 0 && (
          <div className="empty-state">
            <FaHistory />
            <h3>No dividend history found</h3>
            <p>Try adjusting your search or period filter</p>
          </div>
        )}
      </div>
    );
  }

  if (currentView === 'settings') {
    return (
      <div className="dividend-container">
        <div className="dividend-header">
          <div className="header-left">
            <h1>Reinvestment Settings</h1>
            <p>Configure your dividend reinvestment preferences</p>
          </div>
          <div className="header-actions">
            <button 
              className="btn btn-secondary"
              onClick={() => setCurrentView('dashboard')}
            >
              Back to Dashboard
            </button>
            {editingSettings ? (
              <>
                <button 
                  className="btn btn-secondary"
                  onClick={resetSettings}
                >
                  <FaUndo /> Cancel
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={saveSettings}
                >
                  <FaSave /> Save Settings
                </button>
              </>
            ) : (
              <button 
                className="btn btn-primary"
                onClick={() => setEditingSettings(true)}
              >
                <FaEdit /> Edit Settings
              </button>
            )}
          </div>
        </div>

        <div className="settings-container">
          {/* Global Settings */}
          <div className="settings-section">
            <h3><FaCog /> Global Settings</h3>
            <div className="settings-grid">
              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-name">Auto Reinvestment</div>
                  <div className="setting-description">Automatically reinvest dividends when received</div>
                </div>
                <button 
                  className={`toggle-btn ${globalSettings.autoReinvest ? 'active' : ''}`}
                  onClick={() => editingSettings && handleGlobalSettingsChange('autoReinvest', !globalSettings.autoReinvest)}
                  disabled={!editingSettings}
                >
                  {globalSettings.autoReinvest ? <FaToggleOn /> : <FaToggleOff />}
                </button>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-name">Email Notifications</div>
                  <div className="setting-description">Receive email alerts for dividend payments</div>
                </div>
                <button 
                  className={`toggle-btn ${globalSettings.emailNotifications ? 'active' : ''}`}
                  onClick={() => editingSettings && handleGlobalSettingsChange('emailNotifications', !globalSettings.emailNotifications)}
                  disabled={!editingSettings}
                >
                  {globalSettings.emailNotifications ? <FaToggleOn /> : <FaToggleOff />}
                </button>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-name">SMS Notifications</div>
                  <div className="setting-description">Receive SMS alerts for dividend payments</div>
                </div>
                <button 
                  className={`toggle-btn ${globalSettings.smsNotifications ? 'active' : ''}`}
                  onClick={() => editingSettings && handleGlobalSettingsChange('smsNotifications', !globalSettings.smsNotifications)}
                  disabled={!editingSettings}
                >
                  {globalSettings.smsNotifications ? <FaToggleOn /> : <FaToggleOff />}
                </button>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-name">Tax Optimization</div>
                  <div className="setting-description">Optimize reinvestment timing for tax efficiency</div>
                </div>
                <button 
                  className={`toggle-btn ${globalSettings.taxOptimization ? 'active' : ''}`}
                  onClick={() => editingSettings && handleGlobalSettingsChange('taxOptimization', !globalSettings.taxOptimization)}
                  disabled={!editingSettings}
                >
                  {globalSettings.taxOptimization ? <FaToggleOn /> : <FaToggleOff />}
                </button>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-name">Default Reinvestment %</div>
                  <div className="setting-description">Default percentage for new fund investments</div>
                </div>
                <div className="percentage-input">
                  <input
                    type="number"
                    value={globalSettings.defaultReinvestmentPercentage}
                    onChange={(e) => editingSettings && handleGlobalSettingsChange('defaultReinvestmentPercentage', parseInt(e.target.value))}
                    min="0"
                    max="100"
                    disabled={!editingSettings}
                  />
                  <span>%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Fund-Specific Settings */}
          <div className="settings-section">
            <h3><FaPiggyBank /> Fund-Specific Settings</h3>
            <div className="fund-settings-grid">
              {Object.entries(reinvestmentSettings).map(([fundCode, settings]) => {
                const fundName = upcomingDividends.find(d => d.fundCode === fundCode)?.fundName || 
                                dividendHistory.find(d => d.fundCode === fundCode)?.fundName || 
                                `Fund ${fundCode}`;
                
                return (
                  <div key={fundCode} className="fund-setting-card">
                    <div className="fund-setting-header">
                      <div className="fund-info">
                        <div className="fund-name">{fundName}</div>
                        <div className="fund-code">{fundCode}</div>
                      </div>
                      <button 
                        className={`toggle-btn ${settings.enabled ? 'active' : ''}`}
                        onClick={() => editingSettings && handleSettingsChange(fundCode, 'enabled', !settings.enabled)}
                        disabled={!editingSettings}
                      >
                        {settings.enabled ? <FaToggleOn /> : <FaToggleOff />}
                      </button>
                    </div>

                    <div className="fund-setting-details">
                      <div className="setting-row">
                        <span className="setting-label">Reinvestment %:</span>
                        <div className="percentage-input">
                          <input
                            type="number"
                            value={settings.percentage}
                            onChange={(e) => editingSettings && handleSettingsChange(fundCode, 'percentage', parseInt(e.target.value))}
                            min="0"
                            max="100"
                            disabled={!editingSettings || !settings.enabled}
                          />
                          <span>%</span>
                        </div>
                      </div>

                      <div className="setting-row">
                        <span className="setting-label">Fund-Specific:</span>
                        <button 
                          className={`toggle-btn small ${settings.fundSpecific ? 'active' : ''}`}
                          onClick={() => editingSettings && handleSettingsChange(fundCode, 'fundSpecific', !settings.fundSpecific)}
                          disabled={!editingSettings || !settings.enabled}
                        >
                          {settings.fundSpecific ? <FaToggleOn /> : <FaToggleOff />}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dividend-container">
      <div className="dividend-header">
        <div className="header-left">
          <h1>Dividend Dashboard</h1>
          <p>Monitor upcoming dividend payments and manage reinvestment options</p>
        </div>
        <div className="header-actions">
          <button 
            className="btn btn-secondary"
            onClick={() => setCurrentView('history')}
          >
            <FaHistory /> View History
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => setCurrentView('settings')}
          >
            <FaCog /> Settings
          </button>
          <button className="btn btn-primary">
            <FaDownload /> Export Report
          </button>
        </div>
      </div>

      {/* Dashboard Stats */}
      <div className="dividend-stats">
        <div className="stat-card highlight">
          <div className="stat-icon">
            <FaCoins />
          </div>
          <div className="stat-content">
            <div className="stat-value">{formatCurrency(calculateTotalUpcoming())}</div>
            <div className="stat-label">Upcoming Dividends</div>
            <div className="stat-change">
              <FaArrowUp /> Next 30 days
            </div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-value">{upcomingDividends.length}</div>
          <div className="stat-label">Scheduled Payments</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-value">{formatCurrency(calculateYearlyTotal(2024))}</div>
          <div className="stat-label">2024 YTD Received</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-value">
            {Object.values(reinvestmentSettings).filter(s => s.enabled).length}
          </div>
          <div className="stat-label">Auto-Reinvest Funds</div>
        </div>
      </div>

      {/* Upcoming Dividends */}
      <div className="upcoming-dividends">
        <div className="section-header">
          <h3><FaCalendarAlt /> Upcoming Dividend Payments</h3>
          <button className="btn btn-link">
            View All <FaArrowRight />
          </button>
        </div>

        <div className="dividends-grid">
          {upcomingDividends.map(dividend => (
            <div key={dividend.id} className="dividend-card">
              <div className="dividend-card-header">
                <div className="fund-info">
                  <h4>{dividend.fundName}</h4>
                  <span className="fund-code">{dividend.fundCode}</span>
                </div>
                <div className="dividend-status">
                  {getStatusIcon(dividend.status)}
                  <span className={`status-text ${dividend.status}`}>
                    {dividend.status.charAt(0).toUpperCase() + dividend.status.slice(1)}
                  </span>
                </div>
              </div>

              <div className="dividend-amount">
                <div className="amount-label">Estimated Dividend</div>
                <div className="amount-value">{formatCurrency(dividend.estimatedAmount)}</div>
                <div className="amount-rate">@ {formatCurrency(dividend.dividendRate)} per unit</div>
              </div>

              <div className="dividend-dates">
                <div className="date-item">
                  <span className="date-label">Ex-Dividend:</span>
                  <span className="date-value">{formatDate(dividend.exDividendDate)}</span>
                </div>
                <div className="date-item">
                  <span className="date-label">Payment:</span>
                  <span className="date-value">{formatDate(dividend.paymentDate)}</span>
                </div>
              </div>

              <div className="dividend-details">
                <div className="detail-item">
                  <FaBuilding />
                  <span>{dividend.totalUnits} units held</span>
                </div>
                <div className="detail-item">
                  <FaFlag />
                  <span>{dividend.taxRate}% tax rate</span>
                </div>
              </div>

              <div className="reinvestment-status">
                {reinvestmentSettings[dividend.fundCode]?.enabled ? (
                  <div className="reinvest-enabled">
                    <FaSync className="reinvest-icon" />
                    <span>Auto-Reinvest: {reinvestmentSettings[dividend.fundCode].percentage}%</span>
                  </div>
                ) : (
                  <div className="reinvest-disabled">
                    <FaDollarSign className="cash-icon" />
                    <span>Cash Payout</span>
                  </div>
                )}
              </div>

              <div className="dividend-actions">
                <button className="btn btn-secondary btn-small">
                  <FaEye /> View Details
                </button>
                <button className="btn btn-primary btn-small">
                  <FaCog /> Modify Settings
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions-section">
        <h3>Quick Actions</h3>
        <div className="quick-actions-grid">
          <button className="quick-action-card" onClick={() => setCurrentView('settings')}>
            <FaCog />
            <span>Manage Reinvestment</span>
          </button>
          <button className="quick-action-card" onClick={() => setCurrentView('history')}>
            <FaHistory />
            <span>View History</span>
          </button>
          <button className="quick-action-card">
            <FaFileAlt />
            <span>Tax Documents</span>
          </button>
          <button className="quick-action-card">
            <FaChartLine />
            <span>Performance Impact</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dividend; 