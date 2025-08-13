const fetch = require('node-fetch');

const API_BASE = 'http://localhost:8080/api';

// Generate real monitoring data by calling actual endpoints
async function generateRealMonitoringData() {
    console.log('Generating real monitoring data...');
    
    try {
        // 1. Login to get token
        const loginResponse = await fetch(`${API_BASE}/auth/signin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: 'admin', password: 'password' })
        });
        
        if (!loginResponse.ok) {
            throw new Error('Login failed');
        }
        
        const loginData = await loginResponse.json();
        const token = loginData.token;
        
        console.log('✅ Login successful');
        
        // 2. Call actual service endpoints to generate real monitoring data
        const serviceEndpoints = [
            // Fund Service endpoints
            { url: '/v1/funds/prices', method: 'GET', service: 'FUND_SERVICE' },
            { url: '/v1/funds/details/FUND001', method: 'GET', service: 'FUND_SERVICE' },
            { url: '/v1/funds/purchase', method: 'POST', service: 'FUND_SERVICE', body: { fundId: 'FUND001', amount: 1000 } },
            
            // Transaction Service endpoints
            { url: '/v1/transactions/list', method: 'GET', service: 'TRANSACTION_SERVICE' },
            { url: '/v1/transactions/process', method: 'POST', service: 'TRANSACTION_SERVICE', body: { type: 'PURCHASE', amount: 500 } },
            { url: '/v1/transactions/status/TXN001', method: 'GET', service: 'TRANSACTION_SERVICE' },
            
            // Reconciliation Service endpoints
            { url: '/v1/reconciliation/status', method: 'GET', service: 'RECONCILIATION_SERVICE' },
            { url: '/v1/reconciliation/exceptions', method: 'GET', service: 'RECONCILIATION_SERVICE' },
            { url: '/v1/reconciliation/run', method: 'POST', service: 'RECONCILIATION_SERVICE', body: { type: 'DAILY' } },
            
            // Auth endpoints
            { url: '/auth/validate', method: 'GET', service: 'AUTH_SERVICE' },
            { url: '/protected/user', method: 'GET', service: 'AUTH_SERVICE' },
            { url: '/admin/dashboard', method: 'GET', service: 'AUTH_SERVICE' },
            { url: '/current-user', method: 'GET', service: 'AUTH_SERVICE' }
        ];
        
        console.log('📊 Calling service endpoints to generate monitoring data...');
        
        for (let i = 0; i < 30; i++) {
            const endpoint = serviceEndpoints[Math.floor(Math.random() * serviceEndpoints.length)];
            
            try {
                const requestOptions = {
                    method: endpoint.method,
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                };
                
                if (endpoint.body) {
                    requestOptions.body = JSON.stringify(endpoint.body);
                }
                
                const response = await fetch(`${API_BASE}${endpoint.url}`, requestOptions);
                
                if (response.ok) {
                    console.log(`✅ ${endpoint.method} ${endpoint.url} - ${response.status} (${endpoint.service})`);
                } else {
                    console.log(`⚠️ ${endpoint.method} ${endpoint.url} - ${response.status} (${endpoint.service})`);
                }
                
                // Add some delay between requests
                await new Promise(resolve => setTimeout(resolve, 200));
                
            } catch (error) {
                console.log(`❌ ${endpoint.method} ${endpoint.url} - Error: ${error.message} (${endpoint.service})`);
            }
        }
        
        // 3. Test monitoring endpoints
        console.log('\n🔍 Testing monitoring endpoints...');
        
        const monitoringEndpoints = [
            '/monitoring/services',
            '/monitoring/logs',
            '/monitoring/metrics',
            '/monitoring/health'
        ];
        
        for (const endpoint of monitoringEndpoints) {
            try {
                const response = await fetch(`${API_BASE}${endpoint}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                
                if (response.ok) {
                    const data = await response.json();
                    console.log(`✅ ${endpoint} - Data received:`, data.length || Object.keys(data).length, 'items');
                } else {
                    console.log(`❌ ${endpoint} - Status: ${response.status}`);
                }
                
            } catch (error) {
                console.log(`❌ ${endpoint} - Error: ${error.message}`);
            }
        }
        
        // 4. Test service health endpoints
        console.log('\n🏥 Testing service health endpoints...');
        
        const healthEndpoints = [
            '/v1/funds/health',
            '/v1/transactions/health',
            '/v1/reconciliation/health'
        ];
        
        for (const endpoint of healthEndpoints) {
            try {
                const response = await fetch(`${API_BASE}${endpoint}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                
                if (response.ok) {
                    const data = await response.json();
                    console.log(`✅ ${endpoint} - Status: ${data.status}`);
                } else {
                    console.log(`❌ ${endpoint} - Status: ${response.status}`);
                }
                
            } catch (error) {
                console.log(`❌ ${endpoint} - Error: ${error.message}`);
            }
        }
        
        console.log('\n🎉 Real monitoring data generation complete!');
        console.log('Check the Admin → API Monitoring tab to see real data with actual response times and metrics.');
        
    } catch (error) {
        console.error('❌ Error generating real monitoring data:', error.message);
    }
}

// Run the script
generateRealMonitoringData(); 