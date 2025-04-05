
import React from 'react';
import PageTemplate from '@/components/PageTemplate';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BookOpen, FileText, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const Resources = () => {
  const resourcesList = [
    {
      title: 'Blogs',
      description: 'Explore our blog posts covering aviation safety, hard landing prevention, and industry insights.',
      link: '/resources/blogs',
      icon: <BookOpen className="h-8 w-8 text-blue-600" />
    },
    {
      title: 'Research Papers',
      description: 'Access research papers and technical documents related to our landing prediction technology.',
      link: '/resources/papers',
      icon: <FileText className="h-8 w-8 text-green-600" />
    },
    {
      title: 'News & Events',
      description: 'Stay updated with the latest news and upcoming events in aviation safety.',
      link: '/resources/news-events',
      icon: <Calendar className="h-8 w-8 text-purple-600" />
    },
  ];

  return (
    <PageTemplate
      title="Resources"
      subtitle="Discover our collection of resources for aviation safety and landing prediction"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        {resourcesList.map((resource, index) => (
          <Link key={index} to={resource.link} className="no-underline">
            <Card className="h-full hover:shadow-lg transition-all duration-300 hover:border-blue-300">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  {resource.icon}
                </div>
                <CardTitle className="text-xl text-center">{resource.title}</CardTitle>
                <CardDescription className="text-center">{resource.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <span className="text-blue-600 flex items-center group">
                  Explore 
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

export default Resources;
