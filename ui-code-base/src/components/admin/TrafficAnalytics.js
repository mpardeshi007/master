import React, { useState, useEffect } from 'react';
import { 
    LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { 
    FaChartLine, FaChartBar, FaChartPie, FaClock, FaServer, 
    FaExclamationTriangle, FaCheckCircle, FaTimes 
} from 'react-icons/fa';
import monitoringService from '../../services/monitoringService';
import './TrafficAnalytics.css';

const TrafficAnalytics = () => {
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('hourly');
    
    // Filters state
    const [timeRange, setTimeRange] = useState('24h');
    const [selectedServices, setSelectedServices] = useState([]);
    const [selectedMethods, setSelectedMethods] = useState([]);
    const [selectedStatuses, setSelectedStatuses] = useState([]);
    const [autoRefresh, setAutoRefresh] = useState(true);
    const [refreshInterval, setRefreshInterval] = useState(30);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

    useEffect(() => {
        loadAnalytics();
    }, []);

    // Auto-refresh effect
    useEffect(() => {
        if (!autoRefresh) return;

        const interval = setInterval(() => {
            loadAnalytics();
        }, refreshInterval * 1000);

        return () => clearInterval(interval);
    }, [autoRefresh, refreshInterval]);

    const loadAnalytics = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await monitoringService.getTrafficAnalytics();
            setAnalytics(data);
        } catch (err) {
            setError('Failed to load analytics: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const formatHourlyData = (data) => {
        return data?.map(item => ({
            time: new Date(item.timestamp).toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit' 
            }),
            requests: item.count,
            avgResponseTime: Math.round(item.averageResponseTime),
            errors: item.errorCount
        })) || [];
    };

    const applyFilters = (data) => {
        if (!data) return data;

        let filteredData = { ...data };

        // Filter by time range
        if (timeRange !== '24h') {
            const hours = timeRange === '1h' ? 1 : timeRange === '6h' ? 6 : 12;
            const cutoffTime = new Date(Date.now() - hours * 60 * 60 * 1000);
            
            filteredData.hourlyTraffic = data.hourlyTraffic?.filter(item => 
                new Date(item.timestamp) > cutoffTime
            ) || [];
        }

        // Filter by selected services
        if (selectedServices.length > 0) {
            filteredData.requestsByService = Object.fromEntries(
                Object.entries(data.requestsByService || {}).filter(([service]) =>
                    selectedServices.includes(service)
                )
            );
        }

        // Filter by selected methods
        if (selectedMethods.length > 0) {
            filteredData.requestsByMethod = Object.fromEntries(
                Object.entries(data.requestsByMethod || {}).filter(([method]) =>
                    selectedMethods.includes(method)
                )
            );
        }

        // Filter by selected statuses
        if (selectedStatuses.length > 0) {
            filteredData.requestsByStatus = Object.fromEntries(
                Object.entries(data.requestsByStatus || {}).filter(([status]) =>
                    selectedStatuses.includes(status)
                )
            );
        }

        return filteredData;
    };

    const formatDailyData = (data) => {
        return data?.map(item => ({
            date: new Date(item.timestamp).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
            }),
            requests: item.count,
            avgResponseTime: Math.round(item.averageResponseTime),
            errors: item.errorCount
        })) || [];
    };

    const formatServiceData = (data) => {
        return Object.entries(data || {}).map(([service, count]) => ({
            service: service.replace('_SERVICE', ''),
            requests: count
        }));
    };

    const formatMethodData = (data) => {
        return Object.entries(data || {}).map(([method, count]) => ({
            method,
            requests: count
        }));
    };

    const formatStatusData = (data) => {
        return Object.entries(data || {}).map(([status, count]) => ({
            status: status === '200' ? 'Success' : status === '400' ? 'Bad Request' : 
                   status === '401' ? 'Unauthorized' : status === '500' ? 'Server Error' : status,
            requests: count
        }));
    };

    if (loading) {
        return (
            <div className="analytics-loading">
                <FaChartLine className="spinning" />
                <p>Loading traffic analytics...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="analytics-error">
                <FaExclamationTriangle />
                <p>{error}</p>
                <button onClick={loadAnalytics} className="btn btn-primary">
                    Retry
                </button>
            </div>
        );
    }

    if (!analytics) {
        return (
            <div className="analytics-empty">
                <FaChartLine />
                <p>No analytics data available</p>
                <button onClick={loadAnalytics} className="btn btn-primary">
                    Load Analytics
                </button>
            </div>
        );
    }

    // Apply filters to analytics data
    const filteredAnalytics = applyFilters(analytics);

    return (
        <div className="traffic-analytics">
                    <div className="analytics-header">
            <h2><FaChartLine /> API Traffic Analytics</h2>
            <div className="analytics-actions">
                <div className="filter-controls">
                    <select 
                        value={timeRange} 
                        onChange={(e) => setTimeRange(e.target.value)}
                        className="filter-select"
                    >
                        <option value="1h">Last 1 Hour</option>
                        <option value="6h">Last 6 Hours</option>
                        <option value="12h">Last 12 Hours</option>
                        <option value="24h">Last 24 Hours</option>
                    </select>
                    
                    <select 
                        value={refreshInterval} 
                        onChange={(e) => setRefreshInterval(Number(e.target.value))}
                        className="filter-select"
                    >
                        <option value={10}>10s Refresh</option>
                        <option value={30}>30s Refresh</option>
                        <option value={60}>1m Refresh</option>
                        <option value={300}>5m Refresh</option>
                    </select>
                    
                    <label className="auto-refresh-toggle">
                        <input 
                            type="checkbox" 
                            checked={autoRefresh} 
                            onChange={(e) => setAutoRefresh(e.target.checked)}
                        />
                        Auto Refresh
                    </label>
                </div>
                
                <button onClick={loadAnalytics} className="btn btn-secondary">
                    <FaClock /> Refresh Now
                </button>
            </div>
        </div>

            {/* Filter Summary */}
            {(selectedServices.length > 0 || selectedMethods.length > 0 || selectedStatuses.length > 0) && (
                <div className="filter-summary">
                    <h4>Active Filters:</h4>
                    <div className="active-filters">
                        {selectedServices.length > 0 && (
                            <span className="active-filter">
                                Services: {selectedServices.length} selected
                            </span>
                        )}
                        {selectedMethods.length > 0 && (
                            <span className="active-filter">
                                Methods: {selectedMethods.length} selected
                            </span>
                        )}
                        {selectedStatuses.length > 0 && (
                            <span className="active-filter">
                                Statuses: {selectedStatuses.length} selected
                            </span>
                        )}
                        <button 
                            onClick={() => {
                                setSelectedServices([]);
                                setSelectedMethods([]);
                                setSelectedStatuses([]);
                            }}
                            className="clear-all-filters-btn"
                        >
                            Clear All Filters
                        </button>
                    </div>
                </div>
            )}

            {/* Filters Section */}
            <div className="analytics-filters">
                <div className="filter-group">
                    <div className="filter-header">
                        <label>Services:</label>
                        <div className="filter-actions">
                            <button 
                                onClick={() => setSelectedServices([])} 
                                className="filter-action-btn"
                            >
                                Select All
                            </button>
                            <button 
                                onClick={() => setSelectedServices(Object.keys(analytics.requestsByService || {}))} 
                                className="filter-action-btn"
                            >
                                Clear All
                            </button>
                        </div>
                    </div>
                    <div className="filter-options">
                        {Object.keys(analytics.requestsByService || {}).map(service => {
                            const isSelected = selectedServices.length === 0 || selectedServices.includes(service);
                            return (
                                <label key={service} className={`filter-option ${isSelected ? 'selected' : ''}`}>
                                    <input 
                                        type="checkbox" 
                                        checked={isSelected}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                // If no services are selected, select all except this one
                                                if (selectedServices.length === 0) {
                                                    const allServices = Object.keys(analytics.requestsByService || {});
                                                    setSelectedServices(allServices.filter(s => s !== service));
                                                } else {
                                                    // Remove this service from selection
                                                    setSelectedServices(prev => prev.filter(s => s !== service));
                                                }
                                            } else {
                                                // Add this service to selection
                                                setSelectedServices(prev => [...prev, service]);
                                            }
                                        }}
                                    />
                                    <span className="filter-label">{service.replace('_SERVICE', '')}</span>
                                </label>
                            );
                        })}
                    </div>
                </div>
                
                <div className="filter-group">
                    <div className="filter-header">
                        <label>HTTP Methods:</label>
                        <div className="filter-actions">
                            <button 
                                onClick={() => setSelectedMethods([])} 
                                className="filter-action-btn"
                            >
                                Select All
                            </button>
                            <button 
                                onClick={() => setSelectedMethods(Object.keys(analytics.requestsByMethod || {}))} 
                                className="filter-action-btn"
                            >
                                Clear All
                            </button>
                        </div>
                    </div>
                    <div className="filter-options">
                        {Object.keys(analytics.requestsByMethod || {}).map(method => {
                            const isSelected = selectedMethods.length === 0 || selectedMethods.includes(method);
                            return (
                                <label key={method} className={`filter-option ${isSelected ? 'selected' : ''}`}>
                                    <input 
                                        type="checkbox" 
                                        checked={isSelected}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                // If no methods are selected, select all except this one
                                                if (selectedMethods.length === 0) {
                                                    const allMethods = Object.keys(analytics.requestsByMethod || {});
                                                    setSelectedMethods(allMethods.filter(m => m !== method));
                                                } else {
                                                    // Remove this method from selection
                                                    setSelectedMethods(prev => prev.filter(m => m !== method));
                                                }
                                            } else {
                                                // Add this method to selection
                                                setSelectedMethods(prev => [...prev, method]);
                                            }
                                        }}
                                    />
                                    <span className="filter-label">{method}</span>
                                </label>
                            );
                        })}
                    </div>
                </div>
                
                <div className="filter-group">
                    <div className="filter-header">
                        <label>Status Codes:</label>
                        <div className="filter-actions">
                            <button 
                                onClick={() => setSelectedStatuses([])} 
                                className="filter-action-btn"
                            >
                                Select All
                            </button>
                            <button 
                                onClick={() => setSelectedStatuses(Object.keys(analytics.requestsByStatus || {}))} 
                                className="filter-action-btn"
                            >
                                Clear All
                            </button>
                        </div>
                    </div>
                    <div className="filter-options">
                        {Object.keys(analytics.requestsByStatus || {}).map(status => {
                            const isSelected = selectedStatuses.length === 0 || selectedStatuses.includes(status);
                            return (
                                <label key={status} className={`filter-option ${isSelected ? 'selected' : ''}`}>
                                    <input 
                                        type="checkbox" 
                                        checked={isSelected}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                // If no statuses are selected, select all except this one
                                                if (selectedStatuses.length === 0) {
                                                    const allStatuses = Object.keys(analytics.requestsByStatus || {});
                                                    setSelectedStatuses(allStatuses.filter(s => s !== status));
                                                } else {
                                                    // Remove this status from selection
                                                    setSelectedStatuses(prev => prev.filter(s => s !== status));
                                                }
                                            } else {
                                                // Add this status to selection
                                                setSelectedStatuses(prev => [...prev, status]);
                                            }
                                        }}
                                    />
                                    <span className="filter-label">{status}</span>
                                </label>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Traffic Overview Cards */}
            <div className="analytics-overview">
                <div className="overview-card">
                    <div className="overview-icon">
                        <FaServer />
                    </div>
                    <div className="overview-content">
                        <h3>Total Requests</h3>
                        <p className="overview-value">
                            {filteredAnalytics.hourlyTraffic.reduce((sum, item) => sum + item.count, 0)}
                        </p>
                        <span className="overview-period">Last 24 hours</span>
                    </div>
                </div>

                <div className="overview-card">
                    <div className="overview-icon">
                        <FaCheckCircle />
                    </div>
                    <div className="overview-content">
                        <h3>Success Rate</h3>
                        <p className="overview-value">
                            {filteredAnalytics.requestsByStatus && filteredAnalytics.requestsByStatus['200'] ? 
                                Math.round((filteredAnalytics.requestsByStatus['200'] / 
                                    Object.values(filteredAnalytics.requestsByStatus).reduce((a, b) => a + b, 0)) * 100) : 0}%
                        </p>
                        <span className="overview-period">Overall</span>
                    </div>
                </div>

                <div className="overview-card">
                    <div className="overview-icon">
                        <FaExclamationTriangle />
                    </div>
                    <div className="overview-content">
                        <h3>Error Rate</h3>
                        <p className="overview-value">
                            {filteredAnalytics.hourlyTraffic.reduce((sum, item) => sum + item.errorCount, 0)}
                        </p>
                        <span className="overview-period">Last 24 hours</span>
                    </div>
                </div>

                <div className="overview-card">
                    <div className="overview-icon">
                        <FaClock />
                    </div>
                    <div className="overview-content">
                        <h3>Avg Response Time</h3>
                        <p className="overview-value">
                            {Math.round(filteredAnalytics.hourlyTraffic.reduce((sum, item) => sum + item.averageResponseTime, 0) / 
                                Math.max(filteredAnalytics.hourlyTraffic.length, 1))}ms
                        </p>
                        <span className="overview-period">Last 24 hours</span>
                    </div>
                </div>
            </div>

            {/* Traffic Charts */}
            <div className="analytics-charts">
                <div className="chart-tabs">
                    <button 
                        className={`chart-tab ${activeTab === 'hourly' ? 'active' : ''}`}
                        onClick={() => setActiveTab('hourly')}
                    >
                        <FaClock /> Hourly Traffic
                    </button>
                    <button 
                        className={`chart-tab ${activeTab === 'daily' ? 'active' : ''}`}
                        onClick={() => setActiveTab('daily')}
                    >
                        <FaChartLine /> Daily Traffic
                    </button>
                </div>

                <div className="chart-container">
                    {activeTab === 'hourly' && (
                        <ResponsiveContainer width="100%" height={400}>
                            <AreaChart data={formatHourlyData(filteredAnalytics.hourlyTraffic)}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="time" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Area 
                                    type="monotone" 
                                    dataKey="requests" 
                                    stackId="1" 
                                    stroke="#8884d8" 
                                    fill="#8884d8" 
                                    name="Requests"
                                />
                                <Area 
                                    type="monotone" 
                                    dataKey="errors" 
                                    stackId="1" 
                                    stroke="#ff7300" 
                                    fill="#ff7300" 
                                    name="Errors"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    )}

                    {activeTab === 'daily' && (
                        <ResponsiveContainer width="100%" height={400}>
                            <BarChart data={formatDailyData(filteredAnalytics.dailyTraffic)}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="requests" fill="#8884d8" name="Requests" />
                                <Bar dataKey="errors" fill="#ff7300" name="Errors" />
                            </BarChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </div>

            {/* Distribution Charts */}
            <div className="analytics-distributions">
                <div className="distribution-chart">
                    <h3><FaServer /> Requests by Service</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                                                    <Pie
                            data={formatServiceData(filteredAnalytics.requestsByService)}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ service, percent }) => `${service} ${(percent * 100).toFixed(0)}%`}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="requests"
                            >
                                {formatServiceData(filteredAnalytics.requestsByService).map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="distribution-chart">
                    <h3><FaChartBar /> Requests by Method</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={formatMethodData(filteredAnalytics.requestsByMethod)}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="method" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="requests" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="distribution-chart">
                    <h3><FaExclamationTriangle /> Response Status Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={formatStatusData(filteredAnalytics.requestsByStatus)}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="status" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="requests" fill="#ffc658" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default TrafficAnalytics; 