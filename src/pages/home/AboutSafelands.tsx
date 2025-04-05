
import React from 'react';
import PageTemplate from '@/components/PageTemplate';

const AboutSafelands = () => {
  return (
    <PageTemplate
      title="About Safe Land AI"
      subtitle="Learn about our aviation safety enhancement system powered by machine learning"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">Our Story</h2>
          <p className="text-gray-600 mb-4">
            Safe Land AI began as a research project aimed at improving aviation safety through
            predictive analytics. Our team of aviation experts and machine learning specialists
            collaborated to create a system that could accurately predict landing conditions
            and provide real-time assistance to pilots.
          </p>
          <p className="text-gray-600">
            Today, we're proud to offer an advanced system that helps prevent hard landings,
            enhances pilot decision-making, and contributes to the overall safety of air travel.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">How It Works</h2>
          <p className="text-gray-600 mb-4">
            Safe Land AI uses a sophisticated neural network trained on millions of landing data points.
            By analyzing variables such as weather conditions, aircraft configuration, approach angle,
            and runway characteristics, our system can predict potential landing issues before they occur.
          </p>
          <p className="text-gray-600">
            Our real-time analysis provides pilots with actionable insights, helping them make
            adjustments that ensure safer landings in all conditions.
          </p>
        </div>
      </div>
    </PageTemplate>
  );
};

export default AboutSafelands;
