
import React from 'react';
import PageTemplate from '@/components/PageTemplate';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DatasetParameters = () => {
  // Group parameters by category
  const parameterGroups = {
    'Aircraft Configuration': [
      'Aircraft Type', 'Weight (kg)', 'Center of Gravity', 'Flap Setting (deg)',
      'Landing Gear Configuration', 'Autoland System Status'
    ],
    'Approach Parameters': [
      'Approach Speed (kts)', 'Glide Path Angle (deg)', 'Localizer Deviation (dots)',
      'Vertical Speed (fpm)', 'Altitude AGL (ft)', 'Distance to Threshold (nm)'
    ],
    'Weather Conditions': [
      'Wind Direction (deg)', 'Wind Speed (kts)', 'Crosswind Component (kts)',
      'Tailwind Component (kts)', 'Visibility (miles)', 'Precipitation Type',
      'Precipitation Intensity', 'Temperature (°C)', 'Pressure Altitude (ft)'
    ],
    'Runway Conditions': [
      'Runway Length (ft)', 'Runway Width (ft)', 'Runway Surface Type',
      'Runway Condition (dry/wet/snow/ice)', 'Runway Slope (%)', 'Braking Action'
    ],
    'Pilot Inputs': [
      'Throttle Position (%)', 'Control Column Position (deg)', 'Rudder Pedal Force (lbs)',
      'Brake Pressure (%)', 'Reverse Thrust Deployment'
    ]
  };

  return (
    <PageTemplate
      title="Dataset Parameters"
      subtitle="Key variables analyzed by our AI model to predict landing outcomes"
    >
      <div className="space-y-8">
        {Object.entries(parameterGroups).map(([groupName, parameters]) => (
          <Card key={groupName}>
            <CardHeader>
              <CardTitle>{groupName}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {parameters.map(param => (
                  <div key={param} className="bg-gray-50 p-3 rounded-md">
                    <p className="text-sm font-medium">{param}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
        
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h3 className="text-lg font-medium text-blue-700 mb-3">Data Processing Methodology</h3>
          <p className="text-gray-700">
            Our AI model processes over 200 individual parameters captured during the approach and landing phases.
            Data is normalized, cleaned, and processed through our proprietary feature extraction pipeline before
            being fed into our neural network architecture for landing outcome prediction.
          </p>
        </div>
      </div>
    </PageTemplate>
  );
};

export default DatasetParameters;
