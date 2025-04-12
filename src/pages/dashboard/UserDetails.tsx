import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

const UserDetails = () => {
  const { user } = useAuth();

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">User Details</h1>
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">First Name</label>
                <p className="text-lg">{user?.firstName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Last Name</label>
                <p className="text-lg">{user?.lastName}</p>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Email</label>
              <p className="text-lg">{user?.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Organization</label>
              <p className="text-lg">{user?.organization || 'Not specified'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Role</label>
              <p className="text-lg">{user?.role || 'Not specified'}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default UserDetails;
