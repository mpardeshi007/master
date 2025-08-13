import authService from './authService';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

class MonitoringService {
    constructor() {
        this.baseURL = `${API_BASE_URL}/monitoring`;
    }

    async getAuthHeaders() {
        const token = authService.getToken();
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };
    }

    async getAllServices() {
        try {
            const response = await fetch(`${this.baseURL}/services`, {
                method: 'GET',
                headers: await this.getAuthHeaders()
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('Services data received:', data);
            return data;
        } catch (error) {
            console.error('Error fetching services:', error);
            throw error;
        }
    }

    async getServiceHealth(serviceId) {
        try {
            const response = await fetch(`${this.baseURL}/services/${serviceId}`, {
                method: 'GET',
                headers: await this.getAuthHeaders()
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error fetching service health:', error);
            throw error;
        }
    }

    async getApiLogs(limit = 50, serviceId = null, severity = null) {
        try {
            const params = new URLSearchParams();
            if (limit) params.append('limit', limit);
            if (serviceId) params.append('serviceId', serviceId);
            if (severity) params.append('severity', severity);

            const response = await fetch(`${this.baseURL}/logs?${params}`, {
                method: 'GET',
                headers: await this.getAuthHeaders()
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error fetching API logs:', error);
            throw error;
        }
    }

    async getSystemMetrics() {
        try {
            const response = await fetch(`${this.baseURL}/metrics`, {
                method: 'GET',
                headers: await this.getAuthHeaders()
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error fetching system metrics:', error);
            throw error;
        }
    }

    async testServiceConnection(serviceId) {
        try {
            const response = await fetch(`${this.baseURL}/services/${serviceId}/test`, {
                method: 'POST',
                headers: await this.getAuthHeaders()
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.text();
        } catch (error) {
            console.error('Error testing service connection:', error);
            throw error;
        }
    }

    async resetServiceMetrics(serviceId) {
        try {
            const response = await fetch(`${this.baseURL}/services/${serviceId}/reset`, {
                method: 'POST',
                headers: await this.getAuthHeaders()
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.text();
        } catch (error) {
            console.error('Error resetting service metrics:', error);
            throw error;
        }
    }

    async registerService(serviceData) {
        try {
            const response = await fetch(`${this.baseURL}/services`, {
                method: 'POST',
                headers: await this.getAuthHeaders(),
                body: JSON.stringify(serviceData)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.text();
        } catch (error) {
            console.error('Error registering service:', error);
            throw error;
        }
    }

    async unregisterService(serviceId) {
        try {
            const response = await fetch(`${this.baseURL}/services/${serviceId}`, {
                method: 'DELETE',
                headers: await this.getAuthHeaders()
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.text();
        } catch (error) {
            console.error('Error unregistering service:', error);
            throw error;
        }
    }

    async getServiceLogs(serviceId) {
        try {
            const response = await fetch(`${this.baseURL}/services/${serviceId}/logs`, {
                method: 'GET',
                headers: await this.getAuthHeaders()
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error fetching service logs:', error);
            throw error;
        }
    }

    async exportLogs(format = 'json') {
        try {
            const response = await fetch(`${this.baseURL}/export?format=${format}`, {
                method: 'POST',
                headers: await this.getAuthHeaders()
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.text();
        } catch (error) {
            console.error('Error exporting logs:', error);
            throw error;
        }
    }

    async getSystemHealth() {
        try {
            const response = await fetch(`${this.baseURL}/health`, {
                method: 'GET',
                headers: await this.getAuthHeaders()
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error fetching system health:', error);
            throw error;
        }
    }

    async getTrafficAnalytics() {
        try {
            const response = await fetch(`${this.baseURL}/analytics`, {
                method: 'GET',
                headers: await this.getAuthHeaders()
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error fetching traffic analytics:', error);
            throw error;
        }
    }
}

const monitoringService = new MonitoringService();
export default monitoringService; 