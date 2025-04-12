import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [adminData, setAdminData] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const token = localStorage.getItem('adminToken');
                if (!token) {
                    navigate('/admin/register');
                    return;
                }

                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/dashboard`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setAdminData(response.data);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch admin data');
                if (err.response?.status === 401) {
                    localStorage.removeItem('adminToken');
                    navigate('/admin/register');
                }
            }
        };

        fetchAdminData();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/admin/register');
    };

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
                    <div className="text-red-600 text-center">{error}</div>
                </div>
            </div>
        );
    }

    if (!adminData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
                    <div className="text-center">Loading...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <h1 className="text-xl font-bold">Admin Dashboard</h1>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <button
                                onClick={handleLogout}
                                className="ml-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="bg-white shadow rounded-lg p-6">
                        <h2 className="text-2xl font-bold mb-4">Welcome, {adminData.admin.username}</h2>
                        <div className="grid grid-cols-1 gap-6">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="text-lg font-medium mb-2">Admin Information</h3>
                                <p>Email: {adminData.admin.email}</p>
                                <p>Role: Super Admin</p>
                            </div>
                            {/* Add more dashboard sections here */}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard; 