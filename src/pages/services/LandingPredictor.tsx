
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Define types for our form data
type FlightParameter = {
  id: string;
  label: string;
  value: string;
  unit?: string;
};

type PredictionResult = {
  outcome: 'Hard Landing' | 'Soft Landing';
  probability: number;
  factors: {
    name: string;
    value: number;
  }[];
  correctiveMeasures: string[];
};

const LandingPredictor = () => {
  const [parameters, setParameters] = useState<FlightParameter[]>([
    { id: 'flightId', label: 'Flight ID', value: 'FL00001', unit: '' },
    { id: 'altitude', label: 'Altitude AGL', value: '114.90142459033696', unit: 'ft' },
    { id: 'verticalSpeed', label: 'Vertical Speed', value: '-697.0857951340611', unit: 'fpm' },
    { id: 'touchdownVelocity', label: 'Touchdown Velocity', value: '8.157675519336271', unit: 'fps' },
    { id: 'gForce', label: 'G-Force', value: '2.0079464650331493', unit: '' },
    { id: 'windSpeed', label: 'Wind Speed', value: '27.4080745770085', unit: 'kts' },
    { id: 'crosswind', label: 'Crosswind Component', value: '21.593703301516123', unit: 'kts' },
    { id: 'visibility', label: 'Visibility', value: '2.1706653486504273', unit: 'miles' },
    { id: 'runway', label: 'Runway Condition', value: 'Wet', unit: '' },
    { id: 'throttle', label: 'Throttle Input', value: '78.4540591573562', unit: '%' },
    { id: 'brakeForce', label: 'Brake Force', value: '26.8195376874058482', unit: '%' },
    { id: 'flaps', label: 'Flaps Position', value: '30', unit: 'deg' },
    { id: 'rudder', label: 'Rudder Deflection', value: '6.482173846744672', unit: 'deg' },
    { id: 'aileron', label: 'Aileron Deflection', value: '2.6741872658752456', unit: 'deg' },
    { id: 'landingGear', label: 'Landing Gear Force', value: '2018.70441665893328', unit: 'N' },
    { id: 'spoiler', label: 'Spoiler Deployment', value: '4.672383597365293', unit: '%' },
    { id: 'reverseThrust', label: 'Reverse Thrust', value: '39.801088109673982', unit: '%' },
  ]);

  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleParameterChange = (id: string, value: string) => {
    setParameters(prev => 
      prev.map(param => param.id === id ? { ...param, value } : param)
    );
  };

  const loadFlightData = () => {
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // We're just using the existing data since it's already populated
      toast({
        title: "Success",
        description: `Flight data loaded successfully`,
      });
      setIsLoading(false);
    }, 1000);
  };

  const loadWeatherData = () => {
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Update weather-related parameters
      setParameters(prev => 
        prev.map(param => {
          if (param.id === 'windSpeed') return { ...param, value: '25.5' };
          if (param.id === 'crosswind') return { ...param, value: '18.7' };
          if (param.id === 'visibility') return { ...param, value: '3.2' };
          if (param.id === 'runway') return { ...param, value: 'Wet' };
          return param;
        })
      );
      
      toast({
        title: "Weather Updated",
        description: "Latest weather data has been loaded",
      });
      setIsLoading(false);
    }, 1000);
  };

  const predictLanding = () => {
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Generate SHAP data
      const factorsData = [
        { name: 'G_Force', value: 0.715 },
        { name: 'Landing_Gear_Force_N', value: 0.175 },
        { name: 'Reverse_Thrust_pct', value: 0.065 },
        { name: 'Touchdown_Velocity_fps', value: 0.045 },
        { name: 'Aileron_Deflection_deg', value: 0.015 },
        { name: 'Altitude_AGL_ft', value: 0.01 },
        { name: 'Brake_Force_pct', value: 0.008 },
        { name: 'Crosswind_Component_kts', value: -0.015 },
        { name: 'Flaps_Position_deg', value: -0.012 },
        { name: 'Rudder_Deflection_deg', value: -0.008 },
        { name: 'Runway_Condition', value: -0.015 },
        { name: 'Spoiler_Deployment_pct', value: -0.018 },
        { name: 'Throttle_Input', value: 0.02 },
        { name: 'Vertical_Speed_fpm', value: -0.025 },
        { name: 'Visibility_miles', value: -0.01 },
        { name: 'Wind_Speed_kts', value: -0.005 },
      ];
      
      // Create prediction result
      const result: PredictionResult = {
        outcome: 'Hard Landing',
        probability: 95.5,
        factors: factorsData,
        correctiveMeasures: [
          'Reduce G-force to below 1.5 (current: 0.715 SHAP).',
          'Reduce landing gear force by 200-500 N (current: 0.175 SHAP).'
        ]
      };
      
      setPrediction(result);
      setShowResults(true);
      setIsLoading(false);
      
      toast({
        title: "Prediction Complete",
        description: `Prediction: ${result.outcome} with ${result.probability}% probability`,
        variant: "destructive",
      });
    }, 1500);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-cover bg-center" style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1540962351504-03099e0a754b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80)',
        backgroundBlendMode: 'overlay',
        backgroundColor: 'rgba(0, 20, 50, 0.7)',
      }}>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white">Safe Land AI: Hard Landing Prediction</h1>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-6">
            {parameters.slice(0, 3).map((param) => (
              <div key={param.id} className="flex flex-col">
                <label className="text-white mb-1">{param.label} ({param.unit}):</label>
                <input
                  type="text"
                  value={param.value}
                  onChange={(e) => handleParameterChange(param.id, e.target.value)}
                  className="p-2 rounded bg-white/90"
                />
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-6">
            {parameters.slice(3, 6).map((param) => (
              <div key={param.id} className="flex flex-col">
                <label className="text-white mb-1">{param.label} ({param.unit}):</label>
                <input
                  type="text"
                  value={param.value}
                  onChange={(e) => handleParameterChange(param.id, e.target.value)}
                  className="p-2 rounded bg-white/90"
                />
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-6">
            {parameters.slice(6, 9).map((param) => (
              <div key={param.id} className="flex flex-col">
                <label className="text-white mb-1">{param.label} ({param.unit}):</label>
                {param.id === 'runway' ? (
                  <select
                    value={param.value}
                    onChange={(e) => handleParameterChange(param.id, e.target.value)}
                    className="p-2 rounded bg-white/90"
                  >
                    <option value="Dry">Dry</option>
                    <option value="Wet">Wet</option>
                    <option value="Snow">Snow</option>
                    <option value="Ice">Ice</option>
                  </select>
                ) : (
                  <input
                    type="text"
                    value={param.value}
                    onChange={(e) => handleParameterChange(param.id, e.target.value)}
                    className="p-2 rounded bg-white/90"
                  />
                )}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-6">
            {parameters.slice(9, 12).map((param) => (
              <div key={param.id} className="flex flex-col">
                <label className="text-white mb-1">{param.label} ({param.unit}):</label>
                <input
                  type="text"
                  value={param.value}
                  onChange={(e) => handleParameterChange(param.id, e.target.value)}
                  className="p-2 rounded bg-white/90"
                />
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-6">
            {parameters.slice(12, 15).map((param) => (
              <div key={param.id} className="flex flex-col">
                <label className="text-white mb-1">{param.label} ({param.unit}):</label>
                <input
                  type="text"
                  value={param.value}
                  onChange={(e) => handleParameterChange(param.id, e.target.value)}
                  className="p-2 rounded bg-white/90"
                />
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            {parameters.slice(15).map((param) => (
              <div key={param.id} className="flex flex-col">
                <label className="text-white mb-1">{param.label} ({param.unit}):</label>
                <input
                  type="text"
                  value={param.value}
                  onChange={(e) => handleParameterChange(param.id, e.target.value)}
                  className="p-2 rounded bg-white/90"
                />
              </div>
            ))}
          </div>
          
          <div className="flex justify-center gap-4 mb-8">
            <Button 
              onClick={loadFlightData} 
              disabled={isLoading} 
              className="bg-blue-500 hover:bg-blue-600"
            >
              Load Flight Data
            </Button>
            <Button 
              onClick={loadWeatherData} 
              disabled={isLoading} 
              className="bg-blue-500 hover:bg-blue-600"
            >
              Load Weather Data
            </Button>
            <Button 
              onClick={predictLanding} 
              disabled={isLoading} 
              className="bg-blue-500 hover:bg-blue-600"
            >
              Predict Landing Risk
            </Button>
          </div>
          
          {showResults && prediction && (
            <Card className="bg-white/95 p-8 mb-8">
              <div className="mb-6">
                <h2 className="text-3xl font-bold mb-2">Prediction: {prediction.outcome}</h2>
                <p className="text-xl">Probability of Hard Landing: {prediction.probability.toFixed(2)}%</p>
              </div>
              
              <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-4">Contributing Factors (SHAP):</h3>
                <div className="h-96 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      layout="vertical"
                      data={prediction.factors}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 150,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        type="number"
                        label={{ value: 'SHAP Value (Impact on Hard Landing)', position: 'insideBottom', offset: -5 }}
                      />
                      <YAxis
                        dataKey="name"
                        type="category"
                        tick={{ fontSize: 12 }}
                        width={150}
                      />
                      <Tooltip />
                      <Bar
                        dataKey="value"
                        fill={(d) => (d.value >= 0 ? "#ff6b6b" : "#4ecdc4")}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold mb-3">Corrective Measures:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  {prediction.correctiveMeasures.map((measure, index) => (
                    <li key={index}>{measure}</li>
                  ))}
                </ul>
              </div>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default LandingPredictor;
