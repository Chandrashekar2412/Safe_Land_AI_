
import React from 'react';
import PageTemplate from '@/components/PageTemplate';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, User, History, Settings, BarChart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const dashboardItems = [
    {
      title: 'User Details',
      description: 'View and update your personal information and account details.',
      link: '/dashboard/user-details',
      icon: <User className="h-8 w-8 text-blue-600" />
    },
    {
      title: 'Prediction History',
      description: 'Access your past landing predictions and analysis results.',
      link: '/dashboard/prediction-history',
      icon: <History className="h-8 w-8 text-green-600" />
    },
    {
      title: 'Profile',
      description: 'Manage your profile, preferences, and notification settings.',
      link: '/dashboard/profile',
      icon: <BarChart className="h-8 w-8 text-purple-600" />
    },
    {
      title: 'Settings',
      description: 'Configure your account settings and application preferences.',
      link: '/dashboard/settings',
      icon: <Settings className="h-8 w-8 text-orange-600" />
    },
  ];

  return (
    <PageTemplate
      title="Dashboard"
      subtitle="Manage your account, access prediction history, and customize your experience"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        {dashboardItems.map((item, index) => (
          <Link key={index} to={item.link} className="no-underline">
            <Card className="h-full hover:shadow-lg transition-all duration-300 hover:border-blue-300">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  {item.icon}
                </div>
                <CardTitle className="text-xl text-center">{item.title}</CardTitle>
                <CardDescription className="text-center">{item.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <span className="text-blue-600 flex items-center group">
                  Access 
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </PageTemplate>
  );
};

export default Dashboard;
