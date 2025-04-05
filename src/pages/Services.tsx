
import React from 'react';
import PageTemplate from '@/components/PageTemplate';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  const servicesList = [
    {
      title: 'Landing Predictor',
      description: 'Predict landing outcomes and enhance safety with our ML-powered predictor.',
      link: '/landing-predictor',
    },
    {
      title: 'Pilot Assistance',
      description: 'Real-time guidance and recommendations for safer landings.',
      link: '/pilot-assistance',
    },
    {
      title: 'Corrective Measures',
      description: 'Data-driven techniques to prevent hard landings and improve safety.',
      link: '/corrective-measures',
    },
    {
      title: 'Advanced Analytics',
      description: 'Comprehensive analytics suite for landing performance insights.',
      link: '/advanced-analytics',
    },
  ];

  return (
    <PageTemplate
      title="Our Services"
      subtitle="Explore our suite of aviation safety enhancement solutions"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        {servicesList.map((service, index) => (
          <Link key={index} to={service.link} className="no-underline">
            <Card className="h-full hover:shadow-lg transition-all duration-300 hover:border-blue-300">
              <CardHeader>
                <CardTitle className="text-xl text-blue-700">{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-end">
                <span className="text-blue-600 flex items-center group">
                  Learn more 
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </PageTemplate>
  );
};

export default Services;
