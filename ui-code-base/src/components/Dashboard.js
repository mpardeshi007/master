import React, { useState } from 'react';
import { 
  FaHome, FaUsers, FaExchangeAlt, FaPiggyBank, FaChartBar, 
  FaBalanceScale, FaShieldAlt, FaCog, FaBell, FaQuestionCircle,
  FaUser, FaSignOutAlt, FaSearch, FaChevronDown, FaBars, FaTimes,
  FaCoins
} from 'react-icons/fa';
import TopNavigation from './TopNavigation';
import Sidebar from './Sidebar';
import DashboardContent from './DashboardContent';
import Investor from './investor/Investor';
import Transaction from './transaction/Transaction';
import Fund from './fund/Fund';
import Dividend from './dividend/Dividend';
import Reports from './reports/Reports';
import Reconciliation from './reconciliation/Reconciliation';
import Admin from './admin/Admin';
import './Dashboard.css';

const Dashboard = ({ onLogout }) => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FaHome },
    { id: 'investors', label: 'Investors', icon: FaUsers },
    { id: 'transactions', label: 'Transactions', icon: FaExchangeAlt },
    { id: 'funds', label: 'Funds', icon: FaPiggyBank },
    { id: 'dividend', label: 'Dividend & Distribution', icon: FaCoins },
    { id: 'reports', label: 'Reports & Compliance', icon: FaChartBar },
    { id: 'reconciliation', label: 'Reconciliation', icon: FaBalanceScale },   
    { id: 'admin', label: 'Admin Settings', icon: FaCog }
  ];

  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
    setSidebarOpen(false); // Close sidebar on mobile after selection
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="dashboard-container">
      {/* Top Navigation */}
      <TopNavigation 
        onLogout={onLogout} 
        onToggleSidebar={toggleSidebar}
        sidebarOpen={sidebarOpen}
      />

      <div className="dashboard-body">
        {/* Sidebar */}
        <Sidebar 
          menuItems={menuItems}
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main Content */}
        <main className="dashboard-main">
          <div className="dashboard-content">
            {activeSection === 'dashboard' && <DashboardContent />}
            {activeSection === 'investors' && <Investor />}
            {activeSection === 'transactions' && <Transaction />}
            {activeSection === 'funds' && <Fund />}
            {activeSection === 'dividend' && <Dividend />}
            {activeSection === 'reports' && <Reports />}
            {activeSection === 'reconciliation' && <Reconciliation />}
            
            {activeSection === 'admin' && <Admin />}
          </div>
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>}
    </div>
  );
};

export default Dashboard; 