import React, { useState } from 'react';
import { 
  FaBell, FaQuestionCircle, FaUser, FaSignOutAlt, FaCog, 
  FaBars, FaTimes, FaChevronDown, FaGlobe 
} from 'react-icons/fa';

const TopNavigation = ({ onLogout, onToggleSidebar, sidebarOpen }) => {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationCount] = useState(3); // Mock notification count

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  const handleLogout = () => {
    setProfileDropdownOpen(false);
    onLogout();
  };

  const handleNotificationClick = () => {
    alert('Notifications: You have 3 new system messages');
  };

  const handleHelpClick = () => {
    alert('Help Center: FAQ and Live Support will be available here');
  };

  return (
    <nav className="top-navigation">
      <div className="nav-left">
        {/* Mobile menu toggle */}
        <button className="mobile-menu-toggle" onClick={onToggleSidebar}>
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Logo */}
        <div className="nav-logo">
          <div className="logo-icon">
            <FaGlobe />
          </div>
          <span className="logo-text">Transfer Agency Hub</span>
        </div>
      </div>

      <div className="nav-right">
        {/* Notifications */}
        <button className="nav-icon-btn" onClick={handleNotificationClick}>
          <FaBell />
          {notificationCount > 0 && (
            <span className="notification-badge">{notificationCount}</span>
          )}
        </button>

        {/* Help */}
        <button className="nav-icon-btn" onClick={handleHelpClick}>
          <FaQuestionCircle />
        </button>

        {/* User Profile Dropdown */}
        <div className="user-profile-dropdown">
          <button className="profile-btn" onClick={toggleProfileDropdown}>
            <div className="profile-avatar">
              <FaUser />
            </div>
            <span className="profile-name">Anand Digvijay</span>
            <FaChevronDown className={`dropdown-arrow ${profileDropdownOpen ? 'open' : ''}`} />
          </button>

          {profileDropdownOpen && (
            <div className="dropdown-menu">
              <div className="dropdown-header">
                <div className="user-info">
                  <div className="user-avatar">
                    <FaUser />
                  </div>
                  <div className="user-details">
                    <div className="user-name">Anand Digvijay</div>
                    <div className="user-email">anand@transferagencyhub.com</div>
                  </div>
                </div>
              </div>
              
              <div className="dropdown-divider"></div>
              
              <button className="dropdown-item">
                <FaUser />
                <span>Profile</span>
              </button>
              
              <button className="dropdown-item">
                <FaCog />
                <span>Settings</span>
              </button>
              
              <div className="dropdown-divider"></div>
              
              <button className="dropdown-item logout" onClick={handleLogout}>
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Overlay for dropdown */}
      {profileDropdownOpen && (
        <div 
          className="dropdown-overlay" 
          onClick={() => setProfileDropdownOpen(false)}
        ></div>
      )}
    </nav>
  );
};

export default TopNavigation; 