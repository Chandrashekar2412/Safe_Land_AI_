
import React from 'react';
import PageTemplate from '@/components/PageTemplate';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const CorrectiveMeasures = () => {
  const correctiveMeasures = [
    {
      id: "approach-angle",
      title: "Approach Angle Adjustment",
      description: "Optimizing the approach angle based on current conditions",
      details: [
        "Real-time calculation of ideal glide path angle based on aircraft type, weight, and weather conditions",
        "Early detection of approach angles that may lead to hard landings",
        "Suggested adjustments to achieve optimal touchdown angle and reduce landing impact",
        "Visual guidance through cockpit display showing current vs. optimal approach path"
      ]
    },
    {
      id: "speed-control",
      title: "Airspeed Management",
      description: "Maintaining optimal approach and touchdown speeds",
      details: [
        "Dynamic calculation of ideal approach speed accounting for wind conditions and aircraft weight",
        "Alerts for excessive approach speeds that may lead to floating or hard landings",
        "Recommendations for speed adjustments during final approach phase",
        "Tailored speed profiles for different runway lengths and conditions"
      ]
    },
    {
      id: "flare-technique",
      title: "Flare Optimization",
      description: "Guidance for proper flare timing and execution",
      details: [
        "Predictive algorithms to determine optimal flare initiation point",
        "Real-time feedback on flare rate and pitch attitude",
        "Customized flare profiles based on aircraft type and landing conditions",
        "Analysis of previous landings to identify flare technique improvement opportunities"
      ]
    },
    {
      id: "crosswind",
      title: "Crosswind Compensation",
      description: "Techniques for maintaining centerline in crosswind conditions",
      details: [
        "Real-time crosswind component calculation and visualization",
        "Suggested crab angle and de-crab timing based on wind direction and intensity",
        "Rudder and aileron input recommendations for crosswind landing technique",
        "Dynamic updates as wind conditions change during approach"
      ]
    }
  ];

  const benefitsData = [
    { title: "Reduction in Hard Landings", value: "Up to 95%" },
    { title: "Improved Passenger Comfort", value: "87% smoother landings" },
    { title: "Aircraft Maintenance Savings", value: "$240K per aircraft annually" },
    { title: "Pilot Confidence Improvement", value: "92% reported increase" }
  ];

  return (
    <PageTemplate
      title="Corrective Measures"
      subtitle="Data-driven techniques to prevent hard landings and improve safety"
    >
      <div className="space-y-10">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-blue-700">Key Corrective Techniques</h2>
          <Accordion type="single" collapsible className="w-full">
            {correctiveMeasures.map((measure) => (
              <AccordionItem key={measure.id} value={measure.id}>
                <AccordionTrigger>
                  <div className="text-left">
                    <h3 className="text-lg font-medium">{measure.title}</h3>
                    <p className="text-sm text-gray-500">{measure.description}</p>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 pl-5 list-disc text-gray-600">
                    {measure.details.map((detail, index) => (
                      <li key={index}>{detail}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-blue-700">Measurable Benefits</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {benefitsData.map((benefit, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">{benefit.value}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{benefit.title}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-100">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">Implementation Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-medium text-lg mb-2 text-blue-600">1. Analysis</h3>
              <p className="text-gray-600 text-sm">
                We analyze your fleet's landing data to identify specific improvement opportunities
                and customize our solution to your operational needs.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-medium text-lg mb-2 text-blue-600">2. Integration</h3>
              <p className="text-gray-600 text-sm">
                Our system integrates with your existing flight management systems, providing
                seamless access to corrective measures without disrupting operations.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-medium text-lg mb-2 text-blue-600">3. Training</h3>
              <p className="text-gray-600 text-sm">
                Comprehensive pilot training ensures maximum benefit from our corrective measures
                technology, with ongoing support and continuous improvement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default CorrectiveMeasures;
