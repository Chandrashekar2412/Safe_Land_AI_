import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/components/layout/Layout';
import { useToast } from '@/components/ui/use-toast';
import axios from 'axios';
import { useAuth } from '@/contexts/AuthContext';
import { API_URL } from '@/config';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setAdminAuth } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log('Attempting admin login...');
      const response = await axios.post(`${API_URL}/api/admin/login`, {
        email: formData.email,
        password: formData.password
      });

      console.log('Login response:', response.data);
      
      if (response.data.token && response.data.admin) {
        console.log('Setting admin auth with token:', response.data.token);
        setAdminAuth(response.data.admin, response.data.token);
        console.log('Admin auth set, checking localStorage:', {
          adminToken: localStorage.getItem('adminToken'),
          admin: localStorage.getItem('admin')
        });
        toast({
          title: "Success",
          description: "Admin login successful!",
        });
        navigate('/admin');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      console.error('Error response:', err.response?.data);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
      toast({
        title: "Error",
        description: err.response?.data?.message || 'Login failed. Please try again.',
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Admin Login</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access the admin dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="name@example.com" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  value={formData.password}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm">
              Don't have an admin account?{" "}
              <Link to="/admin/register" className="text-blue-600 hover:text-blue-800 font-medium">
                Register here
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default AdminLogin; 