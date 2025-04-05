
import React from 'react';
import PageTemplate from '@/components/PageTemplate';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Settings = () => {
  return (
    <PageTemplate
      title="Settings"
      subtitle="Customize your application preferences"
    >
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-6">Application Preferences</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Display Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="darkMode">Dark Mode</Label>
                    <p className="text-sm text-gray-500">Toggle dark mode for the interface</p>
                  </div>
                  <Switch id="darkMode" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="compactView">Compact View</Label>
                    <p className="text-sm text-gray-500">Display more information with less spacing</p>
                  </div>
                  <Switch id="compactView" />
                </div>
                
                <div>
                  <Label htmlFor="fontSize">Font Size</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger id="fontSize" className="w-full md:w-48 mt-1">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="emailNotifs">Email Notifications</Label>
                    <p className="text-sm text-gray-500">Receive email alerts for important events</p>
                  </div>
                  <Switch id="emailNotifs" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="pushNotifs">Push Notifications</Label>
                    <p className="text-sm text-gray-500">Receive push notifications on your device</p>
                  </div>
                  <Switch id="pushNotifs" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="predictionAlerts">Prediction Alerts</Label>
                    <p className="text-sm text-gray-500">Get notified about new landing predictions</p>
                  </div>
                  <Switch id="predictionAlerts" defaultChecked />
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-lg font-medium mb-4">Data and Privacy</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="dataSharing">Data Sharing</Label>
                    <p className="text-sm text-gray-500">Share anonymized data to improve the system</p>
                  </div>
                  <Switch id="dataSharing" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="analytics">Analytics Cookies</Label>
                    <p className="text-sm text-gray-500">Allow usage analytics to improve experience</p>
                  </div>
                  <Switch id="analytics" defaultChecked />
                </div>
                
                <div className="mt-4">
                  <Button variant="outline" className="w-full md:w-auto">Download My Data</Button>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-lg font-medium mb-4">Units and Formats</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="weightUnit">Weight Unit</Label>
                  <Select defaultValue="kg">
                    <SelectTrigger id="weightUnit" className="mt-1">
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kg">Kilograms (kg)</SelectItem>
                      <SelectItem value="lb">Pounds (lb)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="distanceUnit">Distance Unit</Label>
                  <Select defaultValue="nm">
                    <SelectTrigger id="distanceUnit" className="mt-1">
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nm">Nautical Miles (nm)</SelectItem>
                      <SelectItem value="km">Kilometers (km)</SelectItem>
                      <SelectItem value="mi">Miles (mi)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="speedUnit">Speed Unit</Label>
                  <Select defaultValue="kts">
                    <SelectTrigger id="speedUnit" className="mt-1">
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kts">Knots (kts)</SelectItem>
                      <SelectItem value="mph">Miles per hour (mph)</SelectItem>
                      <SelectItem value="kmh">Kilometers per hour (km/h)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="timeFormat">Time Format</Label>
                  <Select defaultValue="24h">
                    <SelectTrigger id="timeFormat" className="mt-1">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="24h">24-hour format</SelectItem>
                      <SelectItem value="12h">12-hour format (AM/PM)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-end space-x-4">
            <Button variant="outline">Reset to Default</Button>
            <Button>Save Settings</Button>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default Settings;
