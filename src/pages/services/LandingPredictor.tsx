import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { fetchFlightData, predictLanding, FlightData, PredictionResponse, fetchPredictionHistory, PredictionHistory } from '@/services/predictor';
import { PredictionHistoryTable } from '@/components/PredictionHistoryTable';

// Define types for our form data
type FlightParameter = {
  id: string;
  label: string;
  value: string;
  unit?: string;
};

const LandingPredictor = () => {
  const [parameters, setParameters] = useState<FlightParameter[]>([
    { id: 'Flight_ID', label: 'Flight ID', value: '', unit: '' },
    { id: 'Altitude_AGL_ft', label: 'Altitude AGL', value: '', unit: 'ft' },
    { id: 'Vertical_Speed_fpm', label: 'Vertical Speed', value: '', unit: 'fpm' },
    { id: 'Touchdown_Velocity_fps', label: 'Touchdown Velocity', value: '', unit: 'fps' },
    { id: 'G_Force', label: 'G-Force', value: '', unit: '' },
    { id: 'Wind_Speed_kts', label: 'Wind Speed', value: '', unit: 'kts' },
    { id: 'Crosswind_Component_kts', label: 'Crosswind Component', value: '', unit: 'kts' },
    { id: 'Visibility_miles', label: 'Visibility', value: '', unit: 'miles' },
    { id: 'Runway_Condition', label: 'Runway Condition', value: 'Dry', unit: '' },
    { id: 'Throttle_Input', label: 'Throttle Input', value: '', unit: '%' },
    { id: 'Brake_Force_pct', label: 'Brake Force', value: '', unit: '%' },
    { id: 'Flaps_Position_deg', label: 'Flaps Position', value: '', unit: 'deg' },
    { id: 'Rudder_Deflection_deg', label: 'Rudder Deflection', value: '', unit: 'deg' },
    { id: 'Aileron_Deflection_deg', label: 'Aileron Deflection', value: '', unit: 'deg' },
    { id: 'Landing_Gear_Force_N', label: 'Landing Gear Force', value: '', unit: 'N' },
    { id: 'Spoiler_Deployment_pct', label: 'Spoiler Deployment', value: '', unit: '%' },
    { id: 'Reverse_Thrust_pct', label: 'Reverse Thrust', value: '', unit: '%' },
  ]);

  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showCityDialog, setShowCityDialog] = useState(false);
  const [cityInput, setCityInput] = useState('');
  const [predictionHistory, setPredictionHistory] = useState<PredictionHistory[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedPrediction, setSelectedPrediction] = useState<PredictionHistory | null>(null);

  // Add useEffect to load prediction history
  useEffect(() => {
    loadPredictionHistory();
  }, []);

  const handleParameterChange = (id: string, value: string) => {
    setParameters(prev => 
      prev.map(param => param.id === id ? { ...param, value } : param)
    );
  };

  const loadFlightData = async () => {
    setIsLoading(true);
    try {
      const flightId = parameters.find(p => p.id === 'Flight_ID')?.value;
      if (!flightId) {
        toast({
          title: "Error",
          description: "Please enter a Flight ID",
          variant: "destructive",
        });
        return;
      }

      const data = await fetchFlightData(flightId);
      
      // Update parameters with fetched data
      setParameters(prev => 
        prev.map(param => ({
          ...param,
          value: data[param.id as keyof FlightData]?.toString() || param.value,
        }))
      );

      toast({
        title: "Success",
        description: "Flight data loaded successfully",
      });
    } catch (error) {
      console.error('Error loading flight data:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'Failed to load flight data',
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const calculateCrosswind = (windSpeed: number, windDeg: number, runwayHeading: number = 360): number => {
    const windAngle = Math.abs(windDeg - runwayHeading);
    return Math.abs(windSpeed * Math.sin(windAngle * Math.PI / 180));
  };

  const loadWeatherData = () => {
    setShowCityDialog(true);
  };

  const fetchWeatherData = async (city: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/weather', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ city }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.details || error.error || 'Failed to fetch weather data');
      }

      const data = await response.json();
      
      // Convert wind speed from m/s to knots (1 m/s = 1.944 knots)
      const windSpeedKts = (data.wind.speed * 1.944).toFixed(2);
      
      // Convert visibility from meters to miles (1 meter = 0.000621371 miles)
      const visibilityMiles = (data.visibility * 0.000621371).toFixed(2);
      
      // Calculate crosswind component (assuming runway heading is 360 degrees)
      const windAngle = Math.abs(data.wind.deg - 360);
      const crosswindKts = (Math.abs(data.wind.speed * Math.sin(windAngle * Math.PI / 180)) * 1.944).toFixed(2);
      
      // Determine runway condition based on weather
      let runwayCondition = 'Dry';
      if (data.weather[0].id >= 200 && data.weather[0].id < 600) {
        runwayCondition = 'Wet'; // Rain
      } else if (data.weather[0].id >= 600 && data.weather[0].id < 700) {
        runwayCondition = 'Snow'; // Snow
      } else if (data.weather[0].id >= 700 && data.weather[0].id < 800) {
        runwayCondition = 'Wet'; // Atmosphere conditions
      }

      // Update parameters with weather data
      setParameters(prev => 
        prev.map(param => {
          if (param.id === 'Wind_Speed_kts') {
            return { ...param, value: windSpeedKts };
          }
          if (param.id === 'Crosswind_Component_kts') {
            return { ...param, value: crosswindKts };
          }
          if (param.id === 'Visibility_miles') {
            return { ...param, value: visibilityMiles };
          }
          if (param.id === 'Runway_Condition') {
            return { ...param, value: runwayCondition };
          }
          return param;
        })
      );
      
      toast({
        title: "Weather Updated",
        description: `Weather data loaded for ${data.name}`,
      });
    } catch (error) {
      console.error('Error fetching weather:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'Failed to load weather data',
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setShowCityDialog(false);
      setCityInput('');
    }
  };

  const handleCitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cityInput.trim()) {
      fetchWeatherData(cityInput.trim());
    }
  };

  const loadPredictionHistory = async () => {
    setHistoryLoading(true);
    try {
      const response = await fetchPredictionHistory();
      console.log('Prediction history response:', response);
      setPredictionHistory(response.predictions);
    } catch (error) {
      console.error('Error loading prediction history:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'Failed to load prediction history',
        variant: "destructive",
      });
    } finally {
      setHistoryLoading(false);
    }
  };

  const handlePrediction = async () => {
    setIsLoading(true);
    try {
      const flightId = parameters.find(p => p.id === 'Flight_ID')?.value;
      if (!flightId) {
        toast({
          title: "Error",
          description: "Please enter a Flight ID",
          variant: "destructive",
        });
        return;
      }

      // Convert parameters to API format
      const data = {
        Flight_ID: flightId,
        ...parameters.reduce((acc, param) => {
          if (param.id === 'Flight_ID') return acc;
          return {
            ...acc,
            [param.id]: param.id === 'Runway_Condition' ? param.value : parseFloat(param.value),
          };
        }, {} as FlightData)
      };

      console.log('Making prediction with data:', data);
      const result = await predictLanding(data);
      console.log('Prediction result:', result);
      
      setPrediction(result);
      setShowResults(true);
      
      // Reload prediction history after successful prediction
      await loadPredictionHistory();
      
      toast({
        title: "Prediction Complete",
        description: `The landing is predicted to be a ${result.prediction} with ${result.probability} probability.`,
        variant: result.prediction === 'Hard Landing' ? "destructive" : "default",
      });
    } catch (error) {
      console.error('Prediction error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'Failed to make prediction',
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
            <h1 className="text-3xl md:text-4xl font-bold text-white">Safe Land Assist: Hard Landing Prediction</h1>
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
                {param.id === 'Runway_Condition' ? (
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
              onClick={handlePrediction} 
              disabled={isLoading} 
              className="bg-blue-500 hover:bg-blue-600"
            >
              Predict Landing Risk
            </Button>
            <Button 
              onClick={() => setShowHistory(!showHistory)} 
              className="bg-blue-500 hover:bg-blue-600"
            >
              {showHistory ? 'Hide History' : 'Show History'}
            </Button>
          </div>
          
          {showResults && prediction && (
            <Card className="bg-white/95 p-8 mb-8">
              <div className="mb-6">
                <h2 className="text-3xl font-bold mb-2">Prediction: {prediction.prediction}</h2>
                <p className="text-xl">Probability of Hard Landing: {prediction.probability}</p>
              </div>
              
              <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-4">Contributing Factors (SHAP):</h3>
                <div className="h-[600px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart 
                      data={Object.entries(prediction.shap_contributions)
                        .map(([name, value]) => ({
                          name: name.replace(/_/g, ' '),
                          value: value,
                          fill: value >= 0 ? "#ff6b6b" : "#4ecdc4"
                        }))
                        .sort((a, b) => Math.abs(b.value) - Math.abs(a.value))
                      }
                      layout="vertical"
                      margin={{ top: 20, right: 30, left: 200, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        type="number"
                        domain={[-1, 1]}
                        label={{ 
                          value: 'SHAP Value (Impact on Landing)', 
                          position: 'bottom',
                          offset: 0
                        }}
                      />
                      <YAxis 
                        dataKey="name" 
                        type="category" 
                        width={180}
                        tick={{ fontSize: 12 }}
                      />
                      <Tooltip 
                        formatter={(value: number) => [
                          `${value.toFixed(4)}`,
                          'SHAP Impact'
                        ]}
                        labelFormatter={(label) => `Feature: ${label}`}
                      />
                      <Bar 
                        dataKey="value"
                        fill="#ff6b6b"
                        shape={(props: any) => {
                          const { fill, x, y, width, height } = props;
                          const isPositive = props.payload.value >= 0;
                          return (
                            <rect
                              x={isPositive ? x : x + width}
                              y={y}
                              width={Math.abs(width)}
                              height={height}
                              fill={isPositive ? "#ff6b6b" : "#4ecdc4"}
                            />
                          );
                        }}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-4 mt-2 text-sm">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-[#ff6b6b] mr-2"></div>
                    <span>Contributes to Hard Landing</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-[#4ecdc4] mr-2"></div>
                    <span>Contributes to Soft Landing</span>
                  </div>
                </div>
              </div>
              
              {prediction.prediction === "Soft Landing" ? (
                <div className="mt-4">
                  <h3 className="text-2xl font-semibold mb-3">Status:</h3>
                  <p className="text-green-600 text-lg">No significant changes needed. Landing parameters are within safe limits.</p>
                </div>
              ) : (
                <div className="mt-4">
                  <h3 className="text-2xl font-semibold mb-3">Corrective Measures:</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    {prediction.corrective_measures?.map((measure, index) => (
                      <li key={index}>{measure}</li>
                    ))}
                  </ul>
                </div>
              )}
            </Card>
          )}

          {showHistory && (
            <Card className="bg-white/95 p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4">Prediction History</h2>
              <PredictionHistoryTable 
                predictions={predictionHistory} 
                isLoading={historyLoading}
              />
            </Card>
          )}
        </div>

        <Dialog open={showCityDialog} onOpenChange={setShowCityDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Enter City Name</DialogTitle>
              <DialogDescription>
                Enter the city name to load current weather data.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCitySubmit}>
              <div className="grid gap-4 py-4">
                <Input
                  placeholder="Enter city name (e.g., London)"
                  value={cityInput}
                  onChange={(e) => setCityInput(e.target.value)}
                  required
                />
              </div>
              <DialogFooter>
                <Button type="button" variant="secondary" onClick={() => setShowCityDialog(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={!cityInput.trim() || isLoading}>
                  Load Weather
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {showDetails && selectedPrediction && (
          <Dialog open={showDetails} onOpenChange={setShowDetails}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Prediction Details</DialogTitle>
                <DialogDescription>
                  Detailed information for Flight {selectedPrediction.flightId}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Input Parameters</h3>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {Object.entries(selectedPrediction.inputData).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-gray-600">{key.replace(/_/g, ' ')}:</span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold">SHAP Contributions</h3>
                  <div className="mt-2">
                    {Object.entries(selectedPrediction.shapContributions)
                      .sort(([, a], [, b]) => Math.abs(b as number) - Math.abs(a as number))
                      .map(([key, value]) => (
                        <div key={key} className="flex justify-between mb-1">
                          <span className="text-gray-600">{key.replace(/_/g, ' ')}:</span>
                          <span className={`font-medium ${value > 0 ? 'text-red-600' : 'text-green-600'}`}>
                            {(value as number).toFixed(4)}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
                {selectedPrediction.correctiveMeasures && selectedPrediction.correctiveMeasures.length > 0 && (
                  <div>
                    <h3 className="font-semibold">Corrective Measures</h3>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      {selectedPrediction.correctiveMeasures.map((measure, index) => (
                        <li key={index} className="text-gray-700">{measure}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </Layout>
  );
};

export default LandingPredictor;
