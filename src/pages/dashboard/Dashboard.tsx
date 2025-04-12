import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { fetchPredictionHistory, PredictionHistory } from '@/services/predictor';
import { PredictionHistoryTable } from '@/components/PredictionHistoryTable';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [predictionHistory, setPredictionHistory] = useState<PredictionHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPredictionHistory = async () => {
      try {
        const response = await fetchPredictionHistory({ limit: 5 });
        setPredictionHistory(response.predictions);
      } catch (error) {
        console.error('Error loading prediction history:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPredictionHistory();
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Button asChild>
            <Link to="/prediction-history">View Full History</Link>
          </Button>
        </div>
        
        <div className="grid gap-6">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Recent Predictions</h2>
            <PredictionHistoryTable 
              predictions={predictionHistory} 
              isLoading={isLoading}
            />
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard; 