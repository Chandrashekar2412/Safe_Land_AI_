import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { API_URL } from '@/config';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Switch } from '@/components/ui/switch';
import { Settings, Mail, Lock, Globe, Shield } from 'lucide-react';

interface SystemSettings {
  siteName: string;
  siteDescription: string;
  adminEmail: string;
  allowUserRegistration: boolean;
  requireEmailVerification: boolean;
  maintenanceMode: boolean;
  apiKey: string;
}

const SystemSettings = () => {
  const { adminToken } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [settings, setSettings] = useState<SystemSettings>({
    siteName: '',
    siteDescription: '',
    adminEmail: '',
    allowUserRegistration: true,
    requireEmailVerification: true,
    maintenanceMode: false,
    apiKey: '',
  });

  // Fetch settings
  const { isLoading } = useQuery({
    queryKey: ['systemSettings'],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/api/admin/settings`, {
        headers: {
          Authorization: `Bearer ${adminToken}`
        }
      });
      setSettings(response.data);
      return response.data;
    }
  });

  // Update settings mutation
  const updateSettingsMutation = useMutation({
    mutationFn: async (updatedSettings: Partial<SystemSettings>) => {
      const response = await axios.put(
        `${API_URL}/api/admin/settings`,
        updatedSettings,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`
          }
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['systemSettings'] });
      toast({
        title: "Success",
        description: "Settings updated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update settings",
        variant: "destructive"
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettingsMutation.mutate(settings);
  };

  if (isLoading) {
    return <div className="container mx-auto p-6">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">System Settings</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              General Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="siteName">Site Name</Label>
              <Input
                id="siteName"
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="siteDescription">Site Description</Label>
              <Input
                id="siteDescription"
                value={settings.siteDescription}
                onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Email Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Email Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="adminEmail">Admin Email</Label>
              <Input
                id="adminEmail"
                type="email"
                value={settings.adminEmail}
                onChange={(e) => setSettings({ ...settings, adminEmail: e.target.value })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="requireEmailVerification">Require Email Verification</Label>
              <Switch
                id="requireEmailVerification"
                checked={settings.requireEmailVerification}
                onCheckedChange={(checked) => setSettings({ ...settings, requireEmailVerification: checked })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="allowUserRegistration">Allow User Registration</Label>
              <Switch
                id="allowUserRegistration"
                checked={settings.allowUserRegistration}
                onCheckedChange={(checked) => setSettings({ ...settings, allowUserRegistration: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
              <Switch
                id="maintenanceMode"
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) => setSettings({ ...settings, maintenanceMode: checked })}
              />
            </div>
          </CardContent>
        </Card>

        {/* API Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              API Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="apiKey">API Key</Label>
              <Input
                id="apiKey"
                type="password"
                value={settings.apiKey}
                onChange={(e) => setSettings({ ...settings, apiKey: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={updateSettingsMutation.isPending}>
            {updateSettingsMutation.isPending ? 'Saving...' : 'Save Settings'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SystemSettings; 