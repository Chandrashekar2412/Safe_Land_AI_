
import React from 'react';
import PageTemplate from '@/components/PageTemplate';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle2, Clock, FileText, AlertCircle, HelpCircle } from 'lucide-react';

const ProjectGuide = () => {
  const implementationStages = [
    {
      stage: "Stage 1",
      title: "Assessment and Planning",
      description: "Evaluate current landing safety protocols and technology infrastructure.",
      tasks: [
        "Conduct initial safety assessment",
        "Review existing landing data collection systems",
        "Define integration requirements",
        "Identify key stakeholders and form implementation team",
        "Develop customized implementation timeline"
      ],
      duration: "4-6 weeks"
    },
    {
      stage: "Stage 2",
      title: "System Integration",
      description: "Connect Safe Land AI with your flight data systems and operational infrastructure.",
      tasks: [
        "Configure data pipelines",
        "Establish secure cloud connections",
        "Install cockpit interface components",
        "Set up monitoring dashboards",
        "Implement backup and redundancy systems"
      ],
      duration: "6-8 weeks"
    },
    {
      stage: "Stage 3",
      title: "Model Training and Calibration",
      description: "Customize our AI models to your specific aircraft types and flight routes.",
      tasks: [
        "Collect and process historical landing data",
        "Train prediction models on airline-specific parameters",
        "Calibrate sensitivity thresholds",
        "Conduct simulation testing",
        "Validate prediction accuracy"
      ],
      duration: "8-10 weeks"
    },
    {
      stage: "Stage 4",
      title: "Pilot and Staff Training",
      description: "Comprehensive training for pilots, technicians, and management.",
      tasks: [
        "Conduct pilot awareness workshops",
        "Provide technical training for maintenance staff",
        "Train safety officers on data analysis",
        "Develop standard operating procedures",
        "Create reference materials"
      ],
      duration: "4 weeks"
    },
    {
      stage: "Stage 5",
      title: "Live Deployment and Ongoing Support",
      description: "Roll out the system across your fleet with continuous monitoring and support.",
      tasks: [
        "Phased deployment across aircraft",
        "Real-time performance monitoring",
        "Regular system updates",
        "Continuous model refinement",
        "Ongoing technical support"
      ],
      duration: "Ongoing"
    }
  ];

  const faqs = [
    {
      question: "How long does a typical implementation take?",
      answer: "A full implementation typically takes 4-6 months from initial assessment to full deployment across a fleet. The timeline can vary based on fleet size, existing systems, and specific customization requirements."
    },
    {
      question: "Do pilots need extensive training to use Safe Land AI?",
      answer: "No. Our system is designed with pilot usability in mind. Most pilots can become proficient after a 4-hour training session and simulator practice. The interface is intuitive and provides clear, actionable information."
    },
    {
      question: "How is the system integrated with existing aircraft systems?",
      answer: "Safe Land AI connects to Flight Data Management Systems (FDMS) through a certified interface module. We can integrate with most modern commercial aircraft without requiring significant modifications to existing systems."
    },
    {
      question: "What kind of ROI can we expect?",
      answer: "Airlines typically see a return on investment within 12-18 months through reduced hard landing incidents, decreased maintenance costs, improved fuel efficiency, and enhanced safety records. We provide a detailed ROI analysis during the assessment phase."
    },
    {
      question: "How often is the AI model updated?",
      answer: "Our core algorithms receive quarterly updates incorporating latest advancements. Additionally, your specific airline models are continuously refined based on your operational data, with major calibration updates provided every six months."
    }
  ];

  return (
    <PageTemplate
      title="Project Guide"
      subtitle="Implementation process and resources for Safe Land AI systems"
    >
      <Tabs defaultValue="implementation" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="implementation">Implementation Process</TabsTrigger>
          <TabsTrigger value="resources">Project Resources</TabsTrigger>
          <TabsTrigger value="faqs">FAQs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="implementation">
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-6 text-blue-700">Implementation Roadmap</h2>
              <div className="space-y-8">
                {implementationStages.map((stage, index) => (
                  <div key={index} className="relative">
                    {/* Stage indicator */}
                    <div className="flex items-center mb-4">
                      <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-lg font-bold">
                        {index + 1}
                      </div>
                      <div className="ml-4">
                        <h3 className="text-xl font-medium">{stage.title}</h3>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{stage.duration}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Stage content */}
                    <div className="ml-14">
                      <p className="text-gray-600 mb-3">{stage.description}</p>
                      <div className="bg-gray-50 rounded-md p-4">
                        <h4 className="font-medium mb-2">Key Activities:</h4>
                        <ul className="space-y-2">
                          {stage.tasks.map((task, taskIndex) => (
                            <li key={taskIndex} className="flex items-start">
                              <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                              <span className="text-gray-600">{task}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    {/* Connector line */}
                    {index < implementationStages.length - 1 && (
                      <div className="h-12 w-0.5 bg-blue-100 absolute left-5 top-full"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Success Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  We track these key metrics throughout the implementation process to ensure optimal results:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="font-medium">Data Integration Rate</p>
                    <p className="text-sm text-gray-500">Target: 99.9% successful data transfers</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="font-medium">Prediction Accuracy</p>
                    <p className="text-sm text-gray-500">Target: 93%+ in initial deployment</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="font-medium">Alert Response Time</p>
                    <p className="text-sm text-gray-500">Target: &lt;500ms from detection to alert</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="font-medium">Pilot Compliance Rate</p>
                    <p className="text-sm text-gray-500">Target: 85%+ recommendation adherence</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="font-medium">Hard Landing Reduction</p>
                    <p className="text-sm text-gray-500">Target: 80%+ reduction in first year</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="font-medium">System Reliability</p>
                    <p className="text-sm text-gray-500">Target: 99.99% uptime</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="resources">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-blue-600" />
                  Documentation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="p-3 hover:bg-gray-50 rounded-md">
                    <a href="#" className="block">
                      <p className="font-medium">Implementation Guide</p>
                      <p className="text-sm text-gray-500">Comprehensive guide to system implementation</p>
                    </a>
                  </li>
                  <li className="p-3 hover:bg-gray-50 rounded-md">
                    <a href="#" className="block">
                      <p className="font-medium">Technical Specifications</p>
                      <p className="text-sm text-gray-500">Detailed technical requirements and specifications</p>
                    </a>
                  </li>
                  <li className="p-3 hover:bg-gray-50 rounded-md">
                    <a href="#" className="block">
                      <p className="font-medium">Integration Manual</p>
                      <p className="text-sm text-gray-500">Step-by-step guide for system integration</p>
                    </a>
                  </li>
                  <li className="p-3 hover:bg-gray-50 rounded-md">
                    <a href="#" className="block">
                      <p className="font-medium">Pilot User Guide</p>
                      <p className="text-sm text-gray-500">Instructions for pilots using the system</p>
                    </a>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <HelpCircle className="h-5 w-5 mr-2 text-blue-600" />
                  Support Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="p-3 hover:bg-gray-50 rounded-md">
                    <a href="#" className="block">
                      <p className="font-medium">Technical Support Portal</p>
                      <p className="text-sm text-gray-500">24/7 access to our support team</p>
                    </a>
                  </li>
                  <li className="p-3 hover:bg-gray-50 rounded-md">
                    <a href="#" className="block">
                      <p className="font-medium">Training Materials</p>
                      <p className="text-sm text-gray-500">Video tutorials, presentations, and training guides</p>
                    </a>
                  </li>
                  <li className="p-3 hover:bg-gray-50 rounded-md">
                    <a href="#" className="block">
                      <p className="font-medium">Community Forum</p>
                      <p className="text-sm text-gray-500">Connect with other Safe Land AI users</p>
                    </a>
                  </li>
                  <li className="p-3 hover:bg-gray-50 rounded-md">
                    <a href="#" className="block">
                      <p className="font-medium">Implementation Checklist</p>
                      <p className="text-sm text-gray-500">Track your implementation progress</p>
                    </a>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2 text-blue-600" />
                  Implementation Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <h3 className="font-medium mb-2 text-blue-700">Form a Cross-Functional Team</h3>
                    <p className="text-gray-600">
                      Implementation success is highest when teams include representatives from flight operations, 
                      safety, IT, and maintenance departments. This ensures all perspectives are considered.
                    </p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <h3 className="font-medium mb-2 text-blue-700">Start With a Pilot Program</h3>
                    <p className="text-gray-600">
                      Begin with a small subset of your fleet to gather initial data and refine the implementation
                      process before scaling to your entire operation.
                    </p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <h3 className="font-medium mb-2 text-blue-700">Communicate Early and Often</h3>
                    <p className="text-gray-600">
                      Engage pilots and staff from the beginning. Clear communication about the benefits and
                      expectations leads to higher adoption rates and better outcomes.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="faqs">
          <Card>
            <CardContent className="pt-6">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-600 pt-2">{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              
              <Separator className="my-8" />
              
              <div className="text-center">
                <h3 className="text-lg font-medium mb-2">Still have questions?</h3>
                <p className="text-gray-600 mb-4">
                  Our implementation specialists are ready to help you with any specific questions
                  about implementing Safe Land AI in your operation.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition-colors">
                    Schedule a Consultation
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                    Contact Support
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageTemplate>
  );
};

export default ProjectGuide;
