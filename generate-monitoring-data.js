const fetch = require('node-fetch');

const API_BASE = 'http://localhost:8080/api';

// Test data to generate monitoring activity
async function generateMonitoringData() {
    console.log('Generating monitoring data...');
    
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
        
        // 2. Make various API calls to generate logs
        const endpoints = [
            '/auth/validate',
            '/protected/user',
            '/admin/dashboard',
            '/server/status',
            '/public/hello',
            '/current-user'
        ];
        
        const methods = ['GET', 'POST'];
        
        for (let i = 0; i < 20; i++) {
            const endpoint = endpoints[Math.floor(Math.random() * endpoints.length)];
            const method = methods[Math.floor(Math.random() * methods.length)];
            
            try {
                const response = await fetch(`${API_BASE}${endpoint}`, {
                    method: method,
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                
                console.log(`✅ ${method} ${endpoint} - ${response.status}`);
                
                // Add some delay between requests
                await new Promise(resolve => setTimeout(resolve, 100));
                
            } catch (error) {
                console.log(`❌ ${method} ${endpoint} - Error: ${error.message}`);
            }
        }
        
        // 3. Test monitoring endpoints
        console.log('\nTesting monitoring endpoints...');
        
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
        
        console.log('\n🎉 Monitoring data generation complete!');
        console.log('Check the Admin → API Monitoring tab to see real data.');
        
    } catch (error) {
        console.error('❌ Error generating monitoring data:', error.message);
    }
}

// Run the script
generateMonitoringData(); 