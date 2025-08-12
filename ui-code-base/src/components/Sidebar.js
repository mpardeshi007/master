import React from 'react';
import { FaTimes } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = ({ menuItems, activeSection, onSectionChange, isOpen, onClose }) => {
  const handleMenuClick = (sectionId) => {
    onSectionChange(sectionId);
  };

  return (
    <>
      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        {/* Mobile Close Button */}
        <div className="sidebar-mobile-header">
          <button className="sidebar-close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="sidebar-nav">
          <div className="sidebar-brand">
            <div className="brand-icon">
              <span>TA</span>
            </div>
            <span className="brand-text">Transfer Agency</span>
          </div>

          <div className="nav-section">
            <div className="nav-section-title">Main Navigation</div>
            <ul className="nav-menu">
              {menuItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeSection === item.id;
                
                return (
                  <li key={item.id} className="nav-item">
                    <button
                      className={`nav-link ${isActive ? 'active' : ''}`}
                      onClick={() => handleMenuClick(item.id)}
                      title={item.label}
                    >
                      <div className="nav-icon">
                        <IconComponent />
                      </div>
                      <span className="nav-text">{item.label}</span>
                      {isActive && <div className="active-indicator" />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Additional Info Section */}
          <div className="sidebar-footer">
            <div className="sidebar-info">
              <div className="info-item">
                <div className="info-label">Version</div>
                <div className="info-value">v2.1.0</div>
              </div>
              <div className="info-item">
                <div className="info-label">Status</div>
                <div className="status-indicator">
                  <span className="status-dot active"></span>
                  <span className="status-text">Online</span>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}
    </>
  );
};

export default Sidebar; 