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

const AdminRegister = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setAdminAuth } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    secretKey: '',
    terms: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validate form
    if (!formData.username || !formData.email || !formData.password || !formData.secretKey) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive"
      });
      setLoading(false);
      return;
    }

    if (!formData.terms) {
      toast({
        title: "Error",
        description: "Please accept the terms and conditions",
        variant: "destructive"
      });
      setLoading(false);
      return;
    }

    // Verify secret key
    const adminSecretKey = import.meta.env.VITE_ADMIN_SECRET_KEY;
    if (formData.secretKey !== adminSecretKey) {
      toast({
        title: "Error",
        description: "Invalid secret key",
        variant: "destructive"
      });
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/api/admin/register`, {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });

      if (response.data.token && response.data.admin) {
        setAdminAuth(response.data.admin, response.data.token);
        toast({
          title: "Success",
          description: "Admin registration successful!",
        });
        navigate('/admin');
      }
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
      toast({
        title: "Error",
        description: err.response?.data?.message || 'Registration failed. Please try again.',
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
            <CardTitle className="text-2xl font-bold text-center">Create Admin Account</CardTitle>
            <CardDescription className="text-center">
              Enter your information below to create an admin account
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input 
                    id="username" 
                    value={formData.username}
                    onChange={handleChange}
                    required 
                  />
                </div>
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
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="secretKey">Secret Key</Label>
                <Input 
                  id="secretKey" 
                  type="password"
                  value={formData.secretKey}
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
                <p className="text-xs text-gray-500">
                  Password must be at least 8 characters and include a number and symbol
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input 
                  id="confirmPassword" 
                  type="password" 
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <div className="flex items-center space-x-2 pt-2">
                <input 
                  type="checkbox" 
                  id="terms" 
                  className="h-4 w-4" 
                  checked={formData.terms}
                  onChange={handleChange}
                  required 
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the{" "}
                  <a href="#" className="text-blue-600 hover:text-blue-800">Terms of Service</a>
                  {" "}and{" "}
                  <a href="#" className="text-blue-600 hover:text-blue-800">Privacy Policy</a>
                </label>
              </div>
              
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Creating Admin Account...' : 'Create Admin Account'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link to="/admin/login" className="text-blue-600 hover:text-blue-800 font-medium">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default AdminRegister; 