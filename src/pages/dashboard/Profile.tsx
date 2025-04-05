
import React from 'react';
import PageTemplate from '@/components/PageTemplate';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const Profile = () => {
  return (
    <PageTemplate
      title="Profile"
      subtitle="Manage your account details and preferences"
    >
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="professional">Professional</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        
        <TabsContent value="personal" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className="w-24 h-24 bg-gray-200 rounded-full"></div>
                  <div>
                    <h3 className="text-lg font-medium">Profile Photo</h3>
                    <p className="text-gray-500 text-sm mb-3">
                      Your profile photo will be visible to other team members
                    </p>
                    <div className="flex gap-3">
                      <Button size="sm">Upload new photo</Button>
                      <Button size="sm" variant="outline">Remove</Button>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="John" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Smith" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" defaultValue="john.smith@example.com" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" defaultValue="+1 (555) 123-4567" className="mt-1" />
                  </div>
                </div>
                
                <div className="text-right">
                  <Button>Save Changes</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="professional" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Professional Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="airline">Airline</Label>
                      <Input id="airline" defaultValue="SkyWings Airlines" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="position">Position</Label>
                      <Input id="position" defaultValue="Senior Pilot" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="experience">Experience</Label>
                      <Input id="experience" defaultValue="15 years" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="license">License Number</Label>
                      <Input id="license" defaultValue="ATP-123456789" className="mt-1" />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Aircraft Qualifications</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge>Boeing 737</Badge>
                    <Badge>Airbus A320</Badge>
                    <Badge>Embraer E190</Badge>
                  </div>
                  <div className="flex gap-3">
                    <Input placeholder="Add aircraft type..." className="max-w-xs" />
                    <Button variant="outline">Add</Button>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Certifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                      <div>
                        <p className="font-medium">ATP Certificate</p>
                        <p className="text-sm text-gray-500">Issued: Jan 15, 2020</p>
                      </div>
                      <Badge variant="outline" className="ml-4">Valid</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                      <div>
                        <p className="font-medium">B737 Type Rating</p>
                        <p className="text-sm text-gray-500">Issued: Mar 22, 2021</p>
                      </div>
                      <Badge variant="outline" className="ml-4">Valid</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <Button>Save Changes</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Change Password</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input id="confirmPassword" type="password" className="mt-1" />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Two-Factor Authentication</h3>
                  <p className="text-gray-500 mb-4">
                    Add an extra layer of security to your account by enabling two-factor authentication.
                  </p>
                  <Button variant="outline">Enable 2FA</Button>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Login Sessions</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                      <div>
                        <p className="font-medium">Current Session</p>
                        <p className="text-sm text-gray-500">Chrome on Windows • New York, USA</p>
                      </div>
                      <Badge className="bg-green-500">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                      <div>
                        <p className="font-medium">Mobile App</p>
                        <p className="text-sm text-gray-500">iOS 16 • Last active: 2 days ago</p>
                      </div>
                      <Button variant="ghost" size="sm">Logout</Button>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <Button>Save Changes</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageTemplate>
  );
};

export default Profile;
