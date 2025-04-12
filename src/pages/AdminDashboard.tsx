import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '@/config';

const AdminDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [adminData, setAdminData] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                console.log('Fetching admin data...');
                const token = localStorage.getItem('adminToken');
                console.log('Retrieved token from localStorage:', token);
                
                if (!token) {
                    console.log('No token found, redirecting to login');
                    navigate('/admin/login');
                    return;
                }

                console.log('Making request to dashboard with token');
                const response = await axios.get(`${API_URL}/api/admin/dashboard`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                console.log('Dashboard response:', response.data);
                setAdminData(response.data);
            } catch (err: any) {
                console.error('Error fetching admin data:', err);
                console.error('Error response:', err.response?.data);
                setError(err.response?.data?.message || 'Failed to fetch admin data');
                if (err.response?.status === 401) {
                    console.log('Unauthorized, clearing token and redirecting to login');
                    localStorage.removeItem('adminToken');
                    localStorage.removeItem('admin');
                    navigate('/admin/login');
                }
            }
        };

        fetchAdminData();
    }, [navigate]);

    // ... rest of the component code ...
}; 