
import React from 'react';
import PageTemplate from '@/components/PageTemplate';
import { Separator } from '@/components/ui/separator';

const AviationSafety = () => {
  const safetyStats = [
    { label: "Commercial aviation accidents per year", value: "~50", trend: "Decreasing" },
    { label: "Percentage of accidents during landing phase", value: "45%", trend: "Stable" },
    { label: "Accidents due to hard landings", value: "12%", trend: "Decreasing" },
    { label: "Average prediction accuracy by Safe Land AI", value: "93.7%", trend: "Increasing" }
  ];

  return (
    <PageTemplate
      title="Aviation Safety"
      subtitle="Understanding the importance of landing safety in commercial aviation"
    >
      <div className="space-y-12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">The Importance of Safe Landings</h2>
          <p className="text-gray-600 mb-4">
            Landing is statistically one of the most critical phases of flight, with approximately 45% of all 
            commercial aviation accidents occurring during approach and landing. Hard landings, in particular, 
            can lead to aircraft damage, passenger injuries, and in extreme cases, more severe accidents.
          </p>
          <p className="text-gray-600">
            By focusing on improving landing safety, we can make a significant impact on overall aviation safety.
            Safe Land AI's predictive analytics approach represents a paradigm shift from reactive to proactive
            safety measures in the aviation industry.
          </p>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-6 text-blue-700">Safety Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {safetyStats.map((stat, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500">{stat.label}</p>
                <div className="flex items-end justify-between mt-2">
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className={`text-sm ${stat.trend === 'Increasing' ? 'text-green-600' : stat.trend === 'Decreasing' ? 'text-red-600' : 'text-yellow-600'}`}>
                    {stat.trend}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-blue-700">Safety Enhancement Through Technology</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium mb-3 text-blue-600">Prediction</h3>
              <Separator className="mb-4" />
              <p className="text-gray-600">
                Early identification of potential hard landings before they occur, 
                allowing for preventative measures to be taken.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium mb-3 text-blue-600">Guidance</h3>
              <Separator className="mb-4" />
              <p className="text-gray-600">
                Real-time suggestions for pilots based on current conditions, aircraft 
                configuration, and approach parameters.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium mb-3 text-blue-600">Analysis</h3>
              <Separator className="mb-4" />
              <p className="text-gray-600">
                Post-flight data analysis to continuously improve pilot techniques 
                and identify recurring patterns that may indicate systemic issues.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default AviationSafety;
