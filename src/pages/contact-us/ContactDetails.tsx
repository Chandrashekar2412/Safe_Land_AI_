
import React from 'react';
import PageTemplate from '@/components/PageTemplate';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Phone, Mail, Clock, Globe, Building } from 'lucide-react';

const ContactDetails = () => {
  const offices = [
    {
      name: "Headquarters",
      address: "123 Aviation Way, Suite 500",
      city: "San Francisco, CA 94111",
      country: "United States",
      phone: "+1 (555) 123-4567",
      email: "info@safelandai.com",
      hours: "Mon-Fri: 8AM - 6PM PST"
    },
    {
      name: "European Office",
      address: "42 Regent Street",
      city: "London, SW1Y 4PE",
      country: "United Kingdom",
      phone: "+44 20 1234 5678",
      email: "europe@safelandai.com",
      hours: "Mon-Fri: 9AM - 5PM GMT"
    },
    {
      name: "Asia-Pacific Office",
      address: "88 Queens Road",
      city: "Singapore, 123456",
      country: "Singapore",
      phone: "+65 6123 4567",
      email: "apac@safelandai.com",
      hours: "Mon-Fri: 9AM - 5PM SGT"
    }
  ];

  const departments = [
    {
      name: "Sales",
      email: "sales@safelandai.com",
      phone: "+1 (555) 234-5678",
      description: "For pricing inquiries and product demonstrations"
    },
    {
      name: "Support",
      email: "support@safelandai.com",
      phone: "+1 (555) 345-6789",
      description: "For technical assistance and troubleshooting"
    },
    {
      name: "Media & Press",
      email: "media@safelandai.com",
      phone: "+1 (555) 456-7890",
      description: "For press inquiries and media opportunities"
    },
    {
      name: "Careers",
      email: "careers@safelandai.com",
      description: "For job opportunities and recruitment"
    },
    {
      name: "Partnerships",
      email: "partnerships@safelandai.com",
      phone: "+1 (555) 567-8901",
      description: "For partnership and collaboration opportunities"
    },
    {
      name: "Investor Relations",
      email: "investors@safelandai.com",
      description: "For investor information and shareholder services"
    }
  ];

  return (
    <PageTemplate
      title="Contact Details"
      subtitle="Get in touch with our team at Safe Land AI"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        {offices.map((office, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="h-48 bg-gray-200">
              {/* This would be a map in a real application */}
              <div className="h-full w-full flex items-center justify-center bg-gradient-to-r from-blue-100 to-indigo-100">
                <MapPin className="h-12 w-12 text-blue-400" />
              </div>
            </div>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">{office.name}</h3>
              <div className="space-y-4">
                <div className="flex">
                  <Building className="h-5 w-5 text-gray-400 mr-3 shrink-0" />
                  <div>
                    <p className="text-gray-600">{office.address}</p>
                    <p className="text-gray-600">{office.city}</p>
                    <p className="text-gray-600">{office.country}</p>
                  </div>
                </div>
                
                <div className="flex">
                  <Phone className="h-5 w-5 text-gray-400 mr-3 shrink-0" />
                  <p className="text-gray-600">{office.phone}</p>
                </div>
                
                <div className="flex">
                  <Mail className="h-5 w-5 text-gray-400 mr-3 shrink-0" />
                  <p className="text-gray-600">{office.email}</p>
                </div>
                
                <div className="flex">
                  <Clock className="h-5 w-5 text-gray-400 mr-3 shrink-0" />
                  <p className="text-gray-600">{office.hours}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <h2 className="text-2xl font-semibold mb-6 text-blue-700">Departments</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {departments.map((dept, index) => (
          <div key={index} className="bg-white p-5 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-2">{dept.name}</h3>
            <p className="text-gray-600 mb-3">{dept.description}</p>
            <div className="space-y-2">
              <div className="flex items-center">
                <Mail className="h-4 w-4 text-gray-400 mr-2" />
                <a href={`mailto:${dept.email}`} className="text-blue-600 hover:underline">
                  {dept.email}
                </a>
              </div>
              {dept.phone && (
                <div className="flex items-center">
                  <Phone className="h-4 w-4 text-gray-400 mr-2" />
                  <a href={`tel:${dept.phone}`} className="text-blue-600 hover:underline">
                    {dept.phone}
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-lg border border-blue-100">
        <h2 className="text-2xl font-semibold mb-4 text-blue-700">Follow Us</h2>
        <div className="flex flex-wrap gap-4">
          {[
            { name: "LinkedIn", icon: <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"></path></svg> },
            { name: "Twitter", icon: <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"></path></svg> },
            { name: "YouTube", icon: <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"></path></svg> },
            { name: "Facebook", icon: <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z"></path></svg> },
            { name: "Instagram", icon: <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path></svg> },
          ].map((social, index) => (
            <a
              key={index}
              href="#"
              className="flex items-center px-4 py-2 bg-white rounded-md shadow-sm hover:bg-gray-50 transition-colors"
            >
              <span className="text-gray-600">{social.icon}</span>
              <span className="ml-2 font-medium">{social.name}</span>
            </a>
          ))}
        </div>
      </div>
      
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6 text-blue-700">Global Reach</h2>
        <div className="h-80 bg-gray-200 rounded-lg overflow-hidden">
          <div className="h-full w-full flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100">
            <Globe className="h-16 w-16 text-blue-400 mb-4" />
          </div>
        </div>
        <p className="text-center text-gray-500 mt-4">
          Safe Land AI has partners and clients in over 30 countries worldwide.
        </p>
      </div>
    </PageTemplate>
  );
};

export default ContactDetails;
