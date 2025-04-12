import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Settings, User, BarChart, Activity } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "@/config";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AdminDashboard = () => {
  const { adminToken, admin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!adminToken) {
      navigate('/admin/login');
    }
  }, [adminToken, navigate]);

  const { data: dashboardData, isLoading, error } = useQuery({
    queryKey: ['adminDashboard'],
    queryFn: async () => {
      if (!adminToken) {
        throw new Error('No admin token found');
      }
      const response = await axios.get(`${API_URL}/api/admin/dashboard`, {
        headers: {
          Authorization: `Bearer ${adminToken}`
        }
      });
      return response.data;
    },
    enabled: !!adminToken
  });

  if (isLoading) {
    return <div className="container mx-auto p-6">Loading...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error.message}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      {/* Welcome Message */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold">
          Welcome, {dashboardData?.admin?.username || 'Admin'}
        </h2>
        <p className="text-gray-600">Email: {dashboardData?.admin?.email}</p>
      </div>
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData?.statistics?.totalUsers || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Users</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData?.statistics?.recentUsers?.length || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Admin Status</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData?.admin?.isSuperAdmin ? 'Super Admin' : 'Admin'}</div>
          </CardContent>
        </Card>
      </div>
      
      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              User Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Manage user accounts, roles, and permissions</p>
            <Button asChild>
              <Link to="/admin/users">Manage Users</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              System Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Configure system settings and preferences</p>
            <Button asChild>
              <Link to="/admin/settings">System Settings</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5" />
              Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">View system analytics and reports</p>
            <Button asChild>
              <Link to="/admin/analytics">View Analytics</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Users Table */}
      {dashboardData?.statistics?.recentUsers && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Recent Users</h2>
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dashboardData.statistics.recentUsers.map((user: any) => (
                  <tr key={user._id}>
                    <td className="px-6 py-4 whitespace-nowrap">{user.firstName} {user.lastName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard; 