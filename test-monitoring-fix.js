const axios = require('axios');

const BASE_URL = 'http://localhost:8080';

async function testMonitoringFixes() {
    try {
        console.log('🔧 Testing Monitoring Fixes...\n');

        // Step 1: Login as admin
        console.log('1. Logging in as admin...');
        const loginResponse = await axios.post(`${BASE_URL}/api/auth/signin`, {
            username: 'admin',
            password: 'password'
        });
        
        const token = loginResponse.data.token;
        console.log('✅ Login successful\n');

        // Step 2: Test service endpoints to generate real data
        console.log('2. Testing service endpoints...');
        
        const endpoints = [
            '/api/v1/funds/prices',
            '/api/v1/transactions/list',
            '/api/v1/reconciliation/status',
            '/api/v1/funds/details/FUND001',
            '/api/v1/transactions/process',
            '/api/v1/reconciliation/run'
        ];

        for (const endpoint of endpoints) {
            try {
                const response = await axios.get(`${BASE_URL}${endpoint}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log(`✅ ${endpoint} - Status: ${response.status}`);
            } catch (error) {
                console.log(`⚠️  ${endpoint} - Status: ${error.response?.status || 'Error'}`);
            }
        }

        // Step 3: Test monitoring endpoints
        console.log('\n3. Testing monitoring endpoints...');
        
        const monitoringEndpoints = [
            '/api/monitoring/services',
            '/api/monitoring/logs',
            '/api/monitoring/metrics',
            '/api/monitoring/analytics'
        ];

        for (const endpoint of monitoringEndpoints) {
            try {
                const response = await axios.get(`${BASE_URL}${endpoint}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log(`✅ ${endpoint} - Status: ${response.status}`);
            } catch (error) {
                console.log(`❌ ${endpoint} - Status: ${error.response?.status || 'Error'}`);
            }
        }

        // Step 4: Test service connections
        console.log('\n4. Testing service connections...');
        
        const services = ['FUND_SERVICE', 'TRANSACTION_SERVICE', 'RECONCILIATION_SERVICE'];
        
        for (const serviceId of services) {
            try {
                const response = await axios.post(`${BASE_URL}/api/monitoring/services/${serviceId}/test`, {}, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log(`✅ Test connection for ${serviceId} - Status: ${response.status}`);
            } catch (error) {
                console.log(`❌ Test connection for ${serviceId} - Status: ${error.response?.status || 'Error'}`);
            }
        }

        // Step 5: Check final service status
        console.log('\n5. Checking final service status...');
        
        try {
            const response = await axios.get(`${BASE_URL}/api/monitoring/services`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            console.log('\n📊 Current Service Status:');
            response.data.forEach(service => {
                const statusIcon = service.status === 'healthy' ? '✅' : 
                                 service.status === 'warning' ? '⚠️' : '❌';
                console.log(`${statusIcon} ${service.serviceName}: ${service.status} (${service.requestsToday} requests today)`);
            });
            
        } catch (error) {
            console.log(`❌ Failed to get service status: ${error.response?.status || 'Error'}`);
        }

        console.log('\n🎉 Monitoring test completed!');
        console.log('\n📝 Next Steps:');
        console.log('1. Check the UI to see if services show "HEALTHY" status');
        console.log('2. Verify that "Requests Today" count has increased');
        console.log('3. Test the "Test Connection" button - it should show success');
        console.log('4. Check Traffic Analytics for real-time data');

    } catch (error) {
        console.error('❌ Test failed:', error.message);
        if (error.response) {
            console.error('Response status:', error.response.status);
            console.error('Response data:', error.response.data);
        }
    }
}

// Run the test
testMonitoringFixes(); 