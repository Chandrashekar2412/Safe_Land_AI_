
import React from 'react';
import PageTemplate from '@/components/PageTemplate';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, LineChart, ResponsiveContainer, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line } from 'recharts';

const AdvancedAnalytics = () => {
  // Sample data for charts
  const landingPerformanceData = [
    { month: 'Jan', hardLandings: 12, normalLandings: 342, softLandings: 126 },
    { month: 'Feb', hardLandings: 9, normalLandings: 356, softLandings: 135 },
    { month: 'Mar', hardLandings: 8, normalLandings: 375, softLandings: 147 },
    { month: 'Apr', hardLandings: 6, normalLandings: 380, softLandings: 164 },
    { month: 'May', hardLandings: 4, normalLandings: 390, softLandings: 176 },
    { month: 'Jun', hardLandings: 3, normalLandings: 405, softLandings: 192 },
  ];
  
  const predictionAccuracyData = [
    { month: 'Jan', accuracy: 89 },
    { month: 'Feb', accuracy: 91 },
    { month: 'Mar', accuracy: 92 },
    { month: 'Apr', accuracy: 93 },
    { month: 'May', accuracy: 95 },
    { month: 'Jun', accuracy: 97 },
  ];
  
  const analyticsFeatures = [
    {
      id: "performance",
      title: "Performance Analytics",
      description: "Comprehensive landing performance metrics and trends",
      content: (
        <div className="space-y-6">
          <p className="text-gray-600">
            Track landing performance across your fleet, identifying patterns and opportunities for improvement.
            Our advanced analytics platform processes thousands of landing events to provide clear insights.
          </p>
          <div className="h-80 w-full bg-white p-4 rounded-lg shadow-sm">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={landingPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="hardLandings" fill="#ef4444" name="Hard Landings" />
                <Bar dataKey="normalLandings" fill="#3b82f6" name="Normal Landings" />
                <Bar dataKey="softLandings" fill="#22c55e" name="Soft Landings" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-gray-500 italic">
            Sample chart showing landing type distribution over 6 months
          </p>
        </div>
      )
    },
    {
      id: "predictive",
      title: "Predictive Models",
      description: "Machine learning models predicting landing outcomes",
      content: (
        <div className="space-y-6">
          <p className="text-gray-600">
            Our predictive models continuously learn from new data, improving accuracy and providing
            increasingly reliable landing outcome predictions. Track prediction accuracy and system performance.
          </p>
          <div className="h-80 w-full bg-white p-4 rounded-lg shadow-sm">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={predictionAccuracyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[80, 100]} />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="accuracy" 
                  stroke="#8884d8" 
                  name="Prediction Accuracy (%)"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-gray-500 italic">
            Sample chart showing prediction accuracy improvement over time
          </p>
        </div>
      )
    },
    {
      id: "customreports",
      title: "Custom Reports",
      description: "Tailored analytics for your specific requirements",
      content: (
        <div className="space-y-6">
          <p className="text-gray-600">
            Generate custom reports focused on the metrics that matter most to your operations.
            Our flexible reporting engine allows you to create tailored dashboards and scheduled reports.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-lg mb-2">Fleet Performance</h3>
              <p className="text-sm text-gray-600">
                Compare landing performance across different aircraft models in your fleet
                to identify model-specific optimization opportunities.
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-lg mb-2">Airport Analysis</h3>
              <p className="text-sm text-gray-600">
                Analyze landing performance at different airports to identify location-specific
                challenges and develop targeted training programs.
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-lg mb-2">Pilot Insights</h3>
              <p className="text-sm text-gray-600">
                Review individual pilot performance metrics while maintaining privacy and
                focusing on constructive improvement opportunities.
              </p>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <PageTemplate
      title="Advanced Analytics"
      subtitle="Data-driven insights for continuous improvement of landing safety"
    >
      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="grid grid-cols-1 md:grid-cols-3 mb-8">
          {analyticsFeatures.map((feature) => (
            <TabsTrigger key={feature.id} value={feature.id}>
              {feature.title}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {analyticsFeatures.map((feature) => (
          <TabsContent key={feature.id} value={feature.id}>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-2 text-blue-700">{feature.title}</h2>
              <p className="text-gray-500 mb-6">{feature.description}</p>
              {feature.content}
            </div>
          </TabsContent>
        ))}
      </Tabs>
      
      <div className="mt-12 bg-blue-50 p-6 rounded-lg border border-blue-100">
        <h2 className="text-2xl font-semibold mb-4 text-blue-700">Analytics Integration Options</h2>
        <div className="space-y-4">
          <p className="text-gray-600">
            Our advanced analytics platform integrates seamlessly with your existing systems:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li>Direct API connections to your flight data monitoring systems</li>
            <li>Secure cloud-based analytics portal with customizable access controls</li>
            <li>Regular data exports in various formats (CSV, Excel, JSON)</li>
            <li>Integration with existing business intelligence platforms</li>
            <li>Mobile-friendly dashboards for on-the-go access to critical insights</li>
          </ul>
        </div>
      </div>
    </PageTemplate>
  );
};

export default AdvancedAnalytics;
