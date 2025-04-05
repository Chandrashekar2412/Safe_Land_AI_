
import React from 'react';
import PageTemplate from '@/components/PageTemplate';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plane, Users, BarChart2, Clock } from 'lucide-react';

const UserDetails = () => {
  const userDetails = {
    name: "John Smith",
    role: "Senior Pilot",
    airline: "SkyWings Airlines",
    experience: "15 years",
    aircraftTypes: ["Boeing 737", "Airbus A320", "Embraer E190"],
    status: "Active",
    lastActive: "2 hours ago",
    prediction: {
      usageCount: 245,
      accuracy: "94%",
      lastUsed: "Yesterday, 18:45",
    }
  };

  const recentActivity = [
    { action: "Landing prediction requested", time: "Today, 08:45", location: "JFK International" },
    { action: "Approach analysis reviewed", time: "Yesterday, 14:30", location: "LAX Airport" },
    { action: "Training module completed", time: "Apr 3, 2025", location: "Online" },
    { action: "Profile updated", time: "Mar 29, 2025", location: "Account Settings" },
  ];

  return (
    <PageTemplate
      title="User Details"
      subtitle="View and manage your account information"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 bg-gray-200 rounded-full mb-3"></div>
                <h2 className="text-xl font-semibold">{userDetails.name}</h2>
                <Badge className="mt-1">{userDetails.role}</Badge>
                <p className="text-gray-500 mt-2">{userDetails.airline}</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Experience</p>
                  <p className="font-medium">{userDetails.experience}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Aircraft Types</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {userDetails.aircraftTypes.map((type, index) => (
                      <Badge key={index} variant="outline">{type}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Account Status</p>
                  <div className="flex items-center mt-1">
                    <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                    <p className="font-medium">{userDetails.status}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Prediction Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col items-center p-3 bg-blue-50 rounded-lg">
                    <Plane className="h-6 w-6 text-blue-500 mb-2" />
                    <p className="text-2xl font-bold">{userDetails.prediction.usageCount}</p>
                    <p className="text-sm text-gray-500">Predictions</p>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-green-50 rounded-lg">
                    <BarChart2 className="h-6 w-6 text-green-500 mb-2" />
                    <p className="text-2xl font-bold">{userDetails.prediction.accuracy}</p>
                    <p className="text-sm text-gray-500">Accuracy</p>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-purple-50 rounded-lg">
                    <Clock className="h-6 w-6 text-purple-500 mb-2" />
                    <p className="text-sm font-bold">{userDetails.prediction.lastUsed}</p>
                    <p className="text-sm text-gray-500">Last Used</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex justify-between pb-3 border-b last:border-0 last:pb-0">
                      <div>
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-gray-500">{activity.location}</p>
                      </div>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Team</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <div className="flex -space-x-2 mr-4">
                      {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="h-8 w-8 rounded-full bg-gray-200 border-2 border-white"></div>
                      ))}
                    </div>
                    <div>
                      <p className="text-sm">
                        You have <span className="font-medium">5 colleagues</span> using Safe Land AI
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Training</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Advanced Landing Module</p>
                      <p className="text-sm text-gray-500">2 modules remaining</p>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-sm font-medium">75%</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default UserDetails;
