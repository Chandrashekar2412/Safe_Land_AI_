import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import { ArrowRight, BarChart2, Shield, Cloud, Plane } from 'lucide-react';

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
        <div className="absolute inset-0">
          <img
            src="/flight1.jpg"
            alt="Flight background"
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2074&q=80";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-indigo-900/90"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Safe Land Assist
            </h1>
            <p className="text-xl md:text-2xl mb-10">
              Advanced machine learning for hard landing prediction and pilot assistance in commercial flights
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/landing-predictor">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Try Landing Predictor
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/about-safelands">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Services</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Leveraging advanced machine learning algorithms to enhance aviation safety and operational efficiency
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-5">
                <Plane className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Landing Predictor</h3>
              <p className="text-gray-600 mb-5">
                Predict landing outcomes using real-time flight data and weather conditions to prevent hard landings
              </p>
              <Link to="/landing-predictor" className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">
                Learn more <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center p-3 bg-green-100 rounded-full mb-5">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Pilot Assistance</h3>
              <p className="text-gray-600 mb-5">
                Real-time guidance and recommendations to help pilots achieve safe landings in various conditions
              </p>
              <Link to="/pilot-assistance" className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">
                Learn more <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center p-3 bg-purple-100 rounded-full mb-5">
                <BarChart2 className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Corrective Measures</h3>
              <p className="text-gray-600 mb-5">
                Data-driven recommendations for preventing hard landings and improving landing techniques
              </p>
              <Link to="/corrective-measures" className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">
                Learn more <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:space-x-12">
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About Safe Land Assist</h2>
              <p className="text-lg text-gray-700 mb-6">
                Safe Land Assist is a state-of-the-art machine learning system designed to predict and prevent hard landings in commercial aviation.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Our sophisticated algorithms analyze flight parameters, weather conditions, and pilot inputs to provide real-time landing risk assessments and actionable recommendations.
              </p>
              <Link to="/about-safelands">
                <Button>
                  Read More About Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="lg:w-1/2">
              <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                <img 
                  src="/aviation-cockpit.jpg" 
                  alt="Airplane Cockpit" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://images.unsplash.com/photo-1540962351504-03099e0a754b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80";
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Parameters Section */}
      <div className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Key Flight Parameters</h2>
            <p className="mt-4 text-gray-300 max-w-3xl mx-auto">
              Our model analyzes these critical parameters to predict landing outcomes with high accuracy
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              "Altitude AGL (ft)", "Vertical Speed (fpm)", "Touchdown Velocity (fps)", "G-Force",
              "Wind Speed (kts)", "Crosswind Component (kts)", "Visibility (miles)", "Runway Condition",
              "Throttle Input", "Brake Force (%)", "Flaps Position (deg)", "Rudder Deflection (deg)"
            ].map((param, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded-lg text-center">
                <p className="text-md font-medium">{param}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link to="/dataset-parameters">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
                View All Parameters
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="bg-blue-700 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to enhance flight safety?</h2>
          <p className="text-xl mb-8">
            Register now to access our landing prediction tools and improve aviation safety
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register">
              <Button size="lg" variant="secondary">
                Register Now
              </Button>
            </Link>
            <Link to="/contact-us/message">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-700">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
