
import React, { useState } from 'react';
import PageTemplate from '@/components/PageTemplate';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search } from 'lucide-react';

const FAQs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const faqCategories = [
    {
      id: "general",
      name: "General",
      faqs: [
        {
          question: "What is Safe Land AI?",
          answer: "Safe Land AI is a machine learning system designed to predict and prevent hard landings in commercial aviation. Our technology analyzes flight data, weather conditions, and other variables to provide real-time landing risk assessments and recommendations to pilots."
        },
        {
          question: "How accurate are your landing predictions?",
          answer: "Our landing prediction system achieves over 93% accuracy in real-world testing. The system is continuously learning and improving based on new data, with accuracy rates increasing over time as more flight data is processed."
        },
        {
          question: "Is Safe Land AI certified for commercial aviation use?",
          answer: "Yes, Safe Land AI has received certification from major aviation authorities including the FAA, EASA, and others for use as a supplementary safety system. Our technology meets or exceeds all relevant aviation safety standards and regulations."
        },
        {
          question: "How does Safe Land AI differ from existing systems?",
          answer: "Unlike traditional systems that rely on fixed rules or simple thresholds, Safe Land AI uses advanced neural networks to analyze thousands of variables simultaneously, learning complex patterns that humans might miss. Our system is predictive rather than reactive, identifying potential issues before they become critical."
        }
      ]
    },
    {
      id: "technical",
      name: "Technical",
      faqs: [
        {
          question: "What data sources does Safe Land AI use?",
          answer: "Safe Land AI integrates data from multiple sources including aircraft sensors, weather services, airport databases, runway condition reports, and historical landing records. All data is processed in real-time to provide the most accurate predictions possible."
        },
        {
          question: "How is Safe Land AI integrated with aircraft systems?",
          answer: "Our system can be integrated through various methods depending on aircraft type and operator preference. Common integration options include connection to Flight Data Monitoring systems, installation of supplementary hardware in the cockpit, or integration with existing electronic flight bag solutions."
        },
        {
          question: "What happens if the system loses connectivity?",
          answer: "Safe Land AI includes robust fallback mechanisms. The core prediction engine can operate independently on the aircraft if cloud connectivity is lost. Additionally, the system is designed to gracefully degrade functionality rather than fail completely in case of partial data loss."
        },
        {
          question: "How does your AI model work?",
          answer: "Our AI uses a sophisticated neural network architecture specifically designed for aviation safety applications. It processes structured and unstructured data through multiple analysis layers, identifying subtle patterns and correlations that indicate increased landing risk. The model has been trained on millions of landing events across diverse conditions."
        }
      ]
    },
    {
      id: "implementation",
      name: "Implementation",
      faqs: [
        {
          question: "How long does implementation typically take?",
          answer: "A typical implementation takes 4-6 months from initial assessment to full deployment. This includes system integration, data pipeline setup, model customization, and staff training. We can often accelerate this timeline for partial fleet deployments or emergency situations."
        },
        {
          question: "What training do pilots need?",
          answer: "Pilots typically require a 4-hour training session covering system operation, alert interpretation, and recommended responses. This is followed by simulator practice incorporating the system. The training is designed to be intuitive and builds on existing pilot knowledge and procedures."
        },
        {
          question: "Can Safe Land AI be customized for specific aircraft types?",
          answer: "Yes, our system is highly customizable and can be optimized for specific aircraft types, operational environments, and airline procedures. We typically calibrate our models using historical data from your specific fleet to ensure maximum accuracy."
        },
        {
          question: "What ongoing support do you provide?",
          answer: "We provide 24/7 technical support for all implementations. Our standard service agreement includes regular system updates, performance monitoring, and continuous model refinement based on your operational data. We also offer advanced support tiers with dedicated service representatives and expedited response times."
        }
      ]
    },
    {
      id: "business",
      name: "Business",
      faqs: [
        {
          question: "What is the pricing model for Safe Land AI?",
          answer: "We offer flexible pricing options including per-aircraft licensing, usage-based pricing, and enterprise agreements for larger fleets. All pricing includes implementation support, training, and standard maintenance. Please contact our sales team for a customized quote based on your specific requirements."
        },
        {
          question: "What ROI can airlines expect?",
          answer: "Airlines typically see return on investment within 12-18 months through reduced maintenance costs from hard landings, improved fuel efficiency, decreased insurance premiums, and enhanced safety records. We provide a detailed ROI analysis during the pre-implementation assessment."
        },
        {
          question: "Do you offer trial periods?",
          answer: "Yes, we offer limited-scope trials for qualified airlines. A typical trial includes implementation on a small subset of aircraft and runs for 3-6 months, providing sufficient data to evaluate system performance and benefits before broader deployment."
        },
        {
          question: "How do you handle data privacy and security?",
          answer: "We adhere to the highest standards of data security and privacy. All data is encrypted both in transit and at rest, and we provide options for data residency to meet regional requirements. We comply with GDPR, CCPA, and other relevant privacy regulations worldwide."
        }
      ]
    }
  ];

  const renderAccordionItems = (items) => {
    if (searchQuery) {
      const filteredItems = items.filter(item => 
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      return filteredItems.map((item, index) => (
        <AccordionItem key={`search-${index}`} value={`search-item-${index}`}>
          <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
          <AccordionContent>
            <p className="text-gray-600 pt-2">{item.answer}</p>
          </AccordionContent>
        </AccordionItem>
      ));
    }
    
    return items.map((item, index) => (
      <AccordionItem key={index} value={`item-${index}`}>
        <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
        <AccordionContent>
          <p className="text-gray-600 pt-2">{item.answer}</p>
        </AccordionContent>
      </AccordionItem>
    ));
  };

  return (
    <PageTemplate
      title="Frequently Asked Questions"
      subtitle="Find answers to common questions about Safe Land AI"
    >
      <div className="mb-8 max-w-lg mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            placeholder="Search frequently asked questions..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      {searchQuery ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Search Results for "{searchQuery}"</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqCategories.flatMap(category => 
              renderAccordionItems(category.faqs)
            )}
          </Accordion>
        </div>
      ) : (
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
            {faqCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id}>{category.name}</TabsTrigger>
            ))}
          </TabsList>
          
          {faqCategories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <div className="bg-white rounded-lg shadow-md p-6">
                <Accordion type="single" collapsible className="w-full">
                  {renderAccordionItems(category.faqs)}
                </Accordion>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      )}
      
      <div className="mt-12 bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
        <h2 className="text-xl font-semibold mb-3 text-blue-700">Still have questions?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          If you couldn't find the answer you were looking for, our support team is here to help.
          Contact us directly and we'll get back to you as soon as possible.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button>Contact Support</Button>
          <Button variant="outline">View Documentation</Button>
        </div>
      </div>
    </PageTemplate>
  );
};

export default FAQs;
