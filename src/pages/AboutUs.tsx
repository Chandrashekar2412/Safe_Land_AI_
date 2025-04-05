
import React from 'react';
import Layout from '@/components/layout/Layout';

const AboutUs = () => {
  return (
    <Layout>
      <div className="bg-gradient-to-r from-blue-800 to-indigo-900 py-12 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-4">About Safe Land AI</h1>
          <p className="text-xl max-w-3xl">
            Learn about our mission to enhance aviation safety through advanced machine learning technology.
          </p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-4">
              Safe Land AI is dedicated to revolutionizing aviation safety through advanced artificial intelligence 
              and machine learning technologies. Our mission is to predict and prevent hard landings, 
              thereby reducing incidents, saving lives, and minimizing aircraft damage.
            </p>
            <p className="text-gray-600 mb-4">
              With our innovative algorithms and comprehensive datasets, we provide pilots, airlines, and air traffic controllers 
              with actionable insights and recommendations to ensure every landing is as safe as possible.
            </p>
            <h2 className="text-2xl font-semibold mb-4 mt-8">Our Technology</h2>
            <p className="text-gray-600">
              Our advanced AI models analyze thousands of variables from flight data, weather conditions, airport characteristics, 
              and historical landing patterns to predict landing outcomes with remarkable accuracy. By identifying potential risks 
              before they become critical, our technology empowers aviation professionals to make informed decisions that enhance safety.
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4">Core Values</h2>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg shadow-sm">
                <h3 className="font-medium text-lg text-blue-700">Safety First</h3>
                <p className="text-gray-600">We believe that every flight deserves a safe landing, and we're committed to making that a reality.</p>
              </div>
              <div className="p-4 border rounded-lg shadow-sm">
                <h3 className="font-medium text-lg text-blue-700">Innovation</h3>
                <p className="text-gray-600">We continuously push the boundaries of what's possible with AI in aviation safety.</p>
              </div>
              <div className="p-4 border rounded-lg shadow-sm">
                <h3 className="font-medium text-lg text-blue-700">Accuracy</h3>
                <p className="text-gray-600">Our models are rigorously tested and refined to ensure the highest level of prediction accuracy.</p>
              </div>
              <div className="p-4 border rounded-lg shadow-sm">
                <h3 className="font-medium text-lg text-blue-700">Collaboration</h3>
                <p className="text-gray-600">We work closely with aviation experts, regulatory bodies, and airlines to develop solutions that meet real-world needs.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((member) => (
              <div key={member} className="bg-white p-4 rounded-lg shadow-md text-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <h3 className="font-medium text-lg">Team Member {member}</h3>
                <p className="text-gray-600">Position Title</p>
                <p className="text-sm text-gray-500 mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutUs;
