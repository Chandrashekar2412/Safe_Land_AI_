
import React from 'react';
import PageTemplate from '@/components/PageTemplate';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Download, ExternalLink } from 'lucide-react';

const Papers = () => {
  const researchPapers = [
    {
      id: "RP-2025-001",
      title: "Machine Learning Approaches to Hard Landing Prediction: A Comprehensive Review",
      authors: "Johnson, S., Chen, M., Wilson, J.",
      publication: "Journal of Aviation Technology",
      year: "2025",
      abstract: "This paper reviews current machine learning techniques used in hard landing prediction systems, with a focus on neural network architectures and their performance in real-world applications.",
      keywords: ["Machine Learning", "Neural Networks", "Hard Landing", "Prediction"],
      type: "academic",
      doi: "10.1234/jat.2025.001"
    },
    {
      id: "RP-2025-002",
      title: "Impact of Weather Variables on Landing Prediction Accuracy",
      authors: "Rodriguez, L., Taylor, E., Smith, J.",
      publication: "International Journal of Aeronautics",
      year: "2025",
      abstract: "A study examining how different weather variables affect the accuracy of landing prediction systems, with recommendations for optimizing prediction models based on local climate conditions.",
      keywords: ["Weather", "Prediction Accuracy", "Model Optimization"],
      type: "academic",
      doi: "10.5678/ija.2025.045"
    },
    {
      id: "WP-2025-003",
      title: "Next-Generation Landing Safety: The Role of Artificial Intelligence",
      authors: "Safe Land AI Research Team",
      publication: "Safe Land AI White Papers",
      year: "2025",
      abstract: "This white paper explores how artificial intelligence is transforming landing safety protocols in commercial aviation, including case studies of successful implementations.",
      keywords: ["Artificial Intelligence", "Aviation Safety", "Commercial Aviation"],
      type: "whitepaper"
    },
    {
      id: "RP-2024-012",
      title: "Comparative Analysis of G-Force Measurement Techniques During Aircraft Landing",
      authors: "Williams, P., Brown, A., Martinez, C.",
      publication: "Aerospace Engineering Review",
      year: "2024",
      abstract: "An experimental study comparing various methods of measuring g-forces during aircraft landings, with implications for hard landing detection and prediction.",
      keywords: ["G-Force", "Measurement", "Sensor Technology", "Hard Landing"],
      type: "academic",
      doi: "10.9012/aer.2024.078"
    },
    {
      id: "WP-2024-008",
      title: "Economic Benefits of Predictive Landing Systems: ROI Analysis",
      authors: "Safe Land AI Business Analysis Team",
      publication: "Safe Land AI White Papers",
      year: "2024",
      abstract: "A detailed ROI analysis of implementing predictive landing systems in commercial airlines, including maintenance cost reduction and safety improvement metrics.",
      keywords: ["ROI", "Economic Analysis", "Cost Reduction", "Implementation"],
      type: "whitepaper"
    }
  ];

  return (
    <PageTemplate
      title="Research Papers"
      subtitle="Academic publications and white papers on aviation safety and landing technology"
    >
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Publications</TabsTrigger>
          <TabsTrigger value="academic">Academic Papers</TabsTrigger>
          <TabsTrigger value="whitepaper">White Papers</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-6">
          {researchPapers.map((paper) => (
            <PaperCard key={paper.id} paper={paper} />
          ))}
        </TabsContent>
        
        <TabsContent value="academic" className="space-y-6">
          {researchPapers
            .filter((paper) => paper.type === "academic")
            .map((paper) => (
              <PaperCard key={paper.id} paper={paper} />
            ))
          }
        </TabsContent>
        
        <TabsContent value="whitepaper" className="space-y-6">
          {researchPapers
            .filter((paper) => paper.type === "whitepaper")
            .map((paper) => (
              <PaperCard key={paper.id} paper={paper} />
            ))
          }
        </TabsContent>
      </Tabs>
      
      <div className="mt-12">
        <Card>
          <CardHeader>
            <CardTitle>Submit Your Research</CardTitle>
            <CardDescription>
              Are you working on research related to aviation safety, landing prediction, 
              or related fields? We welcome submissions for review and potential publication.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Our expert team reviews submissions for technical merit, innovation, and relevance
              to the field of aviation safety and landing technology.
            </p>
            <Button>Submission Guidelines</Button>
          </CardContent>
        </Card>
      </div>
    </PageTemplate>
  );
};

interface Paper {
  id: string;
  title: string;
  authors: string;
  publication: string;
  year: string;
  abstract: string;
  keywords: string[];
  type: string;
  doi?: string;
}

const PaperCard = ({ paper }: { paper: Paper }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Badge variant={paper.type === "academic" ? "default" : "secondary"}>
            {paper.type === "academic" ? "Academic Paper" : "White Paper"}
          </Badge>
          <span className="text-sm text-gray-500">{paper.year}</span>
        </div>
        <CardTitle className="mt-2">{paper.title}</CardTitle>
        <CardDescription>{paper.authors}</CardDescription>
        <p className="text-sm text-gray-600">{paper.publication}</p>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">{paper.abstract}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {paper.keywords.map((keyword, index) => (
            <Badge key={index} variant="outline">{keyword}</Badge>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          <Button size="sm" className="flex items-center">
            <FileText className="h-4 w-4 mr-2" />
            Read Full Paper
          </Button>
          <Button size="sm" variant="outline" className="flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
          {paper.doi && (
            <Button size="sm" variant="outline" className="flex items-center">
              <ExternalLink className="h-4 w-4 mr-2" />
              DOI: {paper.doi}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Papers;
