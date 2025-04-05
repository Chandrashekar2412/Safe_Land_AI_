
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Layout from '@/components/layout/Layout';
import { toast } from '@/hooks/use-toast';
import { Upload, CloudLightning, AlertTriangle } from 'lucide-react';

type FlightData = {
  flightId: string;
  parameters: {
    [key: string]: number | string;
  };
};

type PredictionResult = {
  outcome: 'Hard Landing' | 'Soft Landing';
  probability: number;
  riskLevel: 'Low' | 'Medium' | 'High';
};

const LandingPredictor = () => {
  const [flightId, setFlightId] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [flightData, setFlightData] = useState<FlightData | null>(null);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [activeTab, setActiveTab] = useState<'auto' | 'manual'>('auto');

  // Demo flight parameters
  const flightParameters = [
    { name: "Altitude_AGL_ft", label: "Altitude AGL (ft)", value: 0 },
    { name: "Vertical_Speed_fpm", label: "Vertical Speed (fpm)", value: 0 },
    { name: "Touchdown_Velocity_fps", label: "Touchdown Velocity (fps)", value: 0 },
    { name: "G_Force", label: "G-Force", value: 0 },
    { name: "Wind_Speed_kts", label: "Wind Speed (kts)", value: 0 },
    { name: "Crosswind_Component_kts", label: "Crosswind Component (kts)", value: 0 },
    { name: "Visibility_miles", label: "Visibility (miles)", value: 0 },
    { name: "Runway_Condition", label: "Runway Condition", value: "Dry" },
    { name: "Throttle_Input", label: "Throttle Input", value: 0 },
    { name: "Brake_Force_pct", label: "Brake Force (%)", value: 0 },
    { name: "Flaps_Position_deg", label: "Flaps Position (deg)", value: 0 },
    { name: "Rudder_Deflection_deg", label: "Rudder Deflection (deg)", value: 0 },
    { name: "Aileron_Deflection_deg", label: "Aileron Deflection (deg)", value: 0 },
    { name: "Landing_Gear_Force_N", label: "Landing Gear Force (N)", value: 0 },
    { name: "Spoiler_Deployment_pct", label: "Spoiler Deployment (%)", value: 0 },
    { name: "Reverse_Thrust_pct", label: "Reverse Thrust (%)", value: 0 },
  ];

  const [manualParams, setManualParams] = useState<{[key: string]: number | string}>(
    flightParameters.reduce((acc, param) => {
      acc[param.name] = param.value;
      return acc;
    }, {} as {[key: string]: number | string})
  );

  const handleParamChange = (name: string, value: string) => {
    setManualParams(prev => ({
      ...prev,
      [name]: name === "Runway_Condition" ? value : Number(value)
    }));
  };

  const loadFlightData = () => {
    if (!flightId) {
      toast({
        title: "Error",
        description: "Please enter a valid Flight ID",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Demo data
      const demoData: FlightData = {
        flightId: flightId,
        parameters: {
          "Altitude_AGL_ft": 50.2,
          "Vertical_Speed_fpm": -620.5,
          "Touchdown_Velocity_fps": 8.2,
          "G_Force": 1.35,
          "Wind_Speed_kts": 12.0,
          "Crosswind_Component_kts": 8.5,
          "Visibility_miles": 9.8,
          "Runway_Condition": "Dry",
          "Throttle_Input": 10.5,
          "Brake_Force_pct": 65.0,
          "Flaps_Position_deg": 30.0,
          "Rudder_Deflection_deg": 2.5,
          "Aileron_Deflection_deg": 1.2,
          "Landing_Gear_Force_N": 45000.0,
          "Spoiler_Deployment_pct": 90.0,
          "Reverse_Thrust_pct": 80.0,
        }
      };

      setFlightData(demoData);
      setManualParams(demoData.parameters);
      setIsLoading(false);
      
      toast({
        title: "Success",
        description: `Flight data for flight ID: ${flightId} loaded successfully`,
      });
    }, 1500);
  };

  const loadWeatherData = () => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Update only weather-related parameters
      setManualParams(prev => ({
        ...prev,
        "Wind_Speed_kts": 14.5,
        "Crosswind_Component_kts": 10.2,
        "Visibility_miles": 8.5,
        "Runway_Condition": "Wet", // Changed from Dry to Wet
      }));

      setIsLoading(false);
      
      toast({
        title: "Weather Updated",
        description: "Latest weather data has been loaded",
      });
    }, 1500);
  };

  const predict = () => {
    setIsLoading(true);

    // Simulate prediction API call
    setTimeout(() => {
      // Calculate outcome based on parameter values
      // This is just a simplified simulation
      const params = activeTab === 'auto' && flightData ? flightData.parameters : manualParams;
      
      const tdVelocity = typeof params.Touchdown_Velocity_fps === 'number' ? params.Touchdown_Velocity_fps : 0;
      const gForce = typeof params.G_Force === 'number' ? params.G_Force : 0;
      const windSpeed = typeof params.Wind_Speed_kts === 'number' ? params.Wind_Speed_kts : 0;
      
      // Simple logic for demo purposes
      const isHardLanding = tdVelocity > 7.5 || gForce > 1.3 || windSpeed > 15;
      const probability = isHardLanding ? 
        0.5 + Math.random() * 0.5 : // 50-100% probability for hard landing
        Math.random() * 0.4;        // 0-40% probability for soft landing
      
      const result: PredictionResult = {
        outcome: isHardLanding ? 'Hard Landing' : 'Soft Landing',
        probability: Number((probability * 100).toFixed(1)),
        riskLevel: probability > 0.7 ? 'High' : probability > 0.3 ? 'Medium' : 'Low'
      };
      
      setPrediction(result);
      setIsLoading(false);
      
      toast({
        title: "Prediction Complete",
        description: `Prediction: ${result.outcome} with ${result.probability}% probability`,
        variant: result.outcome === 'Hard Landing' ? "destructive" : "default",
      });
    }, 2000);
  };

  return (
    <Layout>
      <div className="bg-gradient-to-r from-blue-800 to-indigo-900 py-12 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-4">Landing Predictor</h1>
          <p className="text-xl max-w-3xl">
            Use our advanced ML model to predict landing outcomes and receive corrective measures 
            to prevent hard landings and enhance aviation safety.
          </p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-2xl font-semibold mb-4">Input Flight Data</h2>
            
            {/* Tabs for auto/manual selection */}
            <div className="flex border-b mb-6">
              <button 
                className={`px-6 py-2 ${activeTab === 'auto' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
                onClick={() => setActiveTab('auto')}
              >
                Load Flight ID
              </button>
              <button 
                className={`px-6 py-2 ${activeTab === 'manual' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
                onClick={() => setActiveTab('manual')}
              >
                Manual Entry
              </button>
            </div>
            
            {activeTab === 'auto' ? (
              <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
                <div className="w-full md:w-96">
                  <label htmlFor="flightId" className="block text-sm font-medium text-gray-700 mb-1">
                    Flight ID
                  </label>
                  <input
                    type="text"
                    id="flightId"
                    value={flightId}
                    onChange={(e) => setFlightId(e.target.value)}
                    placeholder="Enter Flight ID (e.g., FL1234)"
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    disabled={isLoading}
                  />
                </div>
                <div className="flex gap-3 self-end">
                  <Button
                    onClick={loadFlightData}
                    disabled={isLoading}
                    className="mt-2 md:mt-0"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Load Flight Data
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {flightParameters.map((param) => (
                  <div key={param.name} className="flex flex-col">
                    <label htmlFor={param.name} className="block text-sm font-medium text-gray-700 mb-1">
                      {param.label}
                    </label>
                    {param.name === "Runway_Condition" ? (
                      <select
                        id={param.name}
                        value={String(manualParams[param.name])}
                        onChange={(e) => handleParamChange(param.name, e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        disabled={isLoading}
                      >
                        <option value="Dry">Dry</option>
                        <option value="Wet">Wet</option>
                        <option value="Snow">Snow</option>
                        <option value="Ice">Ice</option>
                      </select>
                    ) : (
                      <input
                        type="number"
                        id={param.name}
                        value={String(manualParams[param.name])}
                        onChange={(e) => handleParamChange(param.name, e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        disabled={isLoading}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
            
            <div className="flex flex-wrap gap-4">
              <Button onClick={loadWeatherData} disabled={isLoading} variant="outline">
                <CloudLightning className="mr-2 h-4 w-4" />
                Load Weather Data
              </Button>
              <Button onClick={predict} disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
                Predict Landing Risk
              </Button>
            </div>
          </div>
          
          {/* Prediction Results */}
          {prediction && (
            <div className="p-6 bg-gray-50">
              <h3 className="text-xl font-semibold mb-4">Prediction Results</h3>
              
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="lg:w-1/3">
                  <div className={`p-6 rounded-lg shadow-md ${
                    prediction.outcome === 'Hard Landing' ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'
                  }`}>
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-lg font-medium">Landing Outcome</h4>
                      {prediction.outcome === 'Hard Landing' && (
                        <AlertTriangle className="h-6 w-6 text-red-500" />
                      )}
                    </div>
                    
                    <div className="text-center py-4">
                      <p className={`text-2xl font-bold ${
                        prediction.outcome === 'Hard Landing' ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {prediction.outcome}
                      </p>
                      <p className="text-3xl font-bold mt-2">
                        {prediction.probability}%
                      </p>
                      <p className="mt-2 text-gray-600">
                        Risk Level: <span className={`font-medium ${
                          prediction.riskLevel === 'High' ? 'text-red-600' : 
                          prediction.riskLevel === 'Medium' ? 'text-amber-600' : 
                          'text-green-600'
                        }`}>{prediction.riskLevel}</span>
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="lg:w-2/3">
                  <div className="bg-white p-6 rounded-lg shadow-md h-full">
                    <h4 className="text-lg font-medium mb-4">SHAP Feature Importance Chart</h4>
                    <div className="bg-gray-100 p-4 rounded-md text-center h-64 flex items-center justify-center">
                      <p className="text-gray-500">SHAP chart visualization would appear here</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {prediction.outcome === 'Hard Landing' && (
                <div className="mt-6 p-6 bg-amber-50 border border-amber-200 rounded-lg shadow-md">
                  <h4 className="text-lg font-medium mb-4">Corrective Measures</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Reduce approach speed by 5-10 knots to minimize touchdown velocity</li>
                    <li>Increase flap deployment to 40 degrees for better lift</li>
                    <li>Apply more gradual throttle reduction during the flare</li>
                    <li>Adjust descent rate to maintain -500 fpm during final approach</li>
                    <li>Consider alternative runway with less crosswind component</li>
                  </ul>
                  <div className="mt-4">
                    <Link to="/corrective-measures">
                      <Button variant="outline">
                        View Detailed Corrective Measures
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default LandingPredictor;
