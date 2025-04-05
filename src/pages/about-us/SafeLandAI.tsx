
import React from 'react';
import PageTemplate from '@/components/PageTemplate';

const SafeLandAI = () => {
  return (
    <PageTemplate
      title="Safe Land AI"
      subtitle="Learn more about our innovative hard landing prediction system"
    >
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">About Safe Land AI</h2>
        <p className="mb-4">
          Safe Land AI is a state-of-the-art machine learning system designed to predict and prevent hard landings in commercial aviation. 
          Our sophisticated algorithms analyze flight parameters, weather conditions, and pilot inputs to provide real-time 
          landing risk assessments and actionable recommendations.
        </p>
        
        <h3 className="text-xl font-semibold mb-3 mt-6">Our Technology</h3>
        <p className="mb-4">
          Our technology leverages advanced machine learning models trained on extensive datasets of historical flight data. 
          By analyzing patterns and correlations between various flight parameters and landing outcomes, 
          Safe Land AI can predict potential hard landing scenarios with high accuracy.
        </p>
        
        <h3 className="text-xl font-semibold mb-3 mt-6">Vision</h3>
        <p className="mb-4">
          Our vision is to become the global standard for landing safety in commercial aviation, 
          significantly reducing the incidence of hard landings and associated risks, costs, and passenger discomfort.
        </p>
      </div>
    </PageTemplate>
  );
};

export default SafeLandAI;
