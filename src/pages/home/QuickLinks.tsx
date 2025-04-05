
import React from 'react';
import PageTemplate from '@/components/PageTemplate';
import { Link } from 'react-router-dom';
import { 
  Plane, Shield, BarChart2, FileText, Users, MessageSquare,
  Book, FileBox, Bell, Settings, HelpCircle, ExternalLink
} from 'lucide-react';

const QuickLinks = () => {
  const linkCategories = [
    {
      title: "Core Services",
      links: [
        { name: "Landing Predictor", path: "/landing-predictor", icon: <Plane className="h-5 w-5" /> },
        { name: "Pilot Assistance", path: "/pilot-assistance", icon: <Shield className="h-5 w-5" /> },
        { name: "Corrective Measures", path: "/corrective-measures", icon: <BarChart2 className="h-5 w-5" /> },
        { name: "Advanced Analytics", path: "/advanced-analytics", icon: <BarChart2 className="h-5 w-5" /> }
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Blogs", path: "/resources/blogs", icon: <Book className="h-5 w-5" /> },
        { name: "Papers", path: "/resources/papers", icon: <FileBox className="h-5 w-5" /> },
        { name: "News & Events", path: "/resources/news-events", icon: <Bell className="h-5 w-5" /> }
      ]
    },
    {
      title: "User",
      links: [
        { name: "Dashboard", path: "/dashboard/user-details", icon: <Users className="h-5 w-5" /> },
        { name: "Settings", path: "/dashboard/settings", icon: <Settings className="h-5 w-5" /> },
        { name: "Help", path: "/contact-us/faqs", icon: <HelpCircle className="h-5 w-5" /> },
        { name: "Contact Us", path: "/contact-us/message", icon: <MessageSquare className="h-5 w-5" /> }
      ]
    },
    {
      title: "External Resources",
      links: [
        { 
          name: "FAA Aviation Safety", 
          path: "https://www.faa.gov/about/safety_efficiency", 
          icon: <ExternalLink className="h-5 w-5" />,
          external: true 
        },
        { 
          name: "NTSB Aviation", 
          path: "https://www.ntsb.gov/investigations/pages/aviation.aspx", 
          icon: <ExternalLink className="h-5 w-5" />,
          external: true 
        },
        { 
          name: "Aviation Weather Center", 
          path: "https://www.aviationweather.gov/", 
          icon: <ExternalLink className="h-5 w-5" />,
          external: true 
        }
      ]
    }
  ];

  return (
    <PageTemplate
      title="Quick Links"
      subtitle="Fast access to all features and resources"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {linkCategories.map((category, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-blue-700">{category.title}</h2>
            <ul className="space-y-3">
              {category.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  {link.external ? (
                    <a 
                      href={link.path} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center p-2 rounded-md hover:bg-gray-100 text-gray-700"
                    >
                      {link.icon}
                      <span className="ml-3">{link.name}</span>
                    </a>
                  ) : (
                    <Link 
                      to={link.path}
                      className="flex items-center p-2 rounded-md hover:bg-gray-100 text-gray-700"
                    >
                      {link.icon}
                      <span className="ml-3">{link.name}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </PageTemplate>
  );
};

export default QuickLinks;
