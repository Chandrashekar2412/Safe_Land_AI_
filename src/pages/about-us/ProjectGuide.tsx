import React from 'react';
import PageTemplate from '@/components/PageTemplate';
import { Card, CardContent } from '@/components/ui/card';
import { LinkedinIcon, MailIcon, GlobeIcon } from 'lucide-react';

const ProjectGuide = () => {
  const guide = {
    name: "Dr. Kranthi Kumar K",
    role: "Project Guide",
    bio: "Associate Professor, Department of Information Technology, Sreenidhi Institute of Science and Technology, Yamnampet, Hyderabad.",
    image: "/guide-photos/kranthi-kumar.jpg",
    fallbackImage: "/placeholder.svg",
    links: {
      linkedin: "https://www.linkedin.com/in/dr-kranthi-kumar",
      email: "mailto:kranthi.kumar@sreenidhi.edu.in",
      website: "#"
    }
  };

  return (
    <PageTemplate
      title="Project Guide"
      subtitle="Meet our esteemed project guide"
    >
      <div className="max-w-4xl mx-auto">
        <Card className="overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3">
              <div className="h-48 md:h-full bg-gray-200 relative">
                <img 
                  src={guide.image} 
                  alt={guide.name} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = guide.fallbackImage;
                  }}
                />
              </div>
            </div>
            <div className="p-6 md:w-2/3">
              <h3 className="text-xl font-semibold mb-1">{guide.name}</h3>
              <p className="text-blue-700 font-medium mb-3">{guide.role}</p>
              <p className="text-gray-600 text-sm mb-4">{guide.bio}</p>
              {guide.links && (
                <div className="flex space-x-3">
                  {guide.links.linkedin && (
                    <a href={guide.links.linkedin} className="text-gray-500 hover:text-blue-700" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                      <LinkedinIcon className="h-5 w-5" />
                    </a>
                  )}
                  {guide.links.email && (
                    <a href={guide.links.email} className="text-gray-500 hover:text-red-600" target="_blank" rel="noopener noreferrer" title="Email">
                      <MailIcon className="h-5 w-5" />
                    </a>
                  )}
                  {guide.links.website && (
                    <a href={guide.links.website} className="text-gray-500 hover:text-purple-700" target="_blank" rel="noopener noreferrer" title="Website">
                      <GlobeIcon className="h-5 w-5" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </Card>
              </div>
    </PageTemplate>
  );
};

export default ProjectGuide;
