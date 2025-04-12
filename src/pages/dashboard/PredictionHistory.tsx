import React, { useEffect, useState } from 'react';
import PageTemplate from '@/components/PageTemplate';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchPredictionHistory, type PredictionHistory, type PredictionHistoryParams, type PredictionHistoryResponse } from '@/services/predictor';
import { useToast } from '@/components/ui/use-toast';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateRangePicker } from "@/components/ui/date-picker";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const PredictionHistory = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [predictions, setPredictions] = useState<PredictionHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPrediction, setSelectedPrediction] = useState<PredictionHistory | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [searchParams, setSearchParams] = useState<PredictionHistoryParams>({
    page: 1,
    limit: 10,
    sortBy: 'timestamp',
    sortOrder: 'desc'
  });
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    totalPages: 1,
    limit: 10
  });

  useEffect(() => {
    loadPredictions();
  }, [searchParams]);

  const loadPredictions = async () => {
    try {
      setLoading(true);
      const response = await fetchPredictionHistory(searchParams);
      setPredictions(response.predictions);
      setPagination(response.pagination);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to load prediction history";
      
      if (errorMessage === 'Authentication required') {
        toast({
          title: "Authentication Required",
          description: "Please log in to view prediction history",
          variant: "destructive",
        });
        navigate('/login');
        return;
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    setSearchParams(prev => ({
      ...prev,
      search: value,
      page: 1 // Reset to first page when searching
    }));
  };

  const handleOutcomeFilter = (value: string) => {
    setSearchParams(prev => ({
      ...prev,
      outcome: value as 'Hard Landing' | 'Soft Landing',
      page: 1
    }));
  };

  const handleDateRange = (startDate: Date | undefined, endDate: Date | undefined) => {
    setSearchParams(prev => ({
      ...prev,
      startDate: startDate?.toISOString(),
      endDate: endDate?.toISOString(),
      page: 1
    }));
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams(prev => ({
      ...prev,
      page: newPage
    }));
  };

  const getOutcomeBadge = (prediction: string) => {
    switch (prediction) {
      case "Soft Landing":
        return <Badge className="bg-green-500">Safe</Badge>;
      case "Hard Landing":
        return <Badge className="bg-red-500">Risk</Badge>;
      default:
        return <Badge>{prediction}</Badge>;
    }
  };

  const getConfidenceBadge = (probability: string) => {
    const prob = parseFloat(probability.replace('%', ''));
    if (prob >= 80) {
      return <Badge variant="outline" className="border-green-500 text-green-700">High</Badge>;
    } else if (prob >= 50) {
      return <Badge variant="outline" className="border-yellow-500 text-yellow-700">Medium</Badge>;
    } else {
      return <Badge variant="outline" className="border-red-500 text-red-700">Low</Badge>;
    }
  };

  return (
    <PageTemplate
      title="Prediction History"
      subtitle="Review your past landing predictions and outcomes"
    >
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search predictions..."
              className="pl-9 w-full sm:w-64"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <Select onValueChange={handleOutcomeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by outcome" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Hard Landing">Hard Landing</SelectItem>
                <SelectItem value="Soft Landing">Soft Landing</SelectItem>
              </SelectContent>
            </Select>
            <DateRangePicker
              onDateRangeChange={handleDateRange}
              className="w-[200px]"
            />
            <Button variant="outline" className="flex items-center">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableCaption>A list of your recent landing predictions</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Flight ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Wind Speed</TableHead>
                <TableHead>Visibility</TableHead>
                <TableHead>Runway Condition</TableHead>
                <TableHead>Outcome</TableHead>
                <TableHead>Confidence</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-4">
                    Loading predictions...
                  </TableCell>
                </TableRow>
              ) : predictions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-4">
                    No predictions found
                  </TableCell>
                </TableRow>
              ) : (
                predictions.map((prediction) => (
                  <TableRow key={prediction.id}>
                    <TableCell className="font-medium">{prediction.flightId}</TableCell>
                    <TableCell>
                      {prediction.timestamp ? (
                        format(new Date(prediction.timestamp), 'MMM d, yyyy HH:mm')
                      ) : (
                        'N/A'
                      )}
                    </TableCell>
                    <TableCell>{prediction.inputData.Wind_Speed_kts} kts</TableCell>
                    <TableCell>{prediction.inputData.Visibility_miles} miles</TableCell>
                    <TableCell>{prediction.inputData.Runway_Condition}</TableCell>
                    <TableCell>{getOutcomeBadge(prediction.prediction)}</TableCell>
                    <TableCell>{getConfidenceBadge(prediction.probability)}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => {
                          setSelectedPrediction(prediction);
                          setShowDetails(true);
                        }}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center justify-between p-4 border-t">
          <div className="text-sm text-gray-500">
            Showing {predictions.length} of {pagination.total} predictions
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm">
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Prediction Details Dialog */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Prediction Details</DialogTitle>
            <DialogDescription>
              Detailed information for Flight {selectedPrediction?.flightId}
            </DialogDescription>
          </DialogHeader>
          {selectedPrediction && (
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
              {selectedPrediction.correctiveMeasures && (
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
          )}
        </DialogContent>
      </Dialog>
    </PageTemplate>
  );
};

export default PredictionHistory;
