import React from 'react';
import { PredictionHistory } from '@/services/predictor';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface PredictionHistoryTableProps {
  predictions: PredictionHistory[];
  isLoading?: boolean;
}

export const PredictionHistoryTable: React.FC<PredictionHistoryTableProps> = ({
  predictions,
  isLoading = false,
}) => {
  const [selectedPrediction, setSelectedPrediction] = React.useState<PredictionHistory | null>(null);
  const [showDetails, setShowDetails] = React.useState(false);

  if (isLoading) {
    return <div className="text-center">Loading history...</div>;
  }

  if (predictions.length === 0) {
    return <div className="text-center">No prediction history available</div>;
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Flight ID</TableHead>
              <TableHead>Prediction</TableHead>
              <TableHead>Probability</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {predictions.map((history) => (
              <TableRow key={history.id}>
                <TableCell>{history.flightId}</TableCell>
                <TableCell>
                  <Badge
                    variant={history.prediction === 'Hard Landing' ? 'destructive' : 'default'}
                  >
                    {history.prediction}
                  </Badge>
                </TableCell>
                <TableCell>{history.probability}</TableCell>
                <TableCell>{new Date(history.timestamp).toLocaleString()}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setSelectedPrediction(history);
                      setShowDetails(true);
                    }}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {showDetails && selectedPrediction && (
        <Dialog open={showDetails} onOpenChange={setShowDetails}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
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
    </>
  );
}; 