import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { fetchFlightData, predictLanding, type FlightData, type PredictionResponse } from '@/services/predictor';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Predictor = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FlightData>({
    Flight_ID: '',
    Altitude_AGL_ft: 0,
    Vertical_Speed_fpm: 0,
    Touchdown_Velocity_fps: 0,
    G_Force: 0,
    Wind_Speed_kts: 0,
    Crosswind_Component_kts: 0,
    Visibility_miles: 0,
    Runway_Condition: 'Dry',
    Throttle_Input: 0,
    Brake_Force_pct: 0,
    Flaps_Position_deg: 0,
    Rudder_Deflection_deg: 0,
    Aileron_Deflection_deg: 0,
    Landing_Gear_Force_N: 0,
    Spoiler_Deployment_pct: 0,
    Reverse_Thrust_pct: 0
  });
  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);
  const [chartData, setChartData] = useState<Array<{ name: string; value: number }>>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      Runway_Condition: value
    }));
  };

  const handleFetchFlightData = async () => {
    if (!formData.Flight_ID) {
      toast({
        title: 'Error',
        description: 'Please enter a Flight ID',
        variant: 'destructive',
      });
      return;
    }

    try {
      setLoading(true);
      const data = await fetchFlightData(formData.Flight_ID);
      setFormData(data);
      toast({
        title: 'Success',
        description: 'Flight data loaded successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to fetch flight data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const result = await predictLanding(formData);
      setPrediction(result);
      
      // Prepare chart data
      const chartData = Object.entries(result.shap_contributions)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => Math.abs(b.value) - Math.abs(a.value));
      
      setChartData(chartData);
      
      toast({
        title: 'Prediction Complete',
        description: `Prediction: ${result.prediction} (${result.probability})`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to make prediction',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Safe Land Assist: Hard Landing Prediction</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePredict} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Flight ID</label>
                <Input
                  name="Flight_ID"
                  value={formData.Flight_ID}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Altitude AGL (ft)</label>
                <Input
                  type="number"
                  name="Altitude_AGL_ft"
                  value={formData.Altitude_AGL_ft}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Vertical Speed (fpm)</label>
                <Input
                  type="number"
                  name="Vertical_Speed_fpm"
                  value={formData.Vertical_Speed_fpm}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Touchdown Velocity (fps)</label>
                <Input
                  type="number"
                  name="Touchdown_Velocity_fps"
                  value={formData.Touchdown_Velocity_fps}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">G-Force</label>
                <Input
                  type="number"
                  name="G_Force"
                  value={formData.G_Force}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Wind Speed (kts)</label>
                <Input
                  type="number"
                  name="Wind_Speed_kts"
                  value={formData.Wind_Speed_kts}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Crosswind Component (kts)</label>
                <Input
                  type="number"
                  name="Crosswind_Component_kts"
                  value={formData.Crosswind_Component_kts}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Visibility (miles)</label>
                <Input
                  type="number"
                  name="Visibility_miles"
                  value={formData.Visibility_miles}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Runway Condition</label>
                <Select value={formData.Runway_Condition} onValueChange={handleSelectChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Dry">Dry</SelectItem>
                    <SelectItem value="Wet">Wet</SelectItem>
                    <SelectItem value="Slippery">Slippery</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Throttle Input (%)</label>
                <Input
                  type="number"
                  name="Throttle_Input"
                  value={formData.Throttle_Input}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Brake Force (%)</label>
                <Input
                  type="number"
                  name="Brake_Force_pct"
                  value={formData.Brake_Force_pct}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Flaps Position (deg)</label>
                <Input
                  type="number"
                  name="Flaps_Position_deg"
                  value={formData.Flaps_Position_deg}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Rudder Deflection (deg)</label>
                <Input
                  type="number"
                  name="Rudder_Deflection_deg"
                  value={formData.Rudder_Deflection_deg}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Aileron Deflection (deg)</label>
                <Input
                  type="number"
                  name="Aileron_Deflection_deg"
                  value={formData.Aileron_Deflection_deg}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Landing Gear Force (N)</label>
                <Input
                  type="number"
                  name="Landing_Gear_Force_N"
                  value={formData.Landing_Gear_Force_N}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Spoiler Deployment (%)</label>
                <Input
                  type="number"
                  name="Spoiler_Deployment_pct"
                  value={formData.Spoiler_Deployment_pct}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Reverse Thrust (%)</label>
                <Input
                  type="number"
                  name="Reverse_Thrust_pct"
                  value={formData.Reverse_Thrust_pct}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="flex gap-4 mt-4">
              <Button type="button" onClick={handleFetchFlightData} disabled={loading}>
                Load Flight Data
              </Button>
              <Button type="submit" disabled={loading}>
                Predict Landing Risk
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {prediction && (
        <Card>
          <CardHeader>
            <CardTitle>Prediction Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">Prediction: {prediction.prediction}</h3>
                <p>Probability of Hard Landing: {prediction.probability}</p>
              </div>
              
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={150} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {prediction.prediction === "Soft Landing" ? (
                <p className="text-green-600">{prediction.message}</p>
              ) : (
                <div>
                  <h4 className="text-lg font-semibold mb-2">Corrective Measures:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {prediction.corrective_measures?.map((measure, index) => (
                      <li key={index}>{measure}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Predictor; 