
import React from 'react';
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
import { Search, Filter, Download } from 'lucide-react';

const PredictionHistory = () => {
  const predictions = [
    {
      id: "PR-2025-04-05-001",
      date: "Apr 5, 2025",
      airport: "JFK",
      runway: "13L",
      aircraft: "Boeing 737-800",
      outcome: "Safe",
      confidence: "High",
      windSpeed: "12 kts",
      visibility: "8 miles",
    },
    {
      id: "PR-2025-04-04-002",
      date: "Apr 4, 2025",
      airport: "LAX",
      runway: "25R",
      aircraft: "Airbus A320",
      outcome: "Warning",
      confidence: "Medium",
      windSpeed: "18 kts",
      visibility: "5 miles",
    },
    {
      id: "PR-2025-04-03-003",
      date: "Apr 3, 2025",
      airport: "ORD",
      runway: "27L",
      aircraft: "Boeing 737-800",
      outcome: "Safe",
      confidence: "High",
      windSpeed: "8 kts",
      visibility: "10 miles",
    },
    {
      id: "PR-2025-04-02-004",
      date: "Apr 2, 2025",
      airport: "DFW",
      runway: "18R",
      aircraft: "Airbus A320",
      outcome: "Risk",
      confidence: "High",
      windSpeed: "25 kts",
      visibility: "2 miles",
    },
    {
      id: "PR-2025-04-01-005",
      date: "Apr 1, 2025",
      airport: "ATL",
      runway: "9L",
      aircraft: "Embraer E190",
      outcome: "Safe",
      confidence: "High",
      windSpeed: "6 kts",
      visibility: "12 miles",
    },
  ];

  const getOutcomeBadge = (outcome: string) => {
    switch (outcome) {
      case "Safe":
        return <Badge className="bg-green-500">Safe</Badge>;
      case "Warning":
        return <Badge className="bg-yellow-500">Warning</Badge>;
      case "Risk":
        return <Badge className="bg-red-500">Risk</Badge>;
      default:
        return <Badge>{outcome}</Badge>;
    }
  };

  const getConfidenceBadge = (confidence: string) => {
    switch (confidence) {
      case "High":
        return <Badge variant="outline" className="border-green-500 text-green-700">High</Badge>;
      case "Medium":
        return <Badge variant="outline" className="border-yellow-500 text-yellow-700">Medium</Badge>;
      case "Low":
        return <Badge variant="outline" className="border-red-500 text-red-700">Low</Badge>;
      default:
        return <Badge variant="outline">{confidence}</Badge>;
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
            />
          </div>
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <Button variant="outline" className="flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
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
                <TableHead>ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Airport</TableHead>
                <TableHead>Runway</TableHead>
                <TableHead>Aircraft</TableHead>
                <TableHead>Wind</TableHead>
                <TableHead>Visibility</TableHead>
                <TableHead>Outcome</TableHead>
                <TableHead>Confidence</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {predictions.map((prediction) => (
                <TableRow key={prediction.id}>
                  <TableCell className="font-medium">{prediction.id}</TableCell>
                  <TableCell>{prediction.date}</TableCell>
                  <TableCell>{prediction.airport}</TableCell>
                  <TableCell>{prediction.runway}</TableCell>
                  <TableCell>{prediction.aircraft}</TableCell>
                  <TableCell>{prediction.windSpeed}</TableCell>
                  <TableCell>{prediction.visibility}</TableCell>
                  <TableCell>{getOutcomeBadge(prediction.outcome)}</TableCell>
                  <TableCell>{getConfidenceBadge(prediction.confidence)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </PageTemplate>
  );
};

export default PredictionHistory;
