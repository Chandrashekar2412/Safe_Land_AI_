const axios = require('axios');

const API_URL = 'http://localhost:3000/api';

async function testUserOperations() {
  try {
    // 1. Register a new user
    console.log('1. Registering new user...');
    const registerResponse = await axios.post(`${API_URL}/auth/register`, {
      firstName: 'Test',
      lastName: 'User',
      email: 'test.user@example.com',
      password: 'test123',
      organization: 'Test Organization',
      role: 'user',
      phone: '1234567890'
    });
    console.log('Registration successful:', registerResponse.data);

    // 2. Login with the created user
    console.log('\n2. Logging in...');
    const loginResponse = await axios.post(`${API_URL}/auth/login`, {
      email: 'test.user@example.com',
      password: 'test123'
    });
    console.log('Login successful:', loginResponse.data);
    const token = loginResponse.data.token;

    // 3. Update user profile
    console.log('\n3. Updating profile...');
    const updateResponse = await axios.put(
      `${API_URL}/user/profile`,
      {
        firstName: 'Updated',
        lastName: 'User',
        email: 'test.user@example.com',
        organization: 'Updated Organization',
        role: 'admin',
        phone: '9876543210'
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    console.log('Profile update successful:', updateResponse.data);

  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}

testUserOperations(); 