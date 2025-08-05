import React, { useState } from 'react';
import { FaUser, FaLock, FaGlobe, FaEye, FaEyeSlash } from 'react-icons/fa';
import './Login.css';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    language: 'en',
    rememberMe: false,
    captchaVerified: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'zh', name: 'Chinese' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.captchaVerified) {
      newErrors.captcha = 'Please verify the captcha';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Simulate login process
      setTimeout(() => {
        onLogin();
      }, 1000);
    }
  };

  const handleForgotPassword = () => {
    alert('Password recovery link has been sent to your registered email address.');
  };

  const handleCaptchaChange = (e) => {
    setFormData(prev => ({
      ...prev,
      captchaVerified: e.target.checked
    }));
    if (errors.captcha) {
      setErrors(prev => ({ ...prev, captcha: '' }));
    }
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="login-overlay"></div>
      </div>
      
      <div className="login-content">
        <div className="login-card card">
          <div className="login-header">
            <div className="logo">
              <div className="logo-icon">
                <FaGlobe />
              </div>
              <h1>Transfer Agency Hub</h1>
            </div>
            <p className="login-subtitle">Secure Financial Management Platform</p>
          </div>
          
          <div className="login-body card-body">
            {/* Language Selector */}
            <div className="language-selector mb-4">
              <select
                name="language"
                value={formData.language}
                onChange={handleInputChange}
                className="form-select"
              >
                {languages.map(lang => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>

            <form onSubmit={handleSubmit} className="login-form">
              {/* Username Field */}
              <div className="form-group">
                <label htmlFor="username" className="form-label">
                  <FaUser className="input-icon" />
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleInputChange}
                  className={`form-input ${errors.username ? 'error' : ''}`}
                  placeholder="Enter your username"
                />
                {errors.username && <span className="error-message">{errors.username}</span>}
              </div>

              {/* Password Field */}
              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  <FaLock className="input-icon" />
                  Password
                </label>
                <div className="password-input-wrapper">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`form-input ${errors.password ? 'error' : ''}`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.password && <span className="error-message">{errors.password}</span>}
              </div>

              {/* Captcha Verification */}
              <div className="form-group">
                <div className="captcha-section">
                  <div className="captcha-box">
                    <div className="captcha-challenge">
                      <span className="captcha-text">5 + 3 = ?</span>
                      <input
                        type="text"
                        className="captcha-input"
                        placeholder="Answer"
                        readOnly
                        value={formData.captchaVerified ? '8' : ''}
                      />
                    </div>
                    <div className="checkbox-group">
                      <input
                        type="checkbox"
                        id="captcha"
                        checked={formData.captchaVerified}
                        onChange={handleCaptchaChange}
                        className="checkbox"
                      />
                      <label htmlFor="captcha">I'm not a robot</label>
                    </div>
                  </div>
                  {errors.captcha && <span className="error-message">{errors.captcha}</span>}
                </div>
              </div>

              {/* Remember Me */}
              <div className="form-group">
                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="checkbox"
                  />
                  <label htmlFor="rememberMe">Remember me</label>
                </div>
              </div>

              {/* Login Button */}
              <button type="submit" className="btn btn-primary w-full login-button">
                Sign In
              </button>

              {/* Forgot Password */}
              <div className="forgot-password mt-4 text-center">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="forgot-link"
                >
                  Forgot your password?
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 