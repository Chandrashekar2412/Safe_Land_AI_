
import React from 'react';
import PageTemplate from '@/components/PageTemplate';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';

const PilotAssistance = () => {
  const assistanceStages = [
    {
      id: "pre-flight",
      title: "Pre-Flight",
      content: (
        <div className="space-y-4">
          <p className="text-gray-600">
            Our AI analyzes weather forecasts, runway conditions, and aircraft configuration to provide 
            preliminary landing risk assessments before departure.
          </p>
          <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-md">
            <Info className="h-5 w-5 text-blue-500 mt-0.5" />
            <p className="text-sm text-blue-700">
              Pilots receive detailed briefings on potential landing challenges at their destination,
              allowing for advance preparation and route optimization.
            </p>
          </div>
        </div>
      )
    },
    {
      id: "approach",
      title: "Approach",
      content: (
        <div className="space-y-4">
          <p className="text-gray-600">
            During approach, real-time data is analyzed to update risk assessments and provide
            specific recommendations for a safe landing.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-md">
              <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
              <p className="text-sm text-yellow-700">
                Early warning system for potential hard landing conditions based on current 
                approach angle, speed, and descent rate.
              </p>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-md">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              <p className="text-sm text-green-700">
                Optimized approach parameters are suggested to pilots, taking into account 
                current conditions and aircraft performance.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "landing",
      title: "Landing",
      content: (
        <div className="space-y-4">
          <p className="text-gray-600">
            Critical final-stage assistance with millisecond-by-millisecond analysis of aircraft
            configuration and environmental conditions.
          </p>
          <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-md">
            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
            <p className="text-sm text-red-700">
              Immediate alerts for dangerous descent rates or approach angles that could lead 
              to hard landings, with specific corrective actions suggested.
            </p>
          </div>
        </div>
      )
    },
    {
      id: "post-flight",
      title: "Post-Flight",
      content: (
        <div className="space-y-4">
          <p className="text-gray-600">
            Comprehensive analysis of landing data to provide feedback and suggestions for future improvements.
          </p>
          <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-md">
            <Info className="h-5 w-5 text-purple-500 mt-0.5" />
            <p className="text-sm text-purple-700">
              Detailed reports that highlight aspects of the landing approach that could be optimized,
              with specific training recommendations tailored to each pilot's technique.
            </p>
          </div>
        </div>
      )
    }
  ];

  return (
    <PageTemplate
      title="Pilot Assistance"
      subtitle="Real-time guidance and recommendations for safer landings"
    >
      <Tabs defaultValue="pre-flight" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
          {assistanceStages.map((stage) => (
            <TabsTrigger key={stage.id} value={stage.id}>{stage.title}</TabsTrigger>
          ))}
        </TabsList>
        {assistanceStages.map((stage) => (
          <TabsContent key={stage.id} value={stage.id}>
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4 text-blue-700">{stage.title} Assistance</h2>
                {stage.content}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
      
      <div className="mt-12 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-blue-700">How Our Pilot Assistance Works</h2>
        <div className="space-y-4">
          <p className="text-gray-600">
            Safe Land AI's pilot assistance technology operates on a continuous feedback loop system
            that processes multiple data streams in real-time:
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-gray-600">
            <li>Data collection from aircraft systems, weather services, and airport conditions</li>
            <li>Real-time analysis using our proprietary neural network architecture</li>
            <li>Risk assessment calculations based on current and projected conditions</li>
            <li>Generation of actionable recommendations for pilots</li>
            <li>Delivery of guidance through cockpit integration or supplementary devices</li>
            <li>Post-flight analysis for continuous improvement</li>
          </ol>
        </div>
      </div>
    </PageTemplate>
  );
};

export default PilotAssistance;
