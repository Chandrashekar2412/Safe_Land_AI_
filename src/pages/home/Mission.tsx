
import React from 'react';
import PageTemplate from '@/components/PageTemplate';

const Mission = () => {
  return (
    <PageTemplate
      title="Our Mission"
      subtitle="Dedicated to enhancing aviation safety through innovative technology"
    >
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-blue-700">Mission Statement</h2>
        <p className="text-gray-600 mb-6 text-lg">
          At Safe Land AI, our mission is to revolutionize aviation safety by providing pilots, airlines, and air traffic controllers
          with cutting-edge predictive technology that prevents hard landings and enhances overall flight safety.
        </p>
        
        <h3 className="text-xl font-medium mb-4 text-blue-700">Our Goals</h3>
        <ul className="list-disc pl-6 space-y-3 text-gray-600 mb-8">
          <li>Reduce hard landing incidents by 95% for airlines using our technology</li>
          <li>Provide real-time, actionable insights to pilots during approach and landing phases</li>
          <li>Continuously improve our prediction accuracy through machine learning and data analysis</li>
          <li>Make our technology accessible to airlines of all sizes around the world</li>
          <li>Collaborate with aviation authorities to establish new safety standards</li>
        </ul>
        
        <h3 className="text-xl font-medium mb-4 text-blue-700">Our Approach</h3>
        <p className="text-gray-600">
          We believe that by combining expert aviation knowledge with advanced machine learning techniques,
          we can create solutions that not only predict potential issues but also provide clear guidance
          for corrective action. Our team is committed to ongoing research, development, and refinement
          of our algorithms to ensure the highest level of accuracy and reliability.
        </p>
      </div>
    </PageTemplate>
  );
};

export default Mission;
