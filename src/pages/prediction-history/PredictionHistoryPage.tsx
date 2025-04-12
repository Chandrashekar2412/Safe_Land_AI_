import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { fetchPredictionHistory, PredictionHistory } from '@/services/predictor';
import { PredictionHistoryTable } from '@/components/PredictionHistoryTable';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const PredictionHistoryPage = () => {
  const [predictionHistory, setPredictionHistory] = useState<PredictionHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [outcomeFilter, setOutcomeFilter] = useState<string>('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadPredictionHistory = async () => {
    setIsLoading(true);
    try {
      const response = await fetchPredictionHistory({
        page,
        search: searchTerm,
        outcome: outcomeFilter
      });
      setPredictionHistory(response.predictions);
      setTotalPages(response.pagination.totalPages);
    } catch (error) {
      console.error('Error loading prediction history:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPredictionHistory();
  }, [page, searchTerm, outcomeFilter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1); // Reset to first page when searching
    loadPredictionHistory();
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Prediction History</h1>
        </div>

        <Card className="p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <form onSubmit={handleSearch} className="flex-1">
              <Input
                type="text"
                placeholder="Search by Flight ID or Runway Condition..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </form>
            <Select value={outcomeFilter} onValueChange={setOutcomeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by outcome" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Outcomes</SelectItem>
                <SelectItem value="Hard Landing">Hard Landing</SelectItem>
                <SelectItem value="Soft Landing">Soft Landing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <PredictionHistoryTable 
            predictions={predictionHistory} 
            isLoading={isLoading}
          />

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              <Button
                variant="outline"
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Previous
              </Button>
              <span className="flex items-center px-4">
                Page {page} of {totalPages}
              </span>
              <Button
                variant="outline"
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </Card>
      </div>
    </Layout>
  );
};

export default PredictionHistoryPage; 