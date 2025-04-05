
import React from 'react';
import PageTemplate from '@/components/PageTemplate';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const SafeLandAI = () => {
  const milestones = [
    {
      year: "2022",
      title: "Safe Land AI Founded",
      description: "Founded by a team of aviation experts and machine learning specialists with the mission to enhance landing safety."
    },
    {
      year: "2023",
      title: "First Algorithm Development",
      description: "Developed the first version of our landing prediction algorithm using a neural network architecture."
    },
    {
      year: "2023",
      title: "Seed Funding Round",
      description: "Secured $5 million in seed funding to expand research and development capabilities."
    },
    {
      year: "2024",
      title: "Pilot Program Launch",
      description: "Launched pilot programs with three regional airlines to test our technology in real-world conditions."
    },
    {
      year: "2024",
      title: "Algorithm Refinement",
      description: "Achieved 93% prediction accuracy after refining our models based on pilot program data."
    },
    {
      year: "2025",
      title: "Commercial Launch",
      description: "Officially launched Safe Land AI's commercial landing prediction service for airlines worldwide."
    }
  ];

  return (
    <PageTemplate
      title="About Safe Land AI"
      subtitle="Our story, mission, and the technology behind our landing prediction system"
    >
      <div className="space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-blue-700">Our Story</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Safe Land AI was founded in 2022 by a team of aviation experts, data scientists, and former pilots 
                who recognized the potential of machine learning to revolutionize landing safety in commercial aviation.
              </p>
              <p>
                After analyzing thousands of landing incidents, our founding team identified common patterns and risk factors 
                that could be predicted with the right technology. This insight led to the development of our advanced 
                prediction algorithm, specifically designed to alert pilots to potential hard landing risks before they occur.
              </p>
              <p>
                Today, Safe Land AI is at the forefront of aviation safety technology, working with airlines around the 
                world to reduce hard landing incidents and improve overall flight safety.
              </p>
            </div>
          </div>
          <div className="bg-gray-200 rounded-lg overflow-hidden h-80">
            <img 
              src="/placeholder.svg" 
              alt="Safe Land AI Team" 
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://images.unsplash.com/photo-1540962351504-03099e0a754b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";
              }}
            />
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-blue-700">Our Technology</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-3">Data Collection</h3>
                <p className="text-gray-600">
                  Our system collects and processes data from multiple sources including aircraft sensors,
                  weather services, runway information databases, and historical landing records to create
                  a comprehensive view of landing conditions.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-3">Neural Network Architecture</h3>
                <p className="text-gray-600">
                  At the heart of Safe Land AI is a sophisticated neural network architecture specifically
                  designed to recognize patterns that lead to hard landings, with multiple layers of analysis
                  providing increasingly refined predictions.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-3">Real-time Analysis</h3>
                <p className="text-gray-600">
                  During flight, our system continuously analyzes changing conditions, providing
                  updates and recommendations to pilots with millisecond precision, allowing for
                  timely adjustments during the critical landing phase.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-blue-700">Company Milestones</h2>
          <div className="relative border-l-2 border-blue-200 ml-4 pl-8 space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="relative">
                <div className="absolute -left-12 h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <div>
                  <div className="flex items-baseline gap-2 mb-1">
                    <h3 className="text-lg font-medium">{milestone.title}</h3>
                    <span className="text-sm text-blue-600 font-medium">{milestone.year}</span>
                  </div>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-blue-700">Our Vision</h2>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-lg border border-blue-100">
            <p className="text-xl text-center text-gray-800 italic">
              "We envision a future where every landing is a safe landing, where pilots have access to
              the most advanced predictive technology, and where passengers can fly with complete confidence
              in the safety of their journey."
            </p>
            <p className="text-right mt-4 font-medium text-blue-700">— Dr. Sarah Johnson, Founder & CEO</p>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default SafeLandAI;
